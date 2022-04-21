const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let idQuizz = 0;
let i = 0;
let QtdPerguntasQuizz = 0;



function trocarTelas3 (){
    const Tela31 = document.querySelector(".Tela31");
    const Tela32 = document.querySelector(".Tela32");
    const buttom1 = document.querySelector(".Comeco");
    const buttom2 = document.querySelector(".Prosseguir-Niveis");
    
    if (buttom1 === null){
        Tela31.classList.remove("escondido");
        Tela32.classList.add("escondido");
    }
    if (buttom1 !== null){
        Tela31.classList.add("escondido");
        Tela32.classList.remove("escondido"); 
    }
}

    
  