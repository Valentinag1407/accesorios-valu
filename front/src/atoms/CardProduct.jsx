export const CardProduct = ({ img, title, link, precio, carrito = false }) => {
  const handleClick = () => {
    window.location.href = link;
  };

  const addToCart = () => {
    alert("Añadido al carrito");
  };
  return (
    <div
      onClick={() => {
        !carrito && handleClick();
      }}
      className="flex items-center w-64 justify-center flex-col gap-2 border border-black hover:shadow-xl transition duration-300 ease-in-out cursor-pointer py-4 px-3 rounded-lg"
    >
      <h3 className="text-2xl font-medium">{title}</h3>
      <img src={img} className="w-full" />
      <p className="text-lg">${precio}</p>
      {carrito && (
        <button
          className="text-lg bg-black px-3 py-2 rounded-md text-white"
          onClick={addToCart}
        >
          Añadir al carrito
        </button>
      )}
    </div>
  );
};
