import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  console.log(data);
  return <div>Header</div>;
};

export default Header;
