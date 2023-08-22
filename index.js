import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public")); //to define the path of the style css file

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const randombandname=generate().spaced; //generate random name and adjective
  //console.log(randombandname);
  res.render("index.ejs",{randombandname_ejs:randombandname});
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
