export const formatYear = (year: any): any => {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const westernDigits = "0123456789";
  const formattedYear = year.toString().replace(/\d/g, (digit: string) => {
    const westernIndex = westernDigits.indexOf(digit);
    return westernIndex !== -1 ? arabicDigits[westernIndex] : digit;
  });
  return formattedYear;
};
