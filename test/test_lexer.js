const assert = require('assert');
const { lex } = require('../lexer');

describe('lex', () => {
  it('should lex empty input', () => {
    assert.deepStrictEqual(
        lex(' '),
        [{ type: 'end' }]
    );
  });

  it('should lex integer', () => {
    assert.deepStrictEqual(
        lex('3'),
        [
          { type: 'number', value: 3 },
          { type: 'end' },
        ]);
  });

  it('should lex float', () => {
    assert.deepStrictEqual(
        lex('4.75'),
        [
          { type: 'number', value: 4.75 },
          { type: 'end' },
        ]);
  });

  it('should lex unary operator', () => {
    assert.deepStrictEqual(lex('-5'), [
      { type: 'operator', value: '-' },
      { type: 'number', value: 5 },
      { type: 'end' },
    ]);
  });

  it('should lex binary operator', () => {
    assert.deepStrictEqual(lex('3.3 * 7'), [
      { type: 'number', value: 3.3 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'end' },
    ]);
  });

  it('should lex equation with more than one operators', () => {
    assert.deepStrictEqual(lex('4 + 2 * 7 / 3'), [
      { type: 'number', value: 4 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 2 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'operator', value: '/' },
      { type: 'number', value: 3 },
      { type: 'end' },
    ]);
  });
});