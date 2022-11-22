import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import products from "../products";
import { addToCart,getTotal } from "../feature/cartSlice/cartSlice";


const Home = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart)
  const data = products;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  useEffect(() => {
    dispatch(getTotal())
  },[cart,dispatch])
  return (
    <div className="home-container">
      <h2>New Arrivals</h2>
      <div className="products">
        {data &&
          data?.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
