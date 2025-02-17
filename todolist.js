function adicionarTarefa() {
    var tarefaTexto = document.getElementById('tarefaInput').value;

    if (tarefaTexto.trim() !== '') {
      
        var novaTarefa = document.createElement('li');
        
        
        novaTarefa.innerText = tarefaTexto;

      
        var botaoRemover = document.createElement('button');
        botaoRemover.innerText = 'Remover';

        
        botaoRemover.addEventListener('click', function() {
            novaTarefa.remove();
        });

      
        novaTarefa.appendChild(botaoRemover);
        
       
        document.getElementById('listaTarefas').appendChild(novaTarefa);
        
        
        document.getElementById('tarefaInput').value = '';
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}



