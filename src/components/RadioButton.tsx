import React, { useState } from "react";

type RadioButtonProps = {
  labels: string[];
};

export const RadioButton: React.FC<RadioButtonProps> = ({ labels }) => {
  const [value, setValue] = useState<number>(0);

  const onClick = (num: number) => {
    setValue(num);
  };

  const getLabelStyle = (num: number) => {
    if (num === value) {
      return LabelCheckedStyle;
    } else {
      return LabelStyle;
    }
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

const LabelStyle: React.CSSProperties = {
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

const LabelCheckedStyle: React.CSSProperties = {
  display: "block",
  float: "left",
  cursor: "pointer",
  width: 80,
  margin: 0,
  padding: "12px 5px",
  borderRight: "1px solid #abb2b7",
  backgroundColor: "#a1b91d",
  color: "#fff",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "1",
  transition: ".2s",
};
