import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import axios from "axios";

const { TextArea } = Input;

function UpdateProductPage(props) {
  const updateId = props.match.params.updateId;

  const [UpdateData, setUpdateData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/update_by_id?id=${updateId}`)
      .then(response => {
        setUpdateData(response.data[0]);
      })
      .catch(err => alert(err));
    //console.log("update text", updateId);
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 level={2}> 상품 수정</h2>
      </div>

      <Form>
        {/* DropZone */}

        <br />
        <br />
        <label>{UpdateData.title}</label>
        <Input />
        <br />
        <br />
        <label>브랜드</label>
        <TextArea />
        <br />
        <br />
        <label>가격</label>
        <Input />
        <br />
        <br />

        <button type="submit">확인</button>
      </Form>
    </div>
  );
}

export default UpdateProductPage;
