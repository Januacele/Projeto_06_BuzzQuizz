//variveis globais
let quizz, arrayRespostas, numPerguntas;
let contadorRespostas = 0;

iniciarTela1();

//carregar Tela 1
function iniciarTela1(){
    let tela1 = document.querySelector(".Tela1");
    tela1.innerHTML = ` <header>
                            BuzzQuizz
                        </header>
                        <main>
                            <div class="novoQuizz">
                                <div class="quizzesUser">Você não criou nenhum quizz ainda :(</div>
                                <div class="criarQuizz">Criar Quizz</div>
                            </div>
                            <span style="width: 80%; font-weight: 700">Todos os Quizzes</span>
                            <div class="quizzes"></div>

                        </main>`
    //get dos quizzes na API
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(listarQuizzes);
}

//listar quizzes Tela 1
function listarQuizzes(resposta){
    quizz = resposta.data;
    let organizarHTML = document.querySelector(".quizzes");

    for(let i = 0; i < quizz.length; i++){
        organizarHTML.innerHTML += `<div class="imagem" style="background-image: 
                                    linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0) 0%, 
                                    rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${quizz[i].image})"
                                    onclick="carregarQuizz(${i})">
                                    <span>${quizz[i].title}</span>
                                    </div>`
    }
}

//carregar página do quizz (Tela 2)
function carregarQuizz(num){
    let tela2 = document.querySelector(".Tela1");    
    tela2.innerHTML = `<div class="Tela2">
                        <header>
                            BuzzQuizz
                        </header>
                        <div class="titulo"></div>
                        <main></main>`;

    let cabecalho = document.querySelector(".titulo");
    let pergunta = document.querySelector("main");
    numPerguntas = quizz[num].questions.length;

    console.log(num);
    //titulo e imagem do quizz
    cabecalho.innerHTML = `<img src="${quizz[num].image}" />
                           <span>${quizz[num].title}</span>`

    //boxes de perguntas
    for(let i = 0; i < quizz[num].questions.length; i++){
        pergunta.innerHTML += `<div class="pergunta">
                                    <div class="tituloPergunta">${quizz[num].questions[i].title}</div>
                                    <div class="respostas"></div>
                               </div>`
    }

    let respostas = document.querySelectorAll(".respostas");

    //listar respostas em ordem aleatória
    for(let i = 0; i < respostas.length; i++){
        arrayRespostas = quizz[num].questions[i].answers.sort(aleatorio); 
        for(let j = 0; j < quizz[num].questions[i].answers.length; j++){
            if(quizz[num].questions[i].answers[j].isCorrectAnswer){
                respostas[i].innerHTML += `<div class="resposta certa" onclick="selecionaResposta(this)">
                                        <img src="${quizz[num].questions[i].answers[j].image}" />
                                        <span>${quizz[num].questions[i].answers[j].text}</span>`
            } else {
                respostas[i].innerHTML += `<div class="resposta errada" onclick="selecionaResposta(this)">
                                        <img src="${quizz[num].questions[i].answers[j].image}" />
                                        <span>${quizz[num].questions[i].answers[j].text}</span>`
            }
        }
    }
}

//embaralha respostas
function aleatorio(){
    return Math.random() - 0.5;
}

//comportamento ao clicar na resposta
function selecionaResposta(elemento){
    contadorRespostas++;
    elemento.classList.add("selecionada");
    let imagensOpacas = elemento.parentNode.querySelectorAll('.resposta');
    let corResposta = elemento.parentNode.querySelectorAll('span');

    for(let i = 0; i < imagensOpacas.length; i++){
        imagensOpacas[i].classList.add("opaca");
        corResposta[i].classList.add("cor");
    }

    if(contadorRespostas === numPerguntas){
        mostrarNivel();
    }
}

function mostrarNivel(){

    let caixaNivel = document.querySelector("main");

    caixaNivel.innerHTML += `<div class="nivel">
                                    <div class="tituloNivel"></div>
                                    <img src="" />
                                    <div class="resumoNivel"></div>
                               </div>
                               <span>Reiniciar Quizz</span>
                               <span>Voltar para home</span>`
}