import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import axios from "axios";

const { TextArea } = Input;

function UpdateProductPage(props) {
  const updateId = props.match.params.updateId;

  const [UpdateData, setUpdateData] = useState({});

  const [Title, setTitle] = useState("");
  const [Description, setDescrption] = useState("");
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id_get_update?id=${updateId}`)
      .then(response => {
        setUpdateData(response.data[0]);
      })
      .catch(err => alert(err));
    //console.log("update text", updateId);
  }, []);

  const titleChangeHandler = event => {
    setTitle(event.currentTarget.value);
  };

  const descriptonChangeHandler = event => {
    setDescrption(event.currentTarget.value);
  };

  const priceChangeHandler = event => {
    setPrice(event.currentTarget.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!Title || !Description || !Price) {
      //유효성 체크

      return alert("모든 값을 넣어주셔아합니다.");
    }

    const body = {
      id: updateId,
      title: Title,
      description: Description,
      price: Price
    };

    axios.post("/api/product/products_by_id_update", body).then(response => {
      if (response.data.success) {
        alert("상품 수정이 완료되었습니다.");

        props.history.push("/");
      } else {
        alert("상품 수정에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 level={2}> 상품 수정</h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}

        <br />
        <br />
        <label>이름 : {UpdateData.title}</label>
        <Input
          placeholder="변경 내용"
          onChange={titleChangeHandler}
          value={Title}
        />
        <br />
        <br />
        <label>브랜드 : {UpdateData.description}</label>
        <TextArea
          placeholder="변경 내용"
          onChange={descriptonChangeHandler}
          value={Description}
        />
        <br />
        <br />
        <label>가격 : {UpdateData.price}</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />

        <button type="submit">확인</button>
      </Form>
    </div>
  );
}

export default UpdateProductPage;
