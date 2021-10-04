import React, { useState } from "react";
import { Mode, Chord, ChordList, Scale, ScaleList } from "./Constants";
import { convertNumberToNote, convertNoteToNumber } from "./Utils";
import { FingerBoard } from "./FingerBoard";
import { SettingsModal } from "./SettingsModal";

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
        root: chord.root,
        scale: selected,
      });
  };

  const [settingsModal, setSettingsModal] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({
    tuning: [4, 11, 7, 2, 9, 4],
  });

  const setTuning = (string: number, move: -1 | 1): void => {
    let newNote: number = (settings.tuning[string] + move + 12) % 12;
    let newTuning: number[] = [...settings.tuning];
    newTuning[string] = newNote;
    setSettings({ tuning: newTuning });
  };

  return (
    <>
      <div>Scale Viewer</div>
      <button onClick={() => setMode("Scale")}>ScaleMode</button>
      <button onClick={() => setMode("Chord")}>ChordMode</button>

      <button onClick={() => setSettingsModal(true)}>settings</button>
      <SettingsModal
        show={settingsModal}
        setShow={setSettingsModal}
        tuning={settings.tuning}
        setTuning={setTuning}
      />

      {mode === "Scale" && (
        <div>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeScaleRoot(e)}
          >
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

      {mode === "Chord" && (
        <div>
          <select
            style={SelectBoxStyle}
            onChange={(e) => handleChangeChordRoot(e)}
          >
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

      <FingerBoard
        mode={mode}
        tuning={settings.tuning}
        chordprops={chord}
        scaleprops={scale}
      />
    </>
  );
};

const SelectBoxStyle: React.CSSProperties = {
  fontSize: "24px",
};
