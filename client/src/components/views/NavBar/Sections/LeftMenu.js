import React, { useState } from "react";

import SearchFeature from "./SearchFeature";
//const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = newSearchTerm => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "1rem auto"
      }}
    >
      <SearchFeature refreshFunction={updateSearchTerm} />
    </div>

    /* <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>Blogs</span>}>
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>

        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
  </SubMenu>
    </Menu>*/
  );
}

export default LeftMenu;
