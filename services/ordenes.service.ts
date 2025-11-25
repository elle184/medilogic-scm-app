import api from "./api";
import { Order } from "../type/Order";

export const OrdenesService = {
  /**
   * Obtener todas las órdenes de un cliente con filtro opcional por estado
   * @param clienteId ID del cliente
   * @param estado Estado opcional (ABIERTO, POR_ALISTAR, EN_ALISTAMIENTO, EN_REPARTO, ENTREGADO, DEVUELTO)
   */
  getOrdenesByCliente: async (clienteId: number, estado?: string): Promise<Order[]> => {
    try {
      const params: any = { id_cliente: clienteId };
      if (estado && estado !== 'TODOS') {
        params.estado = estado;
      }
      
      const response = await api.get<Order[]>("/ordenes", { params });
      return response.data;
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      throw error;
    }
  },

  /**
   * Obtener detalle de una orden por ID
   * @param ordenId ID de la orden
   */
  getOrdenById: async (ordenId: number): Promise<Order> => {
    try {
      const response = await api.get<Order>(`/ordenes/${ordenId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener detalle de orden:", error);
      throw error;
    }
  },
};
