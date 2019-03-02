window.onload = function(){
    let agendas = []

    JSON.parse(localStorage.getItem("agendas")).forEach( function(elemento_agenda, indice){
        let option = document.createElement('option')
        option.text = elemento_agenda;
        option.value = indice;
        document.getElementById('selectAgendas').appendChild(option)
    })

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
    })
}