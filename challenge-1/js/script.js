const cardContainer = document.querySelector(".card-container");
const card = document.querySelector(".card");

getUsers();
function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) =>
      json.forEach((element) => {
        let item = `
       <div class="card expand-${element.id}">
       <div>
         <h3>${element.name}</h3>
         <p class="paragraph-primary">${element.email}</p>
       </div>
       <div class='card-left'>
         <a href="#" c onClick='getUserPost(${element.id})' class="btn-default btn-${element.id}">Get User Posts</a>
       <div class='card-${element.id}'>
       </div>
       </div>
     </div>
       `;
        cardContainer.insertAdjacentHTML("beforeend", item);
      })
    );
}

function getUserPost(id) {
  const card = document.querySelector(`.card-${id}`);
  const expand = document.querySelector(`.expand-${id}`);
  const btn = document.querySelector(`.btn-${id}`);
  expand.style.flexDirection = "column";
  btn.textContent = "Close posts";
  btn.setAttribute("onClick", `removeUserPosts(${id})`);
  console.log(card);
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((json) =>
      json.forEach((element) => {
        let item = `
        <br/>
         <div class="card">
         <div>
           <h3>${element.title}</h3>
           <p class="paragraph-primary">${element.body}</p>
         </div>

       </div>
         `;
        card.insertAdjacentHTML("beforeend", item);
      })
    );
}

// hiding user's posts

function removeUserPosts(id) {
  const card = document.querySelector(`.card-${id}`);
  const expand = document.querySelector(`.expand-${id}`);
  const btn = document.querySelector(`.btn-${id}`);
  expand.style.flexDirection = "row";
  btn.textContent = "Get User Posts";
  btn.setAttribute("onClick", `getUserPost(${id})`);
  card.textContent = "";
}
