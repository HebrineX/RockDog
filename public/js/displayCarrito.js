/// JS REFERIDO A TODAS LAS FUNCIONALIDADES Y TEMAS VISUALES DENTRO DE LA VISTA DEL CARRITO DE COMPRA

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready() { // FUNCIÓN QUE SE EJECUTA UNA VEZ CARGUE EL NAVEGADOR 
    // VAMOS A VERIFICAR SI LA MEMORIA ESTÁ VACIA, EN CASO DE ESTARLO HAREMOS EL DISPLAY DEL CARRITO VACIO, SINO MOSTRAREMOS LOS ITEMS.
    // PARA CUALQUIER CASO VAMOS A MOSTRAR EL TOTAL CON LA CANTIDAD DE ITEMS TOTALES EN CARRITO.
    if(JSON.parse(localStorage.getItem("productosEnCarrito")) == null || JSON.parse(localStorage.getItem("productosEnCarrito")).length == 0) {
        updateTotal()
        displayCartEmpty()
    }
    else {
        updateTotal()
        displayCart()
        enviarDatos()
    }
    let btnVaciar = document.getElementById("vaciar") // CAPTURAMOS EL BOTON PARA VACIAR EL CARRITO 
    if(btnVaciar){
        btnVaciar.addEventListener("click", vaciarCarrito)
} // Y COLOCAMOS UN EVENTO AL HACERLE CLICK PARA EJECUTAR LA FUNCIÓN DE VACIAR EL CARRITO
}

function displayCartEmpty() { 
    // FUNCIÓN PARA HACER EL DISPLAY DEL CARRITO VACIO. TOMAMOS EL ELEMENTO HTML QUE LO CONTIENE
    // Y AGREGAMOS CON INNERHTML UN DIV CON SU CLASE Y UN H2 CON SU CLASE INDICANDO QUE EL CARRITO ESTÁ VACIO
    let sa = document.getElementById("containerCart")
    if(sa){
        sa.innerHTML = `
        <div>
            <h2 class="products-title">El carrito está vacio</h2>
        </div>
        `
    }
}

function displayCart() {
    // FUNCIÓN PARA HACER EL DISPLAY DEL CARRITO CON ITEMS. TOMAMOS EL ELEMENTO HTML QUE LO CONTIENE
    // Y CREAMOS UNA VARIABLE CON EL ARRAY DE PRODUCTOS (OBJETOS LITERALES) GUARDADOS EN LA MEMORIA.
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let container = document.getElementById("containerCart")
    if(container){container.innerHTML = ``
    for (let i=0; i<prodsCart.length; i++) { // CON EL FOR VAMOS A ESTAR RECORRIENDO CADA ELEMENTO DEL ARRAY Y HACIENDO UN INNERHTML 
        container.innerHTML += `
        <section class="items-carrito">
                        <article class="art-car">
                            <a href="/productos/details/${prodsCart[i].id}">
                                <div class="img-art"><img src="/images/productos/${prodsCart[i].image}" alt=""></div>
                            </a>   
                            <div class="cont-der-sup">
                                <div class="nom-art-car"><h3>${prodsCart[i].name}</h3></div>
                                <div class="desc-art-car"><p>Descripcion del producto</p></div>
                                <div class="eliminar">
                                    <i onClick="borrar(${prodsCart[i].id})" class="fa fa-trash"></i> 
                                </div>
                                <div class="precioProd">
                                <h4>Precio X/u: $ ${prodsCart[i].price}</h4>
                                </div>
                            </div>
                        </article>
                            <article class="cont-inf">
                                <div>
                                    <button onClick="restar(${prodsCart[i].id})" >-</button>
                                    <p>${prodsCart[i].cantidad}</p>
                                    <button onClick="sumar(${prodsCart[i].id})" >+</button> 
                                </div>
                                <div class="precioProd">
                                <h4>Precio Final: $ ${prodsCart[i].subTotal}</h4>
                                </div>
                            
                            </article>
                            
                        </section>
        `
    }}
    // NOTESE QUE SE PUEDE ACCEDER A CADA ELEMENTO RECORRIDO EN EL MOMENTO Y A SU VEZ A CADA PROPIEDAD PARA COLOCAR UNA PORCIÓN DE HTML
    // EN ESTE CASO TOMAMOS LA MISMA TARJETA UTILIZADA EN OTRAS VISTAS PARA QUE EL CARRITO PRESENTE LA MISMA VISUAL
    // EL FOR PUEDE REEMPLAZARZE POR UN FOREACH SI SE QUIERE TAMBIÉN.
}

