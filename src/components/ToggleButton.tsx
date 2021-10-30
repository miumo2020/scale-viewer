import React, { useState } from "react";

type ToggleButtonProps = {
  labels: string[];
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({ labels }) => {
  const [value, setValue] = useState<number>(0);

  const onClick = (num: number) => {
    setValue(num);
  };

  const getLabelStyle = (num: number) => {
    let style: React.CSSProperties = DefaultButtonStyle;
    if (num === value) {
      style = { ...style, ...CheckedButtonStyle };
    }
    if (num === 0) {
      style = { ...style, ...FirstButtonStyle };
    } else if (num === labels.length - 1) {
      style = { ...style, ...LastButtonStyle };
    }
    return style;
  };

  return (
    <div>
      {labels.map((label, i) => {
        return (
          <div
            key={"Button_" + String(i)}
            style={getLabelStyle(i)}
            onClick={() => {
              onClick(i);
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const DefaultButtonStyle: React.CSSProperties = {
  display: "block",
  float: "left",
  cursor: "pointer",
  width: 80,
  margin: 0,
  padding: "12px 5px",
  borderRight: "1px solid #abb2b7",
  backgroundColor: "#bdc3c7",
  color: "#555e64",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "1",
  transition: ".2s",
};

const CheckedButtonStyle: React.CSSProperties = {
  backgroundColor: "#a1b91d",
  color: "#fff",
};

const FirstButtonStyle: React.CSSProperties = {
  borderRadius: "3px 0 0 3px",
};

const LastButtonStyle: React.CSSProperties = {
  borderRadius: "0 3px 3px 0",
  borderRight: "0px",
};
