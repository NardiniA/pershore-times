import React from "react";

const Detail = ({ section: { Content } }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: Content,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Detail;
