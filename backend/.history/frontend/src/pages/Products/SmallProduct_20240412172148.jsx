import { Link } from "react-router-dom";
const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img src={product.img} alt={product.name} className="h-auto rounded" />
        {/* {<HeartIcon product={product}/>} */}
        <div className="p-54">
          <Link to={`product/${product._id}`}>
            <h2 className="flex justify-between items-enter">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:text-cyan-300">
                ₹{product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
