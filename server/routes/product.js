const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지를 저장한다.

  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post("/", (req, res) => {
  //루트 경로 로 되어있음
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);
  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  //product 콜렉션에 들어 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      /*if (key === "price") {
        console.log("productkey", key);
        findArgs[key] = req.body.filters[key];
      } else {
        console.log(" else productkey", key);
        findArgs[key] = req.body.filters[key];
      }*/
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findargs", findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit) //처음 페이지 부분  몇개 가줘올지 설정
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length
        });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit) //처음 페이지 부분  몇개 가줘올지 설정
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length
        });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  //productId 를 이용해서 DB에서 productID와 같은  상품의 정보를 가져온다.

  let type = req.query.type;
  let productId = req.query.id;

  Product.find({ _id: productId })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

//axios.get(`/api/product/products_by_id?id=${productId}&type=single`);

module.exports = router;
