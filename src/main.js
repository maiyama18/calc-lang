const { lex } = require('./lexer');
const { parse } = require('./parser');
const { eval } = require('./evaluator');

const interpret = input => {
  console.log('input: ', input);
  console.log('=> ', eval(parse(lex(input))) );
}

interpret('2')
interpret('2 + 5')
interpret('2 + -5')
interpret('2 * -5')
interpret('2.5 + 5')
interpret('2 + 5 * 3')
interpret('3 * 2 + 5')
