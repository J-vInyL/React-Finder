import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>결제 내역</h1>
      </div>
      <br />

      <div>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격(USD)</th>
              <th>사이즈 </th>
              <th>구매일</th>
            </tr>
          </thead>

          <tbody>
            {props.user.userData &&
              props.user.userData.history &&
              props.user.userData.history.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.size}</td>
                  <td>{item.dateOfPurchase}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;
