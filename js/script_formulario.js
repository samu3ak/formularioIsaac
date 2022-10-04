// Auxiliar function
function $(selector) {
    return document.querySelector(selector);
}

// No valid message function
function noValidText(msg) {
    let texto = document.createElement("p");
    texto.innerHTML = msg;
    return texto;
}

// Adds another email field by clicking the email button
var showed = false;
$("#buttonEmail").addEventListener("click", function () {
    let numCampos = document.querySelectorAll("#campoCorreo");
    if (numCampos.length < 2) {
        var input_correo = document.createElement("input");
        input_correo.setAttribute("id", "campoCorreo");
        input_correo.setAttribute("type", "email");
        input_correo.setAttribute("name", "email");
        input_correo.setAttribute("placeholder", "Tu correo");
        $("#formulario").insertBefore(input_correo, $("#buttonEmail"));
        showed = false;
    } else {
        if (!showed) {
            $("#formulario").insertBefore(noValidText("No se permiten más de 3 correos"), $("#buttonEmail"));
            showed = true;
        }
    }
});