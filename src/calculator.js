#!/usr/bin/env node

const OPERATORS = new Set(["+", "-", "*", "/"]);

/**
 * Perform one of the four supported basic arithmetic operations:
 * addition (+), subtraction (-), multiplication (*), or division (/).
 */
function calculate(firstValue, operator, secondValue) {
  if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue)) {
    throw new Error("Both values must be finite numbers.");
  }

  if (!OPERATORS.has(operator)) {
    throw new Error("Operation must be one of: +, -, *, /.");
  }

  if (operator === "/" && secondValue === 0) {
    throw new Error("Cannot divide by zero.");
  }

  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "/":
      return firstValue / secondValue;
    default:
      throw new Error("Unsupported operation.");
  }
}

function printUsage() {
  console.error("Usage: node src/calculator.js <number> <operator> <number>");
  console.error("Operators: + (addition), - (subtraction), * (multiplication), / (division)");
}

function runCli(argumentsList) {
  if (argumentsList.length !== 3) {
    printUsage();
    return 1;
  }

  const [firstInput, operator, secondInput] = argumentsList;
  const firstValue = Number(firstInput);
  const secondValue = Number(secondInput);

  try {
    console.log(calculate(firstValue, operator, secondValue));
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = runCli(process.argv.slice(2));
}

module.exports = { calculate, runCli };
