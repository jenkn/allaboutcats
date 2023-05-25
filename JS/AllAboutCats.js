let formulare = document.getElementById('form');
let factbutton = document.getElementById('buttonFact')
let catFact = document.getElementById('catFact')




fetch('https://catfact.ninja/fact?max_length=140')
    .then(res => {
        console.log(res.status);
        return res.json();
    })
    .then(json => {
        console.log("json", json);//asynchronous
        addCatFact(json.fact);
    })
    .catch(err => console.error(err));

function addCatFact(facts) {
    let catFact = document.getElementById('catFact')
    let content = "";

    for (const theFact of facts) {
        content += theFact.fact;
    }
    catFact.innerHTML = content;

}

factbutton.addEventListener('click',addCatFact)




















function formhandler(evt){


    const forms = document.querySelectorAll('.needs-validation');

    let input = document.getElementById('likeCatsValid')
    let inputValue = input.value;
    let formulare = document.getElementById('form');

    if (inputValue == "YES"){

        Array.from(forms).forEach(form => {
            form.addEventListener('keypress', event => {
                if (!form.checkValidity()){
                    evt.preventDefault();
                    evt.stopPropagation()
                }
                form.classList.remove('is-invalid');
                form.classList.add('was-validated');
            }, false)
        })

    }

}
formulare.addEventListener('keypress',formhandler)
