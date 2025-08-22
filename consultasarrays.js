printjson(
    db.clientes.find(
        {preferencias:{$in: ["natural"]}}
    )
)

printjson(
    db.productos.find(
        {tags:{$all: ["natural","orgánico"]}}
    )
)

printjson(
    db.productos.find(
        { $expr: { $gt: [ { $size: "$tags" }, 1 ] } }
    )
)