const assert = require('assert');
const { parse } = require('../parser');

describe('parse', () => {
  it('should parse empty input', () => {
    const tokens = [
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), {});
  });

  it('should parse number', () => {
    const tokens = [
      { type: 'number', value: 3 },
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), { type: 'number', value: 3 });
  });

  it('should parse unary operator', () => {
    const tokens = [
      { type: 'operator', value: '-' },
      { type: 'number', value: 5 },
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), {
      type: 'operator',
      value: '-',
      right: { type: 'number', value: 5 }
    });
  });

  it('should parse binary operator', () => {
    const tokens = [
      { type: 'number', value: 3 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), {
      type: 'operator',
      value: '*',
      left: { type: 'number', value: 3 },
      right: { type: 'number', value: 7 },
    });
  });

  it('should parse considering binding power', () => {
    const tokens = [
      { type: 'number', value: 1 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 2 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 3 },
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), {
      type: 'operator',
      value: '+',
      left: {
        type: 'operator',
        value: '*',
        left: { type: 'number', value: 1 },
        right: { type: 'number', value: 2 },
      },
      right: { type: 'number', value: 3 },
    });
  });

  it('should parse considering binding power 2', () => {
    const tokens = [
      { type: 'number', value: 1 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 2 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 3 },
      { type: 'end' },
    ];
    assert.deepStrictEqual(parse(tokens), {
      type: 'operator',
      value: '+',
      left: { type: 'number', value: 1 },
      right: {
        type: 'operator',
        value: '*',
        left: { type: 'number', value: 2 },
        right: { type: 'number', value: 3 },
      },
    });
  });
});