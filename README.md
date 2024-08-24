# AuthenticateProject

# Project Setup and Testing Instructions

## Introduction

This repository contains a project with both end-to-end tests using Playwright and a performance test script using Apache JMeter. The following instructions will guide you through setting up the project on your local system, running the tests, and viewing the reports.

## 1. Clone the Repository

To begin, clone the repository to your local system with the following command:

```bash
git clone {url of the project}


After cloning, open the project using Visual Studio Code (VS Code) or your preferred code editor.

To execute all the Playwright tests in the project, open the terminal in VS Code and run:

npx playwright test

Once the tests have been executed, you can view a detailed report by running the following command:

npx playwright show-report

#Setting Up and Running JMeter Performance Test

a. Locate the JMeter Test File
Inside the performance-test folder of the project, there is a file named SearchingProductOnAmazon.jmx. This file contains the performance test script for JMeter.

b. Import the JMeter Test Script
To run the performance test, open Apache JMeter and import the SearchingProductOnAmazon.jmx file.

c. Configure Thread Group
In JMeter, locate the Thread Group element within the imported test plan. Set the number of threads (users) and the ramp-up time according to your testing needs.

d. Run the JMeter Test
After configuring the Thread Group, click the Run button in JMeter to start the performance test. Monitor the results in real-time or save them for further analysis.