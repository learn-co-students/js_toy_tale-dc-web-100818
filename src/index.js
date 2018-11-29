const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector('#toy-collection')
let addToy = false

fetchToys()
addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', addNewToy)
    } else {
      toyForm.style.display = 'none'
    }
  })


// ************** FUNCTIONS ****************

function addNewToy(event) {
  event.preventDefault()
  let name = document.querySelector('.input-name').value
  let url = document.querySelector('.input-url').value
  postFetch(name, url)
}

function postFetch(name, url) {
  let data = {
    name: name,
    image: url
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => renderToy(data))
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      data.forEach(toy => {renderToy(toy)})
    })
}

function addLike(event){
  let btn = event.currentTarget
  btn.likes += 1
  btn.previousElementSibling.innerText = `Likes: ${btn.likes}`
}

function renderToy(toy) {
  let divEl = document.createElement('div')
  divEl.classList.add('card')

  let nameH = document.createElement('h2')
  nameH.innerText = toy.name

  let img = document.createElement('img')
  img.classList.add('toy-avatar')
  img.src = toy.image

  let p = document.createElement('p')

  let button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = 'Like <3'
  button.likes = 0
  button.addEventListener('click', addLike)

  divEl.appendChild(nameH)
  divEl.appendChild(nameH)
  divEl.appendChild(img)
  divEl.appendChild(p)
  divEl.appendChild(button)
  toyDiv.appendChild(divEl)
}
