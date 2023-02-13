const CarroCompras = document.getElementById('productosCarritos')


const productos =[
    {id: 1, nombre: "Tacos al pastor", precio: 5, stock:10, img : "../img/Tacos_Pastor.jpg"},
    {id: 2, nombre: "Tacos de carne asada", precio: 5, stock:10, img : "../img/Tacos_Asada.jpg"},
    {id: 3, nombre: "Tacos dorados", precio: 5, stock:10, img : "../img/Tacos_Dorados.jpg"},
    {id: 4, nombre: "Pizza Peperoni", precio: 5, stock:10, img : "../img/Pperoni.jpg"},
    {id: 5, nombre: "Pizza Rellena", precio: 5, stock:10, img : "../img/Prqueso.jpg"},
    {id: 6, nombre: "Pizza Hawai", precio: 5, stock:10, img : "../img/Phawai.jpg"}
]

const Carrito = []

const addCarrito = (id,carrito)=>{
    const product = productos.find(item => item.id == id);
    carrito.push(product);
    alert("Se agrego al carrito", carrito);
}


productos.forEach(almacen =>{
    const div = document.createElement('div');
    div.innerHTML += `
    <div class="card cardComidas">
        <img src="${almacen.img}" class="card-img-top imgComidas" alt="${almacen.nombre}">
        <div class="card-body cuerpoCard">
            <h3 class="card-title tituloComida">${almacen.nombre}</h3>
            <p class="card-text precioComida">Precio: $${almacen.precio} </p>
            <button class="btn btnAgregarCarrito" id="${almacen.id}">AGREGAR AL CARRITO</button>
        </div>
    </div>
    `
    CarroCompras.appendChild(div);

})

const botones = document.querySelectorAll('.btnAgregarCarrito');
botones.forEach(boton => {
  boton.addEventListener('click', e => {
    addCarrito(e.target.id, Carrito);
  });
});

