//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const option_list = document.querySelector(".option_list");

//if start quiz button click
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");//show the info box 
}
//if exit button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");// hide the info box
}
//if continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.add("activeQuiz");//show the quiz box
    showQuestions(0);
    quecounter(1);
    startTimer(10);
}
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 10;
let userscore = 0;
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
quit_quiz.onclick = () => {
    window.location.reload();
}
restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 10;
    let userscore = 0;
    showQuestions(que_count);
    quecounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    // next_btn.style.display="none";
}

//if next buuton clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        quecounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
    }
    else {
        console.log("Question completed");
        showresultbox();
    }
}
//getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = "<span>" + questions[index].numb + "." + questions[index].question + "</span>";
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span> </div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const options = option_list.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer) {
    clearInterval(counter);
    // startTimer(timeValue);
    let userAns = answer.textContent.trim();
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if (userAns === correctAns) {
        userscore += 1;
        console.log(userscore)
        answer.classList.add("correct");
        console.log("Answer is correct");
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        //if answers is incorrect then automatically selected the correct answer
        for (let i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent.trim() === correctAns) {
                option_list.children[i].classList.add("correct")
            }
        }
    }
    //once user selected diabled all options
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
        option_list.children[i].removeAttribute("onclick");
    }
}
function showresultbox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text ");
    if (userscore > 3) {
        let scoretag = '<span>conguratulations, you got <p>' + userscore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoretag;
    }
    else if (userscore > 1) {
        let scoretag = '<span>nice, you got <p>' + userscore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoretag;
    }
    else {
        let scoretag = '<span>and sorry you got only<p>' + userscore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoretag;
    }
}
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
    }
}



function quecounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span> <p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
