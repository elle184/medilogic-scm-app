# MediLogic SCM App

Aplicación móvil React Native para gestión de supply chain médico.

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo `.env.example` a `.env` y configura las variables
2. Para Android: Configura tu Google Maps API Key en `android/app/src/main/AndroidManifest.xml`

## Ejecución

```bash
# Android
npm run android

# iOS
npm run ios
```

## Funcionalidades

### 📦 Gestión de Órdenes
Flujo completo de visualización y seguimiento de órdenes con:
- Listado con filtros por estado
- Detalle con información completa
- Mapa de seguimiento en tiempo real (para órdenes en reparto)
- Polling automático cada 5 segundos

Ver documentación detallada en [ORDERS_FLOW_README.md](./ORDERS_FLOW_README.md)

### 👥 Asignaciones
Gestión de asignaciones de clientes a vendedores

### 📅 Visitas
Programación de visitas a clientes

## Estructura del Proyecto

```
medilogic-scm-app/
├── components/          # Componentes reutilizables
│   ├── assignment/
│   └── orders/         # Componentes del flujo de órdenes
├── constants/          # Constantes de la app
├── screens/            # Pantallas principales
├── services/           # Servicios de API
├── type/              # Tipos TypeScript
└── utils/             # Utilidades
```

## Tecnologías

- React Native 0.81.4
- Expo ~54.0
- TypeScript ~5.9
- React Navigation 7.x
- Axios 1.7.7
- React Native Maps 1.18.0
