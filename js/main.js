// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get Araay From Letters
let lettersArray = Array.from(letters);

// Select leeters Contianer
let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach(letter => {
    let span = document.createElement("span");

    // Create Letter Text Node

    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';

    lettersContainer.appendChild(span);
});

// Objext of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortan", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento","Coco","Up"],
    people: ["Ahmad Almadhoon","elzero","Karam"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}


// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randompropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randompropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValue = randomPropValue[randomValueNumber];


// Set Category Info
document.querySelector(".game-info span").innerHTML = randompropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValue);

// Create Spans Depened On Word

lettersAndSpace.forEach(letter => {
    
    // Create Empty Span
    let emptyspan = document.createElement("span");

    if(letter === ' '){
        emptyspan.className = 'has-space';
    }

    lettersGuessContainer.appendChild(emptyspan);
});

// Select Guess Spans 
let guessSpans = document.querySelectorAll(".letters-guess span")

// Set Wrong Attempts
let WrongAttempts = 0;

// Select The Draw Element 
let  theDraw = document.querySelector(".hangman-draw")






// Set The Chose Status 
let theStatus;
// Number is The True Choose
let numTrue = 0;
// Handle Clicking On letters
document.addEventListener("click", (e) => {

    theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
        
        // get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word

        let theChosenWord = Array.from(randomValue.toLowerCase());

        // The Chosen Word;
        // console.log(lettersAndSpace);
        theChosenWord.forEach((WordLetter, wordIndex) => {
            //If The Clicked letter Equal To One of The Chose Word Letter
            if(WordLetter === theClickedLetter){
                
                theStatus = true;
                // Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {

                    if(spanIndex == wordIndex){
                        span.innerHTML = WordLetter;
                    }
                });
                numTrue++;
            }
        });
        let randomValueValue = randomValue.replace(/\s+/g , "");

        // Outside Loop

        // If Letter Is Wrong 
        if(theStatus == false){

            // Increase The Wrong Attempts 
            WrongAttempts++;

            // Add Class Wrong ON The Draw Element
            theDraw.classList.add(`wrong-${WrongAttempts}`);

            // Play Fail Sound
            // document.getElementById("fail").play();

            if(WrongAttempts == 8){
                lettersContainer.classList.add("finshed"); 
                endGame();
            }
        }
        if(theStatus){
            // Play Success Sound
            // document.getElementById("scccess").play();
            if(numTrue == randomValueValue.length){
                lettersContainer.classList.add("finshed");
                endGame();
            }

        }
    }
});

// End Game Function
function endGame(){
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
      let divtext;
    if(theStatus){
        divtext =  document.createTextNode(`Wiiiin, Wrong Words ${WrongAttempts}`);
        div.className = `win`;
    }
    else{
        divtext = document.createTextNode(`Game Over, The Word Is ${randomValue}`);
        div.className = `popup`;
    }

    // Append Text To Div 
    div.appendChild(divtext);

    //Add Class On Div 


    // Apoend To The Body
    document.body.appendChild(div);
                    
                // New Game
                setInterval(() => {
                    location.reload();
                }, 4000);
}


