// Mostrar un listado de los productos más vendidos (suma total de unidades vendidas por producto).
db.ventas.aggregate([
  { $unwind: "$productos" },
  { 
    $group: { 
      _id: "$productos.productoId", 
      cantidad: { $sum: "$productos.cantidad" } 
    } 
  },
  { $sort: { cantidad: -1 } },
  { $limit: 3 }
])

// Agrupar clientes por cantidad de compras realizadas.
db.clientes.aggregate([
    {$unwind: "$compras"},
    { $group: {_id: "$_id", totalCompras: { $sum: 1 } } },
    { $sort: { totalCompras: -1 } }
])

// Mostrar el total de ventas por mes
db.ventas.aggregate([
    {$group: {_id: { mes: { $month: "$fecha"}}, totalVentas: {$sum: 1}}}
])

// Calcular el promedio de precios por categoría de producto.
db.productos.aggregate([
    {$group: {_id: "$categoria", precioPromedio: {$avg: "$precio"}}}
])

// Mostrar los 3 productos con mayor stock
db.productos.aggregate([
    {$sort: {stock: -1}},
    {$limit: 3},
    {$project: {nombre: 1, stock: 1}}
])