import api from "./api";
import { Product } from "../type/Product";

export const ProductosService = {
  /**
   * Obtener información de un producto por ID
   * @param productoId ID del producto
   */
  getProductoById: async (productoId: number): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/productos/${productoId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  },

  /**
   * Obtener múltiples productos por sus IDs
   * @param productoIds Array de IDs de productos
   */
  getProductosByIds: async (productoIds: number[]): Promise<Product[]> => {
    try {
      const promises = productoIds.map(id => ProductosService.getProductoById(id));
      const productos = await Promise.all(promises);
      return productos;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },
};
