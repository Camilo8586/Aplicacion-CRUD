
var carritoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('btn-sumar');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('btn-restar');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('btn btn-secondary');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }
    document.getElementsByClassName('pago')[0].addEventListener('click',pagarClicked)
}
function pagarClicked(){
    alert("Gracias por la compra");
    var carritoItems = document.getElementsByClassName('items-carrito')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('nombre-producto')[0].innerText;
    var precio = item.getElementsByClassName('precio-producto')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-producto')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('productos')[0];
    items.style.width = '60%';
}
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('items-carrito')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('nombre-item-carrito');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="item-carrito">
    <img src="${imagenSrc}" class="img-producto" width="80px">
        <div class="detalles">
            <span class="nombre-item-carrito">${titulo}</span>
            <div class="selector-cantidad">
                <i class="bi bi-dash-circle-fill btn-restar"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="bi bi-plus-circle-fill btn-sumar"></i>
            </div>
            <span class="carrito-precio">${precio}</span>
            <i class="bi bi-trash-fill btn-eliminar"></i>
        </div>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);


    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);


    var botónRestarCantidad = item.getElementsByClassName('btn-restar')[0];
    botónRestarCantidad.addEventListener('click',restarCantidad);


    var botónSumarCantidad = item.getElementsByClassName('btn-sumar')[0];
    botónSumarCantidad.addEventListener('click',sumarCantidad);
    actualizarTotalCarrito();
}
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('items-carrito')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
        var items =document.getElementsByClassName('productos')[0];
        items.style.width = '100%';
    }
}
function actualizarTotalCarrito(){

    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('item-carrito');
    var total = 0;
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}