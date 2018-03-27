const { interpret } = require('./interpreter');

if (process.argv.length !== 3) {
  throw new Error("usage: node --harmony conscience.js '<expression>'")
}

const input = process.argv[2];
console.log(interpret(input));
