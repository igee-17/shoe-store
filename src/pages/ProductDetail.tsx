import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAddItemToCart } from "../app/CartSlice";
import SharedLayout from "../components/SharedLayout";

interface ProductDetailProps {
  items: ItemProps[];
}

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

interface CartItem extends ItemProps {
  // Additional properties specific to cart items can be added here
}

const ProductDetail: React.FC<ProductDetailProps> = ({ items }) => {
  const { itemId } = useParams<{ itemId: string }>();
  const dispatch = useDispatch();

  const selectedItem = items.find((item) => item.id === itemId);

  const onAddToCart = () => {
    if (selectedItem) {
      const cartItem: CartItem = selectedItem; // You might need to adjust this to match the actual structure of CartItem
      dispatch(setAddItemToCart(cartItem));
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  return (
    <SharedLayout>
      <div className="bg-theme clip-path h-[95vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto opacity-100 z-10 pt-[120px]">
        <div className="flex nike-container  ">
          <div className="w-3/5">
            <img
              src={selectedItem.img}
              alt={`item-${selectedItem.id}`}
              className="w-full z-20 transitions-theme hover:-rotate-12 -rotate-[-15deg]"
            />
          </div>
          <div className="w-2/5 px-8">
            <h1 className="text-xl font-semibold mb-2 text-white">
              {selectedItem.title}
            </h1>
            <p className="text-[#bcb7b7] mb-4">{selectedItem.text}</p>
            <div
              className={`h-10 w-10 rounded-full bg-gradient-to-b ${selectedItem.color} mb-4`}
              //   style={{ background: `${selectedItem.color}` }}
              //   style={{ background: "black" }}
            ></div>
            <p className="text-lg font-medium mb-2">${selectedItem.price}</p>
            <button
              type="button"
              className="bg-white text-black px-4 py-2 rounded-md"
              onClick={() => onAddToCart()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default ProductDetail;
