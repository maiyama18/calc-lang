const RBP = {
  '-': 5,
};
const LBP = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
};

const parse = tokens => {
  const parseTree = [];
  let position = 0;

  const advance = () => position++;
  const getToken = () => tokens[position];

  const nudFunc = token => node => {
    switch (token.type) {
      case 'number':
        return node;
      case 'operator':
        switch (token.value) {
          case '-':
            return {
              type: 'operator',
              value: '-',
              right: expression(RBP['-']),
            };
        }
    }
    return null;
  };
  const ledFunc = token => node => {
    const operatorNode = op => ({
      type: 'operator',
      value: op,
      left: node,
      right: expression(RBP[op] || LBP[op])
    });
    switch (token.type) {
      case 'operator':
        switch (token.value) {
          case '+':
            return operatorNode('+');
          case '-':
            return operatorNode('-');
          case '*':
            return operatorNode('*');
          case '/':
            return operatorNode('/');
        }
    }
    return null;
  }

  const expression = rbp => {
    let left;
    let token = getToken();

    advance();
    left = nudFunc(token)(token);
    while (rbp < LBP[getToken().value]) {
      const nextToken = getToken();

      advance();
      left = ledFunc(nextToken)(left);
    }

    return left;
  };

  while (getToken().value !== 'EOL') {
    parseTree.push(expression(0));
  }

  return parseTree;
};

module.exports = {
  parse,
}