import React from "react";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Receipt = ({ items, total }) => {
  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.count}) - $
            {formatPrice(item.price * item.count)}
          </li>
        ))}
      </ul>
      <h3>Total Price: ${formatPrice(total)}</h3>
    </div>
  );
};

export default Receipt;
