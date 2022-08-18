import { render, screen } from "@testing-library/react";
import App from "./App";
import puppeteer from "puppeteer";

test("renders learn react link", () => {
  // render(<App />);
});

// test('Testing with test', () => {

//   expect(1).toBe(1);
// });

// jest.setTimeout(100000);
// test("E2E test start",async()=>{
//   const browser = await puppeteer.launch({
//     headless: false,
//     devtools: true,
//     slowMo: 80,
//   });
//   const newPage = await browser.newPage();
//   await newPage.goto("http://localhost:3000/auth");
//   await newPage.click("input#username");
//   await newPage.type("input#username", "sohagmahin");
//   await newPage.click("input#password");
//   await newPage.type("input#password","sohagmahin@");
//   await newPage.click("button#submit");

//   await browser.close();

// })
