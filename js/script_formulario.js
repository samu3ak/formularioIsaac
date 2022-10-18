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

insertAfter(noValidText("Formato de swift no válido", "noValidswift"), $("input[name=swift]"));
$(".noValidswift").style.display = "none";

insertAfter(noValidText("Fecha de nacimiento inválida", "noValidFecha"), $("input[name=fechaNac]"));
$(".noValidFecha").style.display = "none";

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
        case "swift":
            regex = /^([A-Z]{6})([A-Z0-9]{2})([A-Z0-9]{3})?$/;
            classMsg = ".noValidswift";
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
    let emptyField = oneFieldIsEmpty();
    if (isValidated && !emptyField) {
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
    let i = inputFields.length;
    while (!isEmpty && i != 0) {
        i--;
        isEmpty = inputFields[i].value == "";
    }
    return isEmpty;
}

// This function alerts the user the form has been successfully submited
function enviado() {
    alert("Formulario procesado y enviado satisfactoriamente");
}

// This function resets every input field
function reiniciarCampos() {
    let inputFields = document.querySelectorAll("input");
    for (let i = inputFields.length - 1; i >= 0; i--) {
        inputFields[i].value = "";
    }
}

function checkSwift() {
    let iban = $("input[name=IBAN]").value;
    if (iban.match(/^([A-Z]{2})([0-9]{22})$/)) {
        let codigoBanco = iban.substring(4, 8);
        let i = 0;
        while (i < listaCodigoBanco.length && codigoBanco != listaCodigoBanco[i]) {
            i++;
        }
        if (codigoBanco === listaCodigoBanco[i]) {
            $("input[name=swift").value = listaBicSwift[i];
        } else {
            $("input[name=swift").value = "";
        }
        check("swift");
    }
}

