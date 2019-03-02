window.onload = function(){
    let agendas = []
    var formulario = document.forms['form-add-agenda'];
    var selectAgendas =  document.getElementById('selectAgendas');
    var contenidoAgenda =  document.getElementById('contenidoAgenda');

    /**
     *   Cargamos todas las agendas que tenemos almacenadas en el localStorage
     *
     */
    function cargarOptionsSelect() {
        //limpiamos childnodes para que el select no duplique
        borrarChildNodes(selectAgendas);
        let agendas = JSON.parse(localStorage.getItem("agendas"));

        if(agendas != null){
            agendas.forEach(function (elemento_agenda, indice) {
                if(elemento_agenda != null && elemento_agenda != undefined && elemento_agenda != "") {
                    let option = document.createElement('option')
                    option.text = elemento_agenda;
                    option.value = indice;
                    selectAgendas.appendChild(option)
                } else {
                    localStorage.removeItem(indice);
                }
            })
        }

    }

    /**
     * Borra todos los nodos hijo de un nodo.
     * @param node
     */
    function borrarChildNodes(node){
        while(node.hasChildNodes()){
            node.removeChild(node.lastChild);
        }
    }

    //Cargamos options
    cargarOptionsSelect();
    //Forzamos que quede marcado el primer elemento
    selectAgendas.value = 0;


    //Modificamos el contenido del textarea cuando cambiamos el option en el select
    ["change","select"].forEach(action => {
        selectAgendas.addEventListener(action, function(option){
            let opcionSeleccionada = option.srcElement.value;
            let contenidoLocalStorage = JSON.parse(localStorage.getItem(opcionSeleccionada));
            contenidoAgenda.value  = contenidoLocalStorage != null ? contenidoLocalStorage : "";
        });
    })


    formulario.addEventListener('submit', function(form){
        form.preventDefault();
        let value = form.srcElement.querySelectorAll('#inputAgenda')[0].value;
        agendas = JSON.parse(localStorage.getItem('agendas')) ;
        if(agendas != null){
            if(!agendas.includes(value)){
                agendas.push(value);
            }
        } else {
            agendas = [];
            agendas.push(value);
        }
        localStorage.setItem("agendas", JSON.stringify(agendas));
        cargarOptionsSelect();
    })

    document.getElementById('contenidoAgenda').addEventListener('change', function(contenido){
        let valueAgenda = document.getElementById('selectAgendas').value;
        localStorage.setItem(valueAgenda,JSON.stringify(contenido.srcElement.value))
    })

    function borrarContenidoAgenda(){
        localStorage.removeItem(selectAgendas.value);
        contenidoAgenda.value = localStorage.getItem(selectAgendas.value) == null ? "" : "Has borrado mal inutil";
    }

    document.getElementById("limpiarAgenda").addEventListener("click", function(){
        borrarContenidoAgenda();
    });

    document.getElementById("borrarAgenda").addEventListener("click", function(){
        let option = JSON.parse(localStorage.getItem("agendas"))[selectAgendas.value];
        let agenda = [];
        if (confirm("Estás seguro de que quieres borrar la agenda " + option + " ?")) {
            agenda = JSON.parse(localStorage.getItem("agendas"));
            if(agenda.includes(option)){
                console.log(agenda[agenda.indexOf(option)]);
                delete agenda[agenda.indexOf(option)]
            }

            localStorage.setItem("agendas", JSON.stringify(agenda))
            cargarOptionsSelect();
            borrarContenidoAgenda();


        } else {

        }
    })
}