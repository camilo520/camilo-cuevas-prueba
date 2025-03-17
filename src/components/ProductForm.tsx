import { Product } from "@/app/page";
import React, { useState } from "react";

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, "creacion">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "creacion">>({
    codigo: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
  });

  const handleSubmit = () => {
    onAddProduct(newProduct);
    setNewProduct({ codigo: 0, nombre: "", descripcion: "", cantidad: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    }
  };

  const isSubmitted =
    newProduct.codigo > 0 &&
    newProduct.nombre.trim() !== "" &&
    newProduct.descripcion.trim() !== "" &&
    newProduct.cantidad > 0;

  return (
    <div className="mb-4 flex flex-col gap-2">
      <input
        type="number"
        placeholder="Ingrese el código del producto..."
        value={newProduct.codigo || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, codigo: Number(e.target.value) })
        }
        onKeyDown={handleKeyDown}
        className="border p-2 rounded no-arrows"
      />
      <input
        type="text"
        placeholder="Ingrese el nombre del producto..."
        value={newProduct.nombre}
        onChange={(e) =>
          setNewProduct({ ...newProduct, nombre: e.target.value })
        }
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Ingrese la descripción del producto..."
        value={newProduct.descripcion}
        onChange={(e) =>
          setNewProduct({ ...newProduct, descripcion: e.target.value })
        }
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Ingrese la cantidad del producto..."
        value={newProduct.cantidad || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, cantidad: Number(e.target.value) })
        }
        onKeyDown={handleKeyDown}
        className="border p-2 rounded no-arrows"
      />
      <button
        onClick={handleSubmit}
        disabled={!isSubmitted}
        className={` text-white p-2 rounded ${
          !isSubmitted
            ? "cursor-not-allowed bg-gray-500"
            : "cursor-pointer bg-blue-500"
        }`}
      >
        Agregar Producto
      </button>
    </div>
  );
};

export default ProductForm;
