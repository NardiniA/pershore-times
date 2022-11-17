import React from "react";
import { formatSize } from "@/utils/formatSize";

const Textarea = ({ field }) => {
  return (
    <div className={formatSize(field.Size)}>
      <textarea
        className="form-control"
        placeholder={field.Placeholder}
        name={field.Name}
        id={field.Identifier}
        required={field.Required}
        rows="4"
      ></textarea>
    </div>
  );
};

export default Textarea;
