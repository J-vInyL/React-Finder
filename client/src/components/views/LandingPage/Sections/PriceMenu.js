import { Menu } from "antd";
import React, { useState } from "react";

const SubMenu = Menu.SubMenu;

function PriceMenu(props) {
  const [Value, setValue] = useState(0);

  const handleChange = values => {
    const current = Value;
    setValue(values);
    props.handleFilters(current);
    //console.log("pricecurrent", current);
  };

  const renderPriceList = () =>
    props.list &&
    props.list.map(value => (
      <Menu.Item
        key={value._id}
        onClick={() => handleChange(value._id)}
        value={value._id}
      >
        <span>{value.name}</span>
      </Menu.Item>
    ));

  return (
    <div>
      <Menu>
        <SubMenu mode="horizontal" title={<span>가격</span>}>
          {renderPriceList()}
        </SubMenu>
      </Menu>
    </div>
  );
}

export default PriceMenu;
