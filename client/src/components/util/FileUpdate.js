import React, { useEffect } from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

function FileUpdate(props) {
  const productupdateId = props.refresFunction;

  useEffect(() => {
    //Axios.get(`/api/product/update/products_by_id?id=${productupdateId}`)
    console.log("text", productupdateId);
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
        <label>이름</label>
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

export default FileUpdate;
