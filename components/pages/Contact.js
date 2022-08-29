import React from "react";
import { marked } from "marked";
import { IconMailForward, IconPhone } from "@tabler/icons";
import Form from "../Form";

const Contact = ({ section }) => {
  return (
    <section>
      <div className="container">
        <div className="row gy-5 justify-content-center">
          <div className="col-lg-5 col-md-10 ms-lg-auto me-lg-0 me-auto">
            <div className="mb-5">
              <h2 className="h3 mb-3">{section.title}</h2>
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(section.content),
                }}
              ></p>
            </div>
            <div>
              {section?.contact_info.email_address && (
                <p className="mb-2 content">
                  <i className="me-2 d-inline-block mb-0">
                    <IconMailForward size={16} />
                  </i>{" "}
                  <a href={`mailto:${section?.contact_info.email_address}`}>
                    {section?.contact_info.email_address}
                  </a>
                </p>
              )}
              {section?.contact_info.phone_number && (
                <p className="mb-0 content">
                  <i
                    className="me-2"
                    style={{ transform: "translateY(" + -2 + "px)" }}
                  >
                    <IconPhone size={17} />
                  </i>{" "}
                  <a href={`tel:${section?.contact_info.phone_number}`}>
                    {section?.contact_info.phone_number}
                  </a>
                </p>
              )}
            </div>
          </div>

          {section?.form && <Form form={section?.form} />}
        </div>
      </div>
    </section>
  );
};

export default Contact;
