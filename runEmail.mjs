// Import required modules
import { exec } from 'child_process';

// Function to execute Playwright tests
const runPlaywrightTests = async () => {

    // Execute Playwright tests
    await execCommand('npx playwright test tests/ui/specs/Map.spec.ts --project=chromium');
    console.log('Tests completed.');

};

// Function to execute email sender script
const runEmailSender = async () => {
  try {
    // Run email sender script
    await execCommand('node utils/emailSender.mjs');
    console.log('Email sent successfully.');
  } catch (emailError) {
    console.error('Failed to send email:', emailError.message);
  }
};

// Function to promisify exec
import util from 'util';
const execCommand = util.promisify(exec);

// Execute the functions sequentially
const executeTestsAndEmail = async () => {
  try {
    // Execute Playwright tests
    await runPlaywrightTests();
  } finally {
    // Run email sender script regardless of test outcome
    await runEmailSender();
  }
};

// Execute the tests and email sender function
executeTestsAndEmail();
