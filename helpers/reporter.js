const chalk = require('chalk');
const path = require('path');

// https://github.com/facebook/jest/blob/master/types/TestRunner.js
module.exports = class MyReporter {
  
  onRunComplete(contexts, results) {
    console.log('\r                                                   ');

    results.testResults.forEach(specResult => {
      if (specResult.skipped) return;
      if (specResult.numFailingTests === 0) return;

      const fileName = path.relative(path.resolve(__dirname, '..'), specResult.testFilePath);
      console.log(chalk.reset.inverse.bold.red(' FAIL ') +chalk.dim(' ./')+ chalk.bold(fileName));
      
      let firstPrinted = false;
      specResult.testResults.forEach(testResult => {
        if (testResult.status !== 'failed') return;
        if (!firstPrinted || haveHints(testResult)) {
          firstPrinted = true;
        }

        testResult.failureMessages.forEach(failureMessage => {
          if (!failureMessage.includes("hint")) return;

          console.log(indent(removeNodeModules(failureMessage), '    '));
        });
      });
    });

    console.log(getFormattedTotals());

    function haveHints(testResult) {
      return testResult.failureMessages && testResult.failureMessages.some(fM => fM.includes("hint"));
    }

    function indent(string, indentation) {
      return indentation + string.split('\n').join('\n' + indentation);
    }

    function removeNodeModules(string) {
      return string.split('\n').filter(s => !s.includes('node_modules')).join('\n');
    }

    function getFormattedTitle(testResults) {
      return chalk.bold.red('  ● ' + [ ...testResults.ancestorTitles, testResults.title].join(' > '));
    }

    function getFormattedTotals() {
      let output = '';

      output += '\n' + chalk.bold('Test Suites: ');
      if (results.numFailedTestSuites) output += chalk.bold.red(`${results.numFailedTestSuites} failed, `);
      if (results.numPassedTestSuites) output += chalk.bold.green(`${results.numPassedTestSuites} passed, `);
      if (results.numPendingTestSuites) output += chalk.bold.yellow(`${results.numPendingTestSuites} pending, `);
      output += `${results.numTotalTestSuites} total`;

      output += '\n' + chalk.bold('Test       : ');
      if (results.numFailedTests) output += chalk.bold.red(`${results.numFailedTests} failed, `);
      if (results.numPassedTests) output += chalk.bold.green(`${results.numPassedTests} passed, `);
      if (results.numPendingTests) output += chalk.bold.yellow(`${results.numPendingTests} pending, `);
      output += `${results.numTotalTests} total`;

      const elapsedTime = (Date.now() - results.startTime) / 1000;
      const formattedElapsedTime = elapsedTime < 1 ? elapsedTime.toFixed(3) : elapsedTime < 10 ? elapsedTime.toFixed(1): elapsedTime.toFixed(0);
      output += '\n' + chalk.bold('Time       : ') + `${formattedElapsedTime}s`;
      return output;
    }
  }
}
