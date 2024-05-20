let container = document.querySelector('.outputContainer')

let input = document.querySelector("input")
let searchBtn = document.querySelector('button')

console.log(input);


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
    container.innerHTML = `<span>Word: ${word}</span><span>Part of Speech: ${POS}</span>
   ${meaning}`
}



async function generateWord(word) {

    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    let responseOutput = await response.json()
    console.log(responseOutput);

    return responseOutput




}


function clearInputWord() {

    input.value = ""
}



const newFunction = async () => {
    let loopThroughDefinitions = ''

    // User Input
    inputValue = input.value
    if (input.value === "") {
        alert(`you haven't enterred any word`)
        return
    }




    let wordOutput = await generateWord(inputValue)
    let wordSearched = wordOutput[0].word;
    let POS = wordOutput[0].meanings[0].partOfSpeech;
    let definitions = wordOutput[0].meanings[0].definitions[0].definition

    console.log(wordOutput[0].meanings[0].definitions);
    let wordArray = wordOutput[0].meanings[0].definitions

    wordArray.forEach((definitionsInArray, index) => {

        index += 1
        if (!definitionsInArray.hasOwnProperty('example')) {
            loopThroughDefinitions += `<p>
        Definition ${index}: ${definitionsInArray.definition}<p/>`
        }
        else {

            loopThroughDefinitions += `<p>
        Definition ${index}: ${definitionsInArray.definition}<p/>
        <span>Example: ${definitionsInArray.example}</span>`
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








