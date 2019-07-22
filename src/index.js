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
  let data = {
    name: name,
    image: url,
    likes: 0
  }
  // renderToy(data) => optimistic, then fetch
  postFetch(name, url) // => pessimistic, then render
}

function postFetch(data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", // => the type of information it's sending
      Accept: "application/json" // => the type of information it's going to send back
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

function patchFetch(e, id, likes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likes + 1}),
  })
    .then(res => res.json())
    .then(data => {
      e.target.parentElement.querySelector('p').innerText = `${data.likes} Likes`
      e.target.likes = data.likes
    })
}

function addLike(e) {
  patchFetch(e, e.target.id, parseInt(e.currentTarget.likes))
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
  p.innerText = `${toy.likes} Likes`

  let button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = 'Like <3'
  button.id = toy.id
  button.likes = toy.likes
  button.addEventListener('click', addLike)

  // divEl.append(nameH, img, p, button)
  divEl.appendChild(nameH)
  divEl.appendChild(img)
  divEl.appendChild(p)
  divEl.appendChild(button)
  toyDiv.appendChild(divEl)
}
