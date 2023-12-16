// Register form
var form = document.getElementById('addForm');

// Form submit event
form.addEventListener('submit', addAluno);


// Detect any change on page
document.addEventListener('change', (e) => {
    let nota1 = document.getElementById(e.target.parentNode.parentNode.id).childNodes[1] // get the second element in table row
    nota1 = nota1.childNodes[0].value // get the value of the second element in table row
    nota1 = convertToNumber(nota1) // ensure that is converted to number type
    
    let nota2 = document.getElementById(e.target.parentNode.parentNode.id).childNodes[2] // get the value of the third element in table row
    nota2 = nota2.childNodes[0].value // get the value of the third element in table row
    nota2 = convertToNumber(nota2) // ensure that is converted to number type

    let notaFinal = document.getElementById(e.target.parentNode.parentNode.id).childNodes[3]
    notaFinal = notaFinal.childNodes[0].id

    let status = document.getElementById(e.target.parentNode.parentNode.id).childNodes[4]
    status = status.childNodes[0].id

    updateNotaFinal(notaFinal, nota1, nota2, status);
});

function addAluno(e){
    e.preventDefault();

    // Get aluno name
    var newAluno = document.getElementById('item').value;

    if (newAluno === ''){
        // pass if is empty
    }
    else {
        addRowToList(newAluno);
    }

}

// handles the empty field and convert to float situation
function convertToNumber(value){
    if (value == "") {
        value = 0;
        return value;
    }
    else {
        value = parseFloat(value);
        return value;
    }
}

// add a row to the table
function addRowToList(alunoName){
    // Captures the table
    let table = document.getElementById("mainBody"); 

    // Get the size of table
    let sizeOfTable = table.rows.length; 

    // create id names
    let nameId = sizeOfTable + alunoName;
    let nota1Id = sizeOfTable + alunoName + "_nota1";
    let nota2Id = sizeOfTable + alunoName + "_nota2";
    let resultadoId = sizeOfTable + alunoName + "_notaFinal";
    let statusId = sizeOfTable + alunoName + "_status";

    // create notas 1 e 2
    var nota1 = document.createElement("input");
    nota1.setAttribute('id', nota1Id);
    nota1.type = "number";
    nota1.value = 0;
    nota1.placeholder = "Digite a nota";
    nota1.step = "0.1"
    nota1.min = 0;
    nota1.max = 10;

    var nota2 = document.createElement("input");
    nota2.setAttribute('id', nota2Id);
    nota2.type = "number";
    nota2.value = 0;
    nota2.placeholder = "Digite a nota";
    nota2.step = "0.1"
    nota2.min = 0;
    nota2.max = 10;

    // create nota final
    var notaFinal = document.createElement("span");
    notaFinal.setAttribute('id', resultadoId);

    // create status
    var status = document.createElement("span");
    status.setAttribute('id', statusId)
    status.classList.add("btn", "btn-danger")
    // status.setAttribute('class', 'reproved')
    status.innerHTML = "Reprovado"

    // create row
    let row = table.insertRow(-1);
    row.setAttribute('id', nameId);
    let row_name = row.insertCell(0);
    let row_nota1 = row.insertCell(1);
    let row_nota2 = row.insertCell(2);
    let row_notaFinal = row.insertCell(3);
    let row_final_result = row.insertCell(4);
    let action_button = row.insertCell(5);

    // add data to cells
    row_name.innerText = alunoName;
    row_nota1.appendChild(nota1);
    row_nota2.appendChild(nota2);
    row_notaFinal.appendChild(notaFinal);
    row_final_result.appendChild(status);
    // row_final_result.innerHTML = "Reprovado"

    // add delete button
    var delButton = document.createElement("button");
    delButton.classList.add("btn", "btn-danger", "delete");
    delButton.innerHTML = "Deletar Aluno";
    action_button.appendChild(delButton);
}

function updateNotaFinal(target, nota1, nota2, status){
    let targetNotaFinal = document.getElementById(target);
    let notaFinal = (nota1 + nota2) / 2;
    notaFinal = notaFinal.toFixed(2);
    targetNotaFinal.innerHTML = notaFinal;

    status = document.getElementById(status);

    if (notaFinal >= 7) {
        status.innerHTML = "Aprovado";
        status.classList.remove("btn-danger");
        status.classList.add("btn-success");
    }
    else {
        status.innerHTML = "Reprovado";
        status.classList.remove("btn-success");
        status.classList.add("btn-danger");
    }
}