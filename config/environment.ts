import dotenv from 'dotenv';

const testEnv = process.env.TEST_ENV || 'local';

dotenv.config({
  path: `env/${testEnv}.env`,
});

export const envConfig = {
  testEnv,

  baseURL: process.env.BASE_URL || '',

  users: {
    standard: process.env.STANDARD_USERNAME || '',
    locked: process.env.LOCKED_OUT_USERNAME || '',
    problem: process.env.PROBLEM_USERNAME || '',
  },

  password: process.env.SAUCE_PASSWORD || '',
};