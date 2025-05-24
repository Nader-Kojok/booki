import { test, expect } from "@playwright/test";

test.describe("Payment Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the booking page
    await page.goto("/booking");
  });

  test("should complete payment with Orange Money", async ({ page }) => {
    // Fill in booking details
    await page.fill('[data-testid="date-input"]', "2024-06-01");
    await page.click('[data-testid="time-slot"]');
    await page.click('[data-testid="continue-button"]');

    // Select Orange Money as payment method
    await page.click('[value="orange_money"]');
    await page.fill('[name="phoneNumber"]', "777123456");
    await page.click('[type="submit"]');

    // Verify payment processing
    await expect(page.locator("text=Processing...")).toBeVisible();
    await expect(page.locator("text=Payment successful")).toBeVisible();

    // Verify redirect to confirmation page
    await expect(page).toHaveURL(/.*\/booking\/confirmation/);
    await expect(page.locator("text=Booking Confirmed!")).toBeVisible();
  });

  test("should complete payment with Wave", async ({ page }) => {
    // Fill in booking details
    await page.fill('[data-testid="date-input"]', "2024-06-01");
    await page.click('[data-testid="time-slot"]');
    await page.click('[data-testid="continue-button"]');

    // Select Wave as payment method
    await page.click('[value="wave"]');
    await page.fill('[name="phoneNumber"]', "777123456");
    await page.click('[type="submit"]');

    // Verify payment processing
    await expect(page.locator("text=Processing...")).toBeVisible();
    await expect(page.locator("text=Payment successful")).toBeVisible();

    // Verify redirect to confirmation page
    await expect(page).toHaveURL(/.*\/booking\/confirmation/);
    await expect(page.locator("text=Booking Confirmed!")).toBeVisible();
  });

  test("should complete payment with card", async ({ page }) => {
    // Fill in booking details
    await page.fill('[data-testid="date-input"]', "2024-06-01");
    await page.click('[data-testid="time-slot"]');
    await page.click('[data-testid="continue-button"]');

    // Select card as payment method
    await page.click('[value="card"]');
    await page.fill('[name="cardNumber"]', "4242424242424242");
    await page.fill('[name="cardExpiry"]', "12/25");
    await page.fill('[name="cardCVC"]', "123");
    await page.click('[type="submit"]');

    // Verify payment processing
    await expect(page.locator("text=Processing...")).toBeVisible();
    await expect(page.locator("text=Payment successful")).toBeVisible();

    // Verify redirect to confirmation page
    await expect(page).toHaveURL(/.*\/booking\/confirmation/);
    await expect(page.locator("text=Booking Confirmed!")).toBeVisible();
  });

  test("should show validation errors for invalid card details", async ({ page }) => {
    // Fill in booking details
    await page.fill('[data-testid="date-input"]', "2024-06-01");
    await page.click('[data-testid="time-slot"]');
    await page.click('[data-testid="continue-button"]');

    // Select card as payment method
    await page.click('[value="card"]');
    await page.fill('[name="cardNumber"]', "1234");
    await page.fill('[name="cardExpiry"]', "13/25");
    await page.fill('[name="cardCVC"]', "12");
    await page.click('[type="submit"]');

    // Verify validation errors
    await expect(page.locator("text=Invalid card number")).toBeVisible();
    await expect(page.locator("text=Invalid expiry date")).toBeVisible();
    await expect(page.locator("text=Invalid CVC")).toBeVisible();
  });

  test("should show validation errors for missing phone number", async ({ page }) => {
    // Fill in booking details
    await page.fill('[data-testid="date-input"]', "2024-06-01");
    await page.click('[data-testid="time-slot"]');
    await page.click('[data-testid="continue-button"]');

    // Select Orange Money as payment method
    await page.click('[value="orange_money"]');
    await page.click('[type="submit"]');

    // Verify validation error
    await expect(page.locator("text=Phone number is required")).toBeVisible();
  });
}); 