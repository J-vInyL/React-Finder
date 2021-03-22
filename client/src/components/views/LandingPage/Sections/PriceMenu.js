import { Menu } from "antd";
import React, { useState } from "react";

const SubMenu = Menu.SubMenu;

function PriceMenu(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = value => {
    const currentIndex = Checked.indexOf(value);

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderPriceList = () =>
    props.list &&
    props.list.map((value, index) => (
      <Menu.Item key={index} onClick={() => handleToggle(value._id)}>
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
