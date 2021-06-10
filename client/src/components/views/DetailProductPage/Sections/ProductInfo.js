import React, { useState } from "react";
import { Button, Row, Col, Divider } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { Line } from "@ant-design/charts";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const [SelectSize, setSelectSize] = useState(0);

  const clickHandler = () => {
    if (SelectSize == checkSize(SelectSize)) {
      console.log(SelectSize);
      console.log(checkSize(SelectSize));
    } else {
      alert("오류입니다. 다시시도해주세요");
    }

    //필요한 정보를 cart 필드에다가 넣어준다 상품에 대한 아이디 개수
    dispatch(addToCart(props.detail._id, SelectSize));
    //디스패치로 user_actions으로 줄떄 값을 두개를 주면 되고
  };

  const data = [
    {
      sold: props.detail.sold,
      year: props.detail.createdAt
    }
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "sold",
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

  const checkSize = size => {
    setSelectSize(size);
    //console.log("test", props.graph[2].price);
    return size;
    //console.log("Confirm", selectSize)
  };

  const renderSize =
    props.detail.size &&
    props.detail.size.map((sizes, index) => {
      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <Button size="large" shape="round" onClick={() => checkSize(sizes)}>
            {sizes}
          </Button>
        </Col>
      );
    });

  return (
    <div>
      <Divider orientation="center">사이즈</Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={[16, 16]}>{renderSize}</Row>
      </div>

      <br />
      <br />
      <div>
        <Line {...config} />
      </div>

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
