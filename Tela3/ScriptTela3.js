
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

   
// Quando dentro da página for encontrada a classe 'info', click do botao para criar quizz
    if (page === 'info') {

        //Abre na tela 3.1 e procura pelas primeiras informações para criar o quizz
        quizzTitle = document.querySelector('.usuario-titulo').value
        quizzUrl = document.querySelector('.usuario-url').value
        let quizzQuestionsAmount = document.querySelector('.usuario-qtd-perguntas').value
        let quizzLevelsAmount = document.querySelector('.usuario-niveis').value

        quizzQuestionsAmount = parseInt(quizzQuestionsAmount)
        quizzLevelsAmount = parseInt(quizzLevelsAmount)

        //Se as informações estiverem satisfeitas, para isso usamos a função CheckInfoQuizzData
        // vai esconder essa primeira tela e pular para a próxima (criar perguntas)

        if (CheckInfoQuizzData(quizzTitle, quizzUrl, quizzQuestionsAmount, quizzLevelsAmount)) {

            //Já encontrou no dom o local onde estão as perguntas do quizz e armazenou numa constante de uso geral
            quizzQuestions.classList.remove('escondido')
            quizzInfo.classList.add('escondido')
            numberOfQuestions = quizzQuestionsAmount
            RenderQuestions(quizzQuestionsAmount, currentPage)
        }
    }

    // Quando dentro da página for encontrada a classe 'perguntas', será feito a busca no dom
    if (page === 'perguntas') {

        quizzTitle = document.querySelector('.usuario-titulo').value
        quizzUrl = document.querySelector('.usuario-url').value
        let quizzQuestionsAmount = document.querySelector('.usuario-qtd-perguntas').value
        let quizzLevelsAmount = document.querySelector('.usuario-niveis').value

        quizzQuestionsAmount = parseInt(quizzQuestionsAmount)
        quizzLevelsAmount = parseInt(quizzLevelsAmount)

        //Se as informações estiverem satisfeitas, para isso usamos a função CheckInfoQuizzData
        // vai esconder essa primeira tela e pular para a próxima (criar perguntas)

        if (CheckInfoQuizzData(quizzTitle, quizzUrl, quizzQuestionsAmount, quizzLevelsAmount)) {
            quizzQuestions.classList.remove('hidden')
            quizzInfo.classList.add('hidden')
            numberOfQuestions = quizzQuestionsAmount
            RenderQuestions(quizzQuestionsAmount, currentPage)
        }
    }

    // Quando dentro da página for encontrada a classe 'niveis', será feito a busca no dom
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

    //Ultima verificação, quando finalizamos e tratamos o sucesso
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

    //Acessar o quizz depois de criado
    if (page === 'acesso') {
        page3.classList.add('escondido')
        page2.classList.remove('escondido')

        if (GetThisQuizzID_ != undefined) {
            getOnlyQuizz(GetThisQuizzID_)
        }
    }

    //Voltar para home, após criar o quizz. Este constar na tela inicial
    if (page === 'home') {
        page3.classList.add('escondido')
        quizzSuccess.classList.add('escondido')
        page1.classList.remove('escondido')
    }
}

//Aparecer a quantidade de perguntas de forma dinâmica conforme a escolha do usuário
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

//Validando as informações colocadas para criar o quizz

function CheckInfoQuizzData(title, url, questions, levels) {

    if (title.length < 20 || title.length > 60) {
        return alert('O título do quizz deve ter no mínimo 20 e no máximo 65 letras, incluindo espaços')
    }
    if (!CheckURL(url)) {
        // if (url.includes('http://') || url.includes('https://') === false) {
        return alert('A URL da imagem deve ter formato de URL (https:// ou http://')
    }
    if (questions < 3 || isNaN(questions)) {
        return alert('A quantidade de perguntas deve ser no mínimo 3')
    }
    if (levels < 2 || isNaN(levels)) {
        return alert('A quantidade de niveis deve ser no mínimo 2')
    }
    numberOfLevels = levels
    return true
}

let GetFormData = []

