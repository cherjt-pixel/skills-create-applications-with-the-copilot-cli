const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const test = require("node:test");
const path = require("node:path");

const { calculate } = require("../calculator");

const calculatorPath = path.resolve(__dirname, "..", "calculator.js");

test("calculates the addition example from the image", () => {
  assert.equal(calculate(2, "+", 3), 5);
});

test("calculates the subtraction example from the image", () => {
  assert.equal(calculate(10, "-", 4), 6);
});

test("calculates the multiplication example from the image", () => {
  assert.equal(calculate(45, "*", 2), 90);
});

test("calculates the division example from the image", () => {
  assert.equal(calculate(20, "/", 5), 4);
});

test("handles decimal values for every operation", () => {
  assert.equal(calculate(1.5, "+", 2.25), 3.75);
  assert.equal(calculate(5.5, "-", 2.25), 3.25);
  assert.equal(calculate(1.5, "*", 2.5), 3.75);
  assert.equal(calculate(7.5, "/", 2.5), 3);
});

test("handles negative values", () => {
  assert.equal(calculate(-2, "+", 3), 1);
  assert.equal(calculate(-2, "-", 3), -5);
  assert.equal(calculate(-2, "*", 3), -6);
  assert.equal(calculate(-6, "/", 3), -2);
});

test("handles zero in supported operations", () => {
  assert.equal(calculate(0, "+", 5), 5);
  assert.equal(calculate(5, "-", 0), 5);
  assert.equal(calculate(0, "*", 5), 0);
  assert.equal(calculate(0, "/", 5), 0);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate(20, "/", 0), {
    message: "Cannot divide by zero.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "%", 3), {
    message: "Operation must be one of: +, -, *, /.",
  });
});

test("rejects non-finite input values", () => {
  assert.throws(() => calculate(Number.NaN, "+", 3), {
    message: "Both values must be finite numbers.",
  });
  assert.throws(() => calculate(Infinity, "*", 3), {
    message: "Both values must be finite numbers.",
  });
});

test("runs the CLI and prints the calculated result", () => {
  const output = execFileSync(process.execPath, [
    calculatorPath,
    "45",
    "*",
    "2",
  ], { encoding: "utf8" });

  assert.equal(output.trim(), "90");
});

test("returns a non-zero CLI status for division by zero", () => {
  assert.throws(
    () => execFileSync(process.execPath, [calculatorPath, "20", "/", "0"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
    (error) => error.status === 1 && error.stderr.includes("Cannot divide by zero.")
  );
});
