import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('*/images',express.static('public/images'));
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

  app.post("/", async (req, res) => {
    var answer = req.body.type;
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${answer}?format=txt&amount=1`)
      const result = response.data;
      res.render("index.ejs",{ data:result });
       
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("solution.ejs", {
        error: "No activities that match your criteria.",
      });
    }
  });








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
