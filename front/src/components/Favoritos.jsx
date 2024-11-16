import { useEffect, useState } from "react";
import { api } from "../api/axiosConfig";
import { CardProduct } from "../atoms/CardProduct";

export const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await api.get("/productos/getFavorites/");
        console.log(response.data);
        setFavoritos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoritos();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-fit w-full py-8 px-4">
      <h1 className="text-2xl font-bold text-center">
        CONOCE NUESTROS FAVORITOS
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-8 mt-8 px-44">
        {favoritos.map((favorito) => {
          console.log(`${import.meta.env.VITE_BACK_URL}${favorito.imagen}`);
          return (
            <CardProduct
              key={favorito.id}
              id={favorito.id}
              img={`${import.meta.env.VITE_BACK_URL}${favorito.imagen}`}
              title={favorito.nombre}
              link={`/productos/${favorito.categoria.nombre}`}
              precio={favorito.precio}
              cantidad={favorito.cantidad}
              carrito={true}
            />
          );
        })}
      </div>
    </div>
  );
};
