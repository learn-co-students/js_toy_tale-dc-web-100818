const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
toyForm.addEventListener('submit', createNewToy)
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const nameInput = document.querySelectorAll('.input-text')[0];
const urlInput = document.querySelectorAll('.input-text')[1];
const allToys = [];

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  fetchToys();
});

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      data.forEach(toy => {
        displayToy(toy);
        allToys.push(toy);
      })
    })
}

function displayToy(toy){
  toyDiv = document.createElement('div');
  toyDiv.classList.add("card");
  toyCollection.appendChild(toyDiv);
  toyHeader = document.createElement('h2');
  toyHeader.innerText = toy.name;
  toyDiv.appendChild(toyHeader);
  toyImg = document.createElement('img');
  toyImg.classList.add("toy-avatar")
  toyImg.src = toy.image;
  toyDiv.appendChild(toyImg);
  toyLikes = document.createElement('p');
  toyLikes.id = `likes-for-${toy.id}`
  toyLikes.innerText = `${toy.likes} likes`;
  toyDiv.appendChild(toyLikes);
  toyButton = document.createElement('button');
  toyButton.id = toy.id
  toyButton.classList.add("like-btn");
  toyButton.innerText = 'Like <3'
  toyDiv.appendChild(toyButton);
  toyButton.addEventListener('click', addLikes)
}

function addLikes(event){
  toyID = Number(event.currentTarget.id);
  myToy = allToys.find(toy => toy.id === toyID)
  data = {
    "likes": ++myToy.likes
  }
  fetch(`http://localhost:3000/toys/${toyID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      pTag = document.querySelector(`#likes-for-${toyID}`)
      pTag.innerText = `${data["likes"]} likes`
    })

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function createNewToy(event){
  event.preventDefault()
  name = nameInput.value;
  url = urlInput.value;
  postToys(name, url, likes = 0);
}

function postToys(name, url, likes){
  data = {
    name: name,
    image: url,
    likes: likes
  };
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      displayToy(data);
      allToys.push(toy);
    })
}


// OR HERE!
