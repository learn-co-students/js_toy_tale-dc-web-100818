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
document.addEventListener("DOMContentLoaded", function () {
  fetchAllToys()
  getForm().addEventListener('submit', addNewToy)
})

function fetchAllToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data =>
      {data.forEach(toy => renderToys(toy))}
    )}

function postFetch(name, image) {
  let data = {
    name: name,
    image: image,
    likes: 0
    }
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {renderToys(data)})
  }

function updateLikes(event) {
  let toyId = event.target.dataset.id
  let currentToyLikes = parseInt(event.currentTarget.dataset.likes)
  let data = {
    likes: currentToyLikes + 1,
    }

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        event.target.parentElement.querySelector('h4').innerText = `${currentToyLikes + 1} Likes`
        event.target.dataset.likes = currentToyLikes + 1
      })
    }

function addNewToy(event) {
  event.preventDefault()
  let name = document.querySelector('.name-input').value
  let image = document.querySelector('.image-input').value
  postFetch(name, image)
}

function renderToys(toy){
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImage = document.createElement('img')
  toyImage.className = ('toy-avatar')
  toyImage.src = toy.image

  let toyLikes = document.createElement('h4')
  toyLikes.innerText = `${toy.likes} likes`

  let likeButton = document.createElement('button')
  likeButton.innerText = 'I like this toy!'
  likeButton.className = ('like-button')
  likeButton.dataset.id = toy.id
  likeButton.dataset.likes = toy.likes
  likeButton.addEventListener('click', updateLikes)

  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeButton)
  toyCollection().appendChild(toyCard)
}

function toyCollection() {
  return document.querySelector('#toy-collection')
}

function getForm(){
  return document.querySelector('form')
}
