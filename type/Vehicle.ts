export interface Vehicle {
  id: number;
  placa: string;
  modelo: string;
  capacidad_kg: number;
  estado: VehicleStatus;
}

export type VehicleStatus = "ACTIVO" | "INACTIVO" | "EN_MANTENIMIENTO";

export interface VehicleLocation {
  id_vehiculo: number;
  latitud: number;
  longitud: number;
  timestamp: string;
}
