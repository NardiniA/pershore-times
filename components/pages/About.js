import React from "react";
import { marked } from "marked";
import Image from "next/image";

const About = ({ section }) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h2
            className="text-dark mb-0"
            dangerouslySetInnerHTML={{
              __html: marked.parse(section.Title),
            }}
          ></h2>
        </div>
      </div>

      <div className="py-5 my-3">
        <div className="row g-4 justify-content-center text-center">
          {section.Images.map((item, i) => {
            let grid_class;
            if (item.Size === "Half") {
              grid_class = "col-lg-6";
            } else if (item.Size === "Third") {
              grid_class = "col-lg-4 col-6";
            } else if (item.Size === "Quarter") {
              grid_class = "col-lg-3 col-6";
            } else {
              grid_class = "col-lg-12";
            }
            return (
              <div key={i} className={`${grid_class} image-grid-${i + 1}`}>
                <Image
                  className="w-100 h-auto rounded"
                  src={item.Image.data.attributes.url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                  alt={item.Image.data.attributes.alt}
                  width={item.Image.data.attributes.width}
                  height={item.Image.data.attributes.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={item.Image.data.attributes.url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: marked.parse(section.Description),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default About;
