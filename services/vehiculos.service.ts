import api from "./api";
import { Vehicle, VehicleLocation } from "../type/Vehicle";

export const VehiculosService = {
  /**
   * Obtener información de un vehículo por ID
   * @param vehiculoId ID del vehículo
   */
  getVehiculoById: async (vehiculoId: number): Promise<Vehicle> => {
    try {
      const response = await api.get<Vehicle>(`/vehiculos/${vehiculoId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener información del vehículo:", error);
      throw error;
    }
  },

  /**
   * Obtener ubicación actual de un vehículo
   * @param vehiculoId ID del vehículo
   */
  getUbicacionVehiculo: async (vehiculoId: number): Promise<VehicleLocation> => {
    try {
      const response = await api.get<VehicleLocation>(`/vehiculos/${vehiculoId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener ubicación del vehículo:", error);
      throw error;
    }
  },
};
