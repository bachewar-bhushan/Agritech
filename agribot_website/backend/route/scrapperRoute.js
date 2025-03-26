import express from "express";
const router = express.Router();
import {scrapper_tool} from "../controllers/scrapper.js"

router.get('/scrapper-tool', scrapper_tool)
//router.get('/filter_data', filter_data)
// http:localhost:5000/api/scrap_route/scrapper_tool
export default router