# La mejor teinda del borojo: Tienda Chen 🥝

![imagen_borojo](./Readme_images/borojo_image.png)

Los mejores borojos los encontrarás en la tienda Chen, la tienda líder en productos de borojo. Descubre los beneficios de esta maravillosa fruta que rejuvenece tu cuerpo, mejora cómo te sientes, y cuida tu piel, cabello y salud en general.

Para optimizar su operación, esta tienda requiere una base de datos eficiente que gestione todos sus productos, ventas, clientes, proveedores e inventario. La base de datos debe ser capaz de responder a todas las consultas y facilitar una gestión integral y ágil.

## Colecciones creadas

### Clientes 👨

Esta colección contiene la información personal y de contacto de todos los clientes de la tienda. Incluye datos como nombre, dirección, teléfono, correo electrónico y historial de compras para ofrecer un mejor servicio y seguimiento personalizado.

### Productos 🍎

En esta colección se almacenan los detalles de todos los productos disponibles en la tienda, como nombre, descripción, categoría, precio, y propiedades específicas (por ejemplo, beneficios del borojo). También puede incluir imágenes y datos sobre su origen o presentación.

### Proveedores 🏙️

Aquí se registra toda la información relevante de los proveedores que suministran productos a la tienda. Datos como nombre de la empresa, contacto, dirección, términos de entrega y precios, para facilitar la gestión y comunicación con cada proveedor.

### Ventas 💸

Esta colección guarda un historial completo de las transacciones realizadas en la tienda. Registra datos como fecha de compra, productos vendidos, cantidades, precios, clientes involucrados y métodos de pago, permitiendo análisis de ventas y control financiero.

### Inventario 🗄️

La colección de inventario monitorea la cantidad disponible de cada producto en la tienda. Incluye registros de entradas, salidas, niveles mínimos y máximos, ayudando a mantener un control eficiente y evitar faltantes o exceso de stock.

## Insercion de datos nuevos

1. Insertar un nuevo producto llamado "Chocolatina de borojó", categoría "Snack", con precio 4000, stock 35, y tags ["dulce", "energía"].

```jsx
db.productos.insertOne(
	{
      _id: 11,
      nombre: "Chocolatina de Borojó",
      categoria: "Snack",
      precio: 4000,
      stock: 35,
      tags: ["dulce", "energía"]
    }
)
```
<br>

2. Insertar un nuevo cliente que se llama "Mario Mendoza", con correo "mario@email.com", sin compras, y preferencias "energético" y "natural".

```jsx
 db.clientes.insertOne(
      {
          _id: 11,
          nombre: "Mario Mendoza",
          email: "mario@email.com",
          compras: [],
          preferencias: ["energético", "natural"]
      }
)
```
<br>

## Lecturas

1. Consultar todos los productos que tengan stock mayor a 20 unidades.

```jsx
db.productos.find(
    {
        stock: { $gt: 20 }
    }
).toArray()
```
<br>

2. Encontrar los clientes que no han comprado aún ningún producto.

```jsx
db.clientes.find(
    {
        compras:{$eq:[]}
    }
).toArray()
```

## Actualizaciones

1. Aumentar en 10 unidades el stock del producto "Borojó deshidratado".

```jsx
db.productos.updateOne(
    {nombre:"Borojó deshidratado"},
    {$inc:{stock:10}}
)
```
<br>

2. Añadir el tag "bajo azúcar" a todos los productos de la categoría "Bebida".

```jsx
db.productos.updateMany(
    {categoria:"Bebida"},
    {$push:{tags:"bajo azúcar"}}
)
```

## Eliminaciones

1. Eliminar el cliente que tenga el correo "juan@email.com".

```jsx
db.clientes.deleteOne(
    {email:"juan@email.com"}
)
```

2. Eliminar todos los productos con stock menor a 5 (considera esto como un proceso de limpieza de inventario).
```jsx
printjson(
    db.productos.deleteMany(
        {stock:{$lt:5}}
    )
)
```

