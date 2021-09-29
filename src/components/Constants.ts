export const Root = {
  C: "C",
  Db: "Db",
  D: "D",
  Eb: "Eb",
  E: "E",
  F: "F",
  Gb: "Gb",
  G: "G",
  Ab: "Ab",
  A: "A",
  Bb: "Bb",
  B: "B",
} as const;
export type RootState = typeof Root[keyof typeof Root];

export type Chord = {
  name: string;
  chord: number[];
};

export const ChordList: Chord[] = [
  { name: "maj", chord: [0, 4, 7] },
  { name: "m", chord: [0, 3, 7] },
  { name: "(b5)", chord: [0, 4, 6] },
  { name: "dim", chord: [0, 3, 6] },
  { name: "aug", chord: [0, 4, 8] },
  { name: "sus4", chord: [0, 5, 7] },
  { name: "sus2", chord: [0, 2, 7] },
  { name: "6", chord: [0, 4, 7, 9] },
  { name: "m6", chord: [0, 3, 7, 9] },
  { name: "7", chord: [0, 4, 7, 10] },
  { name: "m7", chord: [0, 3, 7, 10] },
  { name: "M7", chord: [0, 4, 7, 11] },
  { name: "mM7", chord: [0, 3, 7, 11] },
  { name: "7(b5)", chord: [0, 4, 6, 10] },
  { name: "m7(b5)", chord: [0, 3, 6, 10] },
  { name: "M7(b5)", chord: [0, 4, 6, 11] },
  { name: "mM7(b5)", chord: [0, 3, 6, 11] },
  { name: "7sus4", chord: [0, 5, 7, 10] },
  { name: "dim7", chord: [0, 3, 6, 9] },
  { name: "add9", chord: [0, 2, 4, 7] },
  { name: "m(add9)", chord: [0, 2, 3, 7] },
  { name: "add4", chord: [0, 4, 5, 7] },
  { name: "aug7", chord: [0, 4, 8, 10] },
];
