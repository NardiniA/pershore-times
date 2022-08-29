import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import { IconBrandTelegram } from "@tabler/icons";

const Form = ({ form }) => {
  return (
    <div className="col-lg-5 me-lg-auto ms-lg-0 ms-auto">
      <h2 className="h3 mb-4">{form.title}</h2>

      <form
        className="row g-4"
        action={`https://airform.io/${form.action}`}
        method="POST"
        target="_blank"
      >
        {form?.fields &&
          form?.fields.map((field, index) => {
            switch (field.template) {
              case "input":
                return <Input field={field} key={field.template + index} />;
              case "textarea":
                return <Textarea field={field} key={field.template + index} />;
              case "select":
                return <Select field={field} key={field.template + index} />;
            }
          })}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Send Message"
          >
            Send{" "}
            <i className="ms-1">
              <IconBrandTelegram size={18} />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
