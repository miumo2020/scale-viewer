import { Accidental } from "./Constants";

const NumberToNoteSharp: { [name: number]: string } = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

const NumberToNoteFlat: { [name: number]: string } = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

export const convertNumberToNote = (
  num: number,
  accidental: Accidental
): string => {
  if (num >= 12 || 0 > num) {
    return "";
  }
  if (accidental === "#") {
    return NumberToNoteSharp[num];
  } else {
    return NumberToNoteFlat[num];
  }
};

const NoteToNumber: { [name: string]: number } = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

export const convertNoteToNumber = (note: string): number => {
  return NoteToNumber[note];
};
