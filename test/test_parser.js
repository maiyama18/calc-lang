const assert = require('assert');
const { parse } = require('../src/parser');

describe('parse', () => {
  it('should parse empty input', () => {
    const tokens = [
      { type: 'punctuation', value: 'EOL' },
    ];
    assert.deepStrictEqual(parse(tokens), []);
  });

  it('should parse number', () => {
    const tokens = [
      { type: 'number', value: 3 },
      { type: 'punctuation', value: 'EOL' },
    ];
    assert.deepStrictEqual(parse(tokens), [{ type: 'number', value: 3 }]);
  });

  it('should parse operator/number', () => {
    const tokens = [
      { type: 'operator', value: '-' },
      { type: 'number', value: 5 },
      { type: 'punctuation', value: 'EOL' },
    ];
    assert.deepStrictEqual(parse(tokens), [{
      type: 'operator',
      value: '-',
      right: { type: 'number', value: 5 }
    }]);
  });

  it('should parse number/operator/number', () => {
    const tokens = [
      { type: 'number', value: 3 },
      { type: 'operator', value: '*' },
      { type: 'number', value: 7 },
      { type: 'punctuation', value: 'EOL' },
    ];
    assert.deepStrictEqual(parse(tokens), [{
      type: 'operator',
      value: '*',
      left: { type: 'number', value: 3 },
      right: { type: 'number', value: 7 },
    }]);
  });
});