import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col, Button, Modal } from "antd";

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    axios
      .delete(`/api/product/products_by_id_delete?id=${productId}`)
      .then(alert("삭제 완료"));
    props.history.push("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(response => {
        setProduct(response.data[0]);
        console.log("test", response.data[0].writer);
      })
      .catch(err => alert(err));
  }, []);

  return (
    <div style={{ widht: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* ProductImage */}
          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} xs={24}>
          {/* ProductInfo */}
          <ProductInfo detail={Product} />
        </Col>
        <br />
        <br />
        <div>
          <Button size="small" shape="round" type="primary" onClick={showModal}>
            삭제
          </Button>
          <Modal
            title="경고"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>정말로 삭제 하시겠습니까?</p>
          </Modal>
          <Button
            size="small"
            shape="round"
            type="primary"
            href={`/product/update/${productId}`}
          >
            수정
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default DetailProductPage;
