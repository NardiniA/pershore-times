import React from "react";
import { formatSize } from "@/utils/formatSize";

const File = ({ field }) => {
  return (
    <div className={formatSize(field.Size)}>
      <input
        type={field.Type}
        placeholder={field.Placeholder}
        className="form-control"
        name={field.Name}
        id={field.Identifier}
        required={field.Required}
        accept=".pdf"
      />
    </div>
  );
};

export default File;
