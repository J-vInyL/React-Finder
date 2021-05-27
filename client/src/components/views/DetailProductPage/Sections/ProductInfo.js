import React, { useState, useEffect } from "react";
import { Descriptions, Button, Row, Col, Divider } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { Line } from "@ant-design/charts";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const [SelectSize, setSelectSize] = useState(0);

  /*useEffect(() => {
  
  if (props.graph && props.graph.history) {
    props.graph.history.map((item, index) => {
      
         const data = [{date: item[index].size, 판매량: item[index].size}]
      
      
      return (
        data()
      )
     })
  }
  
}, [])*/

  //console.log("productinfo", props.graph.hisotry);

  const clickHandler = () => {
    if (SelectSize == checkSize(SelectSize)) {
      alert("Gooooood");
      console.log(SelectSize);
      console.log(checkSize(SelectSize));
    } else {
      alert("BAD");
    }

    //필요한 정보를 cart 필드에다가 넣어준다 상품에 대한 아이디 개수
    dispatch(addToCart(props.detail._id, SelectSize));
    //디스패치로 user_actions으로 줄떄 값을 두개를 주면 되고
  };

  const data = [
    {
      date: props.detail.size,
      판매량: props.detail.size
    }
  ];

  const config = {
    data,
    height: 400,
    xField: "date",
    yField: "판매량",
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
    console.log("test", props.graph.history[2].name);
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
