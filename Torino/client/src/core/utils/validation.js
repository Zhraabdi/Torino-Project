const isValidMobile = (val) => {
  let regex = new RegExp("^[0][9][0-9][0-9]{8,8}$").test(val);
  return regex;
};
const isValidIranCard = (card) =>
  /^\d{16}$/.test(card) &&
  [...card].reduce(
    (sum, d, i) =>
      sum +
      (((d * (2 - (i % 2) * 2)) % 10) +
        Math.floor((d * (2 - (i % 2) * 2)) / 10)),
    0
  ) %
    10 ===
    0;

const isValidIranIBAN = (iban) => {
  if (!/^IR[0-9]{24}$/i.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged
    .replace(/[A-Z]/g, (ch) => (ch.charCodeAt(0) - 55).toString())
    .replace(/IR/gi, "1823");

  let remainder = 0;
  for (let i = 0; i < digits.length; i++) {
    remainder = (remainder * 10 + parseInt(digits[i], 10)) % 97;
  }

  return remainder === 1;
};

const isValidAccount = (acc) =>
  /^\d{10,19}$/.test(acc) &&
  !/^0+$/.test(acc) &&
  (acc.length !== 10 ||
    (([...acc].slice(0, 9).reduce((s, d, i) => s + +d * (10 - i), 0) % 11) %
      11 <
    2
      ? [...acc].slice(0, 9).reduce((s, d, i) => s + +d * (10 - i), 0) % 11 ===
        +acc[9]
      : 11 -
          ([...acc].slice(0, 9).reduce((s, d, i) => s + +d * (10 - i), 0) %
            11) ===
        +acc[9]));

export { isValidMobile, isValidIranCard, isValidAccount, isValidIranIBAN };
