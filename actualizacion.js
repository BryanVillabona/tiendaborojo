// 1. Aumentar en 10 unidades el stock del producto "Borojó deshidratado".

printjson(
    db.productos.updateOne(
        {nombre:"Borojó deshidratado"},
        {$inc:{stock:10}}
    )
)

// 2. Añadir el tag "bajo azúcar" a todos los productos de la categoría "Bebida".
printjson(
    db.productos.updateMany(
        {categoria:"Bebida"},
        {$push:{tags:"bajo azúcar"}}
    )
)