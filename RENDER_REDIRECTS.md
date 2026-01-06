# Configuración de Redirects para Angular SPA en Render

## Importante: Configurar Redirects en Render Dashboard

Además del archivo `_redirects` que se incluirá en el build, **DEBES configurar los redirects directamente en Render**:

### Pasos:

1. Ve a tu servicio en Render: `https://dashboard.render.com/static/srv-d5e80gggjchc73a124p0`
2. En el menú lateral, busca **"Redirects/Rewrites"**
3. Haz clic en **"Redirects/Rewrites"**
4. Agrega esta regla:
   ```
   Source: /*
   Destination: /index.html
   Status Code: 200
   ```
5. Guarda los cambios

Esto asegurará que todas las rutas de Angular funcionen correctamente.

---

## ¿Por qué es necesario?

Angular es una SPA (Single Page Application). Cuando navegas a rutas como `/inventario` o `/usuarios`, el servidor necesita redirigir todas esas rutas a `index.html` para que Angular pueda manejar el routing del lado del cliente.

Sin esta configuración, al acceder directamente a `/inventario`, el servidor buscará un archivo físico en esa ruta, no lo encontrará, y devolverá un 404.

