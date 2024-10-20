import { useState } from "react";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";

import "./index.css";
import "./css/header.css";
import "./css/money.css";
import "./css/productlist.css";
import "./css/receipt.css";

function App() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
}

export default App;
