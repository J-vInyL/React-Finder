const express = require("express");
const router = express.Router();
const multer = require("multer");
const multer3 = require("multer-s3");
const aws = require("aws-sdk");
const { Product } = require("../models/Product");
require("dotenv").config();
//aws.config.loadFromPath("../config/s3.json");

//=================================
//             Product
//=================================

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

//s3 저장
const upload = multer({
  storage: multer3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

//로컬 저장
/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});*/

//var upload = multer({ storage: storage }).single("file");

router.post("/image", upload.single("file"), (req, res) => {
  //가져온 이미지를 저장한다.
  console.log("test", req.file);
  return res.json({
    success: true,
    filePath: req.file.location,
    fileName: req.file.key
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

//popular 가져오기
router.post("/popular", (req, res) => {
  let limit2 = req.body.limit2;

  Product.find()
    .populate("writer")
    .sort({ sold: -1 }) //views를 오름차순으로 정렬
    .limit(limit2) //처음 페이지 부분  몇개 가줘올지 설정
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo
      });
    });
});

router.post("/products", (req, res) => {
  //product 콜렉션에 들어 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  if (term) {
    Product.find()
      .find({ title: { $regex: term, $options: "i" } })
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
    Product.find()
      .populate("writer")
      //.sort({ sold: 1 }) //views를 오름차순으로 정렬
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

//id=123123123,324234234,324234234  type=array
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    //id=123123123,324234234,324234234 이거를
    //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
    let ids = req.query.id.split(",");
    productIds = ids.map(item => {
      return item;
    });
  }

  //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    //.update({ _id: productIds }, { $inc: { views: 1 } }, { new: false })
    .exec((err, product) => {
      //console.log(product);
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

router.delete("/products_by_id_delete", (req, res) => {
  let deleteproductIds = req.query.id;

  let deleteids = req.query.id.split(",");
  deleteproductIds = deleteids.map(item => {
    return item;
  });

  Product.deleteOne({ _id: { $in: deleteproductIds } }).exec();
});

//업데이트 액션이 일어나면 먼저 저장되어있는 데이터들을 보여주기 위함
router.get("/products_by_id_get_update", (req, res) => {
  Product.find({ _id: { $in: req.query.id } }).exec((err, product) => {
    //console.log(product);
    if (err) return res.status(400).send(err);
    return res.status(200).send(product);
  });
});

//수정 할 body를 받아온 후 DB에 새롭게 업데이트
router.post("/products_by_id_update", (req, res) => {
  let updatetitle = req.body.title;
  let updatedescription = req.body.description;
  let updateprice = req.body.price;

  Product.update(
    { _id: { $in: req.body.id } },
    {
      $set: {
        title: updatetitle,
        description: updatedescription,
        price: updateprice
      }
    }
  ).exec(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//axios.get(`/api/product/products_by_id?id=${productId}&type=single`);

module.exports = router;
