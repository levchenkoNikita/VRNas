const button = document.querySelector('.button');
const div = document.querySelector('.div');
const text = document.querySelector('.text');

button.addEventListener('click', () => {
    div.classList.toggle('is-active');
});