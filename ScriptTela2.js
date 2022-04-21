let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
promise.then(carregarQuizz);

function carregarQuizz(resposta){
    let quizz = resposta.data;
    console.log(quizz)
    console.log(quizz[9].questions[0].answers.length)
    let cabecalho = document.querySelector(".titulo");
    let pergunta = document.querySelector("main");

    cabecalho.innerHTML = `<img src="${quizz[9].image}" />
                           <span>${quizz[9].title}</span>`

    for(let i = 0; i < quizz[9].questions.length; i++){
        pergunta.innerHTML += `<div class="pergunta">
                                    <div class="tituloPergunta">${quizz[9].questions[i].title}</div>
                                    <img src="${quizz[9].image}" />
                                 </div>`
    }

}