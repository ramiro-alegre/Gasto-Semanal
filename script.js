//Variables
const formulario = document.querySelector('#formulario');
const gastos = document.querySelector('#gastos');

//Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    modificarRestante(gasto) {

        this.restante = this.restante - gasto;
        return this.restante;
    }

    agregarRestante(gasto) {
        //this.gastos = this.gastos.filter(gasto);
        this.restante = this.restante + gasto;
    }
}

class UI {
    agregarPresupuesto(presupuesto) {
        const presupuestoHTML = document.querySelector('#presupuesto');
        const restanteHTML = document.querySelector('#resto');

        presupuestoHTML.textContent = `Presupuesto: $ ${presupuesto}`;
        presupuestoHTML.classList.add('listado__presupuesto');
        restanteHTML.textContent = `Resto: $ ${presupuesto}`;
        restanteHTML.classList.add('listado__resto');
    }

    agregarGasto(nombre, cantidad) {
        let lista = document.createElement('li');
        lista.classList.add('listado__opcion');

        let texto1 = document.createElement('p');
        texto1.classList.add('listado__texto--gasto');
        texto1.textContent = nombre;

        let texto2 = document.createElement('p');
        texto2.classList.add('listado__texto--precio');

        texto2.textContent = `$ ${cantidad}`;
        texto2.value = cantidad;

        let boton = document.createElement('button');
        boton.classList.add('btn__borrar', 'btn');
        boton.textContent = 'X'

        boton.onclick = e => {

            console.log(e);
            e.path[1].remove();
            presupuesto.agregarRestante(texto2.value);
            this.modificarResto(presupuesto.restante);
        }

        lista.appendChild(texto1);
        lista.appendChild(texto2);
        lista.appendChild(boton);

        gastos.appendChild(lista);

    }

    modificarResto(cantidad) {
        const restanteHTML = document.querySelector('#resto');
        const boton = document.querySelector('.boton');
        restanteHTML.textContent = `Resto: $ ${cantidad}`;

        //Este if es en el caso de que el usuario haya eliminado un gasto.
        //Se suma ese gasto sacado al presupuesto restante y puede 
        //seguir agregando.
        if (boton.classList.contains('boton__out')) {
            boton.classList.remove('boton__out');
            boton.disabled = false;
        }
        //Este if devuelve el color verde al resto por lo antes dicho
        this.validarPresupuesto(cantidad);


    }

    validarPresupuesto(cantidad) {
        const restanteHTML = document.querySelector('#resto');
        if (cantidad > presupuesto.presupuesto / 2) restanteHTML.classList = 'listado__resto';
        if (cantidad <= presupuesto.presupuesto / 2) restanteHTML.classList = 'listado__resto listado__resto--mitad';
        if (cantidad <= presupuesto.presupuesto * 0.25) restanteHTML.classList = 'listado__resto listado__resto--cero';
        if (cantidad <= 0) {
            const boton = document.querySelector('.boton');
            boton.disabled = true;
            boton.classList.add('boton__out');
        }
    }
}

//Instaciar las clases
const ui = new UI();
let presupuesto;

//Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto());
    formulario.addEventListener('submit', agregarGasto);
}

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        location.reload();
        return;
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.agregarPresupuesto(presupuestoUsuario);
}

function agregarGasto(e) {
    e.preventDefault();

    const gastoInput = document.querySelector('#nombre');
    const cantidadInput = document.querySelector('#cantidad');

    if (gastoInput.value === '' || !Number(cantidadInput.value)) {

        return;
    }

    //Ui agrega el HTML del gasto
    ui.agregarGasto(gastoInput.value, Number(cantidadInput.value));

    //presupuesto modifica el resto del objeto
    const resto = presupuesto.modificarRestante(Number(cantidadInput.value));
    //Ui Modifica el HTML del resto
    ui.modificarResto(resto);
    ui.validarPresupuesto(resto);

    formulario.reset();
}