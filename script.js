const modal = document.querySelector('.modal');
const modalDisplay = document.querySelector('.modalDisplay__content');
const closeIcon = document.querySelector('.modalDisplay__closeIcon');

closeIcon.addEventListener('click', function() {
    modal.classList.remove('active');
    modalDisplay.innerHTML = '';
})

const sendRequest = (method, url) => {
    
    const promise = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
    
        xhr.responseType = "json";
        
        xhr.onload = function() {
            resolve(xhr.response);
        }
    
        xhr.send();
    })

    return promise;
}



function createDrink(id, url, name, volume) {

    let newDrink = document.createElement('div');
    newDrink.className = 'beer-item';
    newDrink.id = id;

    let drinkTitle = document.createElement('div');
    drinkTitle.classList = 'beer-title';
    drinkTitle.innerHTML = name;

    let drinkImg = document.createElement('div');
    drinkImg.className = 'drink-img';

    let img = document.createElement('img');
    img.src = '';
    img.src = url;

    let drinkVolume = document.createElement('div');
    drinkVolume.className = 'beer-volume';
    drinkVolume.innerHTML = volume.value + ' ' + volume.unit;


    newDrink.appendChild(drinkTitle);
    newDrink.appendChild(drinkImg);
    drinkImg.appendChild(img);
    newDrink.appendChild(drinkVolume);

    document.querySelector('.beers').appendChild(newDrink);

}



let cards = [];

function getCards() {
    const items = Array.from(document.querySelectorAll('.beer-item'));
    cards = cards.concat(items);
}

function addListener() {
    cards.forEach(item => item.addEventListener('click', function() {
        modal.classList.add('active');
        modalDisplay.innerHTML += item.innerHTML;
    }))
}



sendRequest('GET', 'https://api.punkapi.com/v2/beers?page=2&per_page=80').then((data) => {
    data.forEach(item => createDrink(item.id, item.image_url, item.name, item.volume));
    getCards();
    addListener()
})


