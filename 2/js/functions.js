// 1 Функция сравнение строки

const checkLength = (string, number) => string.length <= number;

// 2 задание

const Palindrome = (words) =>
  words.split("").reverse().join("").toLowerCase() === words.toLowerCase();

// 3 задание

const numbers = (string) => parseInt(string.replace(/[^\d]/g, ""));

//  4 задание

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return (
    pad.slice(0, actualPad % pad.length) +
    pad.repeat(actualPad / pad.length) +
    string
  );
};
myPadStart("q", 4, "we");
