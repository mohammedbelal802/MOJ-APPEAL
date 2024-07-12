export const formatYear = (year: any): any => {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const westernDigits = "0123456789";
  const formattedYear = year.toString().replace(/\d/g, (digit: string) => {
    const westernIndex = westernDigits.indexOf(digit);
    return westernIndex !== -1 ? arabicDigits[westernIndex] : digit;
  });
  return formattedYear;
};

export const convertToEnglish = (numbers: any) => {
  const arabicToWestern: { [key: string]: string } = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  let westernNumber = "";
  for (let i = 0; i < numbers.length; i++) {
    const digit = numbers[i];
    westernNumber += arabicToWestern[digit] || digit;
  }

  return westernNumber;
};
