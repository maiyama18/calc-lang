const operate = {
  '+': (a, b) => a + b,
  '-': (a, b) => b ? a - b : -a,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
};

const parseNode = node => {
  switch (node.type) {
    case 'number':
      return node.value;
    case 'operator':
      const { left, right, value } = node
      if (left) return operate[value](parseNode(left), parseNode(right));
      else return operate[value](parseNode(right));
  }
};

const eval= parseTree => {
  return parseNode(parseTree[0]);
};

module.exports = {
  eval,
}