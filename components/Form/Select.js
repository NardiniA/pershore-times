import { formatSize } from "@/utils/formatSize";
import React from "react";
import Select from "react-select";

const selectStyles = {
    control: styles => ({
        ...styles,
        padding: 0,
        border: "1px solid #ddd",
        transition: ".3s ease",
        padding: "12px 16px",
        height: "50px",
        alignContent: "center",
        fontSize: "1rem",
    }),
    input: styles => ({
        ...styles,
        padding: "0px",
        margin: "0px",
        border: "0",
        fontSize: "1rem",
    }),
    valueContainer: styles => ({
        ...styles,
        padding: "0px",
        margin: "0px",
        border: "0",
        fontSize: "1rem"
    }),
    menu: styles => ({
        ...styles,
        zIndex: "10"
    })
}

const Input = ({ field }) => {
  const opts = field.Options.split(", ");
  const options = opts.map((opt) => ({
    label: opt,
    value: opt,
  }));
  return (
    <div className={formatSize(field.Size)}>
      <Select
        styles={selectStyles}
        options={options}
        name={field.Name}
        id={field.Identifier}
        placeholder={field.Placeholder}
        required={field.Required}
      />
    </div>
  );
};

export default Input;
