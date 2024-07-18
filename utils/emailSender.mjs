// Import necessary modules
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

// Function to send email using nodemailer
const sendTestsEmail = async (to, subject, text, attachments) => {
  console.log("Sending test email");
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      attachments,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to read JSON report, generate email body, and send email
const sendTestResultsEmail = async () => {
  console.log("Sending test result email");
  try {
    const reportPath = './playwright-report/test-results.json';
    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const jsonData = JSON.parse(reportContent); // Parse JSON content

    const htmlPath = './playwright-report/html-report/index.html'; // Path to your HTML report file

    const subject = 'Playwright Test Results';
    const text = generateEmailBody(jsonData);
    const recipients = 'tiago.caeiro@multivision.pt, ricardo.costa@multivision.pt, sameer.ibraimo@multivision.pt, leandro.maffei@multivision.pt';
    //

    // Read HTML content
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Save HTML content to a temporary file
    const tempHtmlPath = './playwright-report/temp-html-report.html';
    fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

    // Attachments array with JSON and temporary HTML file
    const attachments = [
      {
        filename: 'html-report.html',
        path: tempHtmlPath,
      },
    ];

    await sendTestsEmail(recipients, subject, text, attachments);

    // Clean up temporary HTML file after sending email
    fs.unlinkSync(tempHtmlPath);
  } catch (error) {
    console.error('Error reading or sending the test results:', error);
  }
};

function generateEmailBody(jsonData) {
  let emailBody = '';

  let totalTestsCount = 0; // Initialize total tests count

  // Counters
  let failedCount = 0;
  const failedTests = [];

  // Iterate over suites
  for (const suite of jsonData.suites) {
    // Iterate over suites in each suite
    for (const s of suite.suites) {
      // Iterate over specs in each suite
      for (const spec of s.specs) {
        // Increment total tests count
        totalTestsCount++;

        // Check if 'ok' is false
        if (spec.ok === false) {
          failedCount++;
          failedTests.push(spec.title);
        }
      }
    }
  }

  // Construct email body
  emailBody += `Total failed tests: ${failedCount} out of ${totalTestsCount}\n\n`;

  if (failedCount > 0) {
    emailBody += 'List of failed tests:\n';
    for (const title of failedTests) {
      emailBody += `- ${title}\n`;
    }
  }

  return emailBody;
}


// Call sendTestResultsEmail to initiate sending the email
sendTestResultsEmail();

// Export sendTestResultsEmail function if needed elsewhere
export { sendTestResultsEmail };
