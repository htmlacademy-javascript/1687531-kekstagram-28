// 1 Функция сравнение строки

const checkLength = (string, number) => string.length <= number;
checkLength('fff',3);
// 2 задание

const checkPalindrome = (words) =>
  words.split('').reverse().join('').toLowerCase() === words.toLowerCase();
checkPalindrome('топот');
// 3 задание

const getNumbers = (string) => parseInt(string.replace(/[^\d]/g, ''), 10);
getNumbers('2023 год');

//  4 задание

const getMyPadStart = (string, minLength, pad) => {
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
getMyPadStart('q', 4, 'we');
