const listaH = document.querySelector('#hamburguer')
        fetch('../js/cangreburguer.json')
            .then((res) => res.json())
            .then((data)=>{
                data.forEach((producto)=>{
                    const div = document.createElement('div');
                    div.innerHTML =`
                    <div class="grid-container tarjeta">
                        <div class="element-3 Title caja">
                          <p class="Title">${producto.nombre}</p>
                            <img src="${producto.img}" alt="producto" class="imagen Imgproducto" />
                                <p class="precio"> ${producto.precio} pesos c/u</p>
                                <button  class="button button-36" role="button" id="${producto.id}">
                                  Producto no disponible
                                </button>
                            </div>
                    </div>
                    `
                    listaH.append(div);
                })
            })


/// CARRITO DE COMPRAS
const Clickbutton = document.querySelectorAll('.button')
const table = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
});


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
   
    const InputElemento = table.getElementsByClassName('contador')
    for(let i =0; i < carrito.length; i++){
        if(carrito[i].title.trim() == newItem.title.trim()){
          carrito[i].cantidad ++;
          const inputValue = InputElemento[i]
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
  table.innerHTML = '';
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    tr.innerHTML =`
    <tr>
    <td><img src=${item.img}  class="w-40" alt="producto"></td>
    <td class="title"> ${item.title}</td>
    <td><center> $ ${item.precio}</center></td>
    <td> <input type="number" min="1" value="${item.cantidad}" class="contador"/></td>
    <td></td>
    <td> <button class="button-36 delete"> Eliminar</button>
    
  </tr>  
    `;
    table.append(tr);

    tr.querySelector('.delete').addEventListener('click',  removeItemCarrito);
    tr.querySelector(".contador").addEventListener('change', sumaCantidad)
   
  })
  CarritoTotal();
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

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() == title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
      console.log(carrito);
    }
  });
}



//añadir al local storage

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


