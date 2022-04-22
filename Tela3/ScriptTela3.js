const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

const buttom1 = document.querySelector(".Comeco");
const buttom2 = document.querySelector(".Prosseguir-Niveis");
const buttom3 = document.querySelector(".Finalizar-Quizz");
const buttomAcessarQuizz = document.querySelector(".Acessar-Quizz");
const buttomHome = document.querySelector(".voltarHome");


//Funções para adicinar e remover o display: none, que está dentro da classe escondido

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
