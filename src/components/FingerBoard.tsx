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

const FONT_SIZE: number = 14;
const FONT_SIZE_TUNING: number = 20;
const FONT_SIZE_FLET_NUM: number = 20;
const MARGIN_X: number = 3;
const FLET_LINE_WIDTH: number = 2;
const NAT_WIDTH: number = 10;
const MARK_R: number = FONT_SIZE - 2;
const FLET_START_WIDTH: number = MARK_R * 2 + MARGIN_X * 2 + NAT_WIDTH;
const FLET_WIDTH: number = MARK_R * 2 + MARGIN_X * 2 + FLET_LINE_WIDTH;

export const FingerBoard: React.FC<FingerBoardProps> = ({
  mode,
  settings,
  chordprops,
  scaleprops,
}) => {
  const FINGER_BOARD_WIDTH: number =
    FLET_START_WIDTH + FLET_WIDTH * (settings.fletnumber + 1);
  const STRING_LENGTH: number =
    FLET_LINE_WIDTH + FLET_WIDTH * settings.fletnumber;

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
          cx={MARK_R + MARGIN_X}
          cy={30 * string + 16}
          r={MARK_R}
          fill={getMarkColor(note.degree)}
        ></circle>
      );
      marks.push(
        <text
          key={"mark-text-string-" + string.toString() + "_flet-0"}
          x={MARK_R + MARGIN_X}
          y={30 * string + 16}
          fontSize={FONT_SIZE}
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
            cx={
              FLET_START_WIDTH +
              FLET_WIDTH * (flet - 1) +
              (FLET_LINE_WIDTH + MARGIN_X + MARK_R)
            }
            cy={30 * string + 16}
            r={MARK_R}
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
            x={
              FLET_START_WIDTH +
              FLET_WIDTH * (flet - 1) +
              (FLET_LINE_WIDTH + MARGIN_X + MARK_R)
            }
            y={30 * string + 16}
            fontSize={FONT_SIZE}
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
          fontSize={FONT_SIZE_TUNING}
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
        <svg
          width={FINGER_BOARD_WIDTH}
          height="200"
          viewBox={"0 0 " + FINGER_BOARD_WIDTH + " 200"}
        >
          <rect
            x={MARK_R * 2 + MARGIN_X * 2}
            y="15"
            width={NAT_WIDTH}
            height="152"
            fill="#888"
          />
          {[...Array(settings.fletnumber + 1)]
            .map((_, i) => i)
            .map((flet) => (
              <rect
                key={"line-flet-" + flet}
                x={FLET_WIDTH * flet + FLET_START_WIDTH}
                y="15"
                width={FLET_LINE_WIDTH}
                height="152"
                fill="#888"
              />
            ))}

          <rect
            x={FLET_START_WIDTH}
            y="15"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>
          <rect
            x={FLET_START_WIDTH}
            y="45"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>
          <rect
            x={FLET_START_WIDTH}
            y="75"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>
          <rect
            x={FLET_START_WIDTH}
            y="105"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>
          <rect
            x={FLET_START_WIDTH}
            y="135"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>
          <rect
            x={FLET_START_WIDTH}
            y="165"
            width={STRING_LENGTH}
            height="2"
            fill="#888"
          ></rect>

          <text
            x={MARGIN_X + MARK_R}
            y="195"
            fontSize="18"
            fill="#888"
            textAnchor="middle"
          >
            0
          </text>
          {[...Array(settings.fletnumber)]
            .map((_, i) => i + 1)
            .map((flet) => (
              <text
                key={"text-flet-" + flet}
                x={
                  FLET_START_WIDTH +
                  FLET_WIDTH * (flet - 1) +
                  (FLET_LINE_WIDTH + MARGIN_X + MARK_R)
                }
                y="195"
                fontSize={FONT_SIZE_FLET_NUM}
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
