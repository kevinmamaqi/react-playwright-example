import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("the page loads", async ({ page }) => {
  await page.goto(process.env.VITE_APP_URL);
  const header = page.locator("#header");
  await expect(header).toHaveText("Query React Repos");
  const footer = page.locator("#footer");
  await expect(footer).toHaveText("© Kevin Mamaqi Kapllani");
});

test("can load more repositories on load more click", async ({ page }) => {
  await page.goto(process.env.VITE_APP_URL, { waitUntil: "networkidle" });
  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/graphql") && resp.status() === 200
    ),
    page.locator("#load-more").click(),
  ]);
  const elements = await page.$$("tbody > tr");
  expect(elements.length).toBe(20);
});

test("can search new data", async ({ page }) => {
  await page.goto(process.env.VITE_APP_URL, { waitUntil: "networkidle" });
  await page.fill("#search", "express");
  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/graphql") && resp.status() === 200
    ),
    page.locator("#search-button").click(),
  ]);
  const elements = await page.$$("tbody > tr");
  const textContents = await Promise.all(
    elements.map((el) => el.textContent())
  );
  expect(elements.length).toBe(10);
  expect(textContents.every((t) => t.includes("express")));
});

test("it shows no results when there aren't", async ({ page }) => {
  await page.goto(process.env.VITE_APP_URL, { waitUntil: "networkidle" });
  await page.fill(
    "#search",
    "dfsdjfgs;idf gjsd oifgsd fghsdfi ughsdif ughsdifg udsfig"
  );
  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/graphql") && resp.status() === 200
    ),
    page.locator("#search-button").click(),
  ]);
  const emptyQuery = page.locator("#empty-query");
  await expect(emptyQuery).toHaveText("Nothing to show for this query.");
});
