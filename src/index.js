const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const newToyForm = document.querySelector(".add-toy-form");
let addToy = false;

document.addEventListener("DOMContentLoaded", fetchToys);
//gettoys a cb
// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});


function fetchToys() {
  fetch('http://localhost:3000/toys')
    //this fetchs from the url
    .then(response => response.json())
    //this is a promise, will get promise response and array
    .then(data => {
      //this is the array of objects
      data.forEach(toy => {
        renderToy(toy);
        //this iterates so that you can get each object but it
        //goes and gives it to the function renderToy(toy)
      });
    });
}

function renderToy(toy) {
  let collection = document.getElementById('toy-collection')
  // this creates a variable for the empty div aka the placeholder
  let div = document.createElement('div')
  // this creates a variable for a created div
  collection.appendChild(div)

  div.classList.add('card')
  //classList is a method to add a class and a name

  let h2 = document.createElement('h2')
  // this creates a variable for a created h2
  h2.innerText = toy.name
  // this will show the toys name because its using the innerText
  div.appendChild(h2)

  let img = document.createElement('img')
  // this creates a variable for a created img
  img.src = toy.image
  img.className = 'toy-avatar'
  // this will show the toys img because its using the imgsrc
  div.appendChild(img)

}
  newToyForm.addEventListener('submit', createToy)
  //created addEventListener to make submit button work

  function createToy(event) {
    event.preventDefault()
    //getting info from the down
    let name = newToyForm.elements.namedItem('name').value
    let image = newToyForm.elements.namedItem('image').value

    //make it so that it they need to fill in both
    if (name === '' || image === '') {
      alert('Cannot Be Blank')
    } else {
      post(name, image)
      //this will take me to my next array
    }
}

  function post(name, image){
    let data = {
      name: name,
      image: image
    }
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {renderToy(data)
  })
}
