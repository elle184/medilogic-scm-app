// Script de verificación rápida de imports
console.log('🔍 Verificando imports...\n');

try {
  console.log('✓ Servicios:');
  require('./services/api');
  console.log('  - api.ts');
  require('./services/ordenes.service');
  console.log('  - ordenes.service.ts');
  require('./services/vehiculos.service');
  console.log('  - vehiculos.service.ts');
  require('./services/productos.service');
  console.log('  - productos.service.ts');

  console.log('\n✓ Tipos:');
  require('./type/Order');
  console.log('  - Order.ts');
  require('./type/Vehicle');
  console.log('  - Vehicle.ts');
  require('./type/Product');
  console.log('  - Product.ts');

  console.log('\n✓ Constantes:');
  require('./constants/orderConstants');
  console.log('  - orderConstants.ts');

  console.log('\n✓ Utils:');
  require('./utils/dateUtils');
  console.log('  - dateUtils.ts');

  console.log('\n✓ Componentes:');
  require('./components/orders/OrderCard');
  console.log('  - OrderCard.tsx');
  require('./components/orders/OrderHeader');
  console.log('  - OrderHeader.tsx');
  require('./components/orders/OrderMap');
  console.log('  - OrderMap.tsx');
  require('./components/orders/OrderStatusMessage');
  console.log('  - OrderStatusMessage.tsx');
  require('./components/orders/OrderProducts');
  console.log('  - OrderProducts.tsx');

  console.log('\n✓ Pantallas:');
  require('./screens/OrdersListScreen');
  console.log('  - OrdersListScreen.tsx');
  require('./screens/OrderDetailScreen');
  console.log('  - OrderDetailScreen.tsx');

  console.log('\n✅ Todos los archivos se importaron correctamente!\n');
} catch (error) {
  console.error('\n❌ Error al importar:', error.message);
  process.exit(1);
}
