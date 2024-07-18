// Import required modules
import { exec } from 'child_process';

// Function to execute Playwright tests
const runPlaywrightTests = async () => {
    // Execute Playwright tests and handle stdout and stderr streams
    const command = 'npx playwright test --project=chromium';
    return new Promise((resolve, reject) => {
        const process = exec(command);

        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        process.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
    });
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

// Function to promisify exec for other commands
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
