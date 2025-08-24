// 1. Definir una función calcularDescuento(precio, porcentaje) que devuelva el
// precio con descuento aplicado.
db.system.js.insertOne({
    _id: "calcularDescuento",
    value: new Code("function(precio, porcentaje) {return precio - (precio * (porcentaje / 100)); }")
});

const f1 = db.system.js.findOne({ _id: "calcularDescuento" });
const calcularDescuento = new Function('return ' + f1.value.code)();

const helado = db.productos.findOne({ _id: 6 });
calcularDescuento(helado.precio,20)

// 2. Definir una función clienteActivo(idCliente) que devuelva true si el 
// cliente tiene más de 3 compras registradas.

db.system.js.insertOne({
  _id: "clienteActivo",
  value: new Code("function(idCliente) {const n = db.ventas.countDocuments({ clienteId: idCliente });return n > 3;}")
});

const f2 = db.system.js.findOne({ _id: "clienteActivo" });
const clienteActivo = new Function('return ' + f2.value.code)();

const cliente1 = db.clientes.findOne({ _id: 1 });
clienteActivo(cliente1._id);

// 3. Definir una función verificarStock(productoId, cantidadDeseada) 
// que retorne si hay suficiente stock.

db.system.js.insertOne({
  _id: "verificarStock",
  value: new Code("function(productoId, cantidadDeseada) {var producto = db.productos.findOne({ _id: productoId });if (!producto) return false;return producto.stock >= cantidadDeseada;}")
});

const f3 = db.system.js.findOne({ _id: "verificarStock" });
const verificarStock = new Function('return ' + f3.value.code)();

const aceite = db.productos.findOne({ _id: 9 });
verificarStock(aceite._id, 12)