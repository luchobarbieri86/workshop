//KIOSCO control
      
//Declaración variables globales
let categoria,
    tipo,
    marca,
    stock,
    peso,
    precio,
    opcionOrdenado,
    opcionMenu,
    opcionTotales,
    contador,
    totales,
    productoElegido,
    cantidadModificar,
    opcionModificar,
    contador2 = 0,
    click = 1;
    
    
const html = {
    //Main elements
    inputTipo: document.getElementById("inputTipo"),
    inputCategoria: document.getElementById("inputCategoria"),
    inputMarca: document.getElementById("inputMarca"),
    inputStock: document.getElementById("inputStock"),
    inputPeso: document.getElementById("inputPeso"),
    inputPrecio: document.getElementById("inputPrecio"),
    inputImagen: document.getElementById("inputImagen"),
    //Buttons
    btnAgregar: document.getElementById("btnAgregar"),
    btnMostrarAlmacenados: document.getElementById("btnMostrarAlmacenados"),
    btnMostrarTabla: document.getElementById("btnMostrarTabla"),
    btnEliminar: document.getElementById("btnEliminar"),
    //Containers
    containerCards: document.getElementById("containerCards"),
    tbodyPrueba: document.getElementById("tbodyPrueba"),
    stockContainer: document.getElementById("stockContainer")
};

//Declaración objeto Productos
class Producto {
    constructor (
        categoria,
        tipo,
        marca,
        stock,
        peso,
        precio,
        imagen,
        id
        ) {
        this.categoria = categoria;
        this.tipo = tipo;
        this.marca = marca;
        this.stock = parseInt(stock);
        this.peso = parseInt(peso);
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.id = id;
    }
}

//Declaración array vacío
const productos = [];

//Declaración url archivo JSON local
const URLJSON = "assets/data/datos.json";

//AGREGAR PRODUCTO
html.btnAgregar.addEventListener("click", evento => {
    evento.preventDefault();
    const categoria = html.inputCategoria.value;
    const tipo = html.inputTipo.value;
    const marca = html.inputMarca.value;
    const stock = html.inputStock.value;
    const peso = html.inputPeso.value;
    const precio = html.inputPrecio.value;
    const imagen = html.inputImagen.value;
    const id = contador2;
    contador2 += 1;

    const producto = new Producto(
        categoria,
        tipo,
        marca,
        stock,
        peso,
        precio,
        imagen,
        id
    );
    agregarProducto(producto);
    console.log(productos);
});

function agregarProducto (producto) {
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    let existeProducto = productos.some(
        (element) => element.id === producto.id
      );
      if (existeProducto) {
        productos = productos.map((element) => {
          if (element.id === producto.id) {
            element.stock += producto.stock;
            return element;
          } else {
            return element;
          }
        });
      } else {
        productos.push(producto);
      }    
      guardarLocal("listaProductos", JSON.stringify(productos));
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado correctamente !!',
        showConfirmButton: false,
        timer: 1500
     })
};

