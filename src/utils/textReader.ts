import { readFileSync } from "fs";

type TextReader<T> = (day: number, fileName: string) => T;

export const textReader: TextReader<string> = (day, fileName) => {
  try {
    return readFileSync(
      `${__dirname}/../Day${day < 10 ? `0${day}` : day}/${fileName}.txt`,
      "utf-8"
    ).toString();
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const textReaderArr: TextReader<string[]> = (day, fileName) => {
  const text = textReader(day, fileName);
  return text ? text.split("\n") : [];
};

export const textReaderArrNumb: TextReader<number[]> = (day, fileName) =>
  textReaderArr(day, fileName).map((item) => parseInt(item));
