document.addEventListener('DOMContentLoaded', function () {
  getFetch()
})



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


function getFetch(el) {
  fetch('http://localhost:3000/toys')
  .then( res => res.json())
  .then( data => data.forEach(render))
}

function render(el) {
  let collection = document.getElementById('toy-collection')

  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')

  button.addEventListener('click', function (event) {
    patchFetch(event)

  })


  img.className = "toy-avatar"
  button.className = "like-btn"
  div.className = "card"

  h2.innerText = el.name
  img.src = el.image
  p.innerText = el.likes
  p.dataset.toyid = el.id
  button.innerText = "LIke"


  collection.appendChild(div)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)

}

function postFetch(name, image, likes = 0) {
  let data = {
    name: name,
    image: image,
    likes: likes
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:  JSON.stringify(data)
  }).then(res => res.json()).then(data => render(data))
}


function formFinder() {
  return form = document.querySelector('form')
}



  formFinder().addEventListener('submit',function (event) {
    event.preventDefault()
    let name = document.getElementsByClassName('input-text')[0].value
    let image = document.getElementsByClassName('input-text')[1].value
    postFetch(name, image)
    formFinder().reset()
  } )


function patchFetch(event) {
  let currentLike  = parseInt(event.target.parentNode.querySelector('p').innerText)
  let currentId = parseInt(event.target.parentNode.querySelector('p').dataset.toyid)

  let data = {
    likes: currentLike + 1
  }

event.target.parentNode.querySelector('p').innerText = currentLike + 1

  // debugger;
  fetch(`http://localhost:3000/toys/${currentId}`, {

    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:  JSON.stringify(data)
  })

}
