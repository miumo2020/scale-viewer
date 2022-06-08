import React, { useState } from "react";
import {
  Mode,
  Accidental,
  Chord,
  ChordList,
  Scale,
  ScaleList,
} from "./Constants";
import { convertNumberToNote, convertNoteToNumber } from "./Utils";
import { ToggleButton } from "./ToggleButton";
import { FingerBoard } from "./FingerBoard";
import { SettingsModal } from "./SettingsModal";

import { SettingsIcon } from "./icons/settings-icon";

type SettingsState = {
  tuning: number[];
  fletnumber: number;
  accidental: Accidental;
};

type ChordState = {
  root: number;
  chord: Chord;
};

type ScaleState = {
  root: number;
  scale: Scale;
};

export const ScaleViewer = () => {
  const [mode, setMode] = useState<Mode>("Scale");

  const [chord, setChord] = useState<ChordState>({
    root: 0,
    chord: ChordList[0],
  });
  const handleChangeChordRoot = (e: React.FormEvent<HTMLSelectElement>) => {
    setChord({
      root: convertNoteToNumber(e.currentTarget.value),
      chord: chord.chord,
    });
  };
  const handleChangeChord = (e: React.FormEvent<HTMLSelectElement>) => {
    let selected = ChordList.find(
      (chord) => e.currentTarget.value === chord.name
    );
    if (selected !== undefined)
      setChord({
        root: chord.root,
        chord: selected,
      });
  };

  const [scale, setScale] = useState<ScaleState>({
    root: 0,
    scale: ScaleList[0],
  });
  const handleChangeScaleRoot = (e: React.FormEvent<HTMLSelectElement>) => {
    setScale({
      root: convertNoteToNumber(e.currentTarget.value),
      scale: scale.scale,
    });
  };
  const handleChangeScale = (e: React.FormEvent<HTMLSelectElement>) => {
    let selected = ScaleList.find(
      (scale) => e.currentTarget.value === scale.name
    );
    if (selected !== undefined)
      setScale({
        root: scale.root,
        scale: selected,
      });
  };

  const [settingsModal, setSettingsModal] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    tuning: [4, 11, 7, 2, 9, 4],
    fletnumber: 21,
    accidental: "#",
  });

  const setTuning = (string: number, move: -1 | 1): void => {
    let newNote: number = (settings.tuning[string] + move + 12) % 12;
    let newTuning: number[] = [...settings.tuning];
    newTuning[string] = newNote;
    setSettings({
      tuning: newTuning,
      fletnumber: settings.fletnumber,
      accidental: settings.accidental,
    });
  };

  const setAccidental = (value: Accidental): void => {
    setSettings({
      tuning: settings.tuning,
      fletnumber: settings.fletnumber,
      accidental: value,
    });
  };

  return (
    <>
      <div style={HeaderStyle}>
        <div style={TitleStyle}>Scale Viewer</div>
        <div style={ModeSelectStyle}>
          <ToggleButton labels={["Scale", "Chord"]} setMode={setMode} />
        </div>
        <div onClick={() => setSettingsModal(true)}>
          <SettingsIcon
            width={"24px"}
            height={"24px"}
            color={"white"}
          ></SettingsIcon>
        </div>
      </div>

      <SettingsModal
        show={settingsModal}
        setShow={setSettingsModal}
        tuning={settings.tuning}
        setTuning={setTuning}
        accidental={settings.accidental}
        setAccidental={setAccidental}
      />

      {mode === "Scale" && (
        <div>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeScaleRoot(e)}
            value={convertNumberToNote(scale.root, settings.accidental)}
          >
            {[...Array(12)]
              .map((_, i) => convertNumberToNote(i, settings.accidental))
              .map((note) => (
                <option value={note} key={note}>
                  {note}
                </option>
              ))}
          </select>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeScale(e)}
            value={scale.scale.name}
          >
            {ScaleList.map((scale) => (
              <option value={scale.name} key={scale.name}>
                {scale.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === "Chord" && (
        <div>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeChordRoot(e)}
            value={convertNumberToNote(chord.root, settings.accidental)}
          >
            {[...Array(12)]
              .map((_, i) => convertNumberToNote(i, settings.accidental))
              .map((note) => (
                <option value={note} key={note}>
                  {note}
                </option>
              ))}
          </select>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeChord(e)}
            value={chord.chord.name}
          >
            {ChordList.map((chord) => (
              <option value={chord.name} key={chord.name}>
                {chord.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <FingerBoard
        mode={mode}
        settings={settings}
        chordprops={chord}
        scaleprops={scale}
      />
    </>
  );
};

const HeaderStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  padding: "10px 0 10px 0",
  justifyContent: "space-around",
  backgroundColor: "#888",
};

const TitleStyle: React.CSSProperties = {
  color: "#FFF",
};

const ModeSelectStyle: React.CSSProperties = {
  // display: "flex",
  // justifyContent: "flex-end",
  // float: "right",
};

const SelectBoxStyle: React.CSSProperties = {
  fontSize: "24px",
};
