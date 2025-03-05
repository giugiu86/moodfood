import express from "express";
import bodyParser from "body-parser";
import fs from "fs"; //save data in a file
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import domino from "domino";
var Element = domino.impl.Element; // etc
var document = domino.createDocument('http://localhost', true)

const path_img= "images/";  // to change in the cloud server 'public/images/'
const path_css= "css/";  // to change in the cloud server 'public/css/'
const app = express();
const port = 3000

app.use(express.static("public")); //to define the path of the static files, i.e. style css and image file

app.use(bodyParser.urlencoded({ extended: true }));//mandatory if I want to use req.body

console.log(path_css);
console.log(path_img);

//if nothing happen the main index page is render
app.get("/", (req, res) => {
  res.render("index.ejs", { path_img:path_img, path_css:path_css });
});

//if the action submit has been activated the thankyou page is render
app.post("/submit", (req, res) => {
  const contact_name=req.body["contact_name"];
  const contact_email=req.body["contact_email"];
  const contact_text=req.body["contact_text"];
  const contact_bot=req.body["NONACCEDIBOT"];
  //console.log(contact_name);
  res.render("thankyou.ejs",{contact_name_ejs:contact_name, path_img:path_img, path_css:path_css}); //contact_name_ejs variable used in ejs

  var form_data = {
    contact_email: contact_email,
    contact_name: contact_name,
    contact_text: contact_text,
    contact_bot: contact_bot
   }
   if (contact_bot  === "")
   {
     var today=new Date().toLocaleString();
     var contact_data=today+";"+contact_email+";"+contact_name+';'+contact_text+"\n"
     fs.appendFileSync('./contacts_messages.txt',contact_data); //save data in filex
   }
});

app.get('/privacypolicy', (req, res) => {
    res.render('privacypolicy.ejs',{ path_img:path_img, path_css:path_css });
});

//const root = createRoot(document.getElementById("section_how_works"));
//root.render(<div><h1>HELLO</h1><div>);

//ReactDOM.render(<div><h1>HELLO</h1></div>,document.getElementById("section_how_works");
//const domNode = ReactDOM.getElementById('section_how_works');


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