function updateTotal() {
    // FUNCIÓN QUE NOS PERMITE HACER UN DISPLAY DE UN RESUMEN DE COMPRA, INCLUYENDO PRODUCTOS TOTALES Y VALOR TOTAL DE LA COMPRA
    // SE TOMA EL ARRAY DE PRODUCTOS DE LA MEMORIA EN CONJUNTO A LOS ELEMENTOS HTMLS (INPUTS EN ESTE CASO) A MODIFICAR
    // CON UN CICLO FOR SUMAMOS TODOS LOS VALORES SUBTOTALES EN UN TOTAL QUE LUEGO APLICAREMOS AL VALUE DEL INPUT 
    // Y CON EL LENGTH DEL ARRAY HAREMOS LA CANTIDAD TOTAL DE PRODUCTOS
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let cantTotal = document.getElementById("cantTotal")
    let precioTotal = document.getElementById("precioTotal")
    let total = 0
    let prodTotal = 0
    if(prodsCart){
    for (let i=0; i<prodsCart.length; i++) { 
        total += prodsCart[i].subTotal
        prodTotal += prodsCart[i].cantidad
    }
    if(cantTotal){
        cantTotal.innerText = `C/total: `+prodTotal
    }
    if(precioTotal){
    precioTotal.innerText = `Total: $`+total
    }}
    
    // EL TOTAL TAMBIÉN PUEDE OBTENERSE CON UN FOREACH O CON UN REDUCE SI SE QUIERE.
}

function vaciarCarrito() {
    // FUNCIÓN PARA VACIAR COMPLETAMENTE EL CARRITO, EN PRINCIPIO UTILIZAMOS EL REMOVEITEM PARA BORRAR EL ARRAY ESPECIFICO DE ITEMS QUE CREAMOS
    // SE PUEDE USAR EL CLEAR TAMBIÉN, SIEMPRE Y CUANDO NO HAYA OTRA COSA QUE NO QUERRAMOS BORRAR (OTROS DATOS GUARDADOS EN MEMORIA, CUIDADO!!)
    Swal.fire({
        title: 'Estás seguro que queres borrar el carrito entero ?',
        text: "Mira que tenes que agregar todo de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, chau!',
        cancelButtonText:'Sisisisi, bueno no'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("productosEnCarrito")
            
            Swal.fire(
                'Borradisimo!',
                'Se borró.',
                'Éxito'
            )
            .then(()=>{
                location.reload()
            })
        }
    })
}

function borrar(id) {
    // ESTA FUNCIÓN RECIBE COMO PARAMETRO EL ID DEL PRODUCTO A BORRAR. ESTAREMOS LLAMANDO AL ARRAY GUARDADO EN LA MEMORIA
    // Y LUEGO HAREMOS UN FILTRADO CON EL METODO FILTER DE ARRAYS, ESTO NOS RETORNARÁ OTRO ARRAY CON LA CONDICIÓN PEDIDA
    // PARA ESTE CASO INDICAMOS QUE NOS DEVUELVA LOS PRODUCTOS CUYO ID SEA DISTINTO AL ID QUE PASAMOS POR PARAMETRO 
    // FINALMENTE GUARDAREMOS EL ARRAY FILTRADO EN LA MEMORIA, SOBREESCRIBIENDO AL ARRAY DE PRODUCTOS QUE YA TENIAMOS ANTERIORMENTE
    // COMO ÚLTIMA CONDICIÓN AGREGAMOS QUE SI EL ARRAY FILTRADO ESTÁ VACIO YA QUE NO HAY MÁS PRODUCTOS SE EJECUTARÁ LA FUNCIÓN DE VACIADO 
    // Y SE ACTUALIZARÁ EL TOTAL DE PRODUCTOS Y COMPRA CON ELLO, SI ESTO NO OCURRE ENTONCES SE ACTUALIZARÁ EL CARRITO CON EL TOTAL 
    // EN BASE AL ARRAY OBTENIDO
    Swal.fire({
        title: 'Estás seguro?',
        text: "No vas a poder volver de esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, chau!',
        cancelButtonText:'Sisisisi, bueno no'
      }).then((result) => {
        if (result.isConfirmed) {
            let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
            let filtrado = prodsCart.filter(row => row.id != id)
            localStorage.setItem("productosEnCarrito", JSON.stringify(filtrado))
            if (filtrado.length <= 0) { 
                updateTotal()
                displayCartEmpty()
            return
            }
            displayCart()
            updateTotal()
                Swal.fire(
                    'Borradisimo!',
                    'Se borró.',
                    'Éxito'
          )
        }
      })
}



