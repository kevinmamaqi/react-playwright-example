import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("basic test", async ({ page }) => {
  await page.goto(process.env.VITE_APP_URL);
  const app = page.locator(".App");
  await expect(app).toHaveText("hi");
});
