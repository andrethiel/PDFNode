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
  const page = await browser.newPage();
  await page.goto("http://localhost:3333/", {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    printBackground: true,
    format: "a4",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });
  await browser.close();
  res.contentType("application/pdf");
  return res.send(pdf);
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
      return res.send(data);
    }
  );
});

app.listen(3333);
