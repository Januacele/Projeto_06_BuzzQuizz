//variveis globais
let quizz, arrayRespostas, numPerguntas, idQuizz, contadorRespostas, fimDoQuizz;
let DOIS_SEGUNDOS = 2000;
let API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

iniciarTela1();

//carregar Tela 1 (página inicial)
function iniciarTela1(){
    let tela1 = document.querySelector(".Tela1");
    tela1.innerHTML = ` <header>
                            BuzzQuizz
                        </header>
                        <main class="primeiraTela">
                            <div class="novoQuizz">
                                <div class="quizzesUser">Você não criou nenhum quizz ainda :(</div>
                                <div class="criarQuizz"><button onclick ="GetUserQuizzData('info')"data-identifier="create-quizz">Criar Quizz</div>
                            </div>
                            <span style="font-weight: 700">Todos os Quizzes</span>
                            <div class="quizzes"></div>

                        </main>`;
    //get dos quizzes na API
    let promise = axios.get(`${API}`);
    promise.then(listarQuizzes);
    promise.catch(tratarErro);   
}

function getOnlyQuizz(load){
    let tela1 = document.querySelector(".Tela1");
    tela1.innerHTML = ` <header>
                            BuzzQuizz
                        </header>
                        <main class="primeiraTela">
                            <div class="user-quizz-container" data-identifier="user-quizzes">
                                <div class='user-quizz-title-p'>
                                    <p>Seus Quizzes</p>
                                    <div class='el-btn' onclick="GetUserQuizzData('info')">
                                        <button data-identifier="create-quizz">+</button>
                                    </div>
                                </div>
                            </div>
                            <span style="width: 80%; font-weight: 700">Todos os Quizzes</span>
                            <div class="quizzes"></div>

                        </main>`
    //get dos quizzes na API
    id = load;
    const promise = axios.get(urlOnlyQuizz + id);
    promise.then(chamarUmQuizz); 
}



function tratarErro(){
    alert('Não foi possível carregar a página, por favor tente novamente');
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
                                    </div>`;
    }
}

//ao clicar num quizz na Tela 1, faz o get apenas desse quizz e manda para Tela 2
function chamarUmQuizz(id){
    contadorRespostas = 0;
    idQuizz = id;
    let promise = axios.get(`${API}/${id}`);
    promise.then(carregarQuizz);
    promise.catch(tratarErro);
}

//carregar Tela 2 (página do quizz)
function carregarQuizz(dadosAPI){
    fimDoQuizz = 0;
    quizz = dadosAPI.data;
    let tela2 = document.querySelector(".Tela1");    
    tela2.innerHTML = `<div class="Tela2">
                        <header>
                            BuzzQuizz
                        </header>
                        <div class="titulo"></div>
                        <main></main>`;
    
    subirTela = document.querySelector('header');
    subirTela.scrollIntoView();

    let cabecalho = document.querySelector(".titulo");
    let pergunta = document.querySelector("main");
    numPerguntas = quizz.questions.length;

    //titulo e imagem do quizz
    cabecalho.innerHTML = `<div class="imagemQuizz" style="background-image: 
                            linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizz.image})">
                            <span>${quizz.title}</span>
                            </div>`;

    //boxes de perguntas
    for(let i = 0; i < numPerguntas; i++){
        pergunta.innerHTML += `<div class="pergunta">
                                    <div class="tituloPergunta" style="background-color: ${quizz.questions[i].color}">
                                        ${quizz.questions[i].title}
                                    </div>
                                    <div class="respostas"></div>
                               </div>`;
    }

    let respostas = document.querySelectorAll(".respostas");

    //listar respostas em ordem aleatória
    for(let i = 0; i < respostas.length; i++){

        arrayRespostas = quizz.questions[i].answers.sort(aleatorio); 

        for(let j = 0; j < quizz.questions[i].answers.length; j++){
            if(quizz.questions[i].answers[j].isCorrectAnswer){
                respostas[i].innerHTML += `<div class="resposta certa" onclick="selecionaResposta(this)">
                                        <img src="${quizz.questions[i].answers[j].image}" />
                                        <span>${quizz.questions[i].answers[j].text}</span>`;
            } else {
                respostas[i].innerHTML += `<div class="resposta errada" onclick="selecionaResposta(this)">
                                        <img src="${quizz.questions[i].answers[j].image}" />
                                        <span>${quizz.questions[i].answers[j].text}</span>`;
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
    let imagensOpacas = elemento.parentNode.querySelectorAll('.resposta');
    let corResposta = elemento.parentNode.querySelectorAll('span');

    respostaSelecionada = elemento.parentNode.querySelectorAll('.selecionada');

    if(respostaSelecionada.length === 0){

        elemento.classList.add("selecionada");
        contadorRespostas++;

        for(let i = 0; i < imagensOpacas.length; i++){
            imagensOpacas[i].classList.add("opaca");
            corResposta[i].classList.add("cor");
        }
    }

    setTimeout(rolarPergunta, DOIS_SEGUNDOS);

    if(contadorRespostas === numPerguntas && fimDoQuizz === 0){
        setTimeout(mostrarNivel, DOIS_SEGUNDOS);
    }
}

//rola a tela para próxima pergunta após 2s
function rolarPergunta(){
    let pergunta = document.querySelectorAll('.pergunta');

    if(contadorRespostas < pergunta.length){
        pergunta[contadorRespostas].scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }
}

//calcula % acerto e mostra o nível
function mostrarNivel(){
    fimDoQuizz++;
    let numRespostasCertas = document.querySelectorAll(".certa.selecionada").length;
    let acertosPercentual = Math.round((numRespostasCertas / numPerguntas) * 100);
    let niveis = quizz.levels;
    let indiceNivel;
    let caixaNivel = document.querySelector("main");

    niveis = niveis.sort(function(a, b) {
        return parseInt(a.minValue) - parseInt(b.minValue);
    });

    for(let i = 0; i < niveis.length; i++){
        if(acertosPercentual >= niveis[i].minValue){
            indiceNivel = i;
        }
    }

    caixaNivel.innerHTML += `<div class="nivel">
                                    <div class="tituloNivel">
                                        ${acertosPercentual}% de acerto: ${niveis[indiceNivel].title}</div>
                                    <div class=resumoNivel>
                                        <img src="${niveis[indiceNivel].image}" />
                                        <div>${niveis[indiceNivel].text}</div>
                                    </div>
                               </div>
                               <span class="reiniciar" onclick="chamarUmQuizz(idQuizz)">Reiniciar Quizz</span>
                               <span class="voltarTela1" onclick="iniciarTela1()">Voltar para home</span>`;

    aparecerNivel = document.querySelector(".reiniciar");
    aparecerNivel.scrollIntoView({ block: 'nearest',  behavior: 'smooth' });
}