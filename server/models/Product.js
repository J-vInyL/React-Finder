const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Prodct 모델 만들기  (서버에 보내줄 모델)
const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      maxlength: 50
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    size: {
      type: Array,
      default: []
    },
    image: {
      type: Array,
      default: []
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    brand: {
      type: Number,
      default: 1
    },

    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
productSchema.index(
  {
    title: "text",
    description: "text"
  },
  {
    weights: {
      title: 5,
      description: 1
    }
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
