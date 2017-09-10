var formName = document.getElementById('formName');
var date = new Date();
var currentTime = date.toLocaleTimeString();

formName.addEventListener('submit', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('back');
    var value = this.name.value;
    if (value.trim() === "") {
        alert('Please, fill out the form !!!');
    } else {
        var storage = localStorage.setItem('name', value);
        window.open('./skill.html', '_top');
        this.reset();
    }
});

window.onload = function() {
    sessionStorage.setItem('lastSeen', currentTime);
    formName.name.value = localStorage.getItem('name');
    if (localStorage.getItem('name') !== '', sessionStorage.getItem('back') === '') {
        window.open('./skill.html', '_self');
    }
};