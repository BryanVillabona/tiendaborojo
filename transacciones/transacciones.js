// 1. Simular una venta: 
// a. Descontar del stock del producto
// b. Insertar la venta en la colección `ventas`(Todo dentro de una transacción.)

const session = db.getMongo().startSession();
const dbSession = session.getDatabase("tienda_borojo");
session.startTransaction();


try {
    dbSession.productos.updateOne(
        {_id: 8},
        {$inc:{stock:-5}}
    );

    dbSession.ventas.insertOne(
        {
            _id: 11,
            clienteId: 5,
            productos: [{
                productoId: 8,
                cantidad: 5
            }],
            fecha: new Date(),
            total: 45000
        }
    );

    session.commitTransaction();
    print("☑️ Transaccion finalizada con exito!")
} catch (error) {
    session.abortTransaction();
    print("❌ Transaccion cancelada!")
} finally {
    session.endSession();
}