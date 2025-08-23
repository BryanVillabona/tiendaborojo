// Creación del indice en el campo nombre de productos
db.productos.createIndex({ nombre: 1 });

// Creación del indice compuesto en los campos categoria y precio de productos
db.productos.createIndex({ categoria: 1, precio: 1 });

// Creación del indice en el campo email de usuarios
db.clientes.createIndex({ email: 1 });

// Uso de explain para analizar el uso del índice en una consulta
db.clientes.find({email: {$regex: "Carlos", $options: "i"}}).explain()