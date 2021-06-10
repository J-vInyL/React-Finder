import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../util/ImageSlider";
import FilterMenu from "./Sections/FilterMenu";
import PriceMenu from "./Sections/PriceMenu";
import SearchFeature from "./Sections/SearchFeature";
import { brand, price } from "./Sections/Datas";

function LandingPage() {
  const [Product, setProduct] = useState([]);
  const [Popular, setPopular] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PopularLimit, setPopularLimit] = useState(4);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ brand: [], price: [] });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
      limit2: PopularLimit
    };

    getProducts(body);
    getPopular(body);
  }, []);

  const getProducts = body => {
    axios.post("/api/product/products", body).then(response => {
      if (response.data.success) {
        if (body.loadMore) {
          setProduct([...Product, ...response.data.productInfo]);
        } else {
          setProduct(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  };

  //popular 만 받아오기
  const getPopular = value => {
    axios.post("/api/product/popular", value).then(response => {
      if (response.data.success) {
        setPopular(response.data.productInfo);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    // 0 = 0 + 8 = 8
    // 8 = 8+ 8 = 16
    let body = {
      skip: skip, //Skip 을 사용하면 Skip이 위에 let skip을 활용못하고 계속 0 으로 돌아가기 때문에 홈페이지 더보기를 누르면 0번째 사진부터 다시 보여줌 그래서 새로운 skip 을 사용
      limit: Limit,
      loadMore: true
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Product.map((product, index) => {
    //console.log("product", product);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider image={product.image} />
            </a>
          }
        >
          <Meta title={product.title} description={`${product.price} USD`} />
        </Card>
      </Col>
    );
  });

  const popularrenderCards = Popular.map((popular, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${popular._id}`}>
              <ImageSlider image={popular.image} />
            </a>
          }
        >
          <Meta title={popular.title} description={`${popular.price} USD`} />
        </Card>
      </Col>
    );
  });

  const showFilterResults = filters => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters
    };

    getProducts(body);
    setSkip(0);
  };

  const handleprice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleBrand = value => {
    const data = brand;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    //console.log("what filters", category);

    if (category === "brand") {
      let brandValues = handleBrand(filters);
      newFilters[category] = brandValues;
      //console.log("what filters", newFilters);
    }
    if (category === "price") {
      let prcieValues = handleprice(filters);
      newFilters[category] = prcieValues;
      //console.log("what filters123", newFilters);
    }

    showFilterResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = newSearchTerm => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      {/* Search */}
      <div>
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>
          인기 상품 <Icon type="like" />{" "}
        </h2>
      </div>

      <Row gutter={[16, 16]}>{popularrenderCards}</Row>
      <br />

      <div style={{ textAlign: "center" }}>
        <h2>
          발매 상품 <Icon type="rocket" />{" "}
        </h2>
      </div>

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
