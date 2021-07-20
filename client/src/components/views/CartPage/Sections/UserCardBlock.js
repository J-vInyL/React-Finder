import React from "react";
import "./UserCardBlock.css";

function UserCardBlock(props) {
  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `${image}`;
    }
  };

  const renderItmes = () =>
    props.products &&
    props.products.map((product, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderCartImage(product.image)}
          />
        </td>

        <td>{props.cofirmSize.cart[index].size} cm</td>

        <td> {product.price} 원</td>

        <td>
          <button onClick={() => props.removeItem(product._id)}>삭제</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>{renderItmes()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
