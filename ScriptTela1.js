const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz';

let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
promise.then(listarQuizzes);

function listarQuizzes(resposta){
    let quizzes = resposta.data;
    console.log(quizzes);
    let organizarHTML = document.querySelector(".quizzes");

    for(let i = 0; i < quizzes.length; i++){
        organizarHTML.innerHTML += `<div class="imagem" style="background-image: 
                                    linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0) 0%, 
                                    rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${quizzes[i].image})">
                                    <span>${quizzes[i].title}</span>
                                    </div>`
    }
}