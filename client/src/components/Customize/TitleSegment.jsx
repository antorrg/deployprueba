import React from "react";

function TitleSegment({ title, detail }) {
  return (
    <>
      <div className="container w-75">
        <h4>{title}</h4>
        <p>{detail}</p>
      </div>
    </>
  );
}

export default TitleSegment;
