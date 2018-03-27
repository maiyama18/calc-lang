const operate = {
  '+': (a, b) => a + b,
  '-': (a, b) => b ? a - b : -a,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
};

const evaluate = node => {
  switch (node.type) {
    case 'number':
      return node.value;
    case 'operator':
      const { left, right, value } = node;

      if (left) return operate[value](evaluate(left), evaluate(right));
      else return operate[value](evaluate(right));
  }
};

module.exports = {
  evaluate,
}