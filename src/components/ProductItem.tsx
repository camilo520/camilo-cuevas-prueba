import { Product } from "@/app/page";
import Image from "next/image";
import React from "react";

interface ProductItemProps {
  product: Product;
  onDelete: (codigo: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <li className="border p-2 rounded mb-2 flex justify-between items-center">
      <div>
        <p className="text-xl">
          <strong>{product.nombre}</strong>
        </p>
        <p>Descripción: {product.descripcion}</p>
        <p>
          <small>
            Código:{product.codigo} | Cantidad: {product.cantidad} | Creación:{" "}
            {new Date(product.fecha).toLocaleDateString()}
          </small>
        </p>
      </div>
      <button
        onClick={() => onDelete(product.codigo)}
        className="bg-red-500 text-white w-[50px] rounded cursor-pointer"
      >
        <Image src={"/assets/trash.svg"} alt="trash" width={100} height={100} />
      </button>
    </li>
  );
};

export default ProductItem;
