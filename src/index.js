document.addEventListener("DOMContentLoaded", function() {
  fetchAPI()

  toyForm.addEventListener("submit", inputFieldSubmission)




})

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")

let addToy = false

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

// GET Fetch of Toys
function fetchAPI() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      data.forEach(object => renderCard(object))
    })
}

// POST Fetch of Toys
function postAPI(data) {
  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => renderCard(data))
}

// PATCH Fetch of Toy Likes
function patchAPI(event) {
  let data = {
    likes: `${++event.target.previousElementSibling.innerText}`
  }
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method:"PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => renderCard(data))
}

// Form Submission
function inputFieldSubmission(event) {
  event.preventDefault()
  let data = {
    name: document.querySelectorAll(".input-text")[0].value,
    image: document.querySelectorAll(".input-text")[1].value,
    likes: 0,
  }
  postAPI(data)
}

// Render of Toy Cards
function renderCard(object) {
  let div = document.createElement("div")
  div.setAttribute("class", "card")
  div.innerHTML = `
    <h2>${object.name}</h2>
    <img src=${object.image} class="toy-avatar"></img>
    <p> ${object.likes} </p>`

  let likeBtn = document.createElement("button")
  likeBtn.id = object.id
  likeBtn.innerText = "Like <3"
  likeBtn.setAttribute("class", "like-btn")
  likeBtn.addEventListener("click", patchAPI)

  div.appendChild(likeBtn)
  toyCollection.appendChild(div)
}
