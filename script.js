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
let currentWord, correctWord = [],wrongGuessCount = 0;
const maxGuess = 6;
const gameState = false;
function getRandomWord(){
    const{word,hint} = hangman_words[Math.floor(Math.random()*hangman_words.length)];
    currentWord = word;
    hintVal.textContent = `Hint: ${hint}`; 
    wordVal.innerHTML = word.split("").map(()=>'<li></li>').join("");
}



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
        hangmanImgVal.src = `./images/hangman-${wrongGuessCount}.svg`
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

for(let i=97;i<=122;i++){
    const button = document.createElement("button");
    let currentLetter = String.fromCharCode(i);
    button.textContent = currentLetter;
    button.setAttribute("data-letter", currentLetter);
    keyboard.appendChild(button);
   
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
            hangmanImgVal.src = `./images/hangman-${wrongGuessCount}.svg`    
            } 
        }
        if(wrongGuessCount=== maxGuess) return gameOver(false,currentWord);
        if(correctWord.length===currentWord.length) return gameOver(true,currentWord);
    })
    
}



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
        hangmanImgVal.src = `./images/hangman-${wrongGuessCount}.svg`
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
        hangmanImgVal.src = `./images/hangman-${wrongGuessCount}.svg`
});