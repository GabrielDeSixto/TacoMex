
/*
const listaT = document.querySelector('#listaTacos')
fetch('../js/productostacos.json')
    .then((res) => res.json())
    .then((data)=>{
        data.forEach((producto)=>{
            const div = document.createElement('div');
            div.innerHTML =`
            <div class="grid-container" id="contenedor">
                <div class="element-3 Title caja">${producto.nombre}
                    <img src="${producto.img}" alt="producto" class="imagen Imgproducto" />
                        <p class="precio"> ${producto.precio} pesos c/u</p>
                        <button  class="button button-36" role="button" id="${producto.id}">
                            Agregar al Carrito
                        </button>
                </div>
            </div>
            `
            listaT.append(div);
            
        })

        
    })
*/
function agregarproducto(){
const listaP = document.querySelector('#pizzas')
    fetch('../js/pizzas.json')
        .then((res) => res.json())
        .then((data)=>{
            data.forEach((producto)=>{
                const div = document.createElement('div');
                div.innerHTML =`
                <div class="grid-container">
                    <div class="element-3 Title caja" >${producto.nombre}
                        <img src="${producto.img}" alt="producto" class="imagen Imgproducto" />
                            <p class="precio"> ${producto.precio} pesos c/u</p>
                            <button  class="button button-36" role="button" id="${producto.id}">
                                Agregar al Carrito
                            </button>
                        </div>
                </div>
                `
                listaP.append(div);
            })
        })
    
const listaH = document.querySelector('#hamburguer')
        fetch('../js/cangreburguer.json')
            .then((res) => res.json())
            .then((data)=>{
                data.forEach((producto)=>{
                    const div = document.createElement('div');
                    div.innerHTML =`
                    <div class="grid-container tarjeta">
                        <div class="element-3 Title caja">${producto.nombre}
                            <img src="${producto.img}" alt="producto" class="imagen Imgproducto" />
                                <p class="precio"> ${producto.precio} pesos c/u</p>
                                <button  class="button button-36" role="button" id="${producto.id}">
                                    Agregar al Carrito
                                </button>
                            </div>
                    </div>
                    `
                    listaH.append(div);
                })
            })
}
/*
/// CARRITO DE COMPRAS
const Clickbutton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

Clickbutton.forEach(btn => {
  btn.addEventListener('click', () => console.log(btn))
});

// Función que muestra los productos del carrito
const actualizarCarrito = () => {
    tituloCarritoContenido.innerHTML =
    `
    <h5>Producto</h5>
    <h5>Cantidad</h5>
    <h5>Precio</h5>
    <h5>Subtotal</h5>
    `
    carritoContenido.innerHTML = "";
    carrito.forEach(articulo => {
      const div = document.createElement("div");
      div.classList.add("tableroProductosEnCarrito");
      div.innerHTML =
        `
        <p >${articulo.nombre}</p>
        <p >${articulo.piezas}</p>
        <p >${articulo.precio}</p>
        <p >${articulo.subtotal}</p>
      `
      carritoContenido.appendChild(div);
    });
  }; */

  const Clickbutton = document.querySelectorAll('.button')
const table = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.caja')
  const itemTitle = item.querySelector('.Title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.imagen').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){
   
    const InputElemnto = table.getElementsByClassName('contador')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
          carrito[i].cantidad ++;
          const inputValue = InputElemnto[i]
          inputValue.value++;
          CarritoTotal()
          return null;
          
        }
       
      }
  carrito.push(newItem) 
  renderCarrito()

  alert("Producto Agregado")
 
} 


function renderCarrito(){
  table.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    <tr>
    <td><img src=${item.img}  class="w-40" alt="producto"></td>
    <td class="title"> ${item.title}</td>
    <td><center> $ ${item.precio}</center></td>
    <td> <input type="number" min="1" value="${item.cantidad}" class="contador"/></td>
    <td></td>
    <td> <button class="bg-yellow-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded delete"> Eliminar</button>
    
  </tr>  
    `
    tr.innerHTML = Content;
    table.append(tr);

    tr.querySelector('.delete').addEventListener('click',  removeItemCarrito);
    tr.querySelector(".contador").addEventListener('change', sumaCantidad);

   
  })

}

function CarritoTotal(){
    let Total = 0;
    
    const itemCartTotal = document.querySelector('.total')
    carrito.forEach((item) => {
      Total += item.precio*item.cantidad
    })
  
    itemCartTotal.innerHTML = `Total $ ${Total}`
    addLocalStorage();

}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){
  
      if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
      }
      
    }
 

    tr.remove()
    CarritoTotal()
    alert('Producto eliminado')
  
}

function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach((item) => {
      if(item.title.trim() === title){
        
        item.cantidad = sumaInput.value;
        CarritoTotal();
      }
    })
    console.log(carrito)
  }


  function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  
  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
  }


