"use client";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { useState } from "react";

export interface Product {
  codigo: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
}

export default function ProductApp() {
  //---Estado para manejar los productos---
  const [products, setProducts] = useState<Product[]>([]);

  //---Estado para manejar el orden de los productos---
  const [sortBy, setSortBy] = useState<keyof Product | "">("");

  //---Función para agregar un producto a la lista---
  const addProduct = (newProduct: Omit<Product, "fecha">) => {
    setProducts([
      ...products,
      { ...newProduct, fecha: new Date().toISOString() },
    ]);
  };

  //---Función para eliminar un producto de la lista---
  const deleteProduct = (codigo: number) => {
    setProducts(products.filter((product) => product.codigo !== codigo));
  };

  //---Función para ordenar los productos---
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
    <div className="p-4 flex flex-row justify-between gap-4 bg-slate-100 h-screen ">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-5 flex justify-center text-center">
          Gestiona tus Productos
        </h1>
        <ProductForm products={products} onAddProduct={addProduct} />
        <div className="flex flex-col justify-center p-8 gap-10">
          <Image
            src={"/assets/prueba-de-producto.png"}
            alt="Imagen Producto"
            width={200}
            height={200}
            className="flex self-center"
          />
          <p className="text-center font-bold text-2xl pl-30 pr-30">
            Administra tus productos de manera eficiente
          </p>
        </div>
      </div>
      <div className="pt-10 flex w-1/2 justify-center ">
        <div className="flex w-full justify-start flex-col gap-5 p-4 rounded-2xl shadow-[0px_8px_17px_-2px_rgba(0,_0,_0,_0.2)] bg-gradient-to-tl from-violet-300 to-indigo-200">
          <h2 className="text-2xl font-bold self-center text-center">
            Tu lista de productos
          </h2>
          <div className=" flex flex-col justify-start gap-3">
            <label className="font-bold text-xl">Ordenar productos por: </label>
            <select
              onChange={(e) => setSortBy(e.target.value as keyof Product)}
              className="border p-2  cursor-pointer text-sm bg-amber-50 rounded-lg"
            >
              <option value="">Seleccione...</option>
              <option value="codigo">Código</option>
              <option value="nombre">Nombre</option>
              <option value="cantidad">Cantidad</option>
              <option value="creacion">Fecha de Creación</option>
            </select>
          </div>
          <div className=" max-h-[600px] overflow-y-auto">
            <ProductList
              products={sortedProducts}
              onDeleteProduct={deleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
