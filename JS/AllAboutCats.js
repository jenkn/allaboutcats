let formulare = document.getElementById('form');


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