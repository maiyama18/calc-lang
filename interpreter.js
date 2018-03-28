const { lex } = require('./lexer');
const { parse } = require('./parser');
const { evaluate } = require('./evaluator');

const interpret = input => {
  return evaluate(parse(lex(input)));
};

module.exports = {
  interpret,
};
