let url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '69212423f0msh1392c615df186c1p1e1e6ejsn29521e60f545',
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
};

let resultContainer = document.getElementsByClassName('result')[0];
const button = document.getElementById('btn');
const input = document.getElementById('input-text');
const res = document.getElementsByClassName('result')[0];
const dictionary = document.getElementsByClassName('dictionary')[0];

button.addEventListener('click', async (e) => {
    e.preventDefault(); // Correctly call preventDefault

    const inputText = input.value.toString();
    // inputText=inputText.trim()

    if (inputText === "") {
        resultContainer.innerHTML = "Please Enter A word";
        return; // Stop the function if the input is empty
    }

    const wordLen = inputText.length;
    url += inputText;

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.meaning === undefined) {
            resultContainer.innerHTML = "Not Found!";
        } else {
            if (resultContainer) {
                resultContainer.remove();
            }

            const createResult = document.createElement('div');
            const textNode = document.createTextNode(`${result.meaning.noun.replaceAll('(nou)', '\n[NOUN]\n')}`);
            createResult.appendChild(textNode);
            createResult.classList.add('result');

            dictionary.appendChild(createResult);
            resultContainer = createResult;
        }

        console.log(result.meaning);
    } catch (error) {
        console.log("An error has occurred");
    }

    url = url.slice(0, url.length - wordLen);
});
