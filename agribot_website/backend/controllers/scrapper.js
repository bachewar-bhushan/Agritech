import puppeteer from "puppeteer";

export const scrapper_tool = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Scrape the first website: Fertilizer Subsidy
        await page.goto("https://www.fert.nic.in/fertilizer-subsidy", { waitUntil: "networkidle2" });

        const fertiliserSubsidyContent = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("p, h2, h3, h4, li"))
                .map((el) => el.innerText.trim())
                .filter((text) =>
                    text.length > 10 && 
                    ![
                        "Main navigation",
                        "Organogram Chart",
                        "Telephone Directory",
                        "Cash Section",
                        "Integrated Finance Division(IFD)",
                        "Establishment",
                        "General Administration",
                        "Urea Pricing Policy Division",
                        "Phosphatic and Potassic (P&K) Policy",
                        "Fertilizer Movement",
                        "Public Sector Undertaking (PSU)",
                        "Fertilizer projects",
                        "Information Technology",
                        "Official Language",
                        "Chief Controller of Accounts (CCA)",
                        "Planning, Monitoring & Innovation",
                        "Fertilizer Industry Coordination Committee Attached Office",
                        "Organic/Bio-fertilizers",
                        "Direct Benefit Transfer (DBT)",
                        "Coordination",
                        "International Cooperation",
                        "Fertilizer Projects",
                        "Hindustan Urvarak & Rasayan LTD. (HURL)",
                        "Ramagundam Fertilizers and Chemicals Limited. (RFCL)",
                        "Talcher Fertilizer LTD. (TFL)",
                        "Fertilizer Movement",
                        "Fertilizer Policy",
                        "Phosphatic and Potassic (P&K) Policy",
                        "Policy on Promotion of Organic Fertilizers",
                        "Urea Policy",
                        "Publication / Reports",
                        "Annual Report",
                        "Demand for Grants",
                        "Fertilizers Scenario",
                        "Misc. Report",
                        "(4.00 MB) Neem Coated Urea",
                        "Notifications",
                        "Phosphatic and Potassic (P&K) Section",
                        "Urea Pricing Policy Notifications",
                        "(1.96 MB) TEC Guideline",
                        "DBT Section",
                        "ICC PoSH Act",
                        "Nodal Officer for PoSH",
                        "Composition of ICC",
                        "Act/Guidelines/Handbook",
                        "Complaint Procedure",
                        "Parliament Questions",
                        "RAJYA SABHA",
                        "Recruitments",
                        "Recruitments in Department of Fertilizers",
                        "Fertilizer Movement to Dealers-mFMS",
                        "Fertilizer Monitoring System (FMS)",
                        "भारत सरकार\nGOVERNMENT OF INDIA",
                        "रसायन एवं उर्वरक मंत्रालय\nMINISTRY OF CHEMICALS & FERTILIZERS",
                        "CONTACT US",
                        "FAQ",
                        "A- A A+",
                        "Language",
                        "Home",
                        "Wings/Divisions",
                        "Fertilizer Subsidy",
                        // Add other unwanted strings here
                    ].includes(text)
                );
        });

        // Scrape the second website: PIB Release
        await page.goto("https://pib.gov.in/newsite/PrintRelease.aspx?relid=200523", { waitUntil: "networkidle2" });

        const pibReleaseContent = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("p, h1, h2, h3, h4, li"))
                .map((el) => el.innerText.trim())
                .filter((text) =>
                    text.length > 10 &&
                    ![
                        
                        "PIB Home",
                        "Press Information Bureau",
                        "Press Release",
                        "Press Release Information",
                        "Related Links",
                        "Advertisement",
                        "Other PIB Releases"
                    ].includes(text)
                );
        });

        // ✅ Check if table exists on the Fertilizer Subsidy page before scraping
        let fertiliserSubsidyTableData = [];
        const tableExists = await page.$("table");
        if (tableExists) {
            fertiliserSubsidyTableData = await page.evaluate(() => {
                const rows = [];
                document.querySelectorAll("table tr").forEach((row) => {
                    const rowData = [];
                    row.querySelectorAll("td, th").forEach((cell) => {
                        rowData.push(cell.innerText.trim());
                    });
                    rows.push(rowData);
                });
                return rows;
            });
        }

        // Close the browser
        await browser.close();

        // Send the combined data as JSON response
        res.json({
            fertiliserSubsidyContent,
            pibReleaseContent,
            fertiliserSubsidyTableData,
        });
    } catch (error) {
        console.error("Scraping Error:", error.message);
        res.status(500).json({ error: "Failed to scrape data", details: error.message });
    }
};


// export const filter_data = (req,res) =>{


// }