//Pega o valores colocados dentro dos input ao criar as perguntas
function EditThisQuestion(number) {

    let quizzQuestion = document.getElementById('p1').value
    let quizzQuestionColor = document.getElementById('p2').value

    let quizzRightAnswer = document.getElementById('r1').value
    let quizzRightAnswerURL = document.getElementById('r2').value

    let quizzIncorrectAnswer1 = document.getElementById('i1').value
    let quizzIncorrectAnswer2 = document.getElementById('ii1').value
    let quizzIncorrectAnswer3 = document.getElementById('iii1').value

    let quizzIncorrectAnswerURL1 = document.getElementById('i2').value
    let quizzIncorrectAnswerURL2 = document.getElementById('ii2').value
    let quizzIncorrectAnswerURL3 = document.getElementById('iii2').value

    //cria um objeto com as informações passadas para criar as perguntas
    GetFormData[currentPage - 1] = {
        quizzQuestion: quizzQuestion,
        quizzQuestionColor: quizzQuestionColor,
        quizzRightAnswer: quizzRightAnswer,
        quizzRightAnswerURL: quizzRightAnswerURL,
        quizzIncorrectAnswer1: quizzIncorrectAnswer1,
        quizzIncorrectAnswer2: quizzIncorrectAnswer2,
        quizzIncorrectAnswer3: quizzIncorrectAnswer3,
        quizzIncorrectAnswerURL1: quizzIncorrectAnswerURL1,
        quizzIncorrectAnswerURL2: quizzIncorrectAnswerURL2,
        quizzIncorrectAnswerURL3: quizzIncorrectAnswerURL3
    }
    // antes de editar a proxima pagina, checa se a pagina atual esta preenchida corretamente
    if (CheckQuestionsQuizzData(currentPage - 1, GetFormData)) {
        currentPage = number
        RenderQuestions(numberOfQuestions, currentPage)
    }
}

//Validando as informações colocadas para criar o quizz

function CheckQuestionsQuizzData(page, array) {

    if (array[page] === null || array[page] === undefined) {
        alert('Voce precisa preencher as informacoes de todas as perguntas antes de continuar')
        return false
    }
    else {
        if (array[page].quizzQuestion === '' || array[page].quizzQuestion.length < 20) {
            return alert(`O texto da pergunta ${page + 1} deve ter no mínimo 20 letras, incluindo espaços`)
        }
        if (CheckHexa(array[page].quizzQuestionColor)) {
            return alert(`A cor de fundo da pergunta ${page + 1} deve ser uma cor em hexadecimal comecando com #`)
        }
        if (array[page].quizzRightAnswer === '') {
            return alert(`A resposta da pergunta ${page + 1} nao pode ficar em branco`)
        }
        if (!CheckURL(array[page].quizzRightAnswerURL)) {
            return alert(`A imagem da resposta da pergunta ${page + 1} deve ter formato de URL`)
        }

        if (array[page].quizzIncorrectAnswer1 === '') {
            return alert(`A pergunta ${page + 1} deve ter no mínimo uma resposta errada`)
        }
        if (!CheckURL(array[page].quizzIncorrectAnswerURL1)) {
            return alert(`A imagem da resposta incorreta da pergunta ${page + 1} deve ter formato de URL`)
        }

        if (array[page].quizzIncorrectAnswer2 !== "") { 
            if (!CheckURL(array[page].quizzIncorrectAnswerURL2)) {
                return alert(`A imagem da resposta incorreta 2 da pergunta ${page + 1} deve ter formato de URL`)
            }
        }
        if(array[page].quizzIncorrectAnswer3 !== "" ) {
            if (!CheckURL(array[page].quizzIncorrectAnswerURL3)) {
                return alert(`A imagem da resposta incorreta 3 da pergunta ${page + 1} deve ter formato de URL`)
            }
        }
    }
    if (currentPage === numberOfQuestions) {
        // caso o usuario esteja na ultima pagina podera prosseguir
        ValidateUserQuizz = true
    }
    return true
}

const CheckHexa = (hex) => hex === '' || hex.includes('#') === false || hex.length !== 7 ? true : false

let currentLevel = 1

//Validando as informações do nível colocadas para criar o quizz

