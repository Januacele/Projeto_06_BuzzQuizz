//variveis globais
let quizz, arrayRespostas, numPerguntas, idQuizz;
let contadorRespostas = 0;
let API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

iniciarTela1();

//carregar Tela 1 (página inicial)
function iniciarTela1(){
    let tela1 = document.querySelector(".Tela1");
    tela1.innerHTML = ` <header>
                            BuzzQuizz
                        </header>
                        <main>
                            <div class="novoQuizz">
                                <div class="quizzesUser">Você não criou nenhum quizz ainda :(</div>
                                <div class="criarQuizz"><button onclick="GetUserQuizzData('info')"data-identifier="create-quizz">Criar Quizz</div>
                            </div>
                            <span style="width: 80%; font-weight: 700">Todos os Quizzes</span>
                            <div class="quizzes"></div>

                        </main>`
    //get dos quizzes na API
    let promise = axios.get(`${API}`);
    promise.then(listarQuizzes);
}

//listar quizzes Tela 1
function listarQuizzes(resposta){
    quizzes = resposta.data;
    let organizarHTML = document.querySelector(".quizzes");

    for(let i = 0; i < quizzes.length; i++){
        organizarHTML.innerHTML += `<div class="imagem" style="background-image: 
                                    linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0) 0%, 
                                    rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${quizzes[i].image})"
                                    onclick="chamarUmQuizz(${quizzes[i].id})">
                                    <span>${quizzes[i].title}</span>
                                    </div>`
    }
}

//ao clicar num quizz na Tela 1, faz o get apenas desse quizz e manda para Tela 2
function chamarUmQuizz(id){
    idQuizz = id;
    let promise = axios.get(`${API}/${id}`);
    promise.then(carregarQuizz);
}

//carregar Tela 2 (página do quizz)
function carregarQuizz(dadosAPI){
    quizz = dadosAPI.data;
    let tela2 = document.querySelector(".Tela1");    
    tela2.innerHTML = `<div class="Tela2">
                        <header>
                            BuzzQuizz
                        </header>
                        <div class="titulo"></div>
                        <main></main>`;

    let cabecalho = document.querySelector(".titulo");
    let pergunta = document.querySelector("main");
    console.log(quizz);
    numPerguntas = quizz.questions.length;

    //titulo e imagem do quizz
    cabecalho.innerHTML = `<img src="${quizz.image}" />
                           <span>${quizz.title}</span>`

    //boxes de perguntas
    for(let i = 0; i < numPerguntas; i++){
        pergunta.innerHTML += `<div class="pergunta">
                                    <div class="tituloPergunta" style="background-color: ${quizz.questions[i].color}">
                                        ${quizz.questions[i].title}
                                    </div>
                                    <div class="respostas"></div>
                               </div>`
    }

    let respostas = document.querySelectorAll(".respostas");

    //listar respostas em ordem aleatória
    for(let i = 0; i < respostas.length; i++){
        arrayRespostas = quizz.questions[i].answers.sort(aleatorio); 
        for(let j = 0; j < quizz.questions[i].answers.length; j++){
            if(quizz.questions[i].answers[j].isCorrectAnswer){
                respostas[i].innerHTML += `<div class="resposta certa" onclick="selecionaResposta(this)">
                                        <img src="${quizz.questions[i].answers[j].image}" />
                                        <span>${quizz.questions[i].answers[j].text}</span>`
            } else {
                respostas[i].innerHTML += `<div class="resposta errada" onclick="selecionaResposta(this)">
                                        <img src="${quizz.questions[i].answers[j].image}" />
                                        <span>${quizz.questions[i].answers[j].text}</span>`
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

    console.log(contadorRespostas)

    if(contadorRespostas === numPerguntas){
        mostrarNivel();
        console.log("chamou nivel")
    }
}

//calcula % acerto e mostra o nível
function mostrarNivel(){
    console.log(quizz);
    let numRespostasCertas = document.querySelectorAll(".certa.selecionada").length;
    let acertosPercentual = Math.round((numRespostasCertas / numPerguntas) * 100);
    let niveis = quizz.levels;
    let indiceNivel;
    console.log(niveis);
    let caixaNivel = document.querySelector("main");

    /*for(let i = 0; i < niveis.length; i++){
        if(acertosPercentual <= niveis[i].minValue){
            indiceNivel = i;
            console.log(indiceNivel)
        } else {
            indiceNivel = i;
        }
    }*/

    console.log(indiceNivel)
    caixaNivel.innerHTML += `<div class="nivel">
                                    <div class="tituloNivel">${niveis[0].title}</div>
                                    <div class=resumoNivel>
                                        <img src="${niveis[0].image}" />
                                        <div>${niveis[0].text}</div>
                                    </div>
                               </div>
                               <span class="reiniciar" onclick="chamarUmQuizz(idQuizz)">Reiniciar Quizz</span>
                               <span class="voltarTela1" onclick="iniciarTela1()">Voltar para home</span>`
}