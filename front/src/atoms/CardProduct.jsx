export const CardProduct = ({
  img,
  title,
  link,
  precio,
  cantidad = 1,
  carrito = false,
}) => {
  const handleClick = () => {
    window.location.href = link;
  };

  const addToCart = (e) => {
    e.stopPropagation(); // Evita que el clic en el botón también ejecute handleClick()
    alert("Añadido al carrito");
  };

  return (
    <div
      onClick={() => {
        !carrito && handleClick();
      }}
      className="relative flex flex-col w-full max-w-72 mx-auto bg-gradient-to-r from-pink-50 to-pink-100 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-xl font-semibold text-pink-700 mb-3">${precio}</p>
        <div className="flex items-center justify-between md:flex-row flex-col text-sm text-gray-600 mb-4">
          <p className="font-medium">Cantidad: {cantidad}</p>
          {carrito && (
            <button
              className="bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors duration-300"
              onClick={addToCart}
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
