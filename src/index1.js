var form = document.querySelector('.skill');
var greeting = document.querySelector('.greeting');
var showSkills = document.querySelector('.skill__show');
var select = document.querySelector('.skill__selector');
var lastSeen = document.querySelector('.lastSeen');
var changeMe = document.querySelector('a');
var skillCollection = ['HTML', 'Css', 'JavaScript', 'Kungfu'];

// Load user's name and last seen time and skip the redirection on return action to the previous page.
(function() {
    var userName = localStorage.getItem('name');
    greeting.textContent = 'Hello ' + userName + ' !';
    sessionStorage.setItem('back', 1);
    lastSeen.textContent = 'Last seen: ' + sessionStorage.getItem('lastSeen');
    skillCollection.forEach(function(element) {
        select.innerHTML += `<option>${element}</option>`;
    });
    if (localStorage.storedSkills) {
        display();
    }
})();
// Event added to the form, to save the slected item to the local storage and trigger dipslay function
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedSkills = select.value;
    var skillsObject = {};
    skillsObject[selectedSkills] = selectedSkills;
    if (!localStorage.storedSkills) {
        var skillArray = [];
        skillArray.push(skillsObject);
        localStorage.storedSkills = JSON.stringify(skillArray);
    } else {
        var skillArray = JSON.parse(localStorage.storedSkills);
        skillArray.push(skillsObject);
        var filteredSkills = skillArray.filter(el => (!el.hasOwnProperty(selectedSkills)));
        filteredSkills.push(skillsObject);
        localStorage.storedSkills = JSON.stringify(filteredSkills);
    }
    display();
    this.reset();
});

// To display the slected iteme from local storage inside the DOM
function display() {
    var storedValues = JSON.parse(localStorage.storedSkills);
    var outPut = storedValues.map(el => {
        var SkillName;
        for (let i = 0; i < skillCollection.length; i++) {
            (skillCollection[i] === el[skillCollection[i]]) ?
            SkillName = skillCollection[i]: false;
        }
        return `<div class="skill__show--added"><span class="skill__show--name" >${SkillName}</span><button class="skill__show--removebtn">X</button></div>`;
    }).join('');
    showSkills.innerHTML = outPut;

    var removeBtn = document.querySelectorAll('.skill__show--removebtn');
    var addedSkill = document.querySelectorAll('.skill__show--added');
    removeBtn.forEach((el, i) => {
        el.addEventListener('click', function() {
            showSkills.removeChild(addedSkill[i]);
            var content = el.previousSibling.textContent;
            for (let i = 0; i < storedValues.length; i++) {
                (storedValues[i][content] === content) ?
                storedValues.splice(i, 1): false;
            }
            localStorage.setItem('storedSkills', JSON.stringify(storedValues));
        });
    });
}

changeMe.addEventListener('click', function() {
    window.open('./index.html', '_top');
});