const questions = [
    {
        question: " The temple complex covers ___ acres, and is one of the largest in India. ",
        optionA: " 20 ",
        optionB: " 30 ",
        optionC: " 40 ",
        optionD: " 50 ",
        correctOption: "optionB"
    },

    {
        question: " Thyagaraja Temple is a __ temple, located in the town of  Thiruvarur in Tamil Nadu, India.",
        optionA: " Shiva ",
        optionB: " Ganesha ",
        optionC: " Muruga ",
        optionD: " None ",
        correctOption: "optionA"
    },

    {
        question: " The presiding deity is revered in the 7th century Saiva canonical work  the Tevaram  written in Tamil by saint poets known as the ___ and classified as Paadal Petra Sthalam ",
        optionA: "None",
        optionB: "pallavas",
        optionC: "nayakkas",
        optionD: "nayanars",
        correctOption: "optionD"
    },

    {
        question: " The temple is believed to have been initiated with a large complex by the Pallavas during the ___. ",
        optionA: " 5th century ",
        optionB: " 6th century ",
        optionC: " 7th century ",
        optionD: " 8th century ",
        correctOption: "optionC"
    },

    {
        question: " The two main shrines of the temple are for ____  ",
        optionA: " Vanmikinathar ",
        optionB: " Thyagarajar ",
        optionC: " Both A & B ",
        optionD: " None of the above ",
        correctOption: "optionC"
    },

    {
        question: " The present masonry structure was built during the __ dynasty in the 9th century  while later expansions are attributed to Vijayanagar rulers of the Sangama Dynasty ",
        optionA: " Chola ",
        optionB: " Chera ",
        optionC: " Pallava ",
        optionD: " Nayakka ",
        correctOption: " optionA "
    },

    {
        question: " The temple has numerous shrines, with those of ____ being the most prominent. ",
        optionA: " Veedhi Vidangar  ",
        optionB: " Both A & C  ",
        optionC: " Alliyankothai ",
        optionD: " Both A & B ",
        correctOption: "optionB"
    },

    {
        question: " The temple complex seems to have acted as the cultural model for the big Brahadeeswarar temple at Thanjavur of Rajaraja Chola I, wherein he enshrined a vitankar which shared with the Adavallan of ___ the status of state cult.  ",
        optionA: " Chidambaram ",
        optionB: " Chennimalai ",
        optionC: " Both A & B ",
        optionD: " None ",
        correctOption: "optionA"
    },

    {
        question: " The temple has nine gopurams, ___ vimanas, twelve temple walls, 13 halls, fifteen large temple water bodies, three gardens, and three large precincts.  ",
        optionA: " 70 ",
        optionB: " 90 ",
        optionC: " 81 ",
        optionD: " 80 ",
        correctOption: "optionD"
    },

    {
        question: " The major gopuram of the temple is seven-tiered and raises to a height of __ . ",
        optionA: " 117 ft ",
        optionB: " 119 ft ",
        optionC: " 128 ft ",
        optionD: " 118 ft ",
        correctOption: "optionD"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
