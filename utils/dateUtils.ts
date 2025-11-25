/**
 * Formatea una fecha ISO a formato DD/MM/YYYY
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea una fecha ISO a formato DD/MM/YYYY HH:mm
 */
export const formatDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Devuelve un timestamp relativo (ej: "hace 2 minutos", "hace 1 hora")
 */
export const getRelativeTime = (isoDate: string): string => {
  const now = new Date();
  const past = new Date(isoDate);
  const diffMs = now.getTime() - past.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'hace unos segundos';
  } else if (diffMinutes === 1) {
    return 'hace 1 minuto';
  } else if (diffMinutes < 60) {
    return `hace ${diffMinutes} minutos`;
  } else if (diffHours === 1) {
    return 'hace 1 hora';
  } else if (diffHours < 24) {
    return `hace ${diffHours} horas`;
  } else if (diffDays === 1) {
    return 'hace 1 día';
  } else {
    return `hace ${diffDays} días`;
  }
};
