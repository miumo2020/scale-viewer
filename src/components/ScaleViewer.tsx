import React, { useState } from "react";

type State = {
  tuning: number[];
};

export const ScaleViewer = () => {
  const [state, setState] = useState<State>({
    // C  Db D  Eb E  F  Gb G  Ab A Bb  B
    // 0  1  2  3  4  5  6  7  8  9 10 11
    tuning: [3, 9, 2, 7, 11, 3],
  });

  return (
    <div>
      <div>Scale Viewer</div>
      <div>tuning: {state.tuning.map((t) => t + " ")}</div>
    </div>
  );
};
