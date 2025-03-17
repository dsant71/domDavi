

function atualizarContador() {
    var contador = document.querySelectorAll("#listaTarefas li").length;
    console.log("Contador atualizado:", contador);
    localStorage.setItem("contador", contador)
    var exibe = localStorage.getItem("contador")
    document.getElementById('count').innerText = 'Tarefas: ' + contador;
}

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
            novaTarefa.style.transition = "opacity 1s"; 
            novaTarefa.style.opacity = "0";
            setTimeout(() => {
                novaTarefa.remove();
                atualizarContador(); 
            }, 1000);
        });

        var botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluída';

        botaoConcluir.addEventListener('click', function () {
            novaTarefa.style.backgroundColor = "#05ff5d";
            novaTarefa.style.color = "black";

            if (jaClicou) {
                novaTarefa.style.backgroundColor = "black";
                novaTarefa.style.color = "#05cdff";
                jaClicou = false;
                botaoConcluir.innerText = 'Concluída';
                return;
            }
            jaClicou = true;
            botaoConcluir.innerText = 'Não concluída';
        });

        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoConcluir);

        novaTarefa.addEventListener('dblclick', function () {
            var inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.value = tarefaTexto;

            inputEdicao.addEventListener('blur', function () {
                novaTarefa.innerText = inputEdicao.value;
                novaTarefa.appendChild(botaoRemover);
                novaTarefa.appendChild(botaoConcluir);
            });

            novaTarefa.innerText = '';
            novaTarefa.appendChild(inputEdicao);
            inputEdicao.focus();
        });

        document.getElementById('listaTarefas').appendChild(novaTarefa);
        document.getElementById('tarefaInput').value = '';
        atualizarContador(); 

    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

document.getElementById('divLimpar').innerHTML += '<button id="btnLimpar" onclick="limparTarefas();"> Limpar </button>';
document.getElementById('btnLimpar').style.width = "100%";

function limparTarefas() {
    var filhos_lista = document.querySelectorAll("#listaTarefas li");
    for (let i = 0; i < filhos_lista.length; i++) {
        filhos_lista[i].remove();
    }
    localStorage.clear("listaTarefas")
    document.getElementById('listaTarefas').style.transition = "opacity 1s"; 
    document.getElementById('listaTarefas').style.opacity = "0";
    setTimeout(() => {
        document.getElementById('listaTarefas').style.opacity = "1";
        atualizarContador(); 
    }, 1000);
}

document.getElementById('tarefaInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

document.getElementById('count').style.color = "#05cdff";

document.getElementById('divFiltros').innerHTML = `
    <button id="btnTodas" onclick="filtrarTarefas('todas');">Todas</button>
    <button id="btnConcluidas" onclick="filtrarTarefas('concluidas');">Concluídas</button>
    <button id="btnNaoConcluidas" onclick="filtrarTarefas('naoConcluidas');">Não Concluídas</button>
`;

document.getElementById('divFiltros').style.display = 'grid';
document.getElementById('divFiltros').style.gridTemplateColumns = '34% 34% 35%';
document.getElementById('divFiltros').style.alignItems = 'center'


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
