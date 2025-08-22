// 3. Hacer una operación de devolución:
// a. Aumentar el stock
// b. Eliminar la venta correspondiente

const session = db.getMongo().startSession();
const dbSession = session.getDatabase("tienda_borojo");
session.startTransaction();


try {
    dbSession.productos.updateOne(
        { _id: 2 },
        { $inc: { stock: 1 } },
    );

    dbSession.productos.updateOne(
        { _id: 3 },
        { $inc: { stock: 1 } }
    )

    dbSession.ventas.deleteOne(
        { _id: 6 },
    );

    session.commitTransaction();
    print("☑️ Transaccion finalizada con exito!")
} catch (error) {
    session.abortTransaction();
    print("❌ Transaccion cancelada!")
} finally {
    session.endSession();
}

