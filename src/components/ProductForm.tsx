import { Product } from "@/app/page";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductFormProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "fecha">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  products,
}) => {
  //---Estado para manejar los productos---
  const [newProduct, setNewProduct] = useState<Omit<Product, "fecha">>({
    codigo: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
  });

  //---Función para agregar un producto a la lista---
  const handleSubmit = () => {
    const exists = products.some(
      (product) => product.codigo === newProduct.codigo
    );
    if (exists) {
      toast.error("El código ya está registrado. Intente con otro código.", {
        position: "top-center",
        autoClose: 3000,
        isLoading: false,
      });
      return;
    }

    onAddProduct(newProduct);
    toast.success("¡Producto agregado exitosamente!", {
      position: "top-center",
      autoClose: 1000,
      isLoading: false,
    });

    setNewProduct({ codigo: 0, nombre: "", descripcion: "", cantidad: 0 });
  };

  //---Función para evitar caracteres especiales en los inputs de tipo número---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    }
  };

  //Función para evitar el scroll del raton en los inputs de tipo número---
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  //---Condición para habilitar el botón de agregar producto---
  const isSubmitted =
    newProduct.codigo > 0 &&
    newProduct.nombre.trim() !== "" &&
    newProduct.descripcion.trim() !== "" &&
    newProduct.cantidad > 0;

  return (
    <div className="mb-4 flex flex-col gap-3">
      <ToastContainer />
      <input
        type="number"
        placeholder="Ingrese el código del producto..."
        value={newProduct.codigo || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, codigo: Number(e.target.value) })
        }
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        className="border rounded-lg p-2  no-arrows"
      />
      <input
        type="text"
        placeholder="Ingrese el nombre del producto..."
        value={newProduct.nombre}
        onChange={(e) =>
          setNewProduct({ ...newProduct, nombre: e.target.value })
        }
        className="border p-2 rounded-lg"
      />
      <input
        type="text"
        placeholder="Ingrese la descripción del producto..."
        value={newProduct.descripcion}
        onChange={(e) =>
          setNewProduct({ ...newProduct, descripcion: e.target.value })
        }
        className="border p-2 rounded-lg"
      />
      <input
        type="number"
        placeholder="Ingrese la cantidad del producto..."
        value={newProduct.cantidad || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, cantidad: Number(e.target.value) })
        }
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        className="border p-2 rounded-lg no-arrows"
      />
      <button
        onClick={handleSubmit}
        disabled={!isSubmitted}
        className={`text-white p-2 w-[200px] self-center rounded-3xl shadow-[0px_8px_17px_-2px_rgba(0,_0,_0,_0.2)] ${
          !isSubmitted
            ? "cursor-not-allowed bg-gray-500"
            : "cursor-pointer bg-green-800 hover:bg-green-700"
        }`}
      >
        Agregar Producto
      </button>
    </div>
  );
};

export default ProductForm;
