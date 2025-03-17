"use client";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { useState } from "react";

export interface Product {
  codigo: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
}

export default function ProductApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<keyof Product | "">("");

  const addProduct = (newProduct: Omit<Product, "fecha">) => {
    setProducts([
      ...products,
      { ...newProduct, fecha: new Date().toISOString() },
    ]);
  };

  const deleteProduct = (codigo: number) => {
    setProducts(products.filter((product) => product.codigo !== codigo));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "fecha") {
      return new Date(a.fecha) < new Date(b.fecha) ? -1 : 1;
    }

    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return fieldA - fieldB;
    }

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return fieldA.localeCompare(fieldB);
    }

    return 0;
  });

  return (
    <div className="p-4 flex flex-row justify-between gap-4 bg-white h-screen">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-4 flex justify-center text-center">
          Gestiona tus Productos
        </h1>
        <ProductForm products={products} onAddProduct={addProduct} />

        <div className="mb-4 flex flex-col justify-start ">
          <label className="font-bold text-2xl">Ordenar productos por: </label>
          <select
            onChange={(e) => setSortBy(e.target.value as keyof Product)}
            className="border p-2 rounded cursor-pointer text-sm"
          >
            <option value="">Seleccione...</option>
            <option value="codigo">Código</option>
            <option value="nombre">Nombre</option>
            <option value="cantidad">Cantidad</option>
            <option value="creacion">Fecha de Creación</option>
          </select>
        </div>
      </div>
      <div className="pt-10 flex w-1/2 justify-center ">
        <div className="flex w-full justify-start flex-col gap-5 p-4 h-[650px] overflow-y-auto rounded-2xl border-1 bg-indigo-100">
          <h2 className="text-2xl font-bold self-center text-center">
            Tu lista de productos
          </h2>
          <ProductList
            products={sortedProducts}
            onDeleteProduct={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
}