function RenderLevels(page, number) {

    const LevelsInputContainer = document.querySelector('.perguntas-quizz-input-container')
    LevelsInputContainer.innerHTML = `
    <div class="quizz-levels-text"><h1>Nivel ${currentLevel}</h1></div>
    <input type="text" id = "x1" placeholder="Título do nível" data-identifier="level">
    <input type="text" id = "x2" placeholder="% de acerto mínima" data-identifier="level">
    <input type="text" id = "x3" placeholder="URL da imagem do nível" data-identifier="level">
    <input type="text" id = "x4" placeholder="Descrição do nível" data-identifier="level">`

    for (let i = 1; i <= number; i++) {
        if (page !== i) {
            LevelsInputContainer.innerHTML += `
            <div class="quizz-levels-box" id = '${i}'>
                <div class="text"> <h1>Nivel ${i}</h1></div>
                <div class="icon" onclick="EditThisLevel(${i})" data-identifier="expand"><ion-icon name="create-outline"></ion-icon></div>
            </div>`
        }
    }
    LevelsInputContainer.innerHTML += `
    <div class="quizz-levels-final-btn"><button onclick="GetUserQuizzData('success')">Finalizar Quizz</button></div>`
}

//Pega as informações que o usuário colocou para os níveis

let GetFormLevel = []

function EditThisLevel(number) {

    let quizzLevel = document.getElementById('x1').value
    let LevelPorcent = document.getElementById('x2').value
    let LevelURL = document.getElementById('x3').value
    let LevelDescription = document.getElementById('x4').value

    GetFormLevel[currentPage - 1] = {
        quizzLevel: quizzLevel,
        LevelPorcent: LevelPorcent,
        LevelURL: LevelURL,
        LevelDescription: LevelDescription
    }
    // antes de editar a proxima pagina, checa se a pagina atual esta preenchida corretamente
    if (CheckLevelQuizzData(currentPage - 1, GetFormLevel)) {
        currentPage = number
        currentLevel = number
        RenderLevels(currentLevel, numberOfLevels)
    }
}

//Validando as respostas dadas na escolha dos níveis 

let ValidateUserQuizzLevel = false

function CheckLevelQuizzData(page, array) {
    if (array[page] === null || array[page] === undefined) {
        alert('Voce precisa preencher as informacoes de todas os niveis antes de continuar')
        return false
    }
    else {
        if (array[page].quizzLevel === '' || array[page].quizzLevel.length < 10) {
            return alert(`O texto do nivel ${page + 1} deve ter no mínimo 10 caracteres`)
        }
        if (array[page].LevelPorcent === '' || array[page].LevelPorcent < 0 || array[page].LevelPorcent > 100) {
            return alert(`A porcentagem de acerto minimo do nivel ${page + 1} deve ser entre 0 e 100`)
        }
        if (!CheckURL(array[page].LevelURL)) {
            return alert(`A imagem do nivel ${page + 1} deve ter formato de URL`)
        }
        if (array[page].LevelDescription === '' || array[page].LevelDescription.length < 30) {
            return alert(`A descrição do nivel ${page + 1} deve ter no mínimo 30 caracteres`)
        }
    }
    if (currentPage === numberOfLevels) {
        ValidateUserQuizzLevel = true
    }
    return true
}


// Postar requisicao de criar um novo quizz na API
function GenerateUserRequestPost(questions, levels) {

    let arrayQuestions = []
    let arrayLevels = []
    let userQuizzOBJ = {}
    userQuizzOBJ.title = quizzTitle;
    userQuizzOBJ.image = quizzUrl;
    for (let i = 0; i < questions; i++) {
        arrayQuestions.push(createNewQuestion(i));
    }
    for (let i = 0; i < levels; i++) {
        arrayLevels.push(createNewLevel(i));
    }

    userQuizzOBJ.levels = arrayLevels
    userQuizzOBJ.questions = arrayQuestions
    console.log(userQuizzOBJ);

    let requestUserQuizz = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', userQuizzOBJ)

    requestUserQuizz.then((response) => {
        TOTAL_USER_QUIZZ++
        window.localStorage.setItem(`UserQuizzID${TOTAL_USER_QUIZZ}`, `${response.data.id}`)
        window.localStorage.setItem('TOTAL_USER_QUIZZ', `${TOTAL_USER_QUIZZ}`)
        console.log(`voce criou o quizz id ${response.data.id} com extremo sucesso`)

        // obtendo o ID do Quizz criado pra poder acessa-lo
        GetThisQuizzID_ = response.data.id
        RenderUserQuizz(response.data.id)
        
        document.querySelector(".sucesso-quizz-box").setAttribute('onclick', `getOnlyQuizz(${response.data.id})`)
        console.log('opa')
    })

    requestUserQuizz.catch((error) => {
        console.log('falha na criacao do quizz')
        console.log(error)
    })
}

