
let dataId=[];

let newQuizz={};
let NewQuestion = [];
let NewLevel = [];


let currentPage = 1
let numberOfQuestions = 0
let ValidateUserQuizz = false
let numberOfLevels = 0
let GetThisQuizzID_ = undefined
let quizzUrl;
let quizzTitle;
function GetUserQuizzData(page) {

    const page1 = document.querySelector('.Tela1');
    const page2 = document.querySelector('.Tela2');
    const page3 = document.querySelector('.Tela3');
    const quizzInfo = document.querySelector('.informacao-quizz');
    const quizzQuestions = document.querySelector('.perguntas-quizz');
    const quizzLevels = document.querySelector('.niveis-quizz');
    const quizzSuccess = document.querySelector('.sucesso-quizz');

   
    if (page === 'info') {

        quizzTitle = document.querySelector('.usuario-titulo').value
        quizzUrl = document.querySelector('.usuario-url').value
        let quizzQuestionsAmount = document.querySelector('.usuario-qtd-perguntas').value
        let quizzLevelsAmount = document.querySelector('.usuario-niveis').value

        quizzQuestionsAmount = parseInt(quizzQuestionsAmount)
        quizzLevelsAmount = parseInt(quizzLevelsAmount)

        if (CheckInfoQuizzData(quizzTitle, quizzUrl, quizzQuestionsAmount, quizzLevelsAmount)) {
            quizzQuestions.classList.remove('escondido')
            quizzInfo.classList.add('escondido')
            numberOfQuestions = quizzQuestionsAmount
            RenderQuestions(quizzQuestionsAmount, currentPage)
        }
    }

    if (page === 'perguntas') {

        quizzTitle = document.querySelector('.usuario-titulo').value
        quizzUrl = document.querySelector('.usuario-url').value
        let quizzQuestionsAmount = document.querySelector('.usuario-qtd-perguntas').value
        let quizzLevelsAmount = document.querySelector('.usuario-niveis').value

        quizzQuestionsAmount = parseInt(quizzQuestionsAmount)
        quizzLevelsAmount = parseInt(quizzLevelsAmount)

        if (CheckInfoQuizzData(quizzTitle, quizzUrl, quizzQuestionsAmount, quizzLevelsAmount)) {
            quizzQuestions.classList.remove('hidden')
            quizzInfo.classList.add('hidden')
            numberOfQuestions = quizzQuestionsAmount
            RenderQuestions(quizzQuestionsAmount, currentPage)
        }
    }


    if (page === 'niveis') {

        if (currentPage === numberOfQuestions) {
            EditThisQuestion(numberOfQuestions)
            // caso o usuario esteja na ultima pagina de perguntas e clique no botao
            // entao verificamos se ele pode prosseguir
        }
        if (ValidateUserQuizz) {
            quizzQuestions.classList.add('escondido')
            quizzLevels.classList.remove('escondido')
            currentPage = 1
            RenderLevels(currentPage, numberOfLevels)
        }
    }
    if (page === 'sucesso') {

        if (currentPage === numberOfLevels) {
            EditThisLevel(numberOfLevels)
        }
        if (ValidateUserQuizzLevel) {
            quizzLevels.classList.add('escondido')
            quizzSuccess.classList.remove('escondido')

            // ao criar um quizz, o armazenamento local do usuario tera essa informacao
            window.localStorage.setItem('UserCreateQuizz', 'true');
            GenerateUserRequestPost(numberOfQuestions, numberOfLevels)
            document.querySelector(".sucesso-quizz-box").style.backgroundImage = `url('${quizzUrl}')`
        }
    }
    if (page === 'acesso') {
        page3.classList.add('escondido')
        page2.classList.remove('escondido')

        if (GetThisQuizzID_ != undefined) {
            getOnlyQuizz(GetThisQuizzID_)
        }
    }
    if (page === 'home') {
        page3.classList.add('escondido')
        quizzSuccess.classList.add('escondido')
        page1.classList.remove('escondido')
    }
}


