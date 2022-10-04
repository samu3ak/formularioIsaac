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
        insertAfter(input_correo, $("input[type=email]"));
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

// Validation boolean
var isOk = false;

// Validates de telephone number
insertAfter(noValidText("Número de teléfono incorrecto", "noValidTel"), $("input[name=telefono]"));
$(".noValidTel").style.display = "none";
var telRegex = /^(\d{9})$/;
function telCheck(numero) {
    if (!numero.replaceAll(" ", "").match(telRegex)) {
        $(".noValidTel").style.display = "block";
    } else {
        $(".noValidTel").style.display = "none";
    }
}

// Validates email
insertAfter(noValidText("Formato correo no válido", "noValidEmail"), $("input[name=email]"));
$(".noValidEmail").style.display = "none";
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
function emailCheck(email) {
    if (!email.match(emailRegex)) {
        $(".noValidEmail").style.display = "block";
    } else {
        $(".noValidEmail").style.display = "none";
    }
}

// Checks if it's possible to submit the form
if (!isOk) {
    $("button[type=submit]").disabled = true;
} else {
    $("button[type=submit]").disabled = false;
}