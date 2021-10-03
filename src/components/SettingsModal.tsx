import React from "react";

type SettingsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  return (
    <>
      {props.show === true && (
        <div style={Overlay}>
          <div style={SettingsWindow}>
            <p>Settings</p>
            <p>
              <button onClick={() => props.setShow(false)}>close</button>
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
  backgroundColor: "#FFF",
};
