import { useContext } from "react";
import { LayoutNavFoo } from "../layouts/LayoutNavFoo";
import { ValuContext } from "../context/ValuContext";
import { CardCategory } from "../atoms/CardCategory";

export const Productos = () => {
  const { categories } = useContext(ValuContext);

  return (
    <LayoutNavFoo>
      <div className="py-8 px-4">
        <h1 className="text-4xl font-semibold text-center">
          Categorías Destacadas
        </h1>
        <p className="text-center text-xl mt-7">
          Explora nuestros accesorios y complementa tus looks en tu día a día.
        </p>
        <hr className="border border-gray-300 my-4" />
        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {categories.map(({ id, nombre, imagen, descripcion }) => (
            <CardCategory
              key={id}
              img={imagen}
              title={nombre}
              description={descripcion}
              link={`/productos/${nombre}`}
            />
          ))}
        </div>
      </div>
    </LayoutNavFoo>
  );
};
