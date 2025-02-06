import express, { Express, Request, Response } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

// Configure view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure assets routes (static folder)
app.use(express.static(path.join(__dirname, "public")));

// Favicon static route
app.use("/favicon.ico", express.static(path.join(__dirname, "public", "images", "logo.png")));

app.get("/", (req: Request, res: Response) => {
  // res.send("SkillSwap is launched !");
  res.render("pages/home");
});

app.get("/about", (req: Request, res: Response) => {
  res.render("pages/about");
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("pages/contact");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
