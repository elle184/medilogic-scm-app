export interface Product {
  id: number;
  sku: string;
  nombre_producto: string;
  valor_unitario_usd: number;
  tipo_medicamento: string;
  estado: ProductStatus;
}

export type ProductStatus = "ACTIVO" | "INACTIVO" | "DESCONTINUADO";
