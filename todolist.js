function adicionarTarefa() {
    var tarefaTexto = document.getElementById('tarefaInput').value;
    let jaClicou;

    if (tarefaTexto.trim() !== '') {

        var novaTarefa = document.createElement('li');


        novaTarefa.innerText = tarefaTexto;


        var botaoRemover = document.createElement('button');
        botaoRemover.innerText = 'Remover';


        botaoRemover.addEventListener('click', function () {
            novaTarefa.remove();
        });

        var botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluída';


        botaoConcluir.addEventListener('click', function () {
           
         
            novaTarefa.style.backgroundColor = "#05ff5d";
            novaTarefa.style.color = "black";

            if (jaClicou) {
                novaTarefa.style.backgroundColor = "black";
                novaTarefa.style.color = "#05cdff";
                jaClicou = false
                botaoConcluir.innerText = 'Concluída';
                return

            }
            jaClicou = true;
            botaoConcluir.innerText = 'Não concluída';
            
        });


        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoConcluir);

        document.getElementById('listaTarefas').appendChild(novaTarefa);


        document.getElementById('tarefaInput').value = '';
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}



