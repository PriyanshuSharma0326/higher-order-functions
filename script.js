const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showOnlyMillionaires = document.getElementById('only-millionaires');
const sortWealth = document.getElementById('sort');
const calculateTotalWealth = document.getElementById('total-wealth');

const peopleContainer = document.getElementById('people-container');

const totalWorthBlock = document.getElementById('total-worth');
const totalAmount = document.getElementById('total-amount');

const url = `https://randomuser.me/api/`;
let userName = null;
let userWealth = null;
let peopleArray = [];

const init = () => {
    if(JSON.parse(localStorage.getItem('peopleArray'))) {
        peopleArray = JSON.parse(localStorage.getItem('peopleArray'));
    }
    else {
        peopleArray = [];
    }
    setPeopleList();
}

const createPerson = () => {
    const newPerson = document.createElement('div');
    newPerson.classList = 'person';

    const personName = document.createElement('text');
    personName.classList = 'person-name';

    const personWealth = document.createElement('text');
    personWealth.classList = 'person-wealth';

    return {newPerson, personName, personWealth};
}

const setPeopleList = () => {
    peopleContainer.innerHTML = '';

    peopleArray.map(person => {
        const {newPerson, personName, personWealth} = createPerson();
        if(person.gender === 'male') {
            personName.classList.add('male');
        }
        else if(person.gender === 'female') {
            personName.classList.add('female');
        }
        personName.innerText = person.name;
        personWealth.innerText = `$${person.wealth.toLocaleString()}`;

        newPerson.appendChild(personName);
        newPerson.appendChild(personWealth);
        peopleContainer.appendChild(newPerson);
    });
}

addUser.addEventListener('click', async () => {
    const newUser = await fetch(url).then(response => {
        return response.json();
    })
    .then(data => {
        return data.results;
    });

    userName = `${newUser[0].name.first} ${newUser[0].name.last}`;
    userWealth = Math.floor(Math.random()*1000000) + 1;
    userGender = newUser[0].gender;

    peopleArray.push({
        name: userName,
        wealth: userWealth,
        gender: userGender
    });

    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));

    setPeopleList();
});

doubleMoney.addEventListener('click', () => {
    peopleArray.forEach(person => {
        person.wealth *=2;
    });

    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));

    setPeopleList();
});

showOnlyMillionaires.addEventListener('click', () => {
    peopleArray = peopleArray.filter(person => person.wealth > 1000000);

    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));

    setPeopleList();
});

sortWealth.addEventListener('click', () => {
    peopleArray.sort((low, high) => high.wealth - low.wealth);

    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));

    setPeopleList();
});

calculateTotalWealth.addEventListener('click', () => {
    totalWorthBlock.classList.remove('hidden');
    let total = peopleArray.reduce((prev, curr) => prev + curr.wealth, 0);
    totalAmount.innerText = `$${total.toLocaleString()}`;
});

init();
