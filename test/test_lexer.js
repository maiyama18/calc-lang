const assert = require('assert');
const { lex } = require('../src/lexer');

describe('lex', () => {
  it('should lex empty input', () => {
    assert.deepStrictEqual(lex(' '), [{ type: 'punctuation', value: 'EOL' }]);
  });

  it('should lex number', () => {
    assert.deepStrictEqual(lex('3'), [
      { type: 'number', value: 3 },
      { type: 'punctuation', value: 'EOL' },
    ]);
  });

  it('should lex operator/number', () => {
    assert.deepStrictEqual(lex('-5'), [
      { type: 'operator', value: '-' },
      { type: 'number', value: 5 },
      { type: 'punctuation', value: 'EOL' },
    ]);
  });

  it('should lex number/operator/number', () => {
    assert.deepStrictEqual(lex('3 * 7'), [
      { type: 'number', value: 3 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'punctuation', value: 'EOL' },
    ]);
  });

  it('should lex punctuation', () => {
    assert.deepStrictEqual(lex('(4 + 2) * 7'), [
      { type: 'punctuation', value: '(' },
      { type: 'number', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 2 },
      { type: 'punctuation', value: ')' },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'punctuation', value: 'EOL' },
    ]);
  });
});