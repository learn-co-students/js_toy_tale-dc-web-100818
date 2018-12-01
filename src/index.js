const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

// OR HERE!
document.addEventListener("DOMContentLoaded", function() {
  fetchToys()
  getToyForm().addEventListener('submit', addNewToy)
})

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => data.forEach(renderToy))
}

function renderToy(toy) {
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.dataset.id = toy.id

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar'
  toyImage.src = toy.image

  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  let likeBtn = document.createElement('button')
  likeBtn.innerText = "Like <3"
  likeBtn.dataset.id = toy.id
  likeBtn.dataset.likes = toy.likes
  likeBtn.addEventListener('click', updateLikes)

  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeBtn)
  getToyDiv().appendChild(toyCard)
}

function addNewToy(event) {
  event.preventDefault();
  let toyName = document.getElementById('toy-name').value
  let toyImage = document.getElementById('toy-image').value
  let data = {name: toyName, image: toyImage, likes: 0}
  // debugger
  renderToy(data)

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

function updateLikes(event) {
  let currentLikes = parseInt(event.target.dataset.likes)
  let toyId = event.target.dataset.id
  let data = {likes: currentLikes + 1}

  event.target.parentElement.querySelector('p').innerText = `${currentLikes + 1} Likes`
  event.target.dataset.likes = currentLikes + 1

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

function getToyDiv() {
  return document.querySelector('#toy-collection')
}

function getToyForm() {
  return document.querySelector('.add-toy-form')
}