function sumar(id) {
    // ESTA FUNCIÓN RECIBE COMO PARAMETRO EL ID DEL PRODUCTO A SUMAR. LLAMAMOS AL ARRAY GUARDADO EN MEMORIA 
    // LUEGO CON EL METODO FIND BUSCAMOS EL PRODUCTO AL CUAL QUEREMOS SUMAR UNA UNIDAD
    // UNA VEZ ENCONTRADO EL PRODUCTO A SU PROPIEDAD CANTIDAD LE SUMAMOS 1 Y MODIFICAMOS SU PROPIEDAD SUBTOTAL CON LA NUEVA CANTIDAD Y PRECIO
    // FINALMENTE LO GUARDAREMOS EN MEMORIA NUEVAMENTE CON ESTOS CAMBIOS Y VOLVEREMOS A LLAMAR A LAS FUNCIONES DE DISPLAYCART Y UPDATETOTAL
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad +=1
    prod.subTotal = prod.cantidad * prod.price
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}

function restar(id){
    // ESTA FUNCIÓN ES IGUAL A LA FUNCIÓN DE SUMAR CON ALGUNAS DIFERENCIAS. EN LUGAR DE SUMAR RESTARÁ 1 AL PRODUCTO ENCONTRADO.
    // Y EXISTE UNA CONDICIÓN DE QUE SI EL PRODUCTO LLEGA A 0 UNIDADES EL MISMO SERÁ BORRADO DEL CARRITO CON EL USO DE LA FUNCIÓN BORRAR
    // A LA MISMA LE PASAREMOS COMO PARAMETRO EL ID DEL PRODUCTO QUE RECIBIMOS EN PRINCIPIO Y CORTAREMOS LA FUNCIÓN ALLÍ CON UN RETURN
    // CASO CONTRARIO GUARDAREMOS EN MEMORIA EL ARRAY CON EL CAMBIO HECHO Y VOLVEREMOS A LLAMAR A LAS FUNCIONES DE DISPLAYCART Y UPDATETOTAL
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let prod = prodsCart.find(row => row.id == id)
    prod.cantidad -=1
    prod.subTotal = prod.cantidad * prod.price
    if(prod.cantidad <= 0) {
        borrar(id)
        return
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart))
    displayCart()
    updateTotal()
}


function enviarDatos(){ 
    let compra = document.getElementById("comprarYa")
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    if(compra){
            compra.addEventListener("click",e=>{
                if(prodsCart.length != 0){
                Swal.fire({
                    title: 'Seguro que quiere comprar??',
                    text: "El apretar el boton de compra es un compromiso!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si! quiero comprar que parte no entendes!!',
                    cancelButtonText:'No, aun no!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/productos/compra-realizada");
                    }
                })}else{
                    Swal.fire({
                        title:'Capo no tenes nada en el carrito',
                        text: "Que queres comprar ?",
                        icon: 'warning',
                        confirmButtonText: 'Weno, perdon :C',
                    }
                        
                        
                    )
                }
        
    })}
    
}