// List of BIC SWIFT and Bank Codes Relations
var listaCodigoBanco = [
    "0003",
    "0011",
    "0019",
    "0021",
    "0030",
    "0031",
    "0036",
    "0046",
    "0049",
    "0057",
    "0058",
    "0059",
    "0061",
    "0065",
    "0072",
    "0073",
    "0075",
    "0078",
    "0081",
    "0083",
    "0086",
    "0093",
    "0094",
    "0099",
    "0106",
    "0107",
    "0108",
    "0113",
    "0121",
    "0122",
    "0125",
    "0128",
    "0129",
    "0130",
    "0131",
    "0132",
    "0133",
    "0136",
    "0138",
    "0144",
    "0145",
    "0149",
    "0151",
    "0152",
    "0154",
    "0155",
    "0156",
    "0159",
    "0160",
    "0161",
    "0162",
    "0167",
    "0168",
    "0169",
    "0182",
    "0184",
    "0186",
    "0188",
    "0190",
    "0196",
    "0198",
    "0200",
    "0202",
    "0205",
    "0211",
    "0216",
    "0217",
    "0218",
    "0219",
    "0220",
    "0223",
    "0224",
    "0225",
    "0226",
    "0227",
    "0228",
    "0229",
    "0231",
    "0232",
    "0233",
    "0234",
    "0235",
    "0236",
    "0237",
    "0238",
    "0239",
    "0240",
    "0241",
    "0486",
    "0487",
    "0488",
    "1000",
    "1113",
    "1116",
    "1127",
    "1156",
    "1164",
    "1168",
    "1173",
    "1182",
    "1191",
    "1193",
    "1196",
    "1197",
    "1199",
    "1209",
    "1210",
    "1221",
    "1224",
    "1227",
    "1231",
    "1233",
    "1234",
    "1236",
    "1238",
    "1240",
    "1241",
    "1242",
    "1245",
    "1248",
    "1249",
    "1251",
    "1255",
    "1451",
    "1454",
    "1457",
    "1459",
    "1460",
    "1462",
    "1463",
    "1464",
    "1465",
    "1466",
    "1467",
    "1469",
    "1470",
    "1472",
    "1473",
    "1474",
    "1475",
    "1478",
    "1479",
    "1480",
    "1485",
    "1488",
    "1490",
    "1491",
    "1494",
    "1497",
    "1501",
    "1502",
    "1505",
    "1506",
    "1522",
    "1524",
    "1525",
    "1534",
    "1538",
    "1544",
    "1545",
    "2000",
    "2010",
    "2013",
    "2017",
    "2018",
    "2031",
    "2037",
    "2038",
    "2043",
    "2045",
    "2048",
    "2051",
    "2052",
    "2056",
    "2065",
    "2066",
    "2080",
    "2081",
    "2085",
    "2086",
    "2095",
    "2096",
    "2097",
    "2099",
    "2100",
    "2101",
    "2103",
    "2104",
    "2105",
    "2107",
    "2108",
    "3001",
    "3005",
    "3007",
    "3008",
    "3009",
    "3016",
    "3017",
    "3018",
    "3020",
    "3023",
    "3025",
    "3029",
    "3035",
    "3045",
    "3058",
    "3059",
    "3060",
    "3063",
    "3067",
    "3070",
    "3076",
    "3080",
    "3081",
    "3084",
    "3085",
    "3089",
    "3095",
    "3096",
    "3098",
    "3102",
    "3104",
    "3105",
    "3110",
    "3111",
    "3112",
    "3113",
    "3115",
    "3116",
    "3117",
    "3118",
    "3119",
    "3121",
    "3123",
    "3127",
    "3130",
    "3134",
    "3135",
    "3137",
    "3138",
    "3140",
    "3144",
    "3146",
    "3150",
    "3152",
    "3157",
    "3159",
    "3160",
    "3162",
    "3165",
    "3166",
    "3171",
    "3172",
    "3174",
    "3177",
    "3179",
    "3183",
    "3186",
    "3187",
    "3188",
    "3190",
    "3191",
    "3501",
    "3524",
    "3563",
    "3575",
    "3604",
    "3641",
    "3656",
    "3661",
    "3669",
    "3682",
    "6814",
    "6852",
    "8233",
    "8512",
    "8835",
    "9000",
    "9091",
    "9092",
    "9093",
    "9094",
    "9096"
];

