import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { useSelector } from "react-redux";

const { Meta } = Card;

function Mypage(props) {
  const user = useSelector(state => state.user);

  const isAdmin = () => {
    if (user.userData && user.userData.isAdmin) {
      return "관리자";
    } else {
      return "사용자";
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="site-card-border-less-wrapper">
          <Card style={{ width: 300 }}>
            <Avatar
              style={{ justifyContent: "left" }}
              src={user.userData && user.userData.image}
            />
            <p>이메일 : {user.userData && user.userData.email}</p>
            <p>아이디 : {user.userData && user.userData.name}</p>
            <p>상태 : {isAdmin()}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
