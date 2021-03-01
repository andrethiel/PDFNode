const express = require("express");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");

const app = express();
const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];

app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  return res.send("ok");
});

app.get("/", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "print.ejs"),
    {
      passengers,
    },
    (err, data) => {
      if (err) {
        return res.send(err);
      }

      const options = {
        heigth: "11.25in",
        width: "8.5in",
        header: {
          heigth: "20mm",
        },
        footer: {
          heigth: "20mm",
        },
      };

      pdf.create(data, options).toFile("report.pdf", (err, data) => {
        if (err) {
          return res.send(err);
        }
        return res.send("data");
      });
    }
  );
});

app.listen(3333);
