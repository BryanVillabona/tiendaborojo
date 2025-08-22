// 1. Buscar clientes que tengan "natural" en sus preferencias.
printjson(
    db.clientes.find(
        {preferencias:{$in: ["natural"]}}
    )
)

// 2. Encontrar productos que tengan al menos los tags "natural" y "orgánico" (usa $all).
printjson(
    db.productos.find(
        {tags:{$all: ["natural","orgánico"]}}
    )
)

// 3. Listar productos que tienen más de un tag ($size).
printjson(
    db.productos.find(
        { $expr: { $gt: [ { $size: "$tags" }, 1 ] } }
    )
)