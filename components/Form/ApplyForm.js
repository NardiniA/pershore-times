import dynamic from "next/dynamic";
import { IconBrandTelegram, IconRotateClockwise2 } from "@tabler/icons";

const form = {
  Title: "Apply for this Job",
  Fields: [
    {
      Name: "Resume/CV",
      Identifier: "aaply_cv",
      Placeholder: "Resume/CV",
      Type: "file",
      Size: "full",
      Required: true,
    },
    {
      Name: "Full Name",
      Identifier: "apply_full_name",
      Placeholder: "Your Full Name",
      Type: "text",
      Size: "full",
      Required: true,
    },
    {
      Name: "Email Address",
      Identifier: "apply_email",
      Placeholder: "Email Address",
      Type: "email",
      Size: "Full",
      Required: true,
    },
    {
      Name: "Phone",
      Identifier: "apply_phone",
      Placeholder: "Phone Number",
      Type: "tel",
      Size: "Half",
      Required: true,
    },
    {
      Name: "Current Company",
      Identifier: "apply_current_company",
      Placeholder: "Current Company",
      Type: "text",
      Size: "Half",
      Required: true,
    },
    {
      Name: "Cover Letter",
      Identifier: "apply_cover",
      Placeholder: "Add a cover letter or anything else you want to share.",
      Type: "textarea",
      Size: "Full",
      Required: true,
    },
  ],
};

const ApplyForm = ({ ApplicationDestination }) => {
  return (
    <div>
      <h2 className="h3 mb-4">{form.Title}</h2>

      <form
        className="row g-4"
        action={`https://airform.io/${ApplicationDestination}`}
        method="POST"
        target="_blank"
      >
        {form?.Fields &&
          form?.Fields.map((field, index) => {
            switch (field.Type) {
              case "textarea":
                const Textarea = dynamic(() =>
                  import("@/components/Form/Textarea")
                );
                return (
                  <Textarea field={field} key={field.Identifier + index} />
                );
              case "select":
                const Select = dynamic(() =>
                  import("@/components/Form/Select")
                );
                return <Select field={field} key={field.Identifier + index} />;
              case "file":
                const File = dynamic(() => import("@/components/Form/File"));
                return <File field={field} key={field.Identifier + index} />;
              default:
                const Input = dynamic(() => import("@/components/Form/Input"));
                return <Input field={field} key={field.Identifier + index} />;
            }
          })}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary me-2 mb-2"
            aria-label="Send Message"
          >
            Apply{" "}
            <i className="ms-1">
              <IconBrandTelegram size={18} />
            </i>
          </button>
          <button
            type="reset"
            className="btn btn-outline-primary mb-2"
            aria-label="Reset Form"
          >
            Reset{" "}
            <i className="ms-1">
              <IconRotateClockwise2 size={18} />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
