import React, { useState } from "react";

const Root = {
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
type RootState = typeof Root[keyof typeof Root];

const Chord: { [name: string]: string } = {
  maj: "0,4,7",
  m: "0,3,7",
  "(b5)": "0,4,6",
  dim: "0,3,6",
  aug: "0,4,8",
  sus4: "0,5,7",
  sus2: "0,2,7",
  "6": "0,4,7,9",
  m6: "0,3,7,9",
  "7": "0,4,7,10",
  m7: "0,3,7,10",
  M7: "0,4,7,11",
  mM7: "0,3,7,11",
  "7(b5)": "0,4,6,10",
  "m7(b5)": "0,3,6,10",
  "M7(b5)": "0,4,6,11",
  "mM7(b5)": "0,3,6,11",
  "7sus4": "0,5,7,10",
  dim7: "0,3,6,9",
  add9: "0,2,4,7",
  "m(add9)": "0,2,3,7",
  add4: "0,4,5,7",
  aug7: "0,4,8,10",
} as const;
type ChordState = typeof Chord[keyof typeof Chord];

export const ChordSelector = () => {
  const [root, setRoot] = useState<RootState>("C");
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setRoot(e.currentTarget.value as RootState);
  };
  const [chord, setChord] = useState<ChordState>();
  const handleChangeChord = (e: React.FormEvent<HTMLSelectElement>) => {
    setChord(e.currentTarget.value as ChordState);
  };

  const selectRoot = () => {
    const options = [];
    for (let r in Root) {
      options.push(
        <option value={r} key={r}>
          {r}
        </option>
      );
    }
    return (
      <>
        <select onChange={(e) => handleChange(e)}>{options}</select>
      </>
    );
  };

  const selectChord = () => {
    const options = [];
    for (let c in Chord) {
      options.push(
        <option value={c} key={c}>
          {c}
        </option>
      );
    }
    return (
      <>
        <select onChange={(e) => handleChangeChord(e)}>{options}</select>
      </>
    );
  };

  return (
    <>
      {selectRoot()}
      {selectChord()}
      <div>
        {root}
        {chord}
      </div>
    </>
  );
};
