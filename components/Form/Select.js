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
  return (
    <div className="col-md-12">
      <Select
        styles={selectStyles}
        options={field?.options}
        name={field.name}
        id={field.id}
        placeholder={field.placeholder}
        required={field?.config?.required.value}
      />
    </div>
  );
};

export default Input;