## Expresiones Regulares

En esta sección se encuentran las consultas que utilizan expresiones regulares mediante el operador $regex.

1. Buscar productos cuyo nombre empiece por "Boro".

```jsx
db.productos.find(
    {nombre:{$regex:"^Boro"}}
)

```
<br>

2. Encontrar productos cuyo nombre contenga la palabra "con" (como en “Concentrado de borojó”).
```jsx
db.productos.find(
	{nombre:{$regex:"con",$option:"i"}}
)
```
<br>

3. Encontrar clientes cuyo nombre tenga la letra "z" (insensible a mayúsculas/minúsculas).

```jsx
db.clientes.find(
    {nombre:{$regex:"[Zz]"}}
)
```

## Operadores en consultas sobre arrays

una serie de operadores especializados para trabajar con campos de tipo array, lo que permite realizar búsquedas avanzadas y precisas dentro de documentos que contienen listas de valores u objetos.

1. Buscar clientes que tengan "natural" en sus preferencias.

```jsx
db.clientes.find(
    {preferencias:{$in: ["natural"]}}
)
```
<br>

2. Encontrar productos que tengan al menos los tags "natural" y "orgánico" (usa $all).
```jsx
db.productos.find(
    {tags:{$all: ["natural","orgánico"]}}
)
```
<br>

3. Listar productos que tienen más de un tag ($size).
```jsx
db.productos.find(
    { $expr: { $gt: [ { $size: "$tags" }, 1 ] } }
)
```

## Funciones definidas en system.js

1. Definir una función calcularDescuento(precio, porcentaje) que devuelva el precio con descuento aplicado.

```jsx
db.system.js.insertOne({
    _id: "calcularDescuento",
    value: new Code("function(precio, porcentaje) {return precio - (precio * (porcentaje / 100)); }")
});

const f1 = db.system.js.findOne({ _id: "calcularDescuento" });
const calcularDescuento = new Function('return ' + f1.value.code)();

const helado = db.productos.findOne({ _id: 6 });
calcularDescuento(helado.precio,20)
```

**Explicación**

- Se inserta la función en system.js con un identificador único.

- Se obtiene su definición almacenada.

- Se reconstruye como función en JavaScript.

- Se ejecuta sobre los datos de la colección, en este caso calculando el nuevo precio con descuento.

<br>

2. Definir una función clienteActivo(idCliente) que devuelva true si el cliente tiene más de 3 compras registradas.

```jsx
db.system.js.insertOne({
  _id: "clienteActivo",
  value: new Code("function(idCliente) {var cliente = db.clientes.findOne({ _id: idCliente });if (!cliente) return false;return cliente.compras.length > 3;}")
});

const f2 = db.system.js.findOne({ _id: "clienteActivo" });
const clienteActivo = new Function('return ' + f2.value.code)();

clienteActivo(10);
```

**Explicación**

- Busca un cliente en la colección clientes a partir de su _id.

- Si el cliente no existe, devuelve false.

- Si existe, verifica el tamaño del array compras.

- Retorna true únicamente cuando el cliente tiene más de 3 compras.

<br>

3. Definir una función verificarStock(productoId, cantidadDeseada) que retorne si hay suficiente stock.

```jsx
db.system.js.insertOne({
  _id: "verificarStock",
  value: new Code("function(productoId, cantidadDeseada) {var producto = db.productos.findOne({ _id: productoId });if (!producto) return false;return producto.stock >= cantidadDeseada;}")
});

const f3 = db.system.js.findOne({ _id: "verificarStock" });
const verificarStock = new Function('return ' + f3.value.code)();

const aceite = db.productos.findOne({ _id: 9 });
verificarStock(aceite._id, 5)
```

**Explicación**

- Busca en la colección productos el documento con el _id indicado.

- Si el producto no existe, devuelve false.

- Si existe, compara el campo stock con la cantidad deseada.

- Retorna true si el stock es suficiente, o false en caso contrario.