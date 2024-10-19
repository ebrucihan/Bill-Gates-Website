import React, { useState } from "react";
import products from "../data/data.json";
import Money from "./Money.jsx"; // Money bileşenini import ettik
import Receipt from "./Receipt.jsx"; // Receipt bileşenini import ettik

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductList = () => {
  const [sellCounts, setSellCounts] = useState(Array(products.length).fill(0)); // Doğru başlatma
  const [balance, setBalance] = useState(100000000000); // Sabit para miktarı
  const [receiptItems, setReceiptItems] = useState([]); // Alınan ürünleri tutacak
  const [totalPrice, setTotalPrice] = useState(0); // Toplam fiyat

  const handleBuy = (index) => {
    const product = products[index];
    const productPrice = product.price;

    if (balance >= productPrice) {
      // Balance güncellemesi
      setBalance((prevBalance) => prevBalance - productPrice);

      // Ürün satış miktarını güncelleme
      setSellCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index] += 1; // Ürünün sayısını güncelleyerek 1 arttırıyoruz
        return newCounts;
      });

      // Fatura öğelerini güncelleme
      setReceiptItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.name === product.name
        );

        if (existingItemIndex !== -1) {
          // Eğer ürün daha önce eklenmişse miktarını ve toplam fiyatını güncelle
          const newItems = [...prevItems];
          newItems[existingItemIndex].count = sellCounts[index] + 1; // Güncel miktarı alıp 1 ekliyoruz
          newItems[existingItemIndex].totalPrice =
            newItems[existingItemIndex].count * productPrice; // Toplam fiyatı doğru hesapla
          return newItems;
        } else {
          // Ürün ilk kez ekleniyorsa yeni öğe olarak ekle
          const newItem = {
            name: product.name,
            price: productPrice, // Ürün birim fiyatı
            count: 1, // İlk kez ekleniyor, bu yüzden 1
            totalPrice: productPrice, // İlk eklenişte toplam fiyat ürün fiyatına eşittir
          };
          return [...prevItems, newItem];
        }
      });

      // Toplam fiyatı güncelleme
      setTotalPrice((prevTotal) => prevTotal + productPrice);
    } else {
      alert("Yetersiz bakiye!");
    }
  };

  const handleSell = (index) => {
    const product = products[index];
    const productPrice = product.price;

    if (sellCounts[index] > 0) {
      setBalance((prevBalance) => {
        const newBalance = prevBalance + productPrice;

        return newBalance;
      });

      setSellCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index] -= 1;

        return newCounts;
      });

      setReceiptItems((prevItems) => {
        const newItems = prevItems.filter((item) => item.name !== product.name);

        return newItems;
      });

      setTotalPrice((prevTotal) => {
        const newTotal = prevTotal - productPrice;

        return newTotal;
      });
    } else {
      alert("Satılacak ürün yok!");
    }
  };

  return (
    <div>
      <Money balance={balance} />
      <div className="product-list">
        {products.map((product, index) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">
              Price: ${formatPrice(product.price)}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button className="sell-button" onClick={() => handleSell(index)}>
                Sell
              </button>
              <input
                type="text"
                value={sellCounts[index]}
                readOnly
                className="sell-count-input"
              />
              <button className="buy-button" onClick={() => handleBuy(index)}>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      <Receipt items={receiptItems} total={totalPrice} />
    </div>
  );
};

export default ProductList;
