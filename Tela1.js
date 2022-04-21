const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz';

let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
promise.then(listarQuizzes);

function listarQuizzes(resposta){
    let quizzes = resposta.data;
    let organizarHTML = document.querySelector(".quizzes");

    for(let i = 0; i < quizzes.length; i++){
        organizarHTML.innerHTML += `<div><img src="${quizzes[i].image}"/></div>`
    }
}