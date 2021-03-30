import React from "react";
import { Descriptions, Button } from "antd";

function ProductInfo(props) {
  return (
    <div>
      <Descriptions title={props.detail.title}>
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick>
          장바구니
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
