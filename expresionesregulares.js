// 1. Buscar productos cuyo nombre empiece por "Boro".
printjson(
    db.productos.find(
        {nombre:{$regex:"^Boro"}}
    )
)

// 2. Encontrar productos cuyo nombre contenga la palabra "con" (como en “Concentrado de borojó”).
printjson(
    db.productos.find(
        {nombre:{$regex:"con",$option:"i"}}
    )
)

// 3. Encontrar clientes cuyo nombre tenga la letra "z" (insensible a mayúsculas/minúsculas).
printjson(
    db.clientes.find(
        {nombre:{$regex:"[Zz]"}}
    )
)
