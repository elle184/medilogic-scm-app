import { OrderStatus } from "../type/Order";

export const ESTADOS_ORDEN = {
  TODOS: null,
  ABIERTO: 'ABIERTO',
  POR_ALISTAR: 'POR_ALISTAR',
  EN_ALISTAMIENTO: 'EN_ALISTAMIENTO',
  EN_REPARTO: 'EN_REPARTO',
  ENTREGADO: 'ENTREGADO',
  DEVUELTO: 'DEVUELTO',
} as const;

export const TEXTO_ESTADO: Record<OrderStatus, string> = {
  ABIERTO: 'Abierta',
  POR_ALISTAR: 'Por alistar',
  EN_ALISTAMIENTO: 'En alistamiento',
  EN_REPARTO: 'En reparto',
  ENTREGADO: 'Entregada',
  DEVUELTO: 'Devuelta',
};

export const MENSAJES_ESTADO: Record<OrderStatus, string | null> = {
  ABIERTO: 'Tu pedido ha sido registrado y está siendo procesado',
  POR_ALISTAR: 'Tu pedido está en cola para ser preparado',
  EN_ALISTAMIENTO: 'Estamos preparando tu pedido',
  EN_REPARTO: null, // Mostrar mapa
  ENTREGADO: 'Tu pedido fue entregado',
  DEVUELTO: 'Este pedido fue devuelto',
};

export const COLORES_ESTADO: Record<OrderStatus, string> = {
  ABIERTO: '#6C757D',           // Gris
  POR_ALISTAR: '#FFC107',       // Amarillo
  EN_ALISTAMIENTO: '#FD7E14',   // Naranja
  EN_REPARTO: '#0D6EFD',        // Azul
  ENTREGADO: '#198754',         // Verde
  DEVUELTO: '#DC3545',          // Rojo
};

export const FILTROS_ESTADO = [
  { label: 'TODOS', value: 'TODOS' },
  { label: 'Abierta', value: 'ABIERTO' },
  { label: 'Por alistar', value: 'POR_ALISTAR' },
  { label: 'En alistamiento', value: 'EN_ALISTAMIENTO' },
  { label: 'En reparto', value: 'EN_REPARTO' },
  { label: 'Entregada', value: 'ENTREGADO' },
  { label: 'Devuelta', value: 'DEVUELTO' },
];

export const POLLING_INTERVAL_MS = 5000; // 5 segundos
