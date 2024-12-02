const BASE_URL = "http://localhost:3002/productos";

async function listaProductos(){
    const conexion = await fetch(BASE_URL,{
        method:"GET",
        headers:{"Content-type":"application/json"},
    });   

    const conexionConvertida=await conexion.json();
    /* console.log(conexion);
    console.log(conexionConvertida); */
    return conexionConvertida;    


}

async function crearProductos(titulo, precio, imagen){
  const conexion= await fetch(BASE_URL,{
  method:"POST",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({
    titulo:titulo,
    precio:precio,
    imagen:imagen
  })
  })
  if(!conexion.ok){
      throw new Error("No fue posible enviar el producto");
  }
  const conexionConvertida = await conexion.json();

  return conexionConvertida;
};

//listaProductos();





async function buscarProductos(referencia){
  const conexion=await fetch(`${BASE_URL}?q=${referencia}`);
  const conexionConvertida=conexion.json();

  return conexionConvertida;
}

const deleteProductos = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Producto con id ${id} eliminado exitosamente`);
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
};

/**
 * Función para editar un producto existente
 * @param {number} id - ID del producto a editar
 * @param {string} titulo - Nuevo título del producto
 * @param {string} precio - Nuevo precio del producto
 * @param {string} imagen - Nueva URL de la imagen del producto
 * @returns {Promise} - Promesa que resuelve con los datos del producto actualizado
 */
async function editarProducto(id, titulo, precio, imagen) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        precio,
        imagen,
      }),
    });

    if (!response.ok) {
      throw new Error("No fue posible actualizar el producto.");
    }

    const productoActualizado = await response.json();
    console.log("Producto actualizado:", productoActualizado);
    return productoActualizado;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
}




export const servicios = {
  listaProductos, 
  crearProductos,
  buscarProductos,
  deleteProductos,
  editarProducto,
  
}
