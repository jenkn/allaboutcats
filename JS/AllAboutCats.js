let input = document.getElementById('likeCatsValid');
let factbutton = document.getElementById('buttonFact')
let pictureButton = document.getElementById('pictureBtn')


//Fact
function addCatFact() {
    console.log("click")                             //check in the console if function is called
    fetch('https://catfact.ninja/fact')        //GET request to URL
        .then(response => response.json())          //method on the Promise object to extract the JSON data from the response. It converts the response into a JavaScript object
        .then(data => {                             //contains the JavaScript object that contains the extracted data.
            const fact = data.fact;
            const factElement = document.getElementById('catFact');
            factElement.innerText = fact;
            console.log("fact", fact);
            console.log("data", data)
        })

        .catch(error => {
            console.log('Error:', error);
        });
}





factbutton.addEventListener('click', addCatFact)

//Picture
function addCatPicture() {

    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data[0].url;                                   // URL of the random cat image extracted from the data object
            const cardBody = document.getElementById('randomPicInput');
            cardBody.innerHTML = "";                                        //flushes the entire contents of the cardBody element

            const existingImage = cardBody.querySelector('img');     // Remove any existing image element
            if (existingImage) {
                existingImage.remove();
            }

            // Create a new image element and set the source
            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.width = '500px';
            image.style.height = '450px'
            image.style.display = 'block';
            image.style.margin = 'auto';

            // Append the image to the card body
            cardBody.appendChild(image);
        })
        .catch(error => {
            console.log('Error:', error);
        });

}

pictureButton.addEventListener('click', addCatPicture)


//validation
function formhandler(evt) {
    evt.preventDefault();
    let errorImage = document.getElementById('errorImage');
    let inputValue = input.value.toUpperCase();
    let angryCat = document.getElementById('angrycat');

    console.log(inputValue)

    if (inputValue === "YES" || inputValue.includes("LOVE") && inputValue.includes("CATS")) {
        console.log(true)
        errorImage.style.display = 'none';
        angryCat.style.display = 'none';
        input.classList.remove('is-invalid');
        input.classList.add('was-validated');
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('was-validated');
        errorImage.style.display = 'none';
        angryCat.style.display = 'block';
        angryCat.style.position = 'absolute';
        angryCat.style.zIndex = '9999';


    }

}

document.getElementById('form').addEventListener('submit', formhandler);
