
function adicionarTarefa() {
         
    var tarefaTexto = document.getElementById('tarefaInput').value;
    

    if (tarefaTexto.trim() !== '') {
       
        var novaTarefa = document.createElement('li');
        
     
        novaTarefa.textContent = tarefaTexto;
        
      
        document.getElementById('listaTarefas').appendChild(novaTarefa);
        
        document.getElementById('tarefaInput').value = '';
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}