
//dont need DOMContentLoaded because load JS script tag is at the bottom of the index.html
  fetchAllToys()

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

function getForm(){
  return document.querySelector(".add-toy-form")
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    getForm().addEventListener('submit', renderNewToy);
  } else {
    toyForm.style.display = 'none'
  }
})

function fetchAllToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => {renderAllToys(toy)})
  })
}

function renderAllToys(toy){
  const toyCard = document.createElement("div")
  toyCard.className = "card";
  getToyContainer().appendChild(toyCard)

  let header = document.createElement("h2")
  header.innerText = toy.name

  let toyImg = document.createElement("img")
  toyImg.className = "toy-avatar" //<<-- this returns a string
  //can also use toyImg.classList.add("toy-avatar") <<-- this returns an array
  toyImg.src = toy.image

  let toyPara = document.createElement("p")
  toyPara.id = `para-${toy.id}`
  toyPara.innerText = `${toy.likes} Likes`

  let likeBtn = document.createElement("button")
  likeBtn.innerText = "Like <3"
  likeBtn.className = "like-btn"
  likeBtn.id = toy.id
  likeBtn.addEventListener("click", function(){
    likeToy(toy)
  })

  // toyCard.appendChild(header)
  // toyCard.appendChild(toyImg)
  // toyCard.appendChild(toyPara)
  // toyCard.appendChild(likeBtn)

  //instead of all of that ^^^^, can just use append instead of appendChild
  //and append multiple children
  toyCard.append(header, toyImg, toyPara, likeBtn)

}

function getToyContainer(){
    return document.querySelector("#toy-collection")
}



function postFetch(nameInput, imageInput){
  const data = {
    name: nameInput,
    image: imageInput,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
            "Content-Type": "application/json"
          },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => renderAllToys(data))

}

function renderNewToy(event){
  event.preventDefault()
  console.log('I was clicked!')

  let nameInput = document.getElementsByName("name")[0].value
  let imageInput = document.getElementsByName("image")[0].value

  postFetch(nameInput, imageInput)
}


function likeToy(toy){
  let toyId = toy.id
  let newLikes = ++toy.likes

  // console.log(toyId, newLikes)
  patchLikeFetch(toyId, newLikes)
}

function patchLikeFetch(id, newLikes){
  const likeData = {
    likes: newLikes
  }

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json"
          },
    body: JSON.stringify(likeData)
  })
  .then(response => response.json())
  .then(resData => {
    let toyP = document.getElementById(`para-${id}`)
    toyP.innerText = `${resData.likes} Likes`})

}
