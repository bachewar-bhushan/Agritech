import express from 'express';
import path from "path";
const app = express();
const port = 9000;
const __dirname = path.resolve();
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});