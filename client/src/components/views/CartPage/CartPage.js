import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty, Result } from "antd";
import Paypal from "../../util/Paypal";

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];
    //리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          response => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
    setShowTotal(true);
  };

  let removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transaction = data => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail
      })
    ).then(response => {
      if (response.payload.success) {
        setShowTotal(false);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>장바구니</h1>

      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>최종 금액 : {Total}원 </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>

      {ShowTotal && <Paypal total={Total} onSuccess={transaction} />}
    </div>
  );
}

export default CartPage;
