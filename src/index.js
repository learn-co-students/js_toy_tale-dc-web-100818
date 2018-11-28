document.addEventListener('DOMContentLoaded', () => {
  getToyAPI();
});

// DOM elements
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyDiv = document.getElementById('toy-collection');
const newToyForm = document.querySelector('.add-toy-form');
const nameInput = document.getElementById('name');
const imageInput = document.getElementById('image');

let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    newToyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let name = nameInput.value
      let image = imageInput.value
      
      postToyAPI(name, image)
    });
  } else {
    toyForm.style.display = 'none'
  }
})

function getToyAPI() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(toyObj => {
        let newMonster = new MakeToyCard(toyObj.name, toyObj.image, toyObj.likes, toyObj.id)
        newMonster.createCard();
      });
    });
}

function postToyAPI(name, image) {
  let data = {
    name: name,
    image: image,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
}

function addLike(id, likes) {
  console.log(likes)
  let data = {
    likes: likes
  }
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}
class MakeToyCard {
  constructor(name, image, likes, id) {
    this.name = name;
    this.image = image;
    this.likes = likes;
    this.id = id;
  }

  createCard() {
    // create div
    let div = document.createElement('div');
    div.classList.add('card')
    div.dataset.id = this.id 
    // create h2
    let h2 = document.createElement('h2');
    h2.innerText = this.name
    // create image
    let image = document.createElement('img');
    image.classList.add('toy-avatar');
    image.src = this.image
    // create p
    let p = document.createElement('p');
    p.innerText = `${this.likes} Likes`;
    // create button
    let button = document.createElement('button');
    button.classList.add('like-btn');
    button.innerText = 'Like <3';
    button.type = "button"
    // add event listener
    button.addEventListener('click', (e) => {
      // debugger;
      e.preventDefault();
      this.likes++
      addLike(this.id, this.likes)
    });

    div.appendChild(h2);
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(button);

    toyDiv.appendChild(div);
  
  }
}




