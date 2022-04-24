const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

const buttom1 = document.querySelector(".Comeco");
const buttom2 = document.querySelector(".Prosseguir-Niveis");
const buttom3 = document.querySelector(".Finalizar-Quizz");
const buttomAcessarQuizz = document.querySelector(".Acessar-Quizz");
const buttomHome = document.querySelector(".voltarHome");
const meuTitulo = "";

//Funções para adicinar e remover o display: none, que está dentro da classe escondido

function DisplayTela31 (){
    const Tela31 = document.querySelector(".Tela31").classList.remove("escondido");
}

function HiddenTela31 (){
    const Tela31 = document.querySelector(".Tela31").classList.add("escondido");
}

function DisplayTela32 (){
    const Tela32 = document.querySelector(".Tela32").classList.remove("escondido");
}
function HiddenTela32 (){
    const Tela32 = document.querySelector(".Tela32").classList.add("escondido");
}

function DisplayTela33 (){
    const Tela33 = document.querySelector(".Tela33").classList.remove("escondido");
}
function HiddenTela33 (){
    const Tela33 = document.querySelector(".Tela33").classList.add("escondido");
}

function DisplayTela34 (){
    const Tela34 = document.querySelector(".Tela34").classList.remove("escondido");
}
function HiddenTela34 (){
    const Tela34 = document.querySelector(".Tela34").classList.add("escondido");
}

// Função para trocar entre as subtelas da Tela 3 ao clicar nos botões
function trocarTelas (){
    buttom1.addEventListener('click', DisplayTela32);
    buttom1.addEventListener('click', HiddenTela31);
    buttom2.addEventListener('click', DisplayTela33);
    buttom2.addEventListener('click', HiddenTela32);
    buttom3.addEventListener('click', DisplayTela34);
    buttom3.addEventListener('click', HiddenTela33);
    buttomAcessarQuizz.addEventListener('click', HiddenTela34);
}

//Validações para Criação do Quizz - Começo
function ValidarTela3Comeco(){
    const meuTitulo = document.querySelector(".titulo").value;
    const minhaUrlImg = document.querySelector(".urlImagem").value;
    const minhaQtdPerguntas = document.querySelector(".QtsPerguntas").value;
    const meusNiveis = document.querySelector(".QtdNiveis").value;
    //console.log(meuTitulo);

    //Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres

    if (meuTitulo.length < 20 || meuTitulo.length > 65) { 
        buttom1.removeEventListener('click', DisplayTela32);
        buttom1.addEventListener('click', DisplayTela31);
        alert("O título deve conter entre 20 e 65 letras, incluindo os espaços");
        
    } else {
        buttom1.addEventListener('click', DisplayTela32);
    }

    //Imagem deve ser no formato URL 

    if (minhaUrlImg.includes("https://") === false) { 
        
        buttom1.removeEventListener('click', DisplayTela32);
        buttom1.addEventListener('click', DisplayTela31);
        alert("A imagem deve ser um link (Formato URL)");
        
    } else {
        buttom1.addEventListener('click', DisplayTela32);
    }

    //Deve conter no mínimo 3 perguntas 
    
    if (Number(minhaQtdPerguntas) <= 2) { 
        buttom1.removeEventListener('click', DisplayTela32);
        buttom1.addEventListener('click', DisplayTela31);
        alert("Deve conter no mínimo 3 perguntas");
        
    } else {
        buttom1.addEventListener('click', DisplayTela32);
    }

    //Deve conter no mínimo 2 níveis 
    
    if (Number(meusNiveis) <= 1) { 
        buttom1.removeEventListener('click', DisplayTela32);
        buttom1.addEventListener('click', DisplayTela31);
        alert("Deve conter no mínimo 2 níveis");
        
    } else {
        buttom1.addEventListener('click', DisplayTela32);
    }
    ValidarTela3Perguntas(); //janu, pra testar chamei a função aqui! mas nao sei se é a melhor forma
}

function ValidarTela3Perguntas (){
    let minhaQtdPerguntas = document.querySelector(".QtsPerguntas").value;
    let addPerguntas = document.querySelector(".adicionarPerguntas");
    for (let i=0 ; i< minhaQtdPerguntas; i++){
        addPerguntas.innerHTML += `
        <ul class="Adicionar Segunda-Pergunta">
                    <div class="criarPergunta">
                        <h3> Pergunta ${i} </h3>
                        <img class="botaoCriarPergunta" src="/Imagens/Vector.svg" alt="Criar perguntas">
                    </div>
                </ul>`
               
    }

}