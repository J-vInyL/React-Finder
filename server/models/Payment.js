const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Prodct 모델 만들기  (서버에 보내줄 모델)
const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Array,
      defalut: []
    },
    data: {
      type: Array,
      defalut: []
    },
    product: {
      type: Array,
      defalut: []
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
