import React, { useState } from "react";
import { Root, RootState, Chord, ChordList } from "./Constants";

export const ChordSelector = () => {
  const [root, setRoot] = useState<RootState>("C");
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setRoot(e.currentTarget.value as RootState);
  };
  const [chord, setChord] = useState<Chord>(ChordList[0]);
  const handleChangeChord = (e: React.FormEvent<HTMLSelectElement>) => {
    let selected = ChordList.find(
      (chord) => e.currentTarget.value === chord.name
    );
    if (selected !== undefined) setChord(selected);
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
    return (
      <>
        <select onChange={(e) => handleChangeChord(e)}>
          {ChordList.map((chord) => (
            <option value={chord.name} key={chord.name}>
              {chord.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  return (
    <>
      {selectRoot()}
      {selectChord()}
      <div>
        {root}
        {chord.name}
      </div>
    </>
  );
};
