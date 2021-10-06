import React from "react";
import { Accidental } from "./Constants";
import { convertNumberToNote } from "./Utils";

type SettingsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  tuning: number[];
  setTuning: (string: number, move: -1 | 1) => void;
  accidental: Accidental;
  setAccidental: (value: Accidental) => void;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  setShow,
  tuning,
  setTuning,
  accidental,
  setAccidental,
}) => {
  const tunignSetting = () => {
    let result = [];
    for (let string = 0; string < tuning.length; string++) {
      result.push(
        <div key={"tuning-string-" + string}>
          <button onClick={() => setTuning(string, -1)}>{"<"}</button>{" "}
          {convertNumberToNote(tuning[string])}{" "}
          <button onClick={() => setTuning(string, 1)}>{">"}</button>
        </div>
      );
    }
    return result;
  };

  const onChangeAccidental = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAccidental(e.currentTarget.value as Accidental);
  };

  const accidentalSetting = () => {
    return (
      <>
        <input
          type="radio"
          name="accidental"
          value="#"
          checked={accidental === "#"}
          onChange={onChangeAccidental}
        />
        #(Sharp)
        <input
          type="radio"
          name="accidental"
          value="b"
          checked={accidental === "b"}
          onChange={onChangeAccidental}
        />
        b(Flat)
      </>
    );
  };

  return (
    <>
      {show === true && (
        <div style={Overlay}>
          <div style={SettingsWindow}>
            <p>Settings</p>
            <p>Accidental</p>
            {accidentalSetting()}
            <p>Tuning</p>
            {tunignSetting()}
            <p>
              <button onClick={() => setShow(false)}>close</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const Overlay: React.CSSProperties = {
  zIndex: 10,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const SettingsWindow: React.CSSProperties = {
  zIndex: 20,
  width: "70%",
  padding: "0.5em",
  borderRadius: "5px",
  backgroundColor: "#FFF",
};
