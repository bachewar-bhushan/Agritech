import express from 'express';
import path from "path";
import cors from 'cors'; 
import scrapperRoute from './route/scrapperRoute.js'
import cron from "node-cron";
import { getNabardSchemes, getGovtJansamarthSchemes } from "./controllers/scrapper.js";
const app = express();
const port = 9000;
const __dirname = path.resolve();


app.use(cors());
// app.use(express.urlencoded({extended : false}));
// app.use(express.static(path.join(__dirname, "dist")));
app.use('/api/scrapper_route',scrapperRoute)
// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
cron.schedule("0 0 * * *", async () => { // Runs every day at midnight
  console.log("Running daily scraper...");
  await getNabardSchemes();
  await getGovtJansamarthSchemes();
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});