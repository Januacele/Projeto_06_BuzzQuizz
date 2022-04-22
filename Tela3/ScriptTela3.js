const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let idQuizz = 0;
let i = 0;
let QtdPerguntasQuizz = 0;



function trocarTelas3 (){
    const Tela31 = document.querySelector(".Tela31");
    const Tela32 = document.querySelector(".Tela32");
    const Tela33 = document.querySelector(".Tela33");
    const Tela34 = document.querySelector(".Tela34");
    const buttom1 = document.querySelector(".Comeco");
    const buttom2 = document.querySelector(".Prosseguir-Niveis");
    const buttom3 = document.querySelector(".Finalizar-Quizz");
    const buttom4 = document.querySelector(".voltarHome");
    
    if (buttom1 !== null){
        Tela31.classList.add("escondido");
        Tela32.classList.remove("escondido"); 
    } else if (buttom2 !== null){
        Tela32.classList.add("escondido");
        Tela33.classList.remove("escondido"); 
    }  
}

    
  