//FUNCION: Muestra los productos en cards
function mostrarProductos () {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".card"));
    productos.forEach(producto => {
        const card = document.createElement("div");
        const {
            categoria,
            tipo,
            marca,
            stock,
            peso,
            precio,
            imagen,
            id
        } = producto;
        
        card.innerHTML = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="${tipo}" width="400px" height="250px">
        <div class="card-body">
          <h5 class="card-title">${tipo} "${marca}"</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Categoría: ${categoria}</li>
            <li class="list-group-item">Tipo: ${tipo}</li>
            <li class="list-group-item">Marca: ${marca}</li>
            <li class="list-group-item">STOCK: ${stock}</li>
            <li class="list-group-item">Peso: ${peso} grs.</li>
            <li class="list-group-item">Precio: $ ${precio}.-</li>
            <li class="list-group-item">ID: ${id}</li>
        </ul>
        </div>`;
        html.containerCards.append(card);
    });
};

//jQuery para eventos
$("#btnMostrar").click((evento) => {
    evento.preventDefault();
    mostrarProductos();             
});

//FUNCION: muestra productos almacenados en LOCAL
function mostrarProductosAlmacenados () {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".card"));
    const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
    if (almacenados != null) {
        almacenados.forEach(producto => {
            const card = document.createElement("div");
            const {
                categoria,
                tipo,
                marca,
                stock,
                peso,
                precio,
                imagen,
                id
            } = producto;
            
            card.innerHTML = `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${imagen}" alt="${tipo}" width="400px" height="250px">
            <div class="card-body">
                <h5 class="card-title">${tipo} "${marca}"</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Categoría: ${categoria}</li>
                <li class="list-group-item">Tipo: ${tipo}</li>
                <li class="list-group-item">Marca: ${marca}</li>
                <li class="list-group-item">STOCK: ${stock}</li>
                <li class="list-group-item">Peso: ${peso} grs.</li>
                <li class="list-group-item">Precio: $ ${precio}.-</li>
                <li class="list-group-item">ID: ${id}</li>
            </ul>
            </div>`;
            $("#containerCards").append(card);
        });
    };
};

html.btnMostrarAlmacenados.addEventListener("click", evento => {
    evento.preventDefault();
    $("#containerCards").slideToggle(1000);
    mostrarProductosAlmacenados(); 
});

//FUNCION: muestra productos en tabla
function mostrarProductosTabla () {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".tr"));
    productos.forEach(producto => {
        const tr = document.createElement("tr");
        tr.className = "tr";
        const {
            categoria,
            tipo,
            marca,
            stock,
            precio,
            id
        } = producto;

    tr.innerHTML = `
                    <tr>
                        <th scope="row">${id}</th>
                        <td>${categoria}</td>
                        <td>${marca}</td>
                        <td>${tipo}</td>
                        <td>${precio}</td>
                        <td>${stock}</td>
                    </tr>
                `;
    $("#tbodyPrueba").append(tr);
    console.log(tr);
    });
};

html.btnMostrarTabla.addEventListener("click", evento => {
    evento.preventDefault();    
    $("#divTabla").slideToggle(1000, function(){
        $('#divTabla').css({'border':' 4px solid rgb(77, 108, 143)'});
        $('#divTabla').animate({
            'font-size':'2em'},
            1000);
    });
    mostrarProductosTabla(); 
});

//ELIMINAR TODOS
html.btnEliminar.addEventListener("click", (evento) => {
    evento.preventDefault();
    productos.length = 0;
    productos.id = 0;
    console.log(productos);
    containerCards.innerHtml = "";    
    contador2 = 0;
    $("#containerCards").slideUp("fast");
    $(".card").remove();
    $('#divTabla').slideUp("fast");
});


//TOTAL STOCK - SIN CONTAR EL LOCALSTORAGE
let btnStock = $("#btnStock")[0];
btnStock.addEventListener("click", totalStock);
function totalStock (e) {
    e.preventDefault();
    contador = 0;
    for(let i = 0; i < productos.length; i += 1) {
        contador += productos[i].stock;
    }
    console.log(contador);
    Swal.fire(`El stock total de productos es de: ${contador}`);
}

//FECHA ACTUAL CON JQUERY
$("#copyright").append($.datepicker.formatDate('dd/mm/yy', new Date()));


//DATOS JSON
$("#btnTraerJSON").click((evento) => {
    evento.preventDefault();
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                agregarProducto(dato);
            }
        }
    });
});
/* 
//SPA
const compania = document.querySelector("#compania");
//const home = document.querySelector("#home");

const llamadaHttp = (evt) => {
    evt.preventDefault();
    let url = `${evt.target.dataset.target}.html`;
    fetch(url)
        .then(res => res.text())
        .then((html) => renderResultado(html))
        .catch((err) => console.log(err))
}

compania.addEventListener("click", llamadaHttp);
//home.addEventListener("click", llamadaHttp);

function renderResultado(resultado) {
    const main = document.querySelector('main');
    main.innerHTML = resultado;
} */