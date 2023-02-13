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
    <td><img src=${item.img}  class="w-40" alt=""></td>
    <td> ${item.title}</td>
    <td><center> $ ${item.precio}</center></td>
    <td> <input type="number" min="1" value=${item.cantidad} class="input__elemento"></td>
    <td> <button class="delete btn btn-danger">x</button></td>
  </tr>  
    `
    tr.innerHTML = Content;
    table.append(tr);

   
  })

}

