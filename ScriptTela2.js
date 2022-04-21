//get dos quizzes na API
let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
promise.then(carregarQuizz);

//carregar página do quizz
function carregarQuizz(resposta){
    let quizz = resposta.data;
    console.log(quizz)
    let cabecalho = document.querySelector(".titulo");
    let pergunta = document.querySelector("main");
    let num = 18; //id do quizz

    //titulo e imagem do quizz
    cabecalho.innerHTML = `<img src="${quizz[num].image}" />
                           <span>${quizz[num].title}</span>`

    //boxes de perguntas
    for(let i = 0; i < quizz[num].questions.length; i++){
        pergunta.innerHTML += `<div class="pergunta">
                                    <div class="tituloPergunta">${quizz[num].questions[i].title}</div>
                               </div>`
    }

    let respostas = document.querySelectorAll(".pergunta");

    //listar respostas em ordem aleatória
    for(let i = 0; i < teste.length; i++){
        quizz[num].questions[i].answers.sort(aleatorio); 
        for(let j = 0; j < quizz[num].questions[i].answers.length; j++){
            respostas[i].innerHTML += `<div class="resposta">
                                        <img src="${quizz[num].questions[i].answers[j].image}" />
                                        <span>${quizz[num].questions[i].answers[j].text}</span>` 
        }
    }

}

//embaralha respostas
function aleatorio(){
    return Math.random() - 0.5;
}