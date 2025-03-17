"use client";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { useState } from "react";

export interface Product {
  codigo: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  creacion: string;
}

export default function ProductApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<keyof Product | "">("");

  const addProduct = (newProduct: Omit<Product, "creacion">) => {
    setProducts([
      ...products,
      { ...newProduct, creacion: new Date().toISOString() },
    ]);
  };

  const deleteProduct = (codigo: number) => {
    setProducts(products.filter((product) => product.codigo !== codigo));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "creacion") {
      return new Date(a.creacion) < new Date(b.creacion) ? -1 : 1;
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
    <div className="p-4 flex flex-row justify-between">
      <div className="w-1/2">
        <h1 className="text-xl font-bold mb-4">Gestión de Productos</h1>
        <ProductForm onAddProduct={addProduct} />

        <div className="mb-4 flex flex-col justify-start">
          <label className="font-bold">Ordenar productos por: </label>
          <select
            onChange={(e) => setSortBy(e.target.value as keyof Product)}
            className="border p-2 rounded"
          >
            <option value="">Seleccione...</option>
            <option value="codigo">Código</option>
            <option value="nombre">Nombre</option>
            <option value="cantidad">Cantidad</option>
            <option value="creacion">Fecha de Creación</option>
          </select>
        </div>
      </div>
      <div className="flex w-1/2 justify-center pt-10">
        <ProductList
          products={sortedProducts}
          onDeleteProduct={deleteProduct}
        />
      </div>
    </div>
  );
}
