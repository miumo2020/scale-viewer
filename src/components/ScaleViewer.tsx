import React, { useState } from "react";
import { Chord, ChordList, Scale, ScaleList } from "./Constants";
import { convertNumberToNote, convertNoteToNumber } from "./Utils";
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

type ScaleState = {
  root: number;
  scale: Scale;
};

export const ScaleViewer = () => {
  const [mode, setMode] = useState<ModeState>({
    mode: "Scale",
  });

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
        root: chord.root,
        scale: selected,
      });
  };

  const [settings] = useState<SettingsState>({
    tuning: [4, 11, 7, 2, 9, 4],
  });

  return (
    <>
      <div>Scale Viewer</div>
      <div>
        tuning:{" "}
        {settings.tuning
          .slice()
          .reverse()
          .map((t) => convertNumberToNote(t) + " ")}
      </div>
      <button onClick={() => setMode({ mode: "Scale" })}>ScaleMode</button>
      <button onClick={() => setMode({ mode: "Chord" })}>ChordMode</button>

      {mode.mode === "Scale" && (
        <div>
          <div>{mode.mode}</div>
          <select style={SelectBoxStyle} onChange={(e) => handleChangeScaleRoot(e)}>
            {[...Array(12)]
              .map((_, i) => convertNumberToNote(i))
              .map((note) => (
                <option value={note} key={note}>
                  {note}
                </option>
              ))}
          </select>
          <select style={SelectBoxStyle} onChange={(e) => handleChangeScale(e)}>
            {ScaleList.map((scale) => (
              <option value={scale.name} key={scale.name}>
                {scale.name}
              </option>
            ))}
          </select>
        </div>
        
      )}

      {mode.mode === "Chord" && (
        <div>
          <div>{mode.mode}</div>
          <select style={SelectBoxStyle} onChange={(e) => handleChangeChordRoot(e)}>
            {[...Array(12)]
              .map((_, i) => convertNumberToNote(i))
              .map((note) => (
                <option value={note} key={note}>
                  {note}
                </option>
              ))}
          </select>
          <select style={SelectBoxStyle} onChange={(e) => handleChangeChord(e)}>
            {ChordList.map((chord) => (
              <option value={chord.name} key={chord.name}>
                {chord.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <FingerBoard tuning={settings.tuning} chordprops={chord} />
    </>
  );
};

const SelectBoxStyle: React.CSSProperties = {
  fontSize: "24px",
};
