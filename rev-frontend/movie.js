

const url = new URL(location.href);
console.log('url',url)
const movieId = url.searchParams.get('id')
const movieTitle = url.searchParams.get('title')


const APILINK = "http://localhost:8000/api/v1/reviews/";


const add = document.getElementById('add');
const newRev = document.getElementById('newRev');
const main = document.getElementById("section");
const title = document.getElementById('title');

title.innerText = movieTitle;

function addReview(id){

  
  const reviewInputId = "review"+id
  const userInputId = "user"+id
  const div_review = document.createElement('div');
  div_review.setAttribute('id', 'newRev');
  div_review.innerHTML = `
    <p><strong>Review</strong><input type="text" id="${reviewInputId}"></p>
    <p><strong>User</strong><input type="user" id="${userInputId}"></p>
    <p><a href="#" onclick="postReview('${reviewInputId}', '${userInputId}',' ${id}')">POST</a></p>
  `
  main.insertBefore(div_review, main.firstChild);
}

function postReview(rID, userID, id){
  const review = document.getElementById(rID).value;
  const user = document.getElementById(userID).value;

  const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the content type as JSON
  },
  body: JSON.stringify({"movieId": movieId,"review": review, "user": user}), // Convert the data to JSON string
};
  
  // const rev = {review, user};
  fetch(APILINK + "new", requestOptions )
  .then(res => res.json())
  .then(res =>{
    location.reload();
  })
  console.log('success')
}

function deleteReview(id) {
  const requestOptions = {
  method: 'DELETE'
};
  
  // const rev = {review, user};
  fetch(APILINK + id, requestOptions )
  .then(res => {})
  .then(res =>{
    location.reload();
  })
  console.log('success')
}

function editReview(id) {
  const element = document.getElementById(id);
  console.log(element)
  const reviewInputId = "review"+id
  const userInputId = "user"+id
  element.innerHTML = `
    <p><strong>Review</strong><input type="text" id="${reviewInputId}"></p>
    <p><strong>User</strong><input type="user" id="${userInputId}"></p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}',' ${id}')">SAVE</a></p>
  `
}

returnReviews(APILINK); 


function returnReviews(url) {
  console.log(url+movieId+movieTitle)
  fetch(url+movieId).then(res => res.json())
  .then(function(data){
    console.log(data);
    add.innerHTML = `
        <a href="#" onclick="addReview('${movieId}')">ADD</a>                        
    `
    data.forEach(review => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
                <div class="row">
          <div class="column">
            <div class="card" id="${review.movieId}">
              <p>Review: ${review.review}</p>
              <p>User: ${review.user}</p>
              <a href="#" onclick="editReview('${review.movieId}')">EDIT</a>                        
              <a href="#" onclick="deleteReview('${review.movieId}')">DELETE</a>
              
            </div>
            
          </div>
          
        </div>
      `

      
      main.appendChild(div_card);

    })
  })
}



function saveReview(rID, userID, id) {
  const review = document.getElementById(rID).value;
  const user = document.getElementById(userID).value;

  const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json', // Specify the content type as JSON
  },
  body: JSON.stringify({"review": review, "user": user}), // Convert the data to JSON string
};
  
  // const rev = {review, user};
  fetch(APILINK + id, requestOptions )
  .then(res => res.json())
  .then(res =>{
    location.reload();
  })
  console.log('success')
  
}