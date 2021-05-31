import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});
  //const [Graphdata, setGraphdata] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(response => {
        setProduct(response.data[0]);
        //setGraphdata(response.data[0].writer.history);

        console.log("detail", response.data[0]);
        //console.log("DetailWriter", response.data[0].writer.history[1]);
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
      </Row>
    </div>
  );
}

export default DetailProductPage;
