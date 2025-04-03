document.addEventListener("DOMContentLoaded", function () {
    carregarTarefas();
});

function adicionarTarefa(tarefaTexto, concluida = "false", prioridade = "nenhuma") {
    let jaClicou;

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
    botaoConcluir.innerText = concluida === "true" ? 'Não concluída' : 'Concluída';

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
    tarefasSalvas.push({ texto: tarefaTexto, concluida: "false", prioridade: "nenhuma" });
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
    tarefasSalvas.forEach(tarefa => adicionarTarefa(tarefa.texto, tarefa.concluida, tarefa.prioridade));
}

document.getElementById('tarefaInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa(document.getElementById('tarefaInput').value);
    }
});

document.getElementById('divLimpar').innerHTML += '<button id="btnLimpar" onclick="limparTarefas();">Limpar</button>';
document.getElementById('btnLimpar').style.width = "100%";
