import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.image.map((images, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "200px" }}
              src={`${images}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
