var form = document.getElementById('addForm'); // store form DOM
var alunosList = document.getElementsByClassName('data_row') // store alunosList DOM
var filter = document.getElementById('filter') // store filter DOM
form.addEventListener('submit', addAluno); // Form submit event
filter.addEventListener('keyup', filterItems); // Filter event

// Detect any change on page
document.addEventListener('change', (e) => {

    try {
        let nota1 = document.getElementById(e.target.parentNode.parentNode.id).childNodes[1] // get the second element (nota 1) in table row
        nota1 = nota1.childNodes[0].value // get the value of the second element in table row
        nota1 = convertToNumber(nota1) // ensure that is converted to number type
        
        let nota2 = document.getElementById(e.target.parentNode.parentNode.id).childNodes[2] // get the value of the third element (nota 2) in table row
        nota2 = nota2.childNodes[0].value // get the value of the third element in table row
        nota2 = convertToNumber(nota2) // ensure that is converted to number type
    
        let notaFinal = document.getElementById(e.target.parentNode.parentNode.id).childNodes[3] // get the value of the fourth element (nota final) in table row
        notaFinal = notaFinal.childNodes[0].id // get the id of the fourth element in table row
    
        let status = document.getElementById(e.target.parentNode.parentNode.id).childNodes[4] // get the value of the fifth element (situação) in table row
        status = status.childNodes[0].id // get the id of the fifth element in table row
    
        updateNotaFinal(notaFinal, nota1, nota2, status); // recalculate values
    }
    catch {
        // do nothing
    }

});

function addAluno(e){
    e.preventDefault();
    var newAluno = document.getElementById('item').value; // Get aluno name
    if (newAluno === ''){} // pass if is empty
    else {
        addRowToList(newAluno); // add new aluno
    }
}

// handles the empty field situation and forces value to float
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

// add a row (aluno) to the table
function addRowToList(alunoName){
    let table = document.getElementById("mainBody"); // Captures the table
    let sizeOfTable = table.rows.length; // Get the size of table

    // create id names
    let nameId = sizeOfTable + alunoName;
    let nota1Id = sizeOfTable + alunoName + "_nota1"; // id = 0alunoName_nota1
    let nota2Id = sizeOfTable + alunoName + "_nota2"; // id = 0alunoName_nota2
    let resultadoId = sizeOfTable + alunoName + "_notaFinal"; // id = 0alunoName_notaFinal
    let statusId = sizeOfTable + alunoName + "_status"; // id = 0alunoName_status

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

    var notaFinal = document.createElement("span"); // create nota final
    notaFinal.setAttribute('id', resultadoId); // sets id to nota final
    
    var status = document.createElement("span"); // create status
    status.setAttribute('id', statusId) // sets id to status
    status.classList.add("btn", "btn-danger") // sets class to status
    status.innerHTML = "Reprovado" // populate default value

    var delButton = document.createElement("button"); // add delete button
    delButton.classList.add("btn", "btn-warning", "delete"); // add class to button
    delButton.innerHTML = "Deletar Aluno"; // insert label to button

    let row = table.insertRow(-1); // insert row at end of table
    row.setAttribute('id', nameId); // sets id to row
    row.setAttribute('class', 'data_row'); // sets class to row (to allow filtering function)
    let row_name = row.insertCell(0); // insert name cell
    let row_nota1 = row.insertCell(1); // insert nota 1 cell
    let row_nota2 = row.insertCell(2); // insert nota 2 cell
    let row_notaFinal = row.insertCell(3); // insert nota final cell
    let row_final_result = row.insertCell(4); // insert resultado final cell
    let action_button = row.insertCell(5); // insert action button cell

    row_name.innerText = alunoName; // populate name cell
    row_nota1.appendChild(nota1); // populate nota 1 cell
    row_nota2.appendChild(nota2); // populate nota 2 cell
    row_notaFinal.appendChild(notaFinal); // populate nota final cell
    row_final_result.appendChild(status); // populate resultado cell
    action_button.appendChild(delButton);  // populate action button cell

    delButton.onclick = function(){
        removeAluno(this)
    }
}

// recalculate values. target means nota final id
function updateNotaFinal(target, nota1, nota2, status){
    let targetNotaFinal = document.getElementById(target); // gets id of nota final 
    let notaFinal = (nota1 + nota2) / 2;
    notaFinal = notaFinal.toFixed(2); // rounds number
    targetNotaFinal.innerHTML = notaFinal; // changes the nota final field value
    status = document.getElementById(status); // get the status id

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

// filter when typing aluno name
function filterItems(e){
    var text = e.target.value.toLowerCase(); // convert text to lowercase
    var alunoName = alunosList; // Get alunoName
    Array.from(alunoName).forEach(function(alunoName){
        console.log(alunoName)
        var itemName = alunoName.firstChild.textContent;
        console.log(itemName)
        if(itemName.toLowerCase().indexOf(text) != -1){
            alunoName.style.display = 'table-row';
        } else {
            alunoName.style.display = 'none';
        }
    });
}

// delete aluno row
function removeAluno(botao){
    let linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}