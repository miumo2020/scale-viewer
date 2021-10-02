export type Chord = {
  name: string;
  interval: number[];
};

export const ChordList: Chord[] = [
  { name: "maj", interval: [0, 4, 7] },
  { name: "m", interval: [0, 3, 7] },
  { name: "(b5)", interval: [0, 4, 6] },
  { name: "dim", interval: [0, 3, 6] },
  { name: "aug", interval: [0, 4, 8] },
  { name: "sus4", interval: [0, 5, 7] },
  { name: "sus2", interval: [0, 2, 7] },
  { name: "6", interval: [0, 4, 7, 9] },
  { name: "m6", interval: [0, 3, 7, 9] },
  { name: "7", interval: [0, 4, 7, 10] },
  { name: "m7", interval: [0, 3, 7, 10] },
  { name: "M7", interval: [0, 4, 7, 11] },
  { name: "mM7", interval: [0, 3, 7, 11] },
  { name: "7(b5)", interval: [0, 4, 6, 10] },
  { name: "m7(b5)", interval: [0, 3, 6, 10] },
  { name: "M7(b5)", interval: [0, 4, 6, 11] },
  { name: "mM7(b5)", interval: [0, 3, 6, 11] },
  { name: "7sus4", interval: [0, 5, 7, 10] },
  { name: "dim7", interval: [0, 3, 6, 9] },
  { name: "add9", interval: [0, 2, 4, 7] },
  { name: "m(add9)", interval: [0, 2, 3, 7] },
  { name: "add4", interval: [0, 4, 5, 7] },
  { name: "aug7", interval: [0, 4, 8, 10] },
];
