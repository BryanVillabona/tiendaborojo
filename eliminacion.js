// 1. Eliminar el cliente que tenga el correo "juan@email.com".

printjson(
    db.clientes.deleteOne(
        {email:"juan@email.com"}
    )
)

// 2. Eliminar todos los productos con stock menor a 5 
// (considera esto como un proceso de limpieza de inventario).
printjson(
    db.productos.deleteMany(
        {stock:{$lt:5}}
    )
)