import { test, expect } from '@playwright/test';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Actor } from '../actors/Actor';
import { Access } from '../task/Access';

test('User can access', async ({ page }) => {
  const user = new Actor(new BrowseTheWeb(page));
  await user.attemptsTo(Access.to('https://demoqa.com/'));
  
  expect(await page.title()).toBe('DEMOQA');
});

test('User can see main header info', async ({ page }) => {
 
});

test('User can see main features', async ({ page }) => {

});