const { User } = require("../models/User");

//인증처리 하는 곳
let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
