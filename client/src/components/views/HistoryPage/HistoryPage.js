import React from "react";

function HistoryPage() {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>히스토리 정보</h1>
      </div>
      <br />

      <table>
        <thread>
          <tr>
            <th>결제 아이디</th>
            <th>가격</th>
            <th>판매 수량</th>
            <th>구매일</th>
          </tr>
        </thread>

        <tbody>
          {props.user.userData &&
            props.user.userData.history &&
            props.user.userData.history.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
