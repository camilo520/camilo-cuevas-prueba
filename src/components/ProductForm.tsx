import { Product } from "@/app/page";
import React, { useState } from "react";

interface ProductFormProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "fecha">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  products,
}) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "fecha">>({
    codigo: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
  });

  const handleSubmit = () => {
    const exists = products.some(
      (product) => product.codigo === newProduct.codigo
    );
    if (exists) {
      alert("El código ya está registrado. Intente con otro.");
      return;
    }

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
        className="border p-2 rounded no-arrows "
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
        className={` text-white p-2 w-[40%] self-center rounded-3xl ${
          !isSubmitted
            ? "cursor-not-allowed bg-gray-500"
            : "cursor-pointer bg-green-800 hover:bg-green-700 "
        }`}
      >
        Agregar Producto
      </button>
    </div>
  );
};

export default ProductForm;
