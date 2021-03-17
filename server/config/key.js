if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

//로컬 과 프로덕션 모드로 개발할 때 분기차 인식
