import React from "react";
import Item from "./utils/Item";
import Title from "./utils/Title";

interface ItemProps {
  id: string;
  title: string;
  text: string;
  rating: string;
  btn: string;
  img: string;
  price: number;
  color: string;
  shadow: string;
  cartQuantity: number;
}

interface SalesProps {
  title: string;
  items: ItemProps[];
  ifExists?: boolean; // If you still need this property
}

const Sales: React.FC<SalesProps> = ({ title, items, ifExists }) => {
  return (
    <div className="nike-container">
      <Title title={title} />
      <div
        className={`grid items-center justify-items-center gap-9 lg:gap-5 mt-7 ${
          ifExists
            ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
            : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        }`}
      >
        {items.map((item, i) => (
          <Item {...item} key={i} ifExists />
        ))}
      </div>
    </div>
  );
};

export default Sales;
