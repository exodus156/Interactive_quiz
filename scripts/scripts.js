/* Selectors */
const formObject = document.querySelector(".quiz-form");
const quizCollection = document.querySelector(".quiz-questions-collection");
const newQuestion = document.querySelector("#createNewQuestionForm");

/* Deleting questions function */
formObject.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.parentElement.remove();
    };
});

/* Creating new questions form */
newQuestion.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Form elements selector */
    const question = document.querySelector("#Question"); //value
    const answerA = document.querySelector("#AnswerA"); //value
    const answerACorrect = document.querySelector("#AnswerACorrect"); //checked
    const answerB = document.querySelector("#AnswerB");
    const answerBCorrect = document.querySelector("#AnswerBCorrect");
    const answerC = document.querySelector("#AnswerC");
    const answerCCorrect = document.querySelector("#AnswerCCorrect");
    const answerD = document.querySelector("#AnswerD");
    const answerDCorrect = document.querySelector("#AnswerDCorrect");

    /* Answers array */
    const answers = [answerA.value, answerB.value, answerC.value, answerD.value];

    /* Validation for illegal symbols part */
    const pattern = /^[^<>]{1,}$/; //RegEx pattern
    for(i = 0; i<answers.length; i++){
        if(pattern.test(answers[i]) === false){
            alert("Used illegal characters !!");
            throw new Error("Used illegal characters !!");
        };
    };

    /* Correct answers array creator */
    const correct = [answerACorrect.checked, answerBCorrect.checked, answerCCorrect.checked, answerDCorrect.checked];    

    /* Question number creator */
    const newQuizNumber = () => {
        const number = document.querySelectorAll('.quiz-question');
        if(number.length == 0){
            return 1;
        } else {
            const numberAlternative = document.querySelectorAll('.quiz-title h4');
            const newNumber =  numberAlternative[numberAlternative.length - 1].innerText.toString();
            return +newNumber[0] + 1;
        }
    };

    /* Question and answers injector */
    quizCollection.innerHTML += 
    `
    <div class="my-3 quiz-question">
        <div class="d-flex justify-content-between quiz-title">
            <h4>${newQuizNumber()}. ${question.value}</h4>
            <i class="far fa-trash-alt delete"></i>
        </div>
        <div class="form-check my-2">
            <input class="form-check-input ${correct[0]}" type="radio" name="QuestionRadio${newQuizNumber()}" id="CheckboxFor${answers[0]}">
            <label class="form-check-label" for="CheckboxFor${answers[0]}">
                ${answers[0]}
            </label>
        </div>
        <div class="form-check my-2">
            <input class="form-check-input ${correct[1]}" type="radio" name="QuestionRadio${newQuizNumber()}" id="CheckboxFor${answers[1]}">
            <label class="form-check-label" for="CheckboxFor${answers[1]}">
                ${answers[1]}
            </label>
        </div>
        <div class="form-check my-2">
            <input class="form-check-input ${correct[2]}" type="radio" name="QuestionRadio${newQuizNumber()}" id="CheckboxFor${answers[2]}">
            <label class="form-check-label" for="CheckboxFor${answers[2]}">
                ${answers[2]}
            </label>
        </div>
        <div class="form-check my-2">
            <input class="form-check-input ${correct[3]}" type="radio" name="QuestionRadio${newQuizNumber()}" id="CheckboxFor${answers[3]}">
            <label class="form-check-label" for="CheckboxFor${answers[3]}">
                ${answers[3]}
            </label>
        </div>
        <hr>
    </div>
    `

    /* Resets form input fields */
    newQuestion.reset();
});

/* Quiz final score counter */
formObject.addEventListener('submit', (e) => {
    e.preventDefault();

    //Selectors
    const correctAnswers = document.querySelectorAll('.true');
    const header = document.querySelector('.score');

    //Base value of user correct answers
    let userCorrectAnswersCounter = 0;

    //Counts user correct answers
    correctAnswers.forEach((answer) =>{
        if(answer.checked == true){
            userCorrectAnswersCounter++;
        }
    });

    //Math behind final score
    const score = (userCorrectAnswersCounter / correctAnswers.length) * 100;
    const finalScore = Math.round(score);

    //Prevents showing NaN% score
    if(finalScore >= 0){
        console.log(finalScore);
        header.innerHTML =
    `
    <h3 class="text-primary">Your final score: ${finalScore}%</h3>
    `
    };
    
    scrollTo(0, 0);
});

