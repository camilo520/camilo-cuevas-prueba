import { Product } from "@/app/page";
import React from "react";

interface ProductItemProps {
  product: Product;
  onDelete: (codigo: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <li className="border p-2 rounded mb-2 flex justify-between items-center">
      <div>
        <p>
          <strong>{product.nombre}</strong>
        </p>
        <p>{product.descripcion}</p>
        <p>
          <small>
            Código:{product.codigo} Cantidad: {product.cantidad} | Creación:{" "}
            {new Date(product.creacion).toLocaleDateString()}
          </small>
        </p>
      </div>
      <button
        onClick={() => onDelete(product.codigo)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Eliminar
      </button>
    </li>
  );
};

export default ProductItem;
