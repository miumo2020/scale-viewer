import React, { useState } from "react";
import { Chord, ChordList } from "./Constants";
import { FingerBoard } from "./FingerBoard";

type ModeState = {
  mode: "Scale" | "Chord";
};

type SettingsState = {
  tuning: number[];
};

type ChordState = {
  root: number;
  chord: Chord;
};

// type ScaleState = {};

export const ScaleViewer = () => {
  const [mode, setMode] = useState<ModeState>({
    mode: "Scale",
  });
  const [chord, setChord] = useState<ChordState>({
    root: 0,
    chord: ChordList[0],
  });
  const handleChangeRoot = (e: React.FormEvent<HTMLSelectElement>) => {
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

  const [settings] = useState<SettingsState>({
    tuning: [4, 9, 2, 7, 11, 4],
  });

  return (
    <>
      <div>Scale Viewer</div>
      <div>
        tuning: {settings.tuning.map((t) => convertNumberToNote(t) + " ")}
      </div>
      <FingerBoard />
      <button onClick={() => setMode({ mode: "Scale" })}>ScaleMode</button>
      <button onClick={() => setMode({ mode: "Chord" })}>ChordMode</button>

      {mode.mode === "Scale" && (
        <div>
          <div>{mode.mode}</div>
        </div>
      )}

      {mode.mode === "Chord" && (
        <div>
          <div>{mode.mode}</div>
          <select onChange={(e) => handleChangeRoot(e)}>
            {[...Array(12)]
              .map((_, i) => convertNumberToNote(i))
              .map((note) => (
                <option value={note} key={note}>
                  {note}
                </option>
              ))}
          </select>
          <select onChange={(e) => handleChangeChord(e)}>
            {ChordList.map((chord) => (
              <option value={chord.name} key={chord.name}>
                {chord.name}
              </option>
            ))}
          </select>
          <div>
            {convertNumberToNote(chord.root)}
            {chord.chord.name}
          </div>
        </div>
      )}
    </>
  );
};

const NumberToNote: { [name: number]: string } = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

const convertNumberToNote = (num: number): string => {
  if (num >= 12 || 0 > num) {
    return "";
  }
  return NumberToNote[num];
};

const NoteToNumber: { [name: string]: number } = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

const convertNoteToNumber = (note: string): number => {
  return NoteToNumber[note];
};
