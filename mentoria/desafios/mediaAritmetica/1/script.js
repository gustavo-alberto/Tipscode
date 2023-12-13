var nota1 = document.querySelector("#nota1");
var nota2 = document.querySelector("#nota2");
var notaFinalField = document.querySelector("#notaFinal");

nota1.addEventListener('change', (e) => {
    if (nota1.value > 10) {
        nota1.value = 10;
    }
    if (nota1.value < 0) {
        nota1.value = 0;
    }
    score1temp = convertScore(nota1.value);
    score2temp = convertScore(nota2.value);
    updateFinalScore(score1temp, score2temp);
});

nota2.addEventListener('change', (e) => {
    if (nota2.value > 10) {
        nota2.value = 10;
    }
    if (nota2.value < 0) {
        nota2.value = 0;
    }
    score1temp = convertScore(nota1.value);
    score2temp = convertScore(nota2.value);
    updateFinalScore(score1temp, score2temp);
});

function updateFinalScore(nota1, nota2){
    let notaFinalField = document.querySelector("#notaFinal");
    let status = document.getElementById("status");
    notaFinal = (nota1 + nota2) / 2;
    notaFinal = notaFinal.toFixed(2);
    notaFinalField.innerHTML = notaFinal;

    if (notaFinal >= 7) {
        status.innerHTML = "APROVADO";
        status.classList.remove("reproved");
        status.classList.add("approved");
    }
    else {
        status.innerHTML = "REPROVADO";
        status.classList.remove("approved");
        status.classList.add("reproved");
    }
}

function convertScore(score) {
    if (score == "") {
        score = 0;
        return score
    }
    else {
        score = parseFloat(score);
        return score;
    }
}