var listaBicSwift = [
    "BDEPESM1XXX",
    "ALLFESMMXXX",
    "DEUTESBBASS",
    "BCNDESM1XXX",
    "ESPCESMMXXX",
    "ETCHES2GXXX",
    "SABNESMMXXX",
    "GALEES2GXXX",
    "BSCHESMMXXX",
    "BVADESMMXXX",
    "BNPAESMZXXX",
    "MADRESMMXXX",
    "BMARES2MXXX",
    "BARCESMMXXX",
    "PSTRESMMXXX",
    "OPENESMMXXX",
    "POPUESMMXXX",
    "BAPUES22XXX",
    "BSABESBBXXX",
    "RENBESMMXXX",
    "NORTESMMXXX",
    "VALEESVVXXX",
    "BVALESMMXXX",
    "AHCRESVVXXX",
    "LOYDESMMXXX",
    "BNLIESM1XXX",
    "SOGEESMMAGM",
    "INBBESM1XXX",
    "OCBAESM1XXX",
    "CITIES2XXXX",
    "BAOFESM1XXX",
    "BKBKESMMXXX",
    "INALESM1XXX",
    "CGDIESMMXXX",
    "BESMESMMXXX",
    "PRNEESM1XXX",
    "MIKBESB1XXX",
    "AREBESMMXXX",
    "BKOAES22XXX",
    "PARBESMHXXX",
    "DEUTESM1XXX",
    "BNPAESMHXXX",
    "CHASESM3XXX",
    "BPLCESMMXXX",
    "BSUIESMMXXX",
    "BRASESMMXXX",
    "ABNAESMMXXX",
    "COBAESMXTMA",
    "BOTKESMXXXX",
    "BKTRESM1XXX",
    "MIDLESMXXXX",
    "GEBAESMMBIL",
    "BBRUESMXXXX",
    "NACNESMMXXX",
    "BBVAESMMXXX",
    "BEDFESM1XXX",
    "BFIVESBBXXX",
    "ALCLESMMXXX",
    "BBPIESMMXXX",
    "WELAESMMFUN",
    "BCOEESMMXXX",
    "PRVBESB1XXX",
    "IPAYESMMXXX",
    "DECRESM1XXX",
    "PROAESMMXXX",
    "POHIESMMXXX",
    "HLFXESMMXXX",
    "FCEFESM1XXX",
    "BMCEESMMXXX",
    "FIOFESM1XXX",
    "GEECESB1XXX",
    "SCFBESMMXXX",
    "FIEIESM1XXX",
    "UBSWESMMNPB",
    "UNOEESM1XXX",
    "IXIUESM1XXX",
    "POPLESMMXXX",
    "DSBLESMMXXX",
    "INVLESMMXXX",
    "POPIESMMXXX",
    "CCOCESMMXXX",
    "PIESESM1XXX",
    "LOYIESMMXXX",
    "CSURES2CXXX",
    "PSTRESMMXXX",
    "EVOBESMMXXX",
    "BCCAESMMXXX",
    "PRDVESM1XXX",
    "TRESES2BXXX",
    "GBMNESMMXXX",
    "BFASESMMXXX",
    "ICROESMMXXX",
    "BSUDESM1XXX",
    "SCSIESM1XXX",
    "SCBLESM1XXX",
    "IRVTESM1XXX",
    "ESBFESM1XXX",
    "BNACESM1XXX",
    "COURESB1XXX",
    "HYVEESM1XXX",
    "HANDES21XXX",
    "PKBSES21XXX",
    "AEEVESM1XXX",
    "BILLESB1XXX",
    "CRGEESM1XXX",
    "ABCMESM1XXX",
    "REDEESM1XXX",
    "PNBMESM1XXX",
    "RHRHESM1XXX",
    "BSSAESB1XXX",
    "BOCAES21XXX",
    "BCMAESM1XXX",
    "PRBAESM1XXX",
    "HELAESM1XXX",
    "BIMEESM1XXX",
    "LOFPESB1XXX",
    "STOLESM1XXX",
    "SOLAESB1XXX",
    "BEIVESM1XXX",
    "WAFAESM1XXX",
    "NPBSES21XXX",
    "IHZUES21XXX",
    "AARBESM1XXX",
    "CRCGESB1XXX",
    "NEWGESM1XXX",
    "LLISESM1XXX",
    "PRABESMMXXX",
    "CRESESMMXXX",
    "ASSCESM1XXX",
    "PSABESM1XXX",
    "NFFSESM1XXX",
    "INGDESMMXXX",
    "FRANESM1XXX",
    "EHYPESMXXXX",
    "SHSAESM1XXX",
    "BPIPESM1XXX",
    "UCSSESM1XXX",
    "PRIBESMXXXX",
    "CITIESMXSEC",
    "CCSEESM1XXX",
    "MLIBESM1XXX",
    "NATXESMMXXX",
    "VOWAES21XXX",
    "BOFAES2XXXX",
    "PICTESMMXXX",
    "SELFESMMXXX",
    "TRIOESMMXXX",
    "BCITESMMXXX",
    "ESSIESMMXXX",
    "DPBBESM1XXX",
    "IKBDESM1XXX",
    "ARABESMMXXX",
    "MLCBESM1XXX",
    "EFGBESMMXXX",
    "UBIBESMMXXX",
    "BCDMESMMXXX",
    "KBLXESMMXXX",
    "ICBKESMMXXX",
    "BACAESMMXXX",
    "AGRIESMMXXX",
    "CECAESMMXXX",
    "CECAESMM010",
    "CESCESBBXXX",
    "CECAESMM017",
    "CECAESMM018",
    "CECAESMM031",
    "CECAESMM037",
    "CAHMESMMXXX",
    "CECAESMM043",
    "CECAESMM045",
    "CECAESMM048",
    "CECAESMM051",
    "CECAESMM052",
    "CECAESMM056",
    "CECAESMM065",
    "CECAESMM066",
    "CAGLESMMVIG",
    "CECAESMM081",
    "CAZRES2ZXXX",
    "CECAESMM086",
    "BASKES2BXXX",
    "CSPAES2LXXX",
    "CECAESMM097",
    "CECAESMM099",
    "CAIXESBBXXX",
    "CGGKES22XXX",
    "UCJAES2MXXX",
    "CSSOES2SXXX",
    "CECAESMM105",
    "BBVAESMM107",
    "CSPAES2L108",
    "BCOEESMM001",
    "BCOEESMM005",
    "BCOEESMM007",
    "BCOEESMM008",
    "BCOEESMM009",
    "BCOEESMM016",
    "BCOEESMM017",
    "BCOEESMM018",
    "BCOEESMM020",
    "BCOEESMM023",
    "CDENESBBXXX",
    "CCRIES2A029",
    "CLPEES2MXXX",
    "CCRIES2A045",
    "CCRIES2AXXX",
    "BCOEESMM059",
    "BCOEESMM060",
    "BCOEESMM063",
    "BCOEESMM067",
    "BCOEESMM070",
    "BCOEESMM076",
    "BCOEESMM080",
    "BCOEESMM081",
    "CVRVES2BXXX",
    "BCOEESMM085",
    "BCOEESMM089",
    "CCRIES2A095",
    "BCOEESMM096",
    "BCOEESMM098",
    "BCOEESMM102",
    "BCOEESMM104",
    "CCRIES2A105",
    "BCOEESMM110",
    "BCOEESMM111",
    "CCRIES2A112",
    "BCOEESMM113",
    "BCOEESMM115",
    "BCOEESMM116",
    "BCOEESMM117",
    "CCRIES2A118",
    "CCRIES2A119",
    "CCRIES2A121",
    "CCRIES2A123",
    "BCOEESMM127",
    "BCOEESMM130",
    "BCOEESMM134",
    "CCRIES2A135",
    "CCRIES2A137",
    "BCOEESMM138",
    "BCOEESMM140",
    "BCOEESMM144",
    "CCCVESM1XXX",
    "BCOEESMM150",
    "CCRIES2A152",
    "CCRIES2A157",
    "BCOEESMM159",
    "CCRIES2A160",
    "BCOEESMM162",
    "CCRIES2A165",
    "BCOEESMM166",
    "CXAVESB1XXX",
    "CCOCESMMXXX",
    "BCOEESMM174",
    "BCOEESMM177",
    "CCRIES2A179",
    "CASDESBBXXX",
    "CCRIES2A186",
    "BCOEESMM187",
    "CCRIES2A188",
    "BCOEESMM190",
    "BCOEESMM191",
    "RENTESMMXXX",
    "AHCFESMMXXX",
    "MISVESMMXXX",
    "INSGESMMXXX",
    "CAPIESMMXXX",
    "LISEESMMXXX",
    "CSSOES2SFIN",
    "MLCEESMMXXX",
    "IVALESMMXXX",
    "GVCBESBBETB",
    "MNTYESMMXXX",
    "BMEUESM1XXX",
    "CSFAESM1XXX",
    "UCINESMMXXX",
    "SBFCESMMXXX",
    "ESPBESMMXXX",
    "XBCNESBBXXX",
    "XRBVES2BXXX",
    "XRVVESVVXXX",
    "MEFFESBBXXX",
    "IBRCESMMXXX"
];



