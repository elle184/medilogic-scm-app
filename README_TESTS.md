# 🧪 Sistema de Pruebas Automático con GitHub Actions

## 💻 Ejecutar Pruebas Localmente

Si quieres ejecutar las pruebas localmente:

```bash
npm install react@18.2.0 react-native@0.72.8
npm install --save-dev react-test-renderer@18.2.0
npm install
npm test
```

### Configuración
```
✅ jest.config.js - Configuración de Jest
✅ jest.setup.js - Mocks y setup
✅ babel.config.js - Transpilación
✅ tsconfig.json - TypeScript configurado
✅ __mocks__/fileMock.js - Mock de archivos
✅ .github/workflows/test.yml - GitHub Actions workflow
```

## 💻 Comandos Disponibles

```bash
# Ejecutar todas las pruebas con cobertura (recomendado)
npm test

# Modo watch para desarrollo
npm run test:watch

# Ejecutar en modo CI (lo que usa GitHub Actions)
npm run test:ci

# Ejecutar un archivo específico
npm test -- Input.test.js
```

## 🔧 Workflow de Desarrollo

### 1. Desarrollas una feature
```bash
git checkout -b feature/nueva-funcionalidad
# ... escribes código y pruebas
npm test
git add .
git commit -m "feat: nueva funcionalidad"
git push
```

### 2. Creas un PR
- GitHub Actions se ejecuta **automáticamente**
- Esperas el check verde ✅
- Revisas el comentario del bot

### 3. Mergeas
- Si todas las pruebas pasan: ✅ Merge permitido
- Si alguna falla: ❌ Merge bloqueado

## 🛠️ Troubleshooting

### Las pruebas no pasan después de actualizar React
```bash
# Limpia todo y reinstala
rm -rf node_modules package-lock.json coverage
npm install
npm test
```

### Cobertura baja
1. Revisa qué archivos no están cubiertos: `coverage/lcov-report/index.html`
2. Agrega pruebas para esos archivos
3. Re-ejecuta `npm test`

## 📚 Recursos

- [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/)
- [Jest Documentation](https://jestjs.io/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

