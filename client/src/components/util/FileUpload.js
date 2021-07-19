import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [Image, setImage] = useState([]);

  const dropHandler = files => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/fomr-data" } //header도 같이 보내 백엔드에서 에러없이 받기 위해
    };
    formData.append("file", files[0]);

    axios
      .post("/api/product/image", formData, config) //엔드포인트로 주면서 폼데이터와 콘피그 post
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setImage([...Image, response.data.filePath]);
          props.refreshFunction([...Image, response.data.filePath]);
        } else {
          alert("파일을 저장하는데 실패했습니다.");
        }
      });
  };

  const deleteHandler = image => {
    const currentIndex = Image.indexOf(image);

    let newImage = [...Image];
    newImage.splice(currentIndex, 1);
    setImage(newImage);
    props.refreshFunction(newImage);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {Image.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minwidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
