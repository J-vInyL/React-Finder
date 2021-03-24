import { Menu } from "antd";
import React, { useState } from "react";

const SubMenu = Menu.SubMenu;

function FilterMenu(props) {
  const [Checked, setChecked] = useState([]);

  const handleChange = values => {
    const current = Checked;
    setChecked(values);
    props.handleFilters(current);
    //console.log("filtercurrent", current);
  };

  const renderBrandList = () =>
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
        <SubMenu mode="horizontal" title={<span>브랜드</span>}>
          {renderBrandList()}
        </SubMenu>
      </Menu>
    </div>
  );
}

export default FilterMenu;
