import React from "react";

const Pictures = (props) => {
  return (
    <div className="picture">
      <div className="mediaCard">
        <div className="info">
          <p>photographer：{props.photographer}</p>
          <a target="_blank" href={props.src.original}>
            <p>新分頁中開啟</p>
          </a>
        </div>
      </div>
      <img src={props.src.large} alt={props.alt} />
    </div>
  );
};

export default Pictures;
