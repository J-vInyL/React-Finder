import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.image && props.detail.image.length > 0) {
      let images = [];

      props.detail.image.map(item => {
        images.push({
          original: `${item}`,
          thumbnail: `${item}`
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
