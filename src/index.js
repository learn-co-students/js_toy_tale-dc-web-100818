const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
const form = document.querySelector('.add-toy-form')
let addToy = false

//page renders toys on page load //

document.addEventListener("DOMContentLoaded", function () {
  fetch ('http://localhost:3000/toys')
  .then (response => response.json())
  .then (data => {
    data.forEach(toy => renderToyCard(toy))
  })
})

function renderToyCard (toy) {
  let name = toy.name;
  let image = toy.image;
  let likes = toy.likes;

  let card = document.createElement('div');
  card.className ='card';

  let toyName = document.createElement('h2');
  toyName.innerText = name;

  let toyImage = document.createElement('img');
  toyImage.className = 'toy-avatar';
  toyImage.src = image;

  let toyLikesParagraph = document.createElement('p');
  toyLikesParagraph.innerText = likes;

  let toyLikeButton = document.createElement('button');
  toyLikeButton.className = 'like-btn';
  toyLikeButton.innerText = "Like <3";
  toyLikeButton.dataset.id = toy.id;
  toyLikeButton.addEventListener("click", addLike)

  card.append(toyName, toyImage, toyLikesParagraph, toyLikeButton)
  toyCollection.append(card)
}

//add toy form//
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    form.addEventListener('submit', addNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})

function addNewToy(event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let image = document.querySelector("#toyURL").value;
  postFetch(name, image);
  form.reset();
}

function postFetch(name, image) {
  let data = {
    name: name,
    image: image,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then (response => response.json())
  .then (data => {
    renderToyCard(data);
  })
}

// add likes //
//when I click a toys button, thier like count will increase on the site and the server
//I need the toy I'm updating, and the likes
function addLike(event) {
  event.preventDefault();
  let toyDataId = event.target.dataset.id
  let curLikes = parseInt(event.target.parentElement.querySelector('p').innerText);
debugger
  let data = { likes: curLikes + 1}

  event.target.parentElement.querySelector('p').innerText = `${curLikes + 1}`

  fetch(`http://localhost:3000/toys/${toyDataId}`, {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then (response => response.json())
  .then (data => {
    renderToyCard(data);
  })
}
