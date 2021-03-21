import { Menu } from "antd";
import React from "react";
import "./Nav.css";

const SubMenu = Menu.SubMenu;

function FilterMenu(props) {
  const rednerBrandList = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Menu.Item onChange>
          <span>{value.name}</span>
        </Menu.Item>
      </React.Fragment>
    ));

  return (
    <div>
      <Menu>
        <SubMenu title={<span>브랜드</span>}>{rednerBrandList()}</SubMenu>
      </Menu>
    </div>
  );
}

export default FilterMenu;
