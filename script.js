var score = [0, 0];
var playerturn = true;
var q = [];
var randomOperation;

function generateProblem() {
    var box = document.getElementById("questions");
    var numbers = 1;
    var operations = [];

    randomOperation = generateNumbers(4);
    var operationsToChooseFrom = ["+", "-", "*", "/"];

    operations.push(operationsToChooseFrom[0]);
    operations.push(operationsToChooseFrom[1]);
    operations.push(operationsToChooseFrom[2]);
    operations.push(operationsToChooseFrom[3]);

    var answerindex = 0;

    operations.forEach(operation => {
        for (x = 0; x < numbers; x++) {
            answerindex++;

            var randomNumber = Math.floor(Math.random() * 10);
            var randomNumber2 = Math.floor(Math.random() * 10);

            var generatedNumbers = generateNumbers(numbers);

            for (z = 0; z < generatedNumbers.length; z++) {
                q.push(generatedNumbers[z]);
                q.push(operation);
            }

            var question = randomNumber.toString() + operation + randomNumber2.toString();

            var answer = eval(question).toFixed("2");
            if(eval(question) == Infinity){
                console.log(answer);
                answer = 0;
            }
            if(eval(question) == NaN){
                console.log(answer);
                answer = 0;
            }
            

            var questionElement = document.createElement("div");
            questionElement.innerHTML = question + " = ";
            var answerElement = document.createElement("input");
            answerElement.setAttribute("type", "text");
            answerElement.setAttribute("id", "answer" + answerindex);
            answerElement.setAttribute("name", "answer" + x);
            answerElement.setAttribute("data-answer", answer);
            answerElement.setAttribute("class", "answer");
            questionElement.appendChild(answerElement);
            box.appendChild(questionElement);
        }
    });
    var button = document.createElement("button");
    button.setAttribute("id", "answerQuestionTurn");
    button.addEventListener("click", function(){
        var correctAnswers = 0;
        for(var p = 1; p < ((numbers * 4) + 1); p++){
            var correctAnswerForQuestion = document.getElementById("answer" + p).getAttribute("data-answer");
            var playerAnswer = parseFloat(document.getElementById("answer" + p).value);
            if(playerAnswer == correctAnswerForQuestion){
                correctAnswers++;
            }
            console.log(playerAnswer == correctAnswerForQuestion, playerAnswer, correctAnswerForQuestion);
        }

        console.log(correctAnswers, score);

        if(correctAnswers == 4){
            if(playerturn){
                score[0]++;
                vs = score[0]
                document.getElementById("scoreCounter2").innerHTML = vs;
                localStorage.setItem("scorePlayer2", vs);
            } else {
                score[1]++;
                vs = score[1];
                document.getElementById("scoreCounter1").innerHTML = vs;
                localStorage.setItem("scorePlayer1", vs);
            }
        } else {
            if(playerturn){
                score[0]--;
                vs = score[0]
                document.getElementById("scoreCounter2").innerHTML = vs;
                localStorage.setItem("scorePlayer2", vs);
            } else {
                score[1]--;
                vs = score[1];
                document.getElementById("scoreCounter1").innerHTML = vs;
                localStorage.setItem("scorePlayer1", vs);
            }
        }
        correctAnswers = 0;
        changeTurn();
        document.getElementById("questions").innerHTML = "";
        generateProblem();
    });
    button.innerHTML = "Submit";
    box.appendChild(button);
}

function clamp(n) {
    var min = 0;
    if (n < min) {
        return min;
    }
    return n;
}

function generateNumbers(n) {
    var numbers = [];
    for (i = 0; i < n; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
}

function randNum(n){
    n = Math.floor(Math.random() * n);
    return n;
}

function changeTurn(){
    playerturn = !playerturn;
    localStorage.setItem("curPlayerTurn", playerturn);
    if(playerturn){
        document.getElementById("p2").style.backgroundColor = "green";
        document.getElementById("p1").style.backgroundColor = "rgba(255, 255, 255, 0)";
    } else {
        document.getElementById("p2").style.backgroundColor = "rgba(255, 255, 255, 0)";
        document.getElementById("p1").style.backgroundColor = "green";
    }
}

function checkForPreviousScores(){
    if(localStorage.getItem("scorePlayer1") != null && localStorage.getItem("scorePlayer2") != null){
        score[0] = localStorage.getItem("scorePlayer1");
        score[1] = localStorage.getItem("scorePlayer2");
        document.getElementById("scoreCounter1").innerHTML = score[0];
        document.getElementById("scoreCounter2").innerHTML = score[1];
    }
}

checkForPreviousScores();
changeTurn();
generateProblem();  