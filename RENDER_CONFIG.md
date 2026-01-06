# Configuración para Render - Static Site

## Campos a completar en Render:

### 1. **Name**
```
inventario-frontendef
```
(O el nombre que prefieras)

### 2. **Branch**
```
main
```
(O la rama que uses)

### 3. **Root Directory (Opcional)**
```
inventario-frontendef
```
**IMPORTANTE:** Si tu repositorio contiene SOLO el proyecto frontend (no está en una subcarpeta), déjalo **VACÍO**.

Si tu repositorio tiene la estructura:
```
repo/
  ├── inventario-frontendef/
  │   ├── src/
  │   ├── package.json
  │   └── ...
```
Entonces pon: `inventario-frontendef`

Si tu repositorio es directamente:
```
repo/
  ├── src/
  ├── package.json
  └── ...
```
Entonces déjalo **VACÍO**

### 4. **Build Command**
```
npm install && npm run build
```

### 5. **Publish Directory**
```
dist/front-final
```
Este es el directorio donde Angular genera los archivos compilados según tu `angular.json`.

### 6. **Environment Variables**
Agrega estas variables si necesitas configurar la URL del backend dinámicamente:

**Nombre:** `API_URL`  
**Valor:** `https://inventario-backdef.onrender.com/api`

(O la URL de tu backend en Render)

**NOTA:** Si ya configuraste la URL en `environment.prod.ts`, puedes omitir esta variable.

---

## ⚠️ IMPORTANTE: Static Site vs Web Service

**Static Site** funciona bien, pero para Angular con routing necesitas configurar redirects. Render permite esto automáticamente para SPAs.

**Alternativa:** Si prefieres usar **Web Service** (más control):
1. Ve a "New" → "Web Service" en lugar de "Static Site"
2. Usa el `server.js` que creamos
3. Build Command: `npm install && npm run build`
4. Start Command: `node server.js`

---

## Después de configurar:

1. Haz clic en **"Deploy Static Site"**
2. Espera a que Render construya y despliegue (puede tardar varios minutos)
3. Una vez completado, tendrás una URL como: `https://inventario-frontendef.onrender.com`

