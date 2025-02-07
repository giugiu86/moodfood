import express from "express";
import bodyParser from "body-parser";
import fs from "fs"; //save data in a file
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";


const app = express();
const port = 3000

app.use(express.static("public")); //to define the path of the static files, i.e. style css and image file

app.use(bodyParser.urlencoded({ extended: true }));//mandatory if I want to use req.body

//if nothing happen the main index page is render
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//if the action submit has been activated the thankyou page is render
app.post("/submit", (req, res) => {
  const contact_name=req.body["contact_name"];
  const contact_email=req.body["contact_email"];
  const contact_text=req.body["contact_text"];
  //console.log(contact_name);
  res.render("thankyou.ejs",{contact_name_ejs:contact_name}); //contact_name_ejs variable used in ejs
  var form_data = {
    contact_email: contact_email,
    contact_name: contact_name,
    contact_text: contact_text
   }
  var today=new Date().toLocaleString();
  var contact_data=today+";"+contact_email+";"+contact_name+';'+contact_text+"\n"
  fs.appendFileSync('./contacts_messages.txt',contact_data); //save data in filex
});

//const root = createRoot(document.getElementById("section_how_works"));
//root.render(<div><h1>HELLO</h1><div>);

//ReactDOM.render(<div><h1>HELLO</h1></div>,document.getElementById("section_how_works");
//const domNode = ReactDOM.getElementById('section_how_works');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
