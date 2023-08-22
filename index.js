import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("moodfood/public")); //to define the path of the style css file

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const contact_name=req.body["contact_name"];
  //console.log(randombandname);
  res.render("thankyou.ejs",{contact_name_ejs:contact_name});
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
