import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "@/app/page";

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (codigo: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onDeleteProduct,
}) => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          key={product.codigo}
          product={product}
          onDelete={onDeleteProduct}
        />
      ))}
    </ul>
  );
};

export default ProductList;
