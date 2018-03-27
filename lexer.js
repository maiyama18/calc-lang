const NUMBER_REGEX = "\\d+\\.?\\d*";
const OPERATOR_REGEX = "[+\\-*\\/%]";

const REGEX = `(${NUMBER_REGEX})|(${OPERATOR_REGEX})`;

const lex = input => {
  let tokens = [];
  let position = 0;

  let matched = input.slice(position).match(REGEX);
  while (matched) {
    if (matched[1]) {
      tokens.push({
        type: 'number',
        value: Number(matched[1]),
      });
    } else if (matched[2]) {
      tokens.push({
        type: 'operator',
        value: matched[2],
      });
    } else {
      throw new Error('invalid token!' + matched[0]);
    }

    position += matched.index + matched[0].length;
    matched = input.slice(position).match(REGEX);
  }

  tokens.push({
    type: 'end',
  });
  return tokens;
};

module.exports = {
  lex,
}