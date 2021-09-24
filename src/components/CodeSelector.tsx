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

export const CodeSelector = () => {
  const [root, setRoot] = useState<RootState>("C");
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setRoot(e.currentTarget.value as RootState);
  };

  const rootOptions = () => {
    const options = [];
    for (let r in Root) {
      options.push(
        <option value={r} key={r}>
          {r}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      <select onChange={(e) => handleChange(e)}>
        {rootOptions()}
      </select>
      <div>{root}</div>
    </>
  );
};
