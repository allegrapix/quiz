(function() {
    function QuizQuestion(question, possibleAnswers, correctAnswer) {
        this.question = question;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }

    var q0 = new QuizQuestion("In what year was Google launched on the web?", [1998, 1995], 0);
    var q1 = new QuizQuestion("Who was the first man to fly around the earth with a spaceship?", ["Armstrong", "Gagarin"], 1);
    var q2 = new QuizQuestion("Who was the inventor of the steam engine?", ["James Watt", "Nikolaus Otto"], 0);
    var q3 = new QuizQuestion("Who is the father of the atomic bomb?", ["Nobel", "Oppenheimer"], 1);
    var q4 = new QuizQuestion("What is the lightest existing metal?", ["Cesium", "Aluminium"], 1);
    var q5 = new QuizQuestion("What are the three primary colors?", ["Blue, yellow and red", "Blue, green and red"], 0);
    var q6 = new QuizQuestion("How long is the Great Wall of China?", ["4000 miles", "6000 miles"], 0);
    var q7 = new QuizQuestion("Which Italian artist painted the Birth of Venus?", ["Botticelli", "Raphael"], 0);
    var q8 = new QuizQuestion("What do you get when you crossbreed a donkey and a horse?", ["Ponny", "Hinny"], 1);
    var q9 = new QuizQuestion("What is the Turkish word for lamb?", ["Doner", "Kebab"], 1);

    var arrQuestions = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9];

    var randomQuestion;
    var askedQuestions = [];
    var questionHTML = document.getElementById("question");
    var answerHTML = document.querySelectorAll(".answer");
    var correctHTML = document.getElementById("correct-answer");
    var pointsHTML = document.querySelector(".points");
    var submitBTN = document.querySelector("#submit-btn");
    var nextBTN = document.querySelector("#next-btn");
    var scoreBTN = document.querySelector("#score-btn");
    var pointsHTML = document.querySelector(".points");
    var radioBTN = document.querySelectorAll(".radio-answers");
    var pointsContainer = document.querySelector(".points-container");
    var message = document.querySelector(".winning-message");
    var answerContainer = document.querySelector(".answer-wrapper");
    var points = 0;
    var checkedState;
    var playerAnswer;
    var alreadyAnswered = false;
    var gamePlaying = 1;

    pointsHTML.innerHTML = points;
    randomQuestion = Math.floor(Math.random() * 10);
    questionHTML.innerHTML = arrQuestions[randomQuestion].question;
    answerHTML[0].innerHTML = arrQuestions[randomQuestion].possibleAnswers[0];
    answerHTML[1].innerHTML = arrQuestions[randomQuestion].possibleAnswers[1];
    correctHTML.style.display = "none";
    scoreBTN.style.display = "none";
    pointsContainer.style.display = "none";
    nextBTN.style.display = "none";

    askedQuestions.push(randomQuestion);
    submitBTN.addEventListener("click", checkAnswer);
    nextBTN.addEventListener("click", nextQuestion);
    scoreBTN.addEventListener("click", checkPoints);

    function checkAnswer() {
        if(gamePlaying <= 10) {
            checkRadio();
            if(!alreadyAnswered) {
                if (checkedState) {
                    correctHTML.style.display = "block";
                    askIfCorrect();
                    for (let i = 0; i < radioBTN.length; i++) {            
                        radioBTN[i].style.display = "none";
                    }
                } else {
                    alert("select an answer!");
                }
            }
        } 
    }

    function askIfCorrect() {
        if (playerAnswer == arrQuestions[randomQuestion].correctAnswer) {
            correctHTML.innerHTML = "CORRECT!";
            points++;
            pointsHTML.innerHTML = points;
            alreadyAnswered = true;
        } else {
            correctHTML.innerHTML = "INCORRECT!";
        }
        if(gamePlaying != 10) {
            nextBTN.style.display = "block";
        }
    }

    function checkRadio() {
        checkedState = false;
        for (let i = 0; i < radioBTN.length; i++) {
            if(radioBTN[i].checked) {
                checkedState = true;
                playerAnswer = radioBTN[i].value;                
            } 
        }
    }

    function nextQuestion() {
        if(askedQuestions.length <= arrQuestions.length) {
            alreadyAnswered = false;
            checkedState = false;
            gamePlaying++;
            correctHTML.style.display = "none";
            nextBTN.style.display = "none";
            for (let i = 0; i < radioBTN.length; i++) {
                radioBTN[i].style.display = "inline";
                radioBTN[i].checked = false;
            }

            while(checkIfAsked() === false) {
                randomQuestion = Math.floor(Math.random() * 10);
            } 
            askedQuestions.push(randomQuestion);
            questionHTML.innerHTML = arrQuestions[randomQuestion].question;
            answerHTML[0].innerHTML = arrQuestions[randomQuestion].possibleAnswers[0];
            answerHTML[1].innerHTML = arrQuestions[randomQuestion].possibleAnswers[1];
            correctHTML.innerHTML = arrQuestions[randomQuestion].possibleAnswers[arrQuestions[randomQuestion].correctAnswer];

            console.log(randomQuestion);
            console.log(askedQuestions);

            if(askedQuestions.length == arrQuestions.length){
                nextBTN.style.display = "none";
                scoreBTN.style.display = "block";
            }
        } 
    }

    function checkPoints() {
        pointsContainer.style.display = "block";
        for (let i = 0; i < radioBTN.length; i++) {            
            radioBTN[i].style.display = "none";
            answerHTML[i].style.display = "none";
        }
        correctHTML.style.display = "none";
        submitBTN.style.display = "none";
        questionHTML.style.display = "none";
        nextBTN.style.display = "none";
        answerContainer.style.display = "none";
        switch(true) {
            case (points < 5) : message.innerHTML = "Try harder!";
            break;
            case (points >= 5 && points < 7) : message.innerHTML = "Not bad!";
            break;
            case (points >= 7 && points <= 9) : message.innerHTML = "Impressive";
            break;
            case (points == 10) : message.innerHTML = "High Score";
            break;
        }
        scoreBTN.style.display = "none";
    }

    function checkIfAsked() {
        for (let i = 0; i < askedQuestions.length; i++) {
            if(askedQuestions[i] === randomQuestion) {
                return false;
            }
        }
        return true;
    }
})();