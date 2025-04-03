function adicionarTarefa() {
    var tarefaTexto = document.getElementById('tarefaInput').value;
    let jaClicou;

    if (tarefaTexto.trim() !== '') {
        var novaTarefa = document.createElement('li');
        novaTarefa.innerText = tarefaTexto;
        novaTarefa.style.opacity = "0";
        setTimeout(() => {
            novaTarefa.style.transition = "opacity 1s"; 
            novaTarefa.style.opacity = "1";
        }, 1);

        var botaoRemover = document.createElement('button');
        botaoRemover.innerText = 'Remover';

        botaoRemover.addEventListener('click', function () {
            removerTarefa(tarefaTexto);
            novaTarefa.style.transition = "opacity 1s"; 
            novaTarefa.style.opacity = "0";
            setTimeout(() => {
                novaTarefa.remove();
            }, 1000);
        });

        var botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluída';

        botaoConcluir.addEventListener('click', function () {
            botaoConcluir.style.backgroundColor = "#05ff5d";
            botaoConcluir.style.color = "black";

            if (jaClicou) {
                botaoConcluir.style.backgroundColor = "#0f0f0f";
                botaoConcluir.style.color = "#05cdff";
                jaClicou = false;
                botaoConcluir.innerText = 'Concluída';
                return;
            }
            jaClicou = true;
            botaoConcluir.innerText = 'Não concluída';
        });

        var dropdownPrioridade = document.createElement('select');
        var opcoes = ['Nenhuma', 'Alta', 'Média', 'Baixa'];
        
        opcoes.forEach(function (prioridade) {
            var opcao = document.createElement('option');
            opcao.value = prioridade.toLowerCase();
            opcao.innerText = prioridade;
            dropdownPrioridade.appendChild(opcao);
        });

        dropdownPrioridade.addEventListener('change', function () {
            switch (dropdownPrioridade.value) {
                case 'nenhuma':
                    novaTarefa.style.backgroundColor = "black"; 
                    novaTarefa.style.color = " #05cdff"; 
                    break;
                case 'alta':
                    novaTarefa.style.backgroundColor = "#f34040"; 
                    novaTarefa.style.color = "black"; 
                    break;
                case 'média':
                    novaTarefa.style.backgroundColor = "#fca33d";
                    novaTarefa.style.color = "black";  
                    break;
                case 'baixa':
                    novaTarefa.style.backgroundColor = "#59fc61"; 
                    novaTarefa.style.color = "black"; 
                    break;
            }
        });

        novaTarefa.appendChild(dropdownPrioridade);
        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoConcluir);

        novaTarefa.addEventListener('dblclick', function () {
            var inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.value = tarefaTexto;

            inputEdicao.addEventListener('blur', function () {
                tarefaTexto = inputEdicao.value;
                novaTarefa.innerText = tarefaTexto;

                novaTarefa.appendChild(dropdownPrioridade);
                novaTarefa.appendChild(botaoRemover);
                novaTarefa.appendChild(botaoConcluir);
            });

            novaTarefa.innerText = '';
            novaTarefa.appendChild(inputEdicao);
            inputEdicao.focus();
        });

        document.getElementById('listaTarefas').appendChild(novaTarefa);
        document.getElementById('tarefaInput').value = '';

        salvarTarefa(tarefaTexto);

    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

function salvarTarefa(tarefaTexto) {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas.push(tarefaTexto);
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasSalvas));
}

function removerTarefa(tarefaTexto) {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas = tarefasSalvas.filter(tarefa => tarefa !== tarefaTexto);
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasSalvas));
}

function limparTarefas() {
    var filhos_lista = document.querySelectorAll("#listaTarefas li");
    filhos_lista.forEach(tarefa => tarefa.remove());
    localStorage.clear();
}

document.getElementById('tarefaInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

document.getElementById('divLimpar').innerHTML += '<button id="btnLimpar" onclick="limparTarefas();">Limpar</button>';
document.getElementById('btnLimpar').style.width = "100%";

document.getElementById('divFiltros').innerHTML = `
    <button id="btnTodas" onclick="filtrarTarefas('todas');">Todas</button>
    <button id="btnConcluidas" onclick="filtrarTarefas('concluidas');">Concluídas</button>
    <button id="btnNaoConcluidas" onclick="filtrarTarefas('naoConcluidas');">Não Concluídas</button>
`;

document.getElementById('divFiltros').style.display = 'grid';
document.getElementById('divFiltros').style.gridTemplateColumns = '34% 34% 35%';
document.getElementById('divFiltros').style.alignItems = 'center';

function filtrarTarefas(filtro) {
    var tarefas = document.querySelectorAll("#listaTarefas li");
    tarefas.forEach(function(tarefa) {
        switch (filtro) {
            case 'todas':
                tarefa.style.display = '';
                break;
            case 'concluidas':
                if (tarefa.style.backgroundColor === 'rgb(5, 255, 93)') {
                    tarefa.style.display = '';
                } else {
                    tarefa.style.display = 'none';
                }
                break;
            case 'naoConcluidas':
                if (tarefa.style.backgroundColor !== 'rgb(5, 255, 93)') {
                    tarefa.style.display = '';
                } else {
                    tarefa.style.display = 'none';
                }
                break;
        }
    });
}
