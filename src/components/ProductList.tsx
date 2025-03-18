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
    <div>
      {products.length ? (
        <ul>
          <div>
            {products.map((product) => (
              <ProductItem
                key={product.codigo}
                product={product}
                onDelete={onDeleteProduct}
              />
            ))}
          </div>
        </ul>
      ) : (
        <div className="flex flex-col mt-50">
          <p className="flex self-center justify-center text-center">
            No tienes productos creados actualmente
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
