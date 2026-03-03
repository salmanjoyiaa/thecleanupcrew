import { test, expect } from '@playwright/test';

test.describe('Website Core User Flows', () => {

    test('Homepage renders basic elements correctly', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/The Clean Up Crew/);

        await expect(page.locator('h1')).toContainText("London's Luxury");
        await expect(page.locator('h1')).toContainText("Window Cleaning.");

        const quoteButton = page.locator('text=Get Instant Quote');
        await expect(quoteButton).toBeVisible();
    });

    test('Navigation menu links work correctly', async ({ page }) => {
        await page.goto('/');

        await page.click('text=Services');
        await expect(page).toHaveURL(/.*\/services/);
        await expect(page.locator('h1')).toContainText('Premium London Cleaning Services');

        await page.locator('header nav >> text=About').click();
        await expect(page).toHaveURL(/.*\/about/);
        await expect(page.locator('h1')).toContainText("London's Finest Window Cleaners");
    });

    test('Quote estimation form progresses correctly', async ({ page }) => {
        await page.goto('/quote');

        await expect(page.locator('text=What type of property?')).toBeVisible();
        await page.click('text=Residential Home');

        await expect(page.locator('text=Property Details')).toBeVisible();
        await page.click('text=Screen Cleaning');
        await page.click('button:has-text("Continue")');

        await expect(page.locator('text=Where to send the estimate?')).toBeVisible();
        await page.fill('input[type="text"]', 'Jane London');
        await page.fill('input[type="email"]', 'jane@example.com');
        await page.fill('input[type="tel"]', '5551234567');

        await page.click('button[type="submit"]');

        await expect(page.locator('text=Estimate Ready')).toBeVisible({ timeout: 5000 });
        await expect(page.locator('text=Estimated Total')).toBeVisible();
    });

});
