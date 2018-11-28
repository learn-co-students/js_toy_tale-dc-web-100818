const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    newForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})

// YOUR CODE HERE
const newForm = document.querySelector('.add-toy-form')

document.addEventListener('DOMContentLoaded', function(){
  fetchToys()
})

const toyCollection = document.querySelector('#toy-collection')

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(makeToyCard)
    })
}

function makeToyCard(toy){
  let toyElement = document.createElement('div')
  toyElement.classList.add('card')

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.classList.add('toy-avatar')

  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes

  let toyBtn = document.createElement('button')
  toyBtn.innerText = "Like"
  toyBtn.classList.add('like-btn')
  toyBtn.id = toy.id
  toyBtn.addEventListener('click', function(){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1})
      })
        .then(resp => resp.json())
        .then(json => {
          toyLikes.innerText = json.likes
        })
  })

  toyElement.appendChild(toyName)
  toyElement.appendChild(toyImage)
  toyElement.appendChild(toyLikes)
  toyElement.appendChild(toyBtn)

  toyCollection.appendChild(toyElement)
}

function createToy(event){
  event.preventDefault()
  let name = document.querySelector('#input-name').value
  let image = document.querySelector('#input-image').value

  postToy(name, image)
}

function postToy(name, image){
  let data = {
    name: name,
    image: image,
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(json => makeToyCard(json))
}
