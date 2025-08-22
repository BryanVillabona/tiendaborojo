printjson(
    db.productos.find(
        {nombre:{$regex:"^Boro"}}
    )
)

printjson(
    db.productos.find(
        {nombre:{$regex:"con",$option:"i"}}
    )
)

printjson(
    db.clientes.find(
        {nombre:{$regex:"[Zz]"}}
    )
)
