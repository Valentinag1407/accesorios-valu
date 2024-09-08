export const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-pink-600">404</h1>
        <p className="text-xl text-gray-600 mt-2">Página no encontrada</p>
        <p className="mt-4 text-gray-500">
          Lo siento, la página que estás buscando no existe.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};
