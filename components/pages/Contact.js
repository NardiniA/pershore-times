import React from "react";
import { IconMailForward, IconMapPin, IconPhone } from "@tabler/icons";
import Form from "../Form";

const Contact = ({ section }) => {
  return (
    <section>
      <div className="container">
        <div className="row gy-5 justify-content-center">
          <div className="col-lg-5 col-md-10 ms-lg-auto me-lg-0 me-auto">
            <div className="mb-5">
              <h2 className="h3 mb-3">{section.Title}</h2>
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: section.Content,
                }}
              ></p>
            </div>
            <div>
              {section?.ContactInfo.map((info, index) => (
                <p className="mb-2 content" key={info.Text + "_contact_key" + index}>
                  <i className={`me-2 ${section?.ContactInfo.length !== index && "d-inline-block mb-0"}`}>
                    {info.Link.includes("mailto:") && (
                      <IconMailForward size={16} />
                    )}
                    {info.Link.includes("tel:") && (
                      <IconPhone size={17} />
                    )}
                    {info.Link.includes("map") && (
                      <IconMapPin size={16} />
                    )}
                  </i>{" "}
                  <a href={info.Link}>{info.Text}</a>
                </p>
              ))}
            </div>
          </div>

          {section?.Form && <Form form={section?.Form} />}
        </div>
      </div>
    </section>
  );
};

export default Contact;
