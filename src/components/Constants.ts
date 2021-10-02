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

export type Scale = {
  name: string;
  interval: number[];
};

export const ScaleList: Scale[] = [
  { name: "Major", interval: [0, 2, 4, 5, 7, 9, 11] },
  { name: "Natural Minor", interval: [0, 2, 3, 5, 7, 8, 10] },
  { name: "Harmonic Minor", interval: [0, 2, 3, 5, 7, 8, 11] },
  { name: "Melodic Minor", interval: [0, 2, 3, 5, 7, 9, 11] },
  { name: "Ionian", interval: [0, 2, 4, 5, 7, 9, 11] },
  { name: "Aeolian", interval: [0, 2, 3, 5, 7, 8, 10] },
  { name: "Dorian", interval: [0, 2, 3, 5, 7, 9, 10] },
  { name: "Phrygian", interval: [0, 1, 3, 5, 7, 8, 10] },
  { name: "Lydian", interval: [0, 2, 4, 6, 7, 9, 11] },
  { name: "Mixolydian", interval: [0, 2, 4, 5, 7, 9, 10] },
  { name: "Locrian", interval: [0, 1, 3, 5, 6, 8, 10] },
  { name: "Major Pentatonic", interval: [0, 2, 4, 7, 9] },
  { name: "Minor Prntatonic", interval: [0, 3, 5, 7, 10] },
  { name: "Diminished", interval: [0, 2, 3, 5, 6, 8, 9, 11] },
  { name: "Combination of Diminished", interval: [0, 1, 3, 4, 6, 7, 9, 10] },
  { name: "Whole Tone", interval: [0, 2, 4, 6, 8, 10] },
];
