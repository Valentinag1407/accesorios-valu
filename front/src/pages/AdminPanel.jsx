import { useEffect, useState } from "react";
import { ProductForm } from "../components/ProductFrom";
import { LayoutNavFoo } from "../layouts/LayoutNavFoo";
import { api } from "../api/axiosConfig";
import { MdEdit, MdDelete } from "react-icons/md";
import { showToast } from "../utils/toast";
import { BiLastPage, BiFirstPage } from "react-icons/bi";

export const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const response = await api.get("/productos/get");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categorias/get");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct({});
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  function formatearDinero(digito) {
    const formateado = digito.toLocaleString("es-ES");
    return `$${formateado}`;
  }

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/productos/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
      showToast("Producto eliminado exitosamente", "success");
    } catch (error) {
      showToast(error.response.data?.detail, "error");
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredProducts(
      products.filter((product) =>
        product.nombre.toLowerCase().includes(value.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <LayoutNavFoo>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={handleSearch}
            className="mt-4 p-2 border border-gray-300 rounded outline-pink-300"
          />
          <button
            className="bg-pink-200 text-gray-800 px-4 py-2 rounded shadow hover:shadow-lg transition duration-300"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </div>

        <div className="mt-6 pb-5 shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-pink-200 text-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Precio</th>
                <th className="py-3 px-4 text-left">Categoría</th>
                <th className="py-3 px-4 text-left">Cantidad</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-b transition duration-300 hover:bg-gray-200`}
                  >
                    <td className="py-3 px-4">{product.nombre}</td>
                    <td className="py-3 px-4">
                      {formatearDinero(product.precio)}
                    </td>
                    <td className="py-3 px-4">
                      {categories[product.categoria - 1]?.nombre}
                    </td>
                    <td className="py-3 px-4">{product.cantidad}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <MdEdit
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => handleEditProduct(product)}
                        />
                        <MdDelete
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center space-x-2 mt-4">
            <BiFirstPage
              size={40}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800"
              }`}
            />

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded ${
                    currentPage === number
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <BiLastPage
              size={40}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
          </div>
        </div>

        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
          />
        )}
      </div>
    </LayoutNavFoo>
  );
};
