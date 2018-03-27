const RBP = {
  '-': 3,
};
const LBP = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
};

const parse = tokens => {
  let position = 0;

  const consume = () => tokens[position++];
  const peek = () => tokens[position];

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
  };

  const expression = rbp => {
    let left;
    let token = consume();

    left = nudFunc(token)(token);
    while (rbp < LBP[peek().value]) {
      token = consume();

      left = ledFunc(token)(left);
    }

    return left;
  };

  if (peek().type !== 'end') return expression(0);
  else return {};
};

module.exports = {
  parse,
}