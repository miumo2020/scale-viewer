import React, { useState } from "react";

type Root = "C" | "Db" | "D" | "Eb" | "E" | "F" | "Gb" | "G";

type RootState = {
  root: Root;
};

export const CodeSelector = () => {
  const [root, setRoot] = useState<RootState>({ root: "C" });
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    let a = e.currentTarget.value as Root;
    setRoot({ root: e.currentTarget.value as Root });
    console.log(typeof a, a);
    // console.log(typeof root.root);
  };

  // const C: Root = "C";
  // const Db: Root = "Db";
  const D: Root = "D";
  const Eb: Root = "Eb";

  // let a: Root = "C#";
  // console.log(a);

  let data = [
    { value: "C", label: "C" },
    { value: "C#", label: "C#" },
    { value: D, label: "D" },
    { value: Eb, label: "D#" },
  ];

  return (
    <>
      <select onChange={(e) => handleChange(e)}>
        {data.map((d) => (
          <option
            value={d.value}
            key={d.value}
            // onChange={(e) => setRoot({ root: e.target.value })}
            // onChange={(e) => setRoot({ root: e.currentTarget.value })}
          >
            {d.label}
          </option>
        ))}
      </select>
      <div>{root.root}</div>
    </>
  );
};