function RenderQuestions(number, page) {

    const QuestionsInputContainer = document.querySelector('.perguntas-quizz-input-container');
    QuestionsInputContainer.innerHTML = `
        <div class="quizz-questions-text"><h1>Pergunta ${page}</h1></div>
        <input type="text" id = "p1" placeholder="Texto da pergunta" data-identifier="question">
        <input type="text" id = "p2" placeholder="Cor de fundo da pergunta" data-identifier="question">
        <div class="quizz-questions-text"><h1>Resposta correta</h1></div>
        <input type="text" id = "r1" placeholder="Resposta correta" data-identifier="question">
        <input type="text" id = "r2" placeholder="URL da imagem" data-identifier="question">
        <div class="quizz-questions-text"><h1>Respostas incorretas</h1></div>
        <input type="text" id = "i1" placeholder="Resposta incorreta 1" data-identifier="question">
        <input type="text" id = "i2" placeholder="URL da imagem 1" data-identifier="question">
        <input type="text" id = "ii1" placeholder="Resposta incorreta 2" data-identifier="question">
        <input type="text" id = "ii2" placeholder="URL da imagem 2" data-identifier="question">
        <input type="text" id = "iii1" placeholder="Resposta incorreta 3" data-identifier="question">
        <input type="text" id = "iii2" placeholder="URL da imagem 3" data-identifier="question">`

     for (let i = 1; i <= number; i++) {
        if (page !== i) {
            QuestionsInputContainer.innerHTML += `
            <div class="quizz-question-box" id = '${i}'>
                <div class="text"> <h1>Pergunta ${i}</h1></div>
                <div class="icon" onclick="EditThisQuestion(${i})" data-identifier="expand"><ion-icon name="create-outline"></ion-icon></div>
            </div>`
        }
    }
    QuestionsInputContainer.innerHTML += `
    <div class="quizz-question-final-btn">
        <button onclick="GetUserQuizzData('levels')">Prosseguir pra criar níveis</button>
    </div>`
}

//Função para criar um novo quizz

function CreateNewQuizz(){
    
    newQuizz.title = quizzTitle;
    newQuizz.image = quizzUrl;

    //Iteração para criar novas perguntas a partir do número passado pelo usuário 
    for(let i = 0; i<numberOfQuestions;i++){
        NewQuestion.push(createNewQuestion(i));
    }

    //Iteração para criar novos níveis a partir do número passado pelo usuário 
    for(let i =0; i< numberOfLevels;i++ ){
        NewLevel.push(createNewLevel(i));
    }
    newQuizz.questions = NewQuestion;
    newQuizz.levels = NewLevel;
    console.log(newQuizz);
    postQuizz(newQuizz);
    
 }

 //Criando novas perguntas conforme decisão do usuário
 function createNewQuestion(index){
     //Objeto com os dados do que foi preenchido nas questões. Responde de forma dinâmica 
    const newDataQuestion= {
        "title":GetFormData[index].quizzQuestion,
        "color":GetFormData[index].quizzQuestionColor,
        "answers": [
            {
                "text":GetFormData[index].quizzRightAnswer,
                "image":GetFormData[index].quizzRightAnswerURL,
                "isCorrectAnswer": true
            },
            {
                "text":GetFormData[index].quizzIncorrectAnswer1,
                "image":GetFormData[index].quizzIncorrectAnswerURL1,
                "isCorrectAnswer": false
            }
        ]
    }
    if(GetFormData[index].quizzIncorrectAnswer2 != ""){
    newDataQuestion.answers.push({
        "text":GetFormData[index].quizzIncorrectAnswer2,
        "image":GetFormData[index].quizzIncorrectAnswerURL2,
        "isCorrectAnswer": false
    })
    }
    if(GetFormData[index].quizzIncorrectAnswer3 != ""){
        newDataQuestion.answers.push({
            "text":GetFormData[index].quizzIncorrectAnswer3,
            "image":GetFormData[index].quizzIncorrectAnswerURL3,
            "isCorrectAnswer": false
        })
    }
    return newDataQuestion;
} 

//Criando um novo nível conforme decisão do usuário

function createNewLevel(index){
    const newDataLevel = {
        "title": GetFormLevel[index].quizzLevel,
        "minValue":GetFormLevel[index].LevelPorcent,
        "image":GetFormLevel[index].LevelURL,
        "text":GetFormLevel[index].LevelDescription
    }
    return newDataLevel;
}

//Fazendo post na api dos dados inseridos pelo usuário
function postQuizz(quizz) {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', quizz)
    promise.then((response) => {
        console.warn(response);
        saveDataQuizz(response);
    })
    promise.catch((error) => {
        console.error(error)
    })
}