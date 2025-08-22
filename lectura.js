// 1. Consultar todos los productos que tengan stock mayor a 20 unidades.

printjson(
    db.productos.find(
        {
            stock: { $gt: 20 }
        }
    ).toArray()
)


// 2. Encontrar los clientes que no han comprado aún ningún producto.
printjson(
    db.clientes.find(
        {
            compras:{$eq:[]}
        }
    ).toArray()
)