import React from "react";
import { Mode, Accidental, Chord, Scale } from "./Constants";
import { convertNumberToNote } from "./Utils";

type ChordProps = {
  root: number;
  chord: Chord;
};

type ScaleProps = {
  root: number;
  scale: Scale;
};

type SettingsProps = {
  tuning: number[];
  fletnumber: number;
  accidental: Accidental;
};

type FingerBoardProps = {
  mode: Mode;
  settings: SettingsProps;
  chordprops: ChordProps;
  scaleprops: ScaleProps;
};

type Note = {
  num: number; //  0:C, 1:C#, ... , 11:B
  degree: number; //  0:P1, 1:m2, ... , 11:M7
};

export const FingerBoard: React.FC<FingerBoardProps> = ({
  mode,
  settings,
  chordprops,
  scaleprops,
}) => {
  let markPosition: Array<(Note | undefined)[]> = [];
  if (mode === "Scale") {
    markPosition = createMarkPosition(
      settings.tuning,
      settings.fletnumber,
      scaleprops.root,
      scaleprops.scale.interval
    );
  }
  if (mode === "Chord") {
    markPosition = createMarkPosition(
      settings.tuning,
      settings.fletnumber,
      chordprops.root,
      chordprops.chord.interval
    );
  }

  const getMarkColor = (degree: number): string => {
    if (mode === "Scale") {
      if (degree === 0) {
        return "#e74c3c";
      } else {
        return "#e77b3c";
      }
    } else {
      if (degree === 0) {
        return "#e74c3c";
      } else if (degree === 2) {
        return "#a366cc";
      } else if (degree === 3) {
        return "#4f8be3";
      } else if (degree === 4) {
        return "#e6a23c";
      } else if (degree === 5) {
        return "#c47693";
      } else if (degree === 7) {
        return "#888";
      } else if (degree === 9) {
        return "#50875e";
      } else if (degree === 10) {
        return "#a5b32e";
      } else if (degree === 11) {
        return "#66cca7";
      } else {
        return "#888";
      }
    }
  };

  const markNotes = () => {
    let marks = [];

    // flet 0 mark
    for (let string = 0; string < 6; string++) {
      let note = markPosition[string][0];
      if (note === undefined) continue;
      marks.push(
        <circle
          key={"mark-circle-string-" + string.toString() + "_flet-0"}
          cx="15"
          cy={30 * string + 16}
          r="10"
          fill={getMarkColor(note.degree)}
        ></circle>
      );
      marks.push(
        <text
          key={"mark-text-string-" + string.toString() + "_flet-0"}
          x="15"
          y={30 * string + 16}
          fontSize="12"
          fontWeight="bold"
          fill="#FFF"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {convertNumberToNote(note.num, settings.accidental)}
        </text>
      );
    }

    // flet 1 ~ mark
    for (let string = 0; string < 6; string++) {
      for (let flet = 1; flet <= settings.fletnumber; flet++) {
        let note = markPosition[string][flet];
        if (note === undefined) continue;
        marks.push(
          <circle
            key={
              "mark-circle-string-" +
              string.toString() +
              "_flet-" +
              flet.toString()
            }
            cx={32 * flet + 21}
            cy={30 * string + 16}
            r="10"
            fill={getMarkColor(note.degree)}
          ></circle>
        );
        marks.push(
          <text
            key={
              "mark-text-string-" +
              string.toString() +
              "_flet-" +
              flet.toString()
            }
            x={32 * flet + 21}
            y={30 * string + 16}
            fontSize="12"
            fontWeight="bold"
            fill="#FFF"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {convertNumberToNote(note.num, settings.accidental)}
          </text>
        );
      }
    }
    return marks;
  };

  const drawTuning = () => {
    let tuning = [];
    for (let t = 0; t < settings.tuning.length; t++) {
      tuning.push(
        <text
          key={"tuning-string-" + t}
          x="10"
          y={30 * t + 15}
          fontSize="18"
          fill="#888"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {convertNumberToNote(settings.tuning[t], settings.accidental)}
        </text>
      );
    }
    return (
      <svg width="20" height="200" viewBox="0 0 20 200">
        {tuning}
      </svg>
    );
  };

  return (
    <div style={FlexWrapper}>
      <div>{drawTuning()}</div>
      <div style={FingerBoardStyle}>
        <svg width="518" height="200" viewBox="0 0 518 200">
          <rect x="30" y="15" width="8" height="152" fill="#888" />
          {[...Array(settings.fletnumber)]
            .map((_, i) => i + 1)
            .map((flet) => (
              <rect
                key={"line-flet-" + flet}
                x={32 * flet + 36}
                y="15"
                width="2"
                height="152"
                fill="#888"
              />
            ))}

          <rect x="30" y="15" width="488" height="2" fill="#888"></rect>
          <rect x="30" y="45" width="488" height="2" fill="#888"></rect>
          <rect x="30" y="75" width="488" height="2" fill="#888"></rect>
          <rect x="30" y="105" width="488" height="2" fill="#888"></rect>
          <rect x="30" y="135" width="488" height="2" fill="#888"></rect>
          <rect x="30" y="165" width="488" height="2" fill="#888"></rect>

          <text x="11" y="195" fontSize="18" fill="#888">
            0
          </text>
          {[...Array(settings.fletnumber)]
            .map((_, i) => i + 1)
            .map((flet) => (
              <text
                key={"text-flet-" + flet}
                x={32 * flet + 21}
                y="195"
                fontSize="18"
                fill="#888"
                textAnchor="middle"
              >
                {flet}
              </text>
            ))}
          {markNotes()}
        </svg>
      </div>
    </div>
  );
};

const createMarkPosition = (
  tuning: number[],
  fletcount: number,
  root: number,
  interval: number[]
): Array<(Note | undefined)[]> => {
  let markPosition: Array<(Note | undefined)[]> = [];
  for (let string = 0; string < 6; string++) {
    let stringstate: (Note | undefined)[] = [];
    for (let flet = 0; flet <= fletcount; flet++) {
      let note_num = (tuning[string] + flet) % 12;
      let note_degree = interval.find((c) => (c + root) % 12 === note_num);
      if (note_degree !== undefined) {
        let note: Note = { num: note_num, degree: note_degree };
        stringstate.push(note);
      } else {
        stringstate.push(undefined);
      }
    }
    markPosition.push(stringstate);
  }
  return markPosition;
};

const FlexWrapper: React.CSSProperties = {
  display: "flex",
};

const FingerBoardStyle: React.CSSProperties = {
  overflow: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
};
