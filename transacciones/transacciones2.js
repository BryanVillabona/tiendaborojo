// 2. Simular la entrada de nuevo inventario:
// a. Insertar un documento en `inventario`
// b. Aumentar el stock del producto correspondiente (Todo dentro de una transacción.)

const session = db.getMongo().startSession();
const dbSession = session.getDatabase("tiendaborojo");
session.startTransaction();


try {
    dbSession.inventario.insertOne(
        {
            _id: 11,
            productoId: 9,
            lote: "L011",
            cantidad: 12,
            fecha: new Date()
        }
    );

    dbSession.productos.updateOne(
        { _id: 9 },
        { $inc: { stock: 12 } }
    );

    session.commitTransaction();
    print("☑️ Transaccion finalizada con exito!")
} catch (error) {
    session.abortTransaction();
    print("❌ Transaccion cancelada!")
} finally {
    session.endSession();
}

