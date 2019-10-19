// CLASE PARA CREAR CADA UNO DE LOS ARTICULOS
class Producto {
    constructor(nombre, precio, year) {
        this.nombre= nombre;
        this.precio= precio;
        this.year= year;        
    }

    agregarProducto() {
    }    
    
}

// INTERFACE  IU INTERFACE DE USUARIO 
class IU {
    agregarProducto(producto) {
        //OBTENEMOS EL DIV productlist en una constante, creamos un div hijo para agregarlo sobre el primero
        const PRODUCTLIST= document.getElementById('product-list');
        const ELEMENT= document.createElement('div');
        ELEMENT.innerHTML= `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${producto.nombre}
                    <strong>Product Price</strong>: ${producto.precio}
                    <strong>Product Year</strong>: ${producto.year}
                    <a href="#" class="btn btn-danger" name="delete">Borrar</a>
                </div>
            </div>       
        `;
        PRODUCTLIST.appendChild(ELEMENT);
        
    }

    resetearFormulario() {
        document.getElementById('product-form').reset();
    }

    borrarProducto(elemento) {
        if (elemento.name === 'delete') {
            elemento.parentElement.parentElement.parentElement.remove();
            //elemento.parentElement.delete();
        }
    }

    mostrarMensaje(mensaje, cssClass) {
        const DIV = document.createElement('div');
        DIV.className= `alert alert-${cssClass} mt-4`;
        DIV.appendChild(document.createTextNode(mensaje));
        //mostrando en DOM
        const CONTAINER = document.querySelector('.container');
        const APP = document.querySelector('#app');

        CONTAINER.insertBefore(DIV, APP);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        },3000);
    }
        
}

//DOM EVENTS (DOCUMENT OBJECT MODEL)
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const NAME= document.getElementById('name').value; 
        const PRICE = document.getElementById('price').value; 
        const YEAR= document.getElementById('year').value;        

        //aqui ya creamos un  producto que existe dentro de la parte logica
        const PRODUCTO = new Producto(NAME,PRICE,YEAR);
       
        //CREAMOS NUEVA INSTANCIA DE LA INTERFAZ Y LLAMAMOS SU METODO AGREGAR PRODUCTO ENVIANDO EL PRODUCTO
        //RECIEN CREADO COMO PARAMETRO
        const UI = new IU();
        if (NAME==='' || PRICE==='' || YEAR==='') {
            return UI.mostrarMensaje('Falta diligenciar algunos datos','warning');
        }
        UI.agregarProducto(PRODUCTO);
        UI.resetearFormulario();
        UI.mostrarMensaje("Elemento creado","success");

        // cancela que la pagina se actualice
        e.preventDefault(); 
});

//capturamos los clicks que se hacen sobre el div product list, con el target capturamos el objeto en especifico
document.getElementById('product-list')
    .addEventListener('click', function (e) {        
        console.log(e.target);
        const UI = new IU();
        UI.borrarProducto(e.target);
        UI.mostrarMensaje("Elemento eliminado","info");

    
});
