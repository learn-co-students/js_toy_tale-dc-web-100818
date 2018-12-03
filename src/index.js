const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
// const createToyForm = document.querySelector('.add-toy-form')
// const toyIndex = document.querySelector('#toy-collection')
let addToy = false

document.addEventListener("DOMContentLoaded", function() {
  getToys()
})

//////////Get Toys and Render to DOM//////////////

function renderToys(toy) {
  let toyDiv = document.createElement('div')
  toyDiv.className = 'card';
  toyDiv.classList.add(`toy-${toy.id}`);

  let nameEl = document.createElement('h2')
  nameEl.innerText = `${toy.name}`
  let imgEl = document.createElement('img')
  imgEl.src = `${toy.image}`
  imgEl.className = `toy-avatar`
  let likesEl = document.createElement('p')
  likesEl.id = `likes-${toy.id}`
  likesEl.innerText = `${toy.likes}`

  let likesBtn = document.createElement('button')
  likesBtn.innerText = `Like <3`
  likesBtn.classList.add('like-btn')
  likesBtn.id = `toy-${toy.id}`

  likesBtn.addEventListener('click', function (e) {
    updateLikes(e)
  })

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = `Delete`
  deleteBtn.id = `toy-${toy.id}`

  deleteBtn.addEventListener('click', function (e) {
    deleteToy(e)
  })

  document.querySelector('#toy-collection').appendChild(toyDiv)
  toyDiv.append(nameEl, imgEl, likesEl, likesBtn, deleteBtn)
}

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {data.forEach(toy => renderToys(toy))})
}

/////////////////////////// Create Toy /////////////////////////////

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    //submit listener here
    toyForm.addEventListener('submit', function(e) {
      renderNewToy(e)
    })
} else {
  toyForm.style.display = 'none'
}
})

/////////////////////////////

function renderNewToy(e) {
  e.preventDefault();
  let nameInput = document.querySelector('#new-name').value
  let imgInput = document.querySelector('#new-img').value

  let data = {
    name: nameInput,
    image: imgInput,
    likes: 0
  }

  renderToys(data)

  postToyFetch(data)
}

function postToyFetch (data) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

////////////////////////Update Likes //////////////////

function updateLikes (e) {
  id = e.target.id.split('-')[1]
  currentLikes = document.querySelector(`#likes-${id}`).innerText

  let data = {
    likes: parseInt(currentLikes) + 1
  }

  document.querySelector(`#likes-${id}`).innerText = (parseInt(currentLikes) + 1);

  patchFetch(id, data)
}

function patchFetch (id, data) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}



///////////////////////Delete Toy//////////////////////

function deleteToy (e) {
  id = e.target.id.split('-')[1]
  document.querySelector(`.toy-${id}`).remove()
  deleteFetch(id)
}

function deleteFetch (id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE"
  })
}

// document.addEventListener("DOMContentLoaded", function () {
//   getToyData()
// })
//
// // get TOY data and render to DOM//
//
// function getToyData () {
//   fetch('http://localhost:3000/toys')
//     .then(res => res.json())
//     .then(data => data.forEach(toy => renderToyToDOM(toy)));
// }
//
// function renderToyToDOM (toy) {
//   let toyCard = document.createElement('div');
//   toyCard.className = 'card';
//   toyCard.id = `toy-${toy.id}`;
//
//   let toyName = document.createElement('h2');
//   toyName.id = `name`;
//   toyName.innerText = `${toy.name}`
//
//   let toyImg = document.createElement('img');
//   toyImg.src = `${toy.image}`;
//   toyImg.className = `toy-avatar`
//
//   let toyLikes = document.createElement('p');
//   toyLikes.id = `likes`
//   toyLikes.innerText = `${toy.likes} likes`;
//
//   let likeBtn = document.createElement('button');
//   likeBtn.id = `${toy.id}-like-btn-with-${toy.likes}-likes`;
//   likeBtn.innerText = `Like <3`;
//
//   likeBtn.addEventListener('click', function(event) {
//     updateLikes(event, toy)
//   })
//
//   toyIndex.appendChild(toyCard);
//   toyCard.appendChild(toyName);
//   toyCard.appendChild(toyImg);
//   toyCard.appendChild(toyLikes);
//   toyCard.appendChild(likeBtn);
// }
//
//
// /////////add new toy to API and render to DOM //////////
//
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     //submit listener here
// //     createToyForm.addEventListener('submit', addNewToy)
//   } else {
//     toyForm.style.display = 'none'
//   }
// })
//
// function addNewToy(e) {
//   e.preventDefault();
//   let nameInput = document.querySelector('#new-name').value;
//   let imgInput = document.querySelector('#new-img').value;
//   postFetch(nameInput, imgInput);
// }
//
// function postFetch(nameInput, imgInput) {
//   let data = {
//     name: nameInput,
//     image: imgInput,
//     likes: 0
//   }
//
//   fetch('http://localhost:3000/toys', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => res.json())
//     .then(data => renderToyToDOM(data));
// }
//
// //////////// update Likes ///////////
//
// function updateLikes(event, toy) {
//   console.log("i was clicked", event.currentTarget)
//   toy.likes = ++toy.likes;
//   patchFetch(toy.id, toy.likes)
// }
//
// function patchFetch(id, likes) {
//
//   let data = {
//     likes: likes
//   }
//
//   fetch(`http://localhost:3000/toys/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => res.json())
//     .then(data => {
//       let DOMlikes = document.querySelector(`#toy-${id}`);
//       let actualLikes = DOMlikes.querySelector('#likes');
//       actualLikes.innerText = `${likes} likes`;
//   })
// }
