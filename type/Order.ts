export interface OrderProduct {
  id_producto: number;
  cantidad: number;
}

export interface Order {
  id: number;
  id_cliente: number;
  id_vendedor: number;
  estado: OrderStatus;
  fecha_creacion: string;
  fecha_entrega_estimada: string;
  id_vehiculo: number | null;
  productos: OrderProduct[];
}

export type OrderStatus = 
  | "ABIERTO"
  | "POR_ALISTAR"
  | "EN_ALISTAMIENTO"
  | "EN_REPARTO"
  | "ENTREGADO"
  | "DEVUELTO";

export interface OrderWithDetails extends Order {
  vehiculo_placa?: string;
  productos_detalles?: ProductDetail[];
  total?: number;
}

export interface ProductDetail {
  id: number;
  id_producto: number;
  nombre_producto: string;
  cantidad: number;
  valor_unitario_usd: number;
  subtotal: number;
}
