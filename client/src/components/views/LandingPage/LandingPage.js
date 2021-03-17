import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function LandingPage() {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios.post("/api/product/products").then(response => {
      if (response.data.success) {
        setProduct(response.data.productInfo);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const renderCards = Product.map((product, index) => {
    console.log("product", product);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<img src={`http://localhost:5000/${product.image[0]}`} />}>
          <Meta title={product.title} description={`${product.price} 원`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          발매 상품 <Icon type="rocket" />{" "}
        </h2>
      </div>

      {/* Filter */}

      {/* Search */}

      {/* Cards */}

      <Row>{renderCards}</Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
