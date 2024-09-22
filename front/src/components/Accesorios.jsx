import { useContext } from "react";
import { CardCategory } from "../atoms/CardCategory";
import { ValuContext } from "../context/ValuContext";

export const Accesorios = () => {
  const { categories } = useContext(ValuContext);
  return (
    <div className="flex flex-col items-center justify-center h-fit w-full py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black">
          ACCESORIOS DE MUJER IDEALES PARA TUS OUTFITS
        </h1>
        <p className="mt-4 text-gray-500 text-xl">
          Explora nuestros accesorios y complementa tus looks en tu día a día.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 mt-8">
        {categories.map(({ id, nombre, imagen }) => (
          <CardCategory
            key={id}
            img={imagen}
            title={nombre}
            link={`/productos/${nombre}`}
          />
        ))}
      </div>
    </div>
  );
};
