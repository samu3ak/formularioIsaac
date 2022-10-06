// Auxiliar function
function $(selector) {
    return document.querySelector(selector);
}

// No valid message function
function noValidText(msg, clase) {
    let texto = document.createElement("p");
    texto.className = clase;
    texto.innerHTML = msg;
    return texto;
}

// Insert after function
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Adds another email field by clicking the + button
var showed = false;
$("#addEmailButton").addEventListener("click", function () {
    let numCampos = document.querySelectorAll("#campoCorreo");
    if (numCampos.length < 2) {
        var input_correo = document.createElement("input");
        input_correo.setAttribute("id", "campoCorreo");
        input_correo.setAttribute("type", "email");
        input_correo.setAttribute("name", "email");
        input_correo.setAttribute("placeholder", "example@domain.com");
        input_correo.setAttribute("oninput", "emailCheck(this.value)");
        if (numCampos.length != 0) {
            insertAfter(input_correo, $("#campoCorreo"));
        } else {
            insertAfter(input_correo, $("input[type=email]"));
        }
        showed = false;
    } else {
        if (!showed) {
            insertAfter(noValidText("No se permiten más de 3 correos", "msgEmail"), $("#campoCorreo").nextSibling);
            showed = true;
        }
    }
});

// Remove one email field by clicking the - button, also removes the noValidText message, resetting it into unshowed
$("#removeEmailButton").addEventListener("click", function () {
    let elementos = document.querySelectorAll("#campoCorreo");
    let i = elementos.length - 1;
    elementos[i].remove();
    $(".msgEmail").remove();
    showed = false;
});

// submitValidation boolean
var isValidated = false;

// Validates de telephone number
insertAfter(noValidText("Número de teléfono incorrecto", "noValidTel"), $("input[name=telefono]"));
$(".noValidTel").style.display = "none";
var telRegex = /^(\d{9})$/;
function telCheck(numero) {
    if (!numero.replaceAll(" ", "").match(telRegex)) {
        $(".noValidTel").style.display = "block";
        isValidated = false;
    } else {
        $(".noValidTel").style.display = "none";
        isValidated = true;
    }
    submitValidation();
}

// Validates email
insertAfter(noValidText("Formato correo no válido", "noValidEmail"), $("input[name=email]"));
$(".noValidEmail").style.display = "none";
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
function emailCheck(email) {
    if (!email.match(emailRegex)) {
        $(".noValidEmail").style.display = "block";
        isValidated = false;
    } else {
        $(".noValidEmail").style.display = "none";
        isValidated = true;
    }
    submitValidation();
}

// Checks if it's possible to submit the form
insertAfter(noValidText("Recuerda rellenar todos los campos y con el formato adecuado", "noSubmit"), $("button[type=submit]"));
$(".noSubmit").style.display = "none";
function submitValidation() {
    if (isValidated && !oneFieldIsEmpty()) {
        $("button[type=submit]").disabled = false;
        $(".noSubmit").style.display = "none";
    } else {
        $("button[type=submit]").disabled = true;
        $(".noSubmit").style.display = "block";
    }
}

// This function checks if any of the fields are empty by returning a boolean
function oneFieldIsEmpty() {
    let isEmpty = false;
    let inputFields = document.querySelectorAll("input");
    for (var i = inputFields.length - 1; i >= 0; i--) {
        isEmpty = inputFields[i].value == "";
    }
    return isEmpty;
}
