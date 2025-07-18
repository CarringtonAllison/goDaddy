import { test, expect } from '@playwright/test';

test.describe("RepoList Page", () => {

  test ("should display the correct elements", async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(page).toHaveTitle('GoDaddy Repos');

    const navbar = page.locator('.nav');
    await expect(navbar).toBeVisible();

    const repoList = page.locator('.repo-list');
    await expect(repoList).toBeVisible();

    const repoCards = repoList.locator('.repo-card');
    const count = await repoCards.count();
    expect(count).toBeGreaterThan(0);

    const firstCard = repoCards.first();
    await expect(firstCard).toHaveClass(/repo-card/);
    await expect(firstCard.locator('.repo-name')).toBeVisible();
    await expect(firstCard.locator('.repo-description')).toBeVisible();
    await expect(firstCard.locator('.repo-forks')).toBeVisible();     
    await expect(firstCard.locator('.repo-open-issues')).toBeVisible();
    await expect(firstCard.locator('.repo-watchers')).toBeVisible();
    await expect(firstCard.locator('.repo-languages')).toBeVisible();   
  });

});

test.describe("RepoDetails Page", () => {

  test("should navigate to RepoDetails page when a RepoCard is clicked and display correct repo info", async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    const repoList = page.locator('.repo-list');
    const repoCards = repoList.locator('.repo-card');
    const firstCard = repoCards.first();
  
    const name = await firstCard.locator('.repo-name').innerText();
    const description = await firstCard.locator('.repo-description').innerText();
    const languages = await firstCard.locator('.repo-languages').innerText();
    const watchers = await firstCard.locator('.repo-watchers').innerText();
    const forks = await firstCard.locator('.repo-forks').innerText();
    const openIssues = await firstCard.locator('.repo-open-issues').innerText();
  
    await firstCard.click();
  
    await expect(page).toHaveURL(/\/repodetails/);
    await expect(page.locator('.repo-name')).toHaveText("Title: " + name);
    await expect(page.locator('.repo-description')).toHaveText("Description: " + description);
    await expect(page.locator('.repo-languages')).toHaveText("Languages: " + languages);
    await expect(page.locator('.repo-watchers')).toHaveText("Watchers: " + watchers);
    await expect(page.locator('.repo-forks')).toHaveText("Forks: " + forks);
    await expect(page.locator('.repo-open-issues')).toHaveText("Open Issues: " + openIssues);
  });

  test("Back button should navigate back to RepoList page", async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const repoList = page.locator('.repo-list');
    const repoCards = repoList.locator('.repo-card');
    const firstCard = repoCards.first();

    await firstCard.click();
    
    await expect(page).toHaveURL(/\/repodetails/);

    await page.locator('.back-button').click();

    await expect(page).toHaveURL('http://localhost:5173/');
  });  
});