/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then(response => {
        //Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          //어드민라우트 데이터랑 그리고 isadmin이 거짓이면(isAdmin=false)
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
