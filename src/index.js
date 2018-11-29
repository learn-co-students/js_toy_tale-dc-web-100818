const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const URL = 'http://localhost:3000/toys/'

document.addEventListener('DOMContentLoaded', () => {
  getAllToys()

})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    document.querySelector('form').addEventListener('submit', getFormValues)
  } else {
    toyForm.style.display = 'none'
  }
})

function getAllToys() {
  fetch(URL).then(res => res.json()).then(toysData => {
      toysData.forEach(toy => createToyCard(toy))
  })
}

function createToyCard(toy) {
  let divEl = document.createElement('div')
  divEl.id = toy.id
  divEl.classList.add('card')

  let nameEl = document.createElement('h2')
  nameEl.innerText = toy.name

  let imgEl = document.createElement('img')
  imgEl.src = toy.image
  imgEl.classList.add('toy-avatar')

  let likeEl = document.createElement('p')
  likeEl.innerText = `${toy.likes} Likes `

  let likeBtn = document.createElement('button')
  likeBtn.innerText = 'Like <3'
  likeBtn.classList.add('like-btn')
  likeBtn.addEventListener('click', getLikes)

  divEl.appendChild(nameEl)
  divEl.appendChild(imgEl)
  divEl.appendChild(likeEl)
  divEl.appendChild(likeBtn)
  getToyCollection().appendChild(divEl)
}

function getToyCollection() {
  return document.querySelector('#toy-collection')
}

function getFormValues(event) {
  event.preventDefault()
  let data = document.getElementsByClassName('input-text')
  debugger
  postFetch({name: data[0].value, image: data[1].value, likes: 0})
}

function postFetch(data) {
  fetch(URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(toyData => createToyCard(toyData))
}

function getLikes(event) {
  // debugger
  toyId = event.target.parentElement.id
  patchFetch(toyId, { likes: parseInt(event.target.previousSibling.innerText) + 1 } )
}

function patchFetch(id, data) {
  fetch(URL + `${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json()).then(toyData => updateToyCard(toyData))
}

function updateToyCard(data) {
  let toyCard = document.getElementById(data.id)
  toyCard.children[2].innerText = `${data.likes} Likes `
}
// OR HERE!
