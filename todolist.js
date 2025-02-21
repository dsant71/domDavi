
function atualizarContador() {
    var contador = document.querySelectorAll("#listaTarefas li").length;
    console.log("Contador atualizado:", contador);
    document.getElementById('count').innerText = (contador);
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
        novaTarefa.style.opacity = "1"}, 1);
     
     
        var botaoRemover = document.createElement('button');
        botaoRemover.innerText = 'Remover';
    
        botaoRemover.addEventListener('click', function () {
            novaTarefa.style.transition = "opacity 1s"; 
            novaTarefa.style.opacity = "0"
            
            setTimeout(() => {
                novaTarefa.remove()
                novaTarefa.style.opacity = "1";
            }, 1000);
            
        });

        botaoRemover.addEventListener('click', function () {
            setTimeout(() => {
                var contador = document.querySelectorAll("#listaTarefas li").length;
                console.log("Contador atualizado:", contador);
                document.getElementById('count').innerHTML = '<p> Tarefas: ' + (contador);
            }, 1001);
           
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

            
              
        ;})
        
    
        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoConcluir);

        document.getElementById('listaTarefas').appendChild(novaTarefa);


        document.getElementById('tarefaInput').value = '';
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

document.getElementById('divLimpar').innerHTML += '<button id="btnLimpar" onclick="limparTarefas(), zerarContador()"> Limpar </button>';
document.getElementById('btnLimpar').style.width = "100%";

function limparTarefas(){
  
    var filhos_lista = document.querySelectorAll("#listaTarefas li") 
    
    document.getElementById('listaTarefas').style.transition = "opacity 1s"; 
    document.getElementById('listaTarefas').style.opacity = "0";
    
    setTimeout(() => {
        for (let i = 0; i < filhos_lista.length; i++) {
            filhos_lista[i].remove();
            document.getElementById('listaTarefas').style.opacity = "1";
        }
    }, 1000);

   
}

function atualizarContador() {
    var contador = document.querySelectorAll("#listaTarefas li").length;
    console.log("Contador atualizado:", contador);
    document.getElementById('count').innerHTML = '<p> Tarefas: ' + (contador);
  }
  
function zerarContador() {
    setTimeout(() => {
        var contador = document.querySelectorAll("#listaTarefas li").length;
        console.log("Contador atualizado:", contador);
        document.getElementById('count').innerHTML = '<p> Tarefas: ' + (contador);  
    }, 1001);
   
}


document.getElementById('count').style.color = "#05cdff"