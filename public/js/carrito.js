/// JS REFERIDO A TODAS LAS FUNCIONALIDADES Y TEMAS VISUALES AGREGANDO PRODUCTOS AL CARRITO FUERA DE LA VISTA DE CARRITO
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

function ready() {
    // EN CASO DE NO EXISTIR EN MEMORIA EL ARRAY DE PRODUCTOS LO CREAREMOS ENVIANDO UN ARRAY VACIO
    if(JSON.parse(localStorage.getItem("productosEnCarrito")) == null) {
        let cart = []
        localStorage.setItem("productosEnCarrito", JSON.stringify(cart))
    }
    cartNumber() // LLAMAMOS A LA FUNCIÓN PARA MOSTRAR EL NÚMERO DE PRODUCTOS DENTRO DEL CARRITO
    
    let button = document.querySelector(".buy-now-button") // CAPTURAMOS EL BOTON QUE AGREGARÁ PRODUCTOS AL CARRITO
    if(button){
    button.addEventListener("click", (e) => { 
        // AÑADIMOS EL EVENTO CLICK A DICHO BOTON PARA QUE UNA VEZ QUE OCURRRA EJECUTEMOS LA FUNCIÓN DE AGREGAR
        // EN CONJUNTO A UN SWEETLERT INDICANDOLE AL USUARIO QUE EL PRODUCTO SE AGREGÓ CON ÉXITO                           
        agregarItem()
        Swal.fire(
            'Exito!',
            'Producto agregado al carrito!',
            'success'
        )
    })}
}

function cartNumber() {
    // FUNCIÓN QUE NOS PERMITE INDICAR EL NÚMERO DE PRODUCTOS DENTRO DEL CARRITO. CAPTURAMOS EL ELEMENTO A MODIFICAR DENTRO DE LA NAVBAR
    // LUEGO CAMBIAREMOS EL TEXTO DENTRO DICHO ELEMENTO POR EL LENGTH DEL ARRAY DE PRODUCTOS. SEA CUAL SEA EL CASO MOSTRARÁ DICHO NÚMERO
    let numberItems = document.querySelector(".cartNmb")
    numberItems.innerText = `${JSON.parse(localStorage.getItem("productosEnCarrito")).length}`
}

function agregarItem() {
    // LA FUNCIÓN PRINCIPAL DE ESTE JS. NOS PERMITE AGREGAR ITEMS AL CARRITO, EN PRINCIPIO OBTENEMOS EL ARRAY DE PRODUCTOS EN EL CARRITO
    // QUE ESTÁ DENTRO DE LA MEMORIA LOCAL Y LUEGO CREAREMOS NUESTRO OBJETO LITERAL DEL PRODUCTO A GUARDAR.
    // EL PRODUCTO A GUARDAR DE MOMENTO NO TENDRÁ NI SUBTOTAL NI CANTIDAD YA QUE LO AGREGAREMOS LUEGO DEPENDIENDO LA CONDICIÓN.
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let product = {
        id: document.getElementById("idProd").value,
        name: document.getElementById("nameProd").innerText,
        description: document.getElementById("descProd").innerText,
        price: document.getElementById("priceProd").value,
        image: document.getElementById("imgProd").alt
        
    }

    if (prodsCart.length > 0) { // SI EL ARRAY TIENE ALGÚN ITEM DENTRO ENTRAREMOS EN ESTA CONDICIÓN
        // CON EL METODO FIND BUSCAREMOS SI EXISTE UN PRODUCTO DENTRO DEL ARRAY CON EL MISMO ID DEL PRODUCTO QUE QUEREMOS AGREGAR.
        let productInCart = prodsCart.find(prod => prod.id == product.id) 
        if(!productInCart) {
            // EN CASO DE NO EXISTIR EL FIND DEVUELVE UNDEFINED, POR TANTO ENTRAREMOS EN ESTA CONDICIÓN
            // INDICANDO UNA UNIDAD DE PRODUCTO CON SU SUBTOTAL Y AGREGANDOLO AL ARRAY
            // AQUI MOSTRAMOS QUE PODEMOS UTILIZAR SPREAD OPERATOR PARA AGREGAR ITEMS A UN ARRAY.
            product.cantidad = 1;
            product.subTotal = product.cantidad * product.price
            prodsCart = [...prodsCart, product]
        }
        else {
            // EN CASO DE EXISTIR EL PRODUCTO EN EL ARRAY ENTRAREMOS EN ESTE ELSE DONDE 
            // DEL PRODUCTO ENCONTRADO MODIFICAREMOS LA PROPIEDAD CANTIDAD SUMANDO 1 UNIDAD
            // Y ACTUALIZAREMOS EL SUBTOTAL EN BASE A LA NUEVA CANTIDAD Y EL PRECIO ACTUAL DEL PRODUCTO
            productInCart.cantidad += 1;
            productInCart.subTotal = productInCart.cantidad * product.price
        }
    }
    else { 
        // EN CASO DE QUE EL CARRTIO ESTÉ VACIO ENTRAREMOS DENTRO DE ESTE ELSE E INDICAREMOS UNA UNIDAD DEL PRODUCTO
        // CON SU SUBTOTAL PARA LUEGO PUSHEARLO EN EL ARRAY DE PRODUCTOS.
        product.cantidad = 1;
        product.subTotal = product.cantidad * product.price
        prodsCart.push(product)
    }
    // POR ÚLTIMO GUARDAREMOS EL ARRAY (CON CUALQUIER CAMBIO, DEPENDIENDO LA CONDICIÓN QUE SE CUMPLA) DENTRO DE LA MEMORIA NUEVAMENTE
    localStorage.setItem("productosEnCarrito", JSON.stringify(prodsCart)) 
    cartNumber() // EJECUTAMOS ESTA FUNCIÓN PARA TENER UN REAL TIME DE LOS PRODUCTOS AGREGADOS AL CARRITO
}