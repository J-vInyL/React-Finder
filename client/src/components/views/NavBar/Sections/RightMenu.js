import React, { useState } from "react";
import { Menu, Icon, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  } else if (user.userData && user.userData.isAdmin) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">제품등록</a>
        </Menu.Item>

        <Menu.Item key="mypage">
          <a href="/mypage">마이페이지</a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">구매내역</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a
              href="/user/cart"
              className="head-example"
              style={{ marginRight: -22, color: "667777" }}
            >
              <Icon
                type="shopping-cart"
                style={{ fontSize: 30, marginBottom: 3 }}
              />
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="mypage">
          <a href="/mypage">마이페이지</a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
