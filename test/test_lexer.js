const assert = require('assert');
const { lex } = require('../src/lexer');

describe('lex', () => {
  it('should lex empty input', () => {
    assert.deepStrictEqual(lex(' '), []);
  });

  it('should lex number input', () => {
    assert.deepStrictEqual(lex('3'), [{ type: 'number', value: 3 }]);
  });

  it('should lex operator/number input', () => {
    assert.deepStrictEqual(lex('-5'), [
      { type: 'operator', value: '-' },
      { type: 'number', value: 5 },
    ]);
  });

  it('should lex number/operator/number input', () => {
    assert.deepStrictEqual(lex('3 * 7'), [
      { type: 'number', value: 3 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
    ]);
  });
});