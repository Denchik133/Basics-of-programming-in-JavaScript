function parseNumber(value) {
  const number = Number(value);
  if (Number.isNaN(number)) {
    throw new Error("Please enter a valid number");
  }
  return number;
}

// GENERAL MEMOIZE

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// FIBONACCI (WITHOUT MEMO)

function fibonacciSlow(n) {
  if (n < 0) {
    throw new Error("n must be >= 0");
  }
  if (n <= 1) {
    return n;
  }
  return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
}

// FIBONACCI (WITH MEMO)

const fibonacciFast = memoize(function fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
});

function runFibonacci() {
  try {
    const n = parseNumber(fibInput.value);
    const startSlow = performance.now();
    const slowResult = fibonacciSlow(n);
    const endSlow = performance.now();
    const startFast = performance.now();
    const fastResult = fibonacciFast(n);
    const endFast = performance.now();
    fibResult.textContent = "Result: " + fastResult + " | Slow time: " + (endSlow - startSlow).toFixed(3) + " ms" + " | Memoized time: " + (endFast - startFast).toFixed(3) + " ms";

  }
  catch (e) {
    fibResult.textContent = e.message;
  }
}

// FACTORIAL (RECURSIVE)

function factorial(n) {
  if (n < 0) {
    throw new Error("n must be >= 0");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function runFactorial() {
  try {
    const n = parseNumber(factInput.value);
    factResult.textContent = factorial(n);
  } catch (e) {
    factResult.textContent = e.message;
  }
}

// PRIME CHECK

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function runPrime() {
  try {
    const n = parseNumber(primeInput.value);
    primeResult.textContent = isPrime(n);
  }
  catch (e) {
    primeResult.textContent = e.message;
  }
}

// RANGE

function range(start, end, step = 1) {
  if (step === 0) {
    throw new Error("Step cannot be 0");
  }
  const result = [];
  if (start <= end) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  }
  else {
    for (let i = start; i >= end; i -= step) {
      result.push(i);
    }
  }

  return result;
}

function runRange() {
  try {
    const start = parseNumber(rangeStart.value);
    const end = parseNumber(rangeEnd.value);
    const step = rangeStep.value ? parseNumber(rangeStep.value) : 1;
    rangeResult.textContent = range(start, end, step).join(", ");
  }
  catch (e) {
    rangeResult.textContent = e.message;
  }
}

// CLAMP

function clamp(value, min, max) {
  if (min > max) {
    throw new Error("min cannot be greater than max");
  }
  return Math.min(Math.max(value, min), max);
}

function runClamp() {
  try {
    const value = parseNumber(clampValue.value);
    const min = parseNumber(clampMin.value);
    const max = parseNumber(clampMax.value);
    clampResult.textContent = clamp(value, min, max);
  }
  catch (e) {
    clampResult.textContent = e.message;
  }
}