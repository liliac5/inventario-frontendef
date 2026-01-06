# Guía de Despliegue en Render

Esta guía te ayudará a desplegar el frontend de Angular en Render.

## 📋 Requisitos Previos

1. Tener una cuenta en [Render](https://render.com)
2. Tener el código en un repositorio de GitHub
3. Tener el backend ya desplegado en Render (opcional, pero recomendado)

## 🚀 Pasos para Desplegar

### Paso 1: Preparar el Repositorio

1. Asegúrate de que todos los archivos estén en tu repositorio de GitHub:
   - `server.js`
   - `render.yaml`
   - `package.json` (actualizado con express)
   - `angular.json` (configurado para producción)
   - Archivos de entorno (`src/environments/`)

2. Haz commit y push de todos los cambios:
```bash
git add .
git commit -m "Configuración para despliegue en Render"
git push origin main
```

### Paso 2: Configurar el Servicio en Render

#### Opción A: Usando render.yaml (Recomendado)

1. Ve a tu dashboard de Render
2. Haz clic en "New" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente el archivo `render.yaml` y creará el servicio

#### Opción B: Configuración Manual

1. Ve a tu dashboard de Render
2. Haz clic en "New" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura los siguientes valores:
   - **Name**: `inventario-frontend` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Root Directory**: (déjalo vacío o pon `inventario-frontendef` si tu proyecto está en una subcarpeta)

### Paso 3: Configurar Variables de Entorno

En la sección "Environment" del servicio en Render, agrega:

- **NODE_ENV**: `production`
- **PORT**: `10000` (Render asigna automáticamente el puerto, pero esto es por si acaso)

### Paso 4: Actualizar la URL del Backend

1. Edita el archivo `src/environments/environment.prod.ts`
2. Cambia la URL del backend por la URL de tu backend en Render:
```typescript
apiUrl: 'https://tu-backend.onrender.com/api'
```

3. Haz commit y push de los cambios

### Paso 5: Desplegar

1. Render comenzará automáticamente a construir y desplegar tu aplicación
2. Espera a que el build termine (puede tomar varios minutos la primera vez)
3. Una vez completado, tu aplicación estará disponible en la URL proporcionada por Render

## 🔧 Solución de Problemas

### Error: "Cannot find module 'express'"
- Asegúrate de que `express` esté en las `dependencies` del `package.json`, no en `devDependencies`

### Error: "Cannot find module 'dist/front-final'"
- Verifica que el build se complete correctamente
- Asegúrate de que el `outputPath` en `angular.json` sea `dist/front-final`

### La aplicación carga pero no se conecta al backend
- Verifica que la URL en `environment.prod.ts` sea correcta
- Asegúrate de que el backend esté desplegado y funcionando
- Verifica los CORS en el backend para permitir requests desde tu dominio de Render

### Error 404 en rutas de Angular
- Esto es normal en SPAs. El `server.js` ya está configurado para manejar esto con `app.get('*', ...)`

## 📝 Notas Importantes

- El plan gratuito de Render puede tardar en iniciar si la aplicación está inactiva
- Los builds pueden tardar varios minutos
- Asegúrate de que el backend tenga CORS configurado para aceptar requests desde tu dominio de Render

## 🔗 URLs Importantes

- Dashboard de Render: https://dashboard.render.com
- Documentación de Render: https://render.com/docs

