import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../util/FileUpload";
import axios from "axios";

//const { Title } = Typography;
const { TextArea } = Input;

const Sizes = [
  { key: 1, value: "235" },
  { key: 2, value: "240" },
  { key: 3, value: "245" },
  { key: 4, value: "250" }
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescrption] = useState("");
  const [Price, setPrice] = useState(0);
  const [Size, setSize] = useState(1);
  const [Image, setImage] = useState([]);

  const titleChangeHandler = event => {
    setTitle(event.currentTarget.value);
  };

  const descriptonChangeHandler = event => {
    setDescrption(event.currentTarget.value);
  };

  const priceChangeHandler = event => {
    setPrice(event.currentTarget.value);
  };

  const sizeChangeHandler = event => {
    setSize(event.currentTarget.value);
  };

  const updateImages = newImages => {
    setImage(newImages);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!Title || !Description || !Price || !Size || !Image) {
      //유효성 체크
      return alert("모든 값을 넣어주셔아합니다.");
    }

    //서버에 채운 값들을 request로 보낸다.
    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      size: Size,
      image: Image
    };

    axios.post("/api/product", body).then(response => {
      if (response.data.success) {
        alert("상품 업로드에 성공 했습니다.");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 level={2}> 상품 업로드</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}

        <FileUpload refreshFunction={updateImages} />
        {/* 파일 데이터를 fileupload 컴포넌트에서 부모 컴포넌트로 업데이트 하기 */}
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptonChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={sizeChangeHandler} value={Size}>
          {Sizes.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">확인</button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
