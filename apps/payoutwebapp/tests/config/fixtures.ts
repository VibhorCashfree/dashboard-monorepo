import dotenv from 'dotenv';
import { test as base } from '@playwright/test';
import { mixinFixtures as mixinCoverage } from '@bgotink/playwright-coverage';

dotenv.config({
  path: `${__dirname}/../../envs/.env.${process.env.APP_ENV}`,
});

export const test = mixinCoverage(base);

export const expect = test.expect;
