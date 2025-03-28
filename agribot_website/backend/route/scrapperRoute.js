import express from "express";
const router = express.Router();
import {getNabardSchemes, getGovtJansamarthSchemes} from "../controllers/schemeController.js"

router.get("/scrape-nabard", getNabardSchemes);
router.get("/govt-schemes-jansamarth", getGovtJansamarthSchemes);
//router.get('/filter_data', filter_data)
// http:localhost:5000/api/scrap_route/scrapper_tool
export default router