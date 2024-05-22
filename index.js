let container = document.querySelector('.outputContainer')

let input = document.querySelector("input")
let searchBtn = document.querySelector('.search-btn')
const themeBtn = document.querySelector(".theme-btn")
const loader = document.querySelector(".loader")
loader.style.display = "block"
console.log(loader);

let currentTheme = "light-theme"

localStorage.setItem("theme",currentTheme)
document.documentElement.className = currentTheme
let nu = "22"
console.log(typeof "ade" !== "string");
console.log();
themeBtn.addEventListener("click",()=>{
    
    if(localStorage.getItem("theme") === "light-theme"){
        
        console.log(themeBtn);
        currentTheme = "dark-theme"
        localStorage.setItem("theme",currentTheme)
        document.documentElement.className = currentTheme
        themeBtn.textContent = "🔆"
    }
    else{
        currentTheme ="light-theme"
        localStorage.setItem("theme",currentTheme)
        document.documentElement.className = currentTheme;
        themeBtn.textContent = "⚫"
}


}
)

// Using FETCH
// fetch('https://dog.ceo/api/breeds/image/random')
//     .then(response => response.json())
//     .then(output => {
//         console.log(output.message);

//         container.innerHTML = `<img src= "${output.message}">`
//     })
//     .catch(error => {

//         console.warn(error)

//     })


// USING ASYNC AND await


function displayDiv(word, POS, meaning) {
    word = word.charAt(0).toUpperCase() + word.slice(1, word.length)
    POS = POS.charAt(0).toUpperCase() + POS.slice(1, POS.length)
    container.innerHTML = `<span class="word-POS">Word:<b> ${word}</b></span><span  class="word-POS">Part of Speech:<b> ${POS}</b></span>
   ${meaning}`
}



async function generateWord(word) {
    
   
try {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
    loader.style.display = "none"
    }
    let responseOutput = await response.json()
    console.log(responseOutput);

    return responseOutput


} catch (error) {
    throw new Error(error.message)
}



}



function clearInputWord() {

    input.value = ""
}



const newFunction = async () => {
    let loopThroughDefinitions = ''
input.addEventListener("keydown",()=>{
     container.innerHTML = ""
})
    // User Input
    inputValue = input.value
    console.log(inputValue);
    if (input.value === "" || Boolean(Number(input.value))) {
        alert(`you haven't enterred any word`)
         container.innerHTML = ""
        clearInputWord()
        return
    }
if (inputValue) {
    loader.style.display = "block"
}


    let wordOutput = await generateWord(inputValue)
    // console.log(wordOutput);
    if (!Array.isArray(wordOutput)) {
        loader.style.display = "none"
        let para = document.createElement("p")
        para.textContent = wordOutput.message
        para.setAttribute("class","not-found")
        container.appendChild(para)
        clearInputWord()
        return
    }
    let wordSearched = wordOutput[0].word;
    let POS = wordOutput[0].meanings[0].partOfSpeech;
    let definitions = wordOutput[0].meanings[0].definitions[0].definition

    console.log(wordOutput[0].meanings[0].definitions);
    let wordArray = wordOutput[0].meanings[0].definitions

    wordArray.forEach((definitionsInArray, index) => {

        index += 1
        // if (!definitionsInArray.hasOwnProperty('example')) {
        //     loopThroughDefinitions += `<p>
        // Definition ${index}: ${definitionsInArray.definition}<p/>`
        // }
        // else {

        //     loopThroughDefinitions += `<p>
        // Definition ${index}: ${definitionsInArray.definition}<p/>
        // <span>Example: ${definitionsInArray.example}</span>`
        // }


        if (!definitionsInArray.hasOwnProperty('example')) {
        loopThroughDefinitions += `<section>
        <span class="word-def">
        Definition ${index} </span>:<p class="definition"> ${definitionsInArray.definition}</p></section>`
        }
        else {

        loopThroughDefinitions += `<section>
        <span class="word-def">
        Definition ${index} </span>:<p class="definition"> ${definitionsInArray.definition}</p></section>
        <p class="example">Example: ${definitionsInArray.example}</p>`
        }

        // if ('example' in definitionsInArray === false) {
        //   definitionsInArray.
        // }

    });


    displayDiv(wordSearched, POS, loopThroughDefinitions)

    clearInputWord()
    // console.log(wordOutput[0].meanings[0].partOfSpeech);
    // console.log(wordOutput[0].meanings[0].definitions[0].definition);

}


searchBtn.addEventListener('click', newFunction)


window.addEventListener('keydown', (event) => {

    if (event.key === "Enter") {
        newFunction()
    }
})








