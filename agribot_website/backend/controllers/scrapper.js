import puppeteer from "puppeteer";
import mongoose from "mongoose";
import Scheme from "../models/Scheme.js";
import connectDB from "../db.js";

connectDB(); // Ensure MongoDB is connected

export const getNabardSchemes = async (req = null, res = null) => {
    try {
        console.log("🔄 Scraping NABARD schemes...");
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto("https://www.nabard.org/content1.aspx?id=23&catid=23&mid=530", { waitUntil: "domcontentloaded" });

        const links = await page.evaluate(() => {
            const spanElement = document.querySelector("#ContentPlaceHolder1_lbldescription");
            if (!spanElement) return [];

            return Array.from(spanElement.querySelectorAll("a[href]"))
                .map(a => ({ name: a.innerText.trim(), link: a.href }))
                .filter(item => item.link.includes("nabard.org/"));
        });

        console.log(`✅ Found ${links.length} NABARD scheme links.`);

        let newSchemes = [];

        for (const item of links) {
            try {
                const existingScheme = await Scheme.findOne({ name: item.name });
                if (existingScheme) continue; // Skip if already in DB

                const newPage = await browser.newPage();
                await newPage.goto(item.link, { waitUntil: "domcontentloaded", timeout: 30000 });

                const pageData = await newPage.evaluate(() => {
                    let details = [];
                    const contentDiv = document.querySelector("#ContentPlaceHolder1_lbldescription");
                    if (!contentDiv) return details;

                    function extractText(tagName) {
                        contentDiv.querySelectorAll(tagName).forEach(el => {
                            if (el.innerText.trim()) {
                                details.push({ type: tagName, content: el.innerText.trim() });
                            }
                        });
                    }

                    ["p", "h1", "h2", "h3", "h4", "h5", "h6"].forEach(tag => extractText(tag));

                    contentDiv.querySelectorAll("ul, ol").forEach(list => {
                        let listData = [];
                        list.querySelectorAll("li").forEach(li => {
                            listData.push(li.innerText.trim());
                        });
                        if (listData.length > 0) {
                            details.push({ type: list.tagName.toLowerCase(), content: listData });
                        }
                    });

                    return details;
                });

                newSchemes.push({
                    name: item.name,
                    link: item.link,
                    details: pageData,
                    source: "NABARD"
                });

                await newPage.close();
            } catch (error) {
                console.log(`⚠️ Error scraping ${item.link}:`, error.message);
            }
        }

        if (newSchemes.length > 0) {
            await Scheme.insertMany(newSchemes);
            console.log(`✅ Stored ${newSchemes.length} new NABARD schemes in MongoDB.`);
        } else {
            console.log("ℹ️ No new NABARD schemes found.");
        }

        await browser.close();

        if (res) {
            return res.json({ success: true, newSchemes });
        }
        return newSchemes; // For cron jobs

    } catch (error) {
        console.error("❌ Error fetching NABARD schemes:", error);
        if (res) {
            return res.status(500).json({ error: "Error fetching NABARD schemes" });
        }
    }
};

export const getGovtJansamarthSchemes = async (req, res) => {
  try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto("https://www.jansamarth.in/government-of-india-schemes", { waitUntil: "networkidle2" });

      await page.waitForSelector("div.mat-mdc-tab-labels");

      const schemeTypes = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('div[role="tab"] span.mdc-tab__text-label'))
              .map(el => el.innerText.trim());
      });

      console.log("✅ Extracted Scheme Types:", schemeTypes);

      let newSchemes = [];

      for (let i = 0; i < schemeTypes.length; i++) {
          const tabSelector = `div[role="tab"]:nth-child(${i + 1})`;
          await page.waitForSelector(tabSelector);
          await page.click(tabSelector);

          await page.waitForFunction(
              (i) => {
                  let activeTab = document.querySelector(`#mat-tab-content-0-${i}`);
                  return activeTab && activeTab.getAttribute("aria-hidden") === "false";
              },
              {},
              i
          );

          const schemes = await page.evaluate((i) => {
              const contentDivId = `mat-tab-content-0-${i}`;
              return Array.from(document.querySelectorAll(`#${contentDivId} .mat-mdc-card.mdc-card.schemes_listbox.ng-star-inserted`))
                  .map(card => {
                      let details = [];
                      const contentElement = card.querySelector('.mat-mdc-card-content');
                      if (contentElement) {
                          contentElement.childNodes.forEach(node => {
                              if (node.nodeName === 'P') {
                                  details.push({ type: 'p', content: node.innerText.trim() });
                              } else if (node.nodeName === 'UL') {
                                  let listItems = Array.from(node.querySelectorAll('li')).map(li => li.innerText.trim());
                                  details.push({ type: 'ul', content: listItems });
                              }
                          });
                      }

                      return {
                          schemeTitle: card.querySelector('.mat-mdc-card-title')?.innerText.trim() || null,
                          details: details
                      };
                  });
          }, i);

          for (const scheme of schemes) {
              if (!scheme.schemeTitle) {
                  console.warn("⚠️ Skipping scheme with missing title:", scheme);
                  continue;
              }

              const existingScheme = await Scheme.findOne({ name: scheme.schemeTitle });
              if (!existingScheme) {
                  newSchemes.push({
                      name: scheme.schemeTitle,
                      details: scheme.details,
                      source: "Jansamarth"
                  });
              }
          }
      }

      if (newSchemes.length > 0) {
          await Scheme.insertMany(newSchemes);
      }

      await browser.close();
      
      if (res) {
          return res.json({ success: true, newSchemes });
      }

  } catch (error) {
      console.error("❌ Error fetching Govt. Jansamarth schemes:", error);
      if (res) {
          return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
  }
};
