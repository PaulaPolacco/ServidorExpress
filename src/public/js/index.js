const socketClient = io()
socketClient.on('Bienvenida', (text)=>{
    console.log(text)
})

socketClient.on('productoCreado', (producto) => {
    // Actualiza la lista de productos en el DOM
    const productosLista = document.getElementById('productos-lista');
    const nuevoProducto = document.createElement('li');
    nuevoProducto.innerHTML = `id: ${producto.id} --> ${producto.title} - precio: ${producto.price} - stock: ${producto.stock} - categoria: ${producto.category}`;
    productosLista.appendChild(nuevoProducto);
});

const formulario = document.getElementById('formulario')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formulario);
    const producto = {
        title: data.get('title'),
        description: data.get('description'),
        code: data.get('code'),
        price: data.get('price'),
        status: data.get('status'),
        stock: data.get('stock'),
        category: data.get('category'),
        thumbnail: data.get('thumbnail')
    };
    console.log(producto)
    socketClient.emit('nuevoProducto', producto)
}