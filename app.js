// SOLUCION DEL LABORATORIO 1
// INVENTARIO DE PRODUCTOS

let productos = [
    {nombre: "Mouse", precio: 40, stock: 25},
    {nombre: "Teclado", precio: 70, stock: 0},
    {nombre: "Monitor", precio: 450, stock: 8},
    {nombre: "Laptop Lenovo", precio: 2000, stock: 5},
    {nombre: "USB", precio: 30, stock: 50},
    {nombre: "Audifonos", precio: 120, stock: 12}    
];

const listaProductos = document.getElementById("lista-productos");
const totalInventario = document.getElementById("total-inventario");
const campoNombreProducto = document.getElementById("nombre-producto");
const btnAumentar = document.getElementById("btn-aumentar");
const mensajeInventario = document.getElementById("mensaje-inventario");

//funcion filtro -> dibuja la lista y calcular un monto total
function mostrarInventario(){
    // filter() --> stock > 0 y precio < 500    
    const disponibles = productos.filter(function (p){
        return p.stock > 0 && p.precio < 500;
    });
    // map() --> convertimos cada producto en un texto
    const filas = disponibles.map(function (p){
        return "<li><span>" + p.nombre + " (S/ " + p.precio + ")</span>" +
                "<span>Stock: " + p.stock + "</span></li>";
    });
    // join --> unimos todos los posibles li que se generen en un solo texto y luego mostrar
    listaProductos.innerHTML = filas.join("");

    //reduce --> sumamos precio  * stock de los productos filtrados
    const total = disponibles.reduce(function (acumulado, p){
        return acumulado + p.precio * p.stock;
    }, 0);
    totalInventario.textContent = "S/ " + total;
}

// Funcion que recibe un nombre y aumenta el stock en +10
function aumentarStock(nombre){
    // find --> buscar el primer producto con el nombre que le daremos
    // toLowerCase --> sirve para ignorar mayusculas y minusculas
    const producto = productos.find(function (p){
        return p.nombre.toLowerCase() === nombre.toLowerCase();
    });

    // si no existe un producto, avisamos y terminamos el programa
    if (producto === undefined){
        mensajeInventario.textContent = "No existe el producto " + nombre;
        mensajeInventario.className = "mensaje error";
        return;
    }

    producto.stock = producto.stock + 10;

    mensajeInventario.textContent =
        producto.nombre + " ahora tiene stock " + producto.stock;
    mensajeInventario.className = "mensaje exito";
    // llamamos la primer funcion que hemos creado
    mostrarInventario();
}

if (btnAumentar && listaProductos) {
    btnAumentar.addEventListener("click", function(){
        aumentarStock(campoNombreProducto.value.trim());
        campoNombreProducto.value = "";
    });

    mostrarInventario();
}


// SOLUCION DEL LABORATORIO 2
// EDITOR DE PERFILES

const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoEdad = document.getElementById("edad");
const btnGuardar = document.getElementById("btn-guardar");
const mensajePerfil = document.getElementById("mensaje-perfil");
const contenedorPerfiles = document.getElementById("contenedor-perfiles");

// crear una tarjeta visual con los datos del perfil
function crearTarjetaPerfil(nombre, correo, edad){
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    const titulo = document.createElement("h3");
    titulo.textContent = nombre;
    const parrafoCorreo = document.createElement("p");
    parrafoCorreo.textContent = "Correo: " + correo;
    const parrafoEdad = document.createElement("p");
    parrafoEdad.textContent = "Edad: " + edad + " años";

    //a agregar elementos dentro de la tarjeta
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(parrafoCorreo);
    tarjeta.appendChild(parrafoEdad);

    contenedorPerfiles.appendChild(tarjeta);
}

function mostrarError(texto){
    mensajePerfil.textContent = texto;
    mensajePerfil.classList.remove("exito");
    mensajePerfil.classList.add("error");

    // nuestro boton regresa a su estado normal
    btnGuardar.setAttribute("data-estado", "normal");
    btnGuardar.textContent = "Guardar";
}

function reiniciarBoton(){
    //leer un estado actual del boton para simular una accion automatica
    if (btnGuardar.getAttribute("data-estado") === "guardado"){
        btnGuardar.setAttribute("data-estado","normal");
        btnGuardar.textContent = "Guardar";
    }
    mensajePerfil.classList.remove("error");
    mensajePerfil.textContent = "";        
}

