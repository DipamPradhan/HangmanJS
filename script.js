//String.fromCharCode(); prints alphabet as char value;

let generated = false;
const keyboard = document.getElementById("keyboard");
const hintVal = document.getElementById("hint");
const wordVal = document.getElementById("word");
const incorrectVal = document.getElementById("incorrectGuess");
const hangmanImgVal = document.getElementById("hangmanImage"); 
const generateWord = document.getElementById("generateWord");
const notGenerated = document.getElementById("notGenerated");
const overlay = document.getElementById("overlay");
const correctAnswer = document.getElementById("correctAnswer");
const incorrectAnswer = document.getElementById("incorrectAnswer");

const playAgainW = document.getElementById("playAgainW");
const answerW = document.getElementById("answerW");
const playAgainL = document.getElementById("playAgainL");
const answerL = document.getElementById("answerL");
let currentWord, correctWord = [],wrongGuessCount = 0, totalLetters = 0;
const maxGuess = 6;
const gameState = false;

function sizeWord(){
    if(!currentWord) return;
    const avail = wordVal.clientWidth || window.innerWidth * 0.9;
    const len = currentWord.replace(/[^a-z]/gi, "").length;
    const gap = Math.max(2, Math.min(6, Math.floor((avail - 20 - len * 16) / (len - 1))));
    const size = Math.max(16, Math.min(45, Math.floor((avail - 20 - (len - 1) * gap) / len)));
    wordVal.style.setProperty("--letter-size", size + "px");
    wordVal.style.setProperty("--letter-font", Math.round(size * 0.8) + "px");
    wordVal.style.setProperty("--letter-gap", gap + "px");
}

function getRandomWord(){
    const{word,hint} = hangman_words[Math.floor(Math.random()*hangman_words.length)];
    currentWord = word;
    totalLetters = word.replace(/[^a-z]/gi, "").length;
    hintVal.textContent = `Hint: ${hint}`; 
    wordVal.innerHTML = word.split("").map((char)=>{
        if(/[a-z]/i.test(char)) return '<li></li>';
        return `<li class="space">${char === " " ? "\u00A0" : char}</li>`;
    }).join("");
    requestAnimationFrame(sizeWord);
}

window.addEventListener("resize", sizeWord);



generateWord.addEventListener("click",function(e){
    generated = true;   
    getRandomWord();
    overlay.classList.remove("blur-background");
    notGenerated.classList.add("hidden");
    generateWord.classList.remove("notClicked");
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(button => {
        button.classList.remove("choosed");
        button.classList.remove("correct");
        button.classList.remove("incorrect");
    });
    
    wrongGuessCount = 0;
    correctWord = [];
              incorrectVal.innerText = `: ${wrongGuessCount}/${maxGuess}`
        hangmanImgVal.src = `./onepiece-images/hangman${wrongGuessCount}.png`
});
    
document.addEventListener("keypress", function(e) {
    const currentLetter = e.key.toLowerCase(); 
    if (currentLetter >= 'a' && currentLetter <= 'z' && generated) {
        const button = keyboard.querySelector(`button[data-letter="${currentLetter}"]`);
        if (button && !button.disabled) {
            button.click();
        }
    } else if (!generated) {
        notGenerated.style.display = "flex";
        overlay.classList.add("blur-background");
        generateWord.classList.add("notClicked");
    }
});

const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

keyboardRows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";
    row.split("").forEach(currentLetter => {
        const button = document.createElement("button");
        button.textContent = currentLetter;
        button.setAttribute("data-letter", currentLetter);
        rowDiv.appendChild(button);

        button.addEventListener("click",function(e){
        if(generated){
            button.classList.add("choosed");
            button.disabled = true;
        }else{
            notGenerated.style.display = "flex";
            overlay.classList.add("blur-background");
            generateWord.classList.add("notClicked");
        }
            if(currentWord.includes(currentLetter)){
                button.classList.add("correct");    
                [...currentWord].forEach((value,index)=>{
                    if(value===currentLetter){
                        correctWord.push(currentLetter);
                        wordVal.querySelectorAll("li")[index].innerText = value;
                        wordVal.querySelectorAll("li")[index].classList.add("guessed");
                    }
                });

            }else{
                wrongGuessCount++;
                button.classList.add("incorrect");
                if(wrongGuessCount<=maxGuess){
                incorrectVal.innerText = `: ${wrongGuessCount}/${maxGuess}`
                hangmanImgVal.src = `./onepiece-images/hangman${wrongGuessCount}.png`    
                } 
            }
            if(wrongGuessCount=== maxGuess) return gameOver(false,currentWord);
            if(correctWord.length===totalLetters) return gameOver(true,currentWord);
        });
    });
    if (row === "zxcvbnm") {
        const credit = document.createElement("span");
        credit.className = "keyboard-credit";
        credit.textContent = "Dipam Pradhan";
        rowDiv.appendChild(credit);
    }
    keyboard.appendChild(rowDiv);
});



function gameOver(gameState,answerVal){
    if(gameState){
        correctAnswer.style.display="flex";
        overlay.classList.add("blur-background");
        answerW.innerHTML = answerVal;
        generateWord.classList.add("blur-background");
        generateWord.disabled = true;
        const buttons = keyboard.querySelectorAll("button");
        buttons.forEach(button => {
            button.disabled = true;
        });
        wrongGuessCount = 0;
        correctWord = [];

    }else{
        incorrectAnswer.style.display="flex";
        overlay.classList.add("blur-background");
        answerL.innerHTML = answerVal;
        generateWord.classList.add("blur-background");
        generateWord.disabled = true;
        const buttons = keyboard.querySelectorAll("button");
        buttons.forEach(button => {
            button.disabled = true;
        });

        wrongGuessCount = 0;
        correctWord = [];

    }
}

playAgainW.addEventListener("click",function(e){
    generated = true;   
    getRandomWord();
    overlay.classList.remove("blur-background");
    notGenerated.classList.add("hidden");
    generateWord.classList.remove("notClicked");
    correctAnswer.style.display="none";
    generateWord.classList.remove("blur-background");    
    generateWord.disabled = false;
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove("choosed");
        button.classList.remove("correct");
        button.classList.remove("incorrect");
    });
        incorrectVal.innerText = `: ${wrongGuessCount}/${maxGuess}`
        hangmanImgVal.src = `./onepiece-images/hangman${wrongGuessCount}.png`
});

document.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        playAgainW.click();
        playAgainL.click();
        generateWord.click();
    }
})

playAgainL.addEventListener("click",function(e){
    generated = true;   
    getRandomWord();
    overlay.classList.remove("blur-background");
    notGenerated.classList.add("hidden");
    generateWord.classList.remove("notClicked");
    incorrectAnswer.style.display="none";
    generateWord.classList.remove("blur-background");    
    generateWord.disabled = false;
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove("choosed");
        button.classList.remove("correct");
        button.classList.remove("incorrect");
    });
        incorrectVal.innerText = `: ${wrongGuessCount}/${maxGuess}`
        hangmanImgVal.src = `./onepiece-images/hangman${wrongGuessCount}.png`
});