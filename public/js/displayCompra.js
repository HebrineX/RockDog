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
    
        updateTotal()
        displayCartCompleto()
        enviarDatos()
    
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
    }
    }
    
    // EL TOTAL TAMBIÉN PUEDE OBTENERSE CON UN FOREACH O CON UN REDUCE SI SE QUIERE.
}


function displayCartCompleto() {
    // FUNCIÓN PARA HACER EL DISPLAY DEL CARRITO CON ITEMS. TOMAMOS EL ELEMENTO HTML QUE LO CONTIENE
    // Y CREAMOS UNA VARIABLE CON EL ARRAY DE PRODUCTOS (OBJETOS LITERALES) GUARDADOS EN LA MEMORIA.
    let prodsCart = JSON.parse(localStorage.getItem("productosEnCarrito"))
    let sa = document.getElementById("mostrandoItems")
    if(sa){sa.innerHTML = ``
    for (let i=0; i<prodsCart.length; i++) { // CON EL FOR VAMOS A ESTAR RECORRIENDO CADA ELEMENTO DEL ARRAY Y HACIENDO UN INNERHTML 
        sa.innerHTML += `
        <section class="items-carrito">
                        <article class="art-car">
                            <a href="/productos/details/${prodsCart[i].id}">
                                <div class="img-art"><img src="/images/productos/${prodsCart[i].image}" alt=""></div>
                            </a>   
                            <div class="cont-der-sup">
                                <div class="nom-art-car"><h3>${prodsCart[i].name}</h3></div>
                                <div class="precioProd">
                                <h4>Precio X/u: $ ${prodsCart[i].price}</h4>
                                </div>
                            </div>
                        </article>
                            <article class="cont-inf">
                                <div>
                                <h4>Cantidad:  ${prodsCart[i].cantidad}</h4>
                                </div>
                                <h4>Precio Final: $ ${prodsCart[i].subTotal}</h4>
                            
                            </article>
                            
                        </section>
        `
    }}
}