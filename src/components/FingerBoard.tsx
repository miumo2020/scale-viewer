import React from "react";
import { Chord } from "./Constants";
import { convertNumberToNote } from "./Utils";

type ChordProps = {
  root: number;
  chord: Chord;
};

type FingerBoardProps = {
  tuning: number[];
  chordprops: ChordProps;
};

type Note = {
  num: number; //  0:C, 1:C#, ... , 11:B
  degree: number; //  0:P1, 1:m2, ... , 11:M7
};

export const FingerBoard: React.FC<FingerBoardProps> = (props) => {
  let boardstate: Array<(Note | undefined)[]> = [];
  for (let string = 0; string < 6; string++) {
    let stringstate: (Note | undefined)[] = [];
    for (let flet = 0; flet < 16; flet++) {
      let note_num = (props.tuning[string] + flet) % 12;
      let note_degree = props.chordprops.chord.interval.find(
        (c) => (c + props.chordprops.root) % 12 === note_num
      );
      if (note_degree !== undefined) {
        let note: Note = { num: note_num, degree: note_degree };
        stringstate.push(note);
      } else {
        stringstate.push(undefined);
      }
    }
    boardstate.push(stringstate);
  }

  const markNotes = () => {
    let marks = [];

    // flet 0 mark
    for (let string = 0; string < 6; string++) {
      let note_num = boardstate[string][0]?.num;
      if (note_num === undefined) continue;
      marks.push(
        <circle
          key={"mark-circle-string-" + string.toString() + "_flet-0"}
          cx="15"
          cy={30 * string + 16}
          r="10"
          fill="#e74c3c"
        ></circle>
      );
      marks.push(
        <text
          key={"mark-text-string-" + string.toString() + "_flet-0"}
          x="15"
          y={30 * string + 16}
          fontSize="12"
          fill="#FFF"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {convertNumberToNote(note_num)}
        </text>
      );
    }

    // flet 1 ~ 15 mark
    for (let string = 0; string < 6; string++) {
      for (let flet = 1; flet < 15; flet++) {
        let note_num = boardstate[string][flet]?.num;
        if (note_num === undefined) continue;
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
            fill="#e74c3c"
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
            fill="#FFF"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {convertNumberToNote(note_num)}
          </text>
        );
      }
    }
    return marks;
  };

  return (
    <div style={FingerBoardStyle}>
      <svg width="518" height="200" viewBox="0 0 518 200">
        <rect x="30" y="15" width="8" height="152" fill="#888"></rect>
        <rect x="68" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="100" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="132" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="164" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="196" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="228" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="260" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="292" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="324" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="356" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="388" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="420" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="452" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="484" y="15" width="2" height=" 152" fill="#888"></rect>
        <rect x="516" y="15" width="2" height=" 152" fill="#888"></rect>

        <rect x="30" y="15" width="488" height="2" fill="#888"></rect>
        <rect x="30" y="45" width="488" height="2" fill="#888"></rect>
        <rect x="30" y="75" width="488" height="2" fill="#888"></rect>
        <rect x="30" y="105" width="488" height="2" fill="#888"></rect>
        <rect x="30" y="135" width="488" height="2" fill="#888"></rect>
        <rect x="30" y="165" width="488" height="2" fill="#888"></rect>

        <text x="45" y="195" fontSize="18" fill="#888">
          1
        </text>
        <text x="77" y="195" fontSize="18" fill="#888">
          2
        </text>
        <text x="109" y="195" fontSize="18" fill="#888">
          3
        </text>
        <text x="141" y="195" fontSize="18" fill="#888">
          4
        </text>
        <text x="173" y="195" fontSize="18" fill="#888">
          5
        </text>
        <text x="205" y="195" fontSize="18" fill="#888">
          6
        </text>
        <text x="237" y="195" fontSize="18" fill="#888">
          7
        </text>
        <text x="269" y="195" fontSize="18" fill="#888">
          8
        </text>
        <text x="302" y="195" fontSize="18" fill="#888">
          9
        </text>
        <text x="330" y="195" fontSize="18" fill="#888">
          10
        </text>
        <text x="362" y="195" fontSize="18" fill="#888">
          11
        </text>
        <text x="394" y="195" fontSize="18" fill="#888">
          12
        </text>
        <text x="426" y="195" fontSize="18" fill="#888">
          13
        </text>
        <text x="458" y="195" fontSize="18" fill="#888">
          14
        </text>
        <text x="490" y="195" fontSize="18" fill="#888">
          15
        </text>
        {markNotes()}
      </svg>
    </div>
  );
};

const FingerBoardStyle: React.CSSProperties = {
  overflow: "auto",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "touch",
};
