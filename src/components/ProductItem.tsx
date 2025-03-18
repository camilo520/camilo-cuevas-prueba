import { Product } from "@/app/page";
import Image from "next/image";
import React from "react";

interface ProductItemProps {
  product: Product;
  onDelete: (codigo: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <li className="p-2 ">
      <div className="shadow-[0px_0px_8px_0px_rgba(0,_0,_0,_0.2)] p-2 rounded mb-2 flex justify-between items-center">
        <div>
          <p className="text-xl ">
            <strong>{product.nombre}</strong>
          </p>
          <p>Descripción: {product.descripcion}</p>
          <p>
            <small>
              Código: {product.codigo} | Cantidad: {product.cantidad} |
              Creación: {new Date(product.fecha).toLocaleDateString()}
            </small>
          </p>
        </div>
        <button
          onClick={() => onDelete(product.codigo)}
          className="bg-red-400  w-[40px] rounded cursor-pointer  hover:bg-red-500"
        >
          <Image
            src={"/assets/trash.svg"}
            alt="trash"
            width={100}
            height={100}
            className="hover:invert-[.99]"
          />
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
