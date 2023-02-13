const Clickbutton = document.querySelectorAll('.button')
const table = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.contenedor')
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
    const InputElemnto = table.getElementsByClassName('contadorProductos')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
          carrito[i].cantidad ++;
          const inputValue = InputElemnto[i]
          CarritoTotal()
          inputValue.value++;
          
          return null;
          
        }
       
      }
     
  carrito.push(newItem) 
 
  renderCarrito()

 
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
    <td> <input type="number" min="1" value=${item.cantidad} class="contador"/></td>
    <td></td>
    <td> <button class="bg-yellow-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded delete"> Eliminar</button></td>
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
  
}

function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
      if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
      }
    })
  }



//STORAGE

