import React from 'react'
import img2 from "../assets/Shoe (1).jpg"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const img1 =
  "https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4";

const Home = () => {

  const productList = [
    {
      name: "Mac Book",
      price: 12000,
      imgSrc: img1,
      id: "jdjdjdjksk",
    },
    {
      name: "Red Shoes",
      price: 490,
      imgSrc: img2,
      id: "jdjdjksksdjksk",
    },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    // console.log(options);
    dispatch({
      type: "addToCart",
      payload: options
    })
    dispatch({type: "calculatePrice"});
    toast.success("Added to Cart");
  };
  // note -> options mein as object bheje hai onclick pe niche dekho 

  return (
    <div className="home">
      {
        productList.map(i => (
          <ProductCard
            key={i.id}
            id={i.id}
            imgSrc={i.imgSrc}
            name={i.name}
            price={i.price}
            handler={addToCartHandler} />
        ))
      }
    </div>
  )
};

// cons funName = ()=> (agar parenthesi h toh o return krega yha ek div)

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
)

export default Home

// button pe click krte hi jo handler mein object bheje hai ki ye o sara optons mein chala jayega aur baad mein yhi dispatch kr denge jo action.payload mein jayega reducer.js mein jisko item mein rkh deng.

