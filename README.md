- [완성된 사이트 바로가기](http://ec2-3-35-52-99.ap-northeast-2.compute.amazonaws.com/)

※ 상품을 등록하거나 수정하는 기능은 관리자 계정으로만 이용할 수 있습니다.

```
Email : admin@admin.com
Password : adminadmin
```

※ 회원가입이 번거로우신 분들은 아래의 계정을 이용해 주세요.

```
Email : guest@guest.com
Password: guestguest
```

※ Paypal 결제는 이걸로 해주세요.

```
ID : sb-h5gzd5876891@personal.example.com
Password: adminadmin
```

## 1. 기능 소개

---

1. Auth 🔐

```
   1-1. 로그인
    - JWT를 이용하여 로그인 기능 구현
   1-2. 회원가입
    - bcryptf를 이용하여 비밀번호 암호화 기능
```

2. Main

```
2-1. Best Item
  > 전체 상품중 판매량을 기준으로 Best Item 선정하여 보여주기
2-2. 더 보기
  > More(더 보기 ) 기능을 추가하여 화면 칸 에 들어오지 못한 상품들을 더 보여주기
2-3. 검색
  > 브랜드 별 / 가격 별 선택을 하여 검색을  할 수 있음 두 개의 기능을 사용하지 않고 product 명을 사용하여 검색 가능
```

3. Product

```
3-1. 상품의 상세정보를 보여주는 페이지
3-2. 옵션 선택
  > 사이즈 별 선택 가능
3-3. 장바구니
  > 사이즈 선택 후 장바구니에 넣어 구매를 할 수 있도록 유도
  > 해당 기능은 로그인 후에만 이용 가능
```

4. CartPage

```
4-1. 장바구니
  > 사이즈와 개수에 따른 가격 표시
  > 장바구니 내의 total 값 표시
  > 삭제버튼을 클릭하여 장바구니에서 상품 제거
```

5. Admin

```
5-1. 로그아웃
5-2. 상품 등록
  > Mongo DB를 이용하여 상품 이미지 업로드
  > 브랜드 와 내용 추가 가능
```

6. Payment

```
6-1. 결제
  > Paypal compoment를 사용하여 임의의 결제가 가능하게 하여 현실결제와 똑같은 기능 구현
```

Paypal 에서 KRW(원화) 를 지원해주지 않아 USD로 진행됨
[Paypal SDK currency 확인](https://developer.paypal.com/docs/checkout/reference/customize-sdk/)

## 2. 사용도구

---

### Front-end

- React
- React Hooks
- Reducer
- nginx

### Back-end

- Node.js(Express)
- MongoDB(Atlas)

### Util

- AWS EC2
- AWS S3
- Paypal Develvoper tool
