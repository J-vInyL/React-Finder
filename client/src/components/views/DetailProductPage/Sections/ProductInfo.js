import React from "react";
import { Descriptions, Button, Row, Col, Divider, Card } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { Line } from "@ant-design/charts";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 cart 필드에다가 넣어준다 상품에 대한 아이디 개수
    dispatch(addToCart(props.detail._id));
  };

  const style = {
    //background: "White",
    //padding: "24px 0",
    textAlign: "center"
  };

  const data = [
    { year: "1991", value: props.detail.sold },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 }
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond"
    },
    label: {
      style: {
        fill: "#aaa"
      }
    }
  };

  const renderSize =
    props.detail.size &&
    props.detail.size.map((sizes, index) => {
      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <Card style={style}>{sizes}</Card>
        </Col>
      );
    });

  return (
    <div>
      <Divider orientation="center">사이즈</Divider>
      <Row gutter={[16, 16]}>{renderSize}</Row>

      <br />
      <br />
      <Line {...config} />
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          장바구니
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
