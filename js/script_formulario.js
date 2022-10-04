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
// Validates de telephone number
insertAfter(noValidText("Número de teléfono incorrecto", "msgTel"), $("input[name=telefono]"));
$(".msgTel").style.display = "none";
var telRegex = /^(\d{9})$/;
function telCheck() {
    if (!$("input[name=telefono]").value.replaceAll(" ", "").match(telRegex)) {
        $(".msgTel").style.display = "block";
    } else {
        $(".msgTel").style.display = "none";
    }
}

// Validates email


// Checks if it's possible to submit the form
$("button[type=submit]").disabled = true;