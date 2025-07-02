
function atualizarContador() {
    var contador = document.querySelectorAll("#listaTarefas li").length;
    console.log("Contador atualizado:", contador);
    document.getElementById('count').innerText = 'Tarefas: ' + contador; }

document.addEventListener("DOMContentLoaded", function () {
    carregarTarefas();

    let botaoAdicionar = document.getElementById("addBtn");
    let tarefaInput = document.getElementById("tarefaInput");

    botaoAdicionar.disabled = true;
    botaoAdicionar.style.backgroundColor = "gray";
    botaoAdicionar.style.cursor = "not-allowed";

    tarefaInput.addEventListener("input", function () {
        if (tarefaInput.value.trim() !== "") {
            botaoAdicionar.disabled = false;
            botaoAdicionar.style.backgroundColor = "#0f0f0f";
            botaoAdicionar.style.cursor = "pointer";
        } else {
            botaoAdicionar.disabled = true;
            botaoAdicionar.style.backgroundColor = "gray";
            botaoAdicionar.style.cursor = "not-allowed";
        }
    });
});

function adicionarTarefa() {
    var tarefaTexto = document.getElementById('tarefaInput').value;

    if (tarefaTexto.trim() !== '') {
        adicionarTarefaExistente(tarefaTexto, false, "nenhuma");
        salvarTarefa(tarefaTexto);
        document.getElementById('tarefaInput').value = ''; 
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

function adicionarTarefaExistente(tarefaTexto, concluida = false, prioridade = "nenhuma") {
    var novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefaTexto;
    novaTarefa.style.opacity = "0";
    novaTarefa.dataset.concluida = concluida;

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
    botaoConcluir.innerText = concluida ? 'Não concluída' : 'Concluída';

    botaoConcluir.addEventListener('click', function () {
        if (novaTarefa.dataset.concluida === "true") {
            botaoConcluir.style.backgroundColor = "#0f0f0f";
            botaoConcluir.style.color = "#05cdff";
            novaTarefa.dataset.concluida = "false";
            botaoConcluir.innerText = 'Concluída';
        } else {
            botaoConcluir.style.backgroundColor = "#05ff5d";
            botaoConcluir.style.color = "black";
            novaTarefa.dataset.concluida = "true";
            botaoConcluir.innerText = 'Não concluída';
        }
        atualizarTarefa(tarefaTexto, novaTarefa.dataset.concluida, prioridade);
    });

    var dropdownPrioridade = document.createElement('select');
    var opcoes = ['Nenhuma', 'Alta', 'Média', 'Baixa'];

    opcoes.forEach(function (prioridadeOp) {
        var opcao = document.createElement('option');
        opcao.value = prioridadeOp.toLowerCase();
        opcao.innerText = prioridadeOp;
        dropdownPrioridade.appendChild(opcao);
    });

    dropdownPrioridade.value = prioridade;
    aplicarEstiloPrioridade(novaTarefa, prioridade);

    dropdownPrioridade.addEventListener('change', function () {
        prioridade = dropdownPrioridade.value;
        aplicarEstiloPrioridade(novaTarefa, prioridade);
        atualizarTarefa(tarefaTexto, novaTarefa.dataset.concluida, prioridade);
    });

    novaTarefa.appendChild(dropdownPrioridade);
    novaTarefa.appendChild(botaoRemover);
    novaTarefa.appendChild(botaoConcluir);
    document.getElementById('listaTarefas').appendChild(novaTarefa);
}

function aplicarEstiloPrioridade(tarefa, prioridade) {
    switch (prioridade) {
        case 'nenhuma':
            tarefa.style.backgroundColor = "black";
            tarefa.style.color = "#05cdff";
            break;
        case 'alta':
            tarefa.style.backgroundColor = "#f34040";
            tarefa.style.color = "black";
            break;
        case 'média':
            tarefa.style.backgroundColor = "#fca33d";
            tarefa.style.color = "black";
            break;
        case 'baixa':
            tarefa.style.backgroundColor = "#59fc61";
            tarefa.style.color = "black";
            break;
    }
}

function salvarTarefa(tarefaTexto) {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas.push({ texto: tarefaTexto, concluida: false, prioridade: "nenhuma" });
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasSalvas));
}

function atualizarTarefa(tarefaTexto, concluida, prioridade) {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas = tarefasSalvas.map(tarefa =>
        tarefa.texto === tarefaTexto ? { texto: tarefaTexto, concluida, prioridade } : tarefa
    );
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasSalvas));
}

function removerTarefa(tarefaTexto) {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas = tarefasSalvas.filter(tarefa => tarefa.texto !== tarefaTexto);
    localStorage.setItem('tarefasSalvas', JSON.stringify(tarefasSalvas));
}

function carregarTarefas() {
    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas")) || [];
    tarefasSalvas.forEach(tarefa => adicionarTarefaExistente(tarefa.texto, tarefa.concluida, tarefa.prioridade));
}

function limparTarefas() {
    document.getElementById('listaTarefas').innerHTML = '';
    localStorage.removeItem("tarefasSalvas");
}

document.getElementById('tarefaInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa(document.getElementById('tarefaInput').value);
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
    tarefas.forEach(function (tarefa) {
        switch (filtro) {
            case 'todas':
                tarefa.style.display = '';
                break;
            case 'concluidas':
                if (tarefa.dataset.concluida === "true") {
                    tarefa.style.display = '';
                } else {
                    tarefa.style.display = 'none';
                }
                break;
            case 'naoConcluidas':
                if (tarefa.dataset.concluida !== "true") {
                    tarefa.style.display = '';
                } else {
                    tarefa.style.display = 'none';
                }
                break;
        }
    });
}

