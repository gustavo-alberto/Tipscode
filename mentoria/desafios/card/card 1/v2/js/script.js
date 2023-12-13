function changeButtonText() {
    var display_text = document.getElementById('apply__button');
    display_text.classList.toggle('focus__button');
    display_text.innerHTML = "";
    display_text.innerHTML = "Click to Apply";
}

function changeButtonTextBack() {
    var display_text = document.getElementById('apply__button');
    display_text.classList.toggle('unfocus__button');
    display_text.innerHTML = "";
    display_text.innerHTML = "Free Shipping";
}

document.getElementById('apply__button').onclick = function() {
    const card = document.querySelector('.card__inner');
    card.classList.toggle('is-flipped');
}

document.getElementById('back__button').onclick = function() {
    const card = document.querySelector('.card__inner');
    card.classList.toggle('is-flipped');
}