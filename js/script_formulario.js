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
        input_correo.setAttribute("onfocusout", "check(this.name)");
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

// Creates no valid text for the fields and hides it
insertAfter(noValidText("Formato correo no válido", "noValidEmail"), $("input[name=email]"));
$(".noValidEmail").style.display = "none";

insertAfter(noValidText("Número de teléfono incorrecto", "noValidTel"), $("input[name=telefono]"));
$(".noValidTel").style.display = "none";

insertAfter(noValidText("Formato DNI no válido", "noValidDNI"), $("input[name=DNI]"));
$(".noValidDNI").style.display = "none";

insertAfter(noValidText("Formato de IBAN no válido", "noValidIBAN"), $("input[name=IBAN]"));
$(".noValidIBAN").style.display = "none";

insertAfter(noValidText("Formato de Swift no válido", "noValidSwift"), $("input[name=Swift]"));
$(".noValidSwift").style.display = "none";

// Validates a field with regex

function check(elementName) {
    let elements = document.querySelectorAll("input[name=" + elementName + "]");
    let element = elements[elements.length - 1].value;
    let regex = "";
    let classMsg = "";
    switch (elementName) {
        case "email":
            regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            classMsg = ".noValidEmail";
            break;
        case "telefono":
            regex = /^(\d{9})$/;
            classMsg = ".noValidTel";
            element = element.replaceAll(" ", "");
            break;
        case "DNI":
            regex = /^([0-9]{8})([A-Z]{1})$/;
            classMsg = ".noValidDNI";
            element = element.replaceAll(" ", "");
            break;
        case "IBAN":
            regex = /^([A-Z]{2})([0-9]{22})$/;
            classMsg = ".noValidIBAN";
            break;
        case "Swift":
            regex = /^([A-Z]{8})(\d{3})$/;
            classMsg = ".noValidSwift";
            break;
    }
    if (!element.match(regex)) {
        $(classMsg).style.display = "block";
        isValidated = false;
    } else {
        $(classMsg).style.display = "none";
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

