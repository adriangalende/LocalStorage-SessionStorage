window.onload = function(){
    let agendas = []

    /**
     *   Cargamos todas las agendas que tenemos almacenadas en el localStorage
     *
     */
    function cargarOptionsSelect() {
        //limpiamos childnodes para que el select no duplique
        borrarChildNodes(document.getElementById('selectAgendas'));
        JSON.parse(localStorage.getItem("agendas")).forEach(function (elemento_agenda, indice) {
            let option = document.createElement('option')
            option.text = elemento_agenda;
            option.value = indice;
            document.getElementById('selectAgendas').appendChild(option)
        })
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

    cargarOptionsSelect();

    //Modificamos el contenido del textarea cuando cambiamos el option en el select
    document.getElementById('selectAgendas').addEventListener('change', function(option){
        let opcionSeleccionada = option.srcElement.value;
        let contenidoLocalStorage = JSON.parse(localStorage.getItem(opcionSeleccionada));
        document.getElementById('contenidoAgenda').value  = contenidoLocalStorage != null ? contenidoLocalStorage : "";
    });

    document.forms['form-add-agenda'].addEventListener('submit', function(form){
        form.preventDefault();
        let value = form.srcElement.querySelectorAll('#inputAgenda')[0].value;
        agendas = JSON.parse(localStorage.getItem('agendas')) ;
        if(agendas != null){
            agendas.push(value);
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

}