if (btnGuardar) {
    btnGuardar.addEventListener("click", function(){
        //leer lo que escribio el usuario y le quitamos espacio sobrantes
        const nombre = campoNombre.value.trim();
        const correo = campoCorreo.value.trim();
        const edad = campoEdad.value.trim();

        //Validacion 1: ningun campo deberia quedar vacio
        if (nombre === "" || correo === "" || edad === ""){
            mostrarError("Completa todos los campos antes de guardar...");
            return; //necesitamos salir de la funcion con algo devuelto
        }
        //Validacion 2: el correo debe tener @
        if(!correo.includes("@")){
            mostrarError("El correo debe tener un @");
            return;
        }
        //Validacion 3: la edad debe ser mayor a 0
        if(Number(edad) <= 0){
            mostrarError("La edad debe ser mayor a 0");
            return;
        }

        //Si llegamos hasta aqui es porque todos los datos fueron validados
        crearTarjetaPerfil(nombre, correo, edad);
        mensajePerfil.textContent = "Perfil guardado correctamente";
        mensajePerfil.classList.remove("error");
        mensajePerfil.classList.add("exito");

        btnGuardar.setAttribute("data-estado", "guardado");
        btnGuardar.textContent = "Guardado";

        campoNombre.value = "";
        campoCorreo.value = "";
        campoEdad.value = "";
    });

    campoNombre.addEventListener("input", reiniciarBoton);
    campoCorreo.addEventListener("input", reiniciarBoton);
    campoEdad.addEventListener("input", reiniciarBoton);
}


//solucion lab 03
//galeria interactiva
let galeria=[
    {
        titulo:"perrito",
        imagen:"https://picsum.photos/id/237/200/300",
        descripcion:"perro negro"
    },
    {
        titulo:"nevado",
        imagen:"https://picsum.photos/seed/picsum/200/300",
        descripcion:"nevado con una montaña durante el dia"
    },
    {
        titulo:"morsas",
        imagen:"https://picsum.photos/200/300?grayscale",
        descripcion:"grupo de morsas echadas rn un ambiente helado "
    },
    {
        titulo:"cafe",
        imagen:"https://picsum.photos/200/300/?blur",
        descripcion:"imagen desenfoca de cafe siendo servido"
    },
    {
        titulo:"farro",
        imagen:"https://picsum.photos/id/870/200/300?grayscale&blur=2",
        descripcion:"farro alumbrando desenfocado"
    }
];
const contenedorGaleria=document.getElementById("galeria");
const btnOrdenar=document.getElementById("btn-ordenar");
const btnFiltrar= document.getElementById("btn-filtrar");
const btnTodas = document.getElementById("btn-todas");

//dibujar las tragetas de la lista de galeria creda
function mostrarGaleria(lista){
    contenedorGaleria.innerHTML=""; //borra lo que existe en dicha div
    //utilizar forECH para crear una targeta ppr cada elemento
    lista.forEach(function (item) {
        const targeta=document.createElement("div");
        targeta.classList.add("tarjeta");
        const imagen=document.createElement("img");
        imagen.setAttribute("src",item.imagen);
        imagen.setAttribute("alt",item.titulo);
        const titulo=document.createElement("h3");
        titulo.textContent=item.titulo;
        const descripcion=document.createElement("p");
        descripcion.textContent=item.descripcion;
        //Boton para eliminar tarjeta (boton interno)
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.setAttribute("data-titulo", item.titulo);

        targeta.appendChild(imagen);
        targeta.appendChild(titulo);
        targeta.appendChild(descripcion);
        targeta.appendChild(botonEliminar);
        contenedorGaleria.appendChild(targeta);
    });
    //activador de botones.
    activarBotonesEliminar();
}

//eliminar una targetaa usando parentNode.remove
function activarBotonesEliminar(){
    const botones=document.querySelectorAll(".btn-eliminar");
    botones.forEach(function(boton){
        boton.addEventListener("click",function(){
            //leer el titulo que se guardo en el boton
            const titulo =boton.getAttribute("data-titulo");
            //para eliminarlo lo sacamos de array (  la galeria)
            galeria=galeria.filter(function(item){
                return item.titulo !== titulo;
            });
            boton.parentNode.remove();
        });
    });
}

if (contenedorGaleria) {
    //ordenar por titulo
    btnOrdenar.addEventListener("click",function(){
        galeria.sort(function(a,b){
            return a.titulo.localeCompare(b.titulo);
        });
        mostrarGaleria(galeria);
    });

    btnFiltrar.addEventListener("click", function(){
        const largas = galeria.filter(function (item){
            return item.descripcion.length > 50;
        });
        mostrarGaleria(largas);
    });

    btnTodas.addEventListener("click", function(){
        mostrarGaleria(galeria);
    });

    mostrarGaleria(galeria);
}