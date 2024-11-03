const deletecomment=document.querySelector(".delete");
const edditcomment=document.querySelector(".edit");
const sendcomment=document.querySelectorAll(".sendcomment");
const replycomment=document.querySelectorAll(".replycomment");
const mycomment=document.querySelector(".mine");
const editcontent=document.querySelector(".content-comment");
const plusbtn=document.querySelectorAll(".plus");
const moinsbtn=document.querySelectorAll(".moins");
const scor=document.querySelectorAll(".score");
const  modal=document.querySelector('.popup');
const deletebutton=document.querySelector(".action-delete");
const cancelbutton=document.querySelector(".action-non");
const counter=document.querySelector(".actlikes");
const replycommentcontainer=document.querySelectorAll(".reply-comment-container");
const text=document.querySelector(".text");
const commentsContainer = document.querySelector(".comments-container");
const commentedited=document.querySelector(".mycomment");


function plus() {
  plusbtn.forEach((plusBtn, index) => {
    plusBtn.addEventListener("click", () => {
      const scoreElement = scor[index];  
      let scoreValue = parseInt(scoreElement.textContent);  
      scoreValue++; 
      scoreElement.textContent = scoreValue;
    });
  });
}

function moins() {
  moinsbtn.forEach((moinsBtn, index) => {
    moinsBtn.addEventListener("click", () => {
      const scoreElement = scor[index];  
      let scoreValue = parseInt(scoreElement.textContent);  
      if (scoreValue > 0) { 
        scoreValue--; 
        scoreElement.textContent = scoreValue;  
      }
    });
  });
}
plus();
moins();

// start popup button
deletecomment.addEventListener("click",()=>{
modal.style.display="block"
});

deletebutton.addEventListener("click",()=>{
 mycomment.remove();
   modal.style.display="none"
});

cancelbutton.addEventListener("click",()=>{
  modal.style.display="none"
});
// end popup button 




// editc button 
edditcomment.addEventListener("click",()=>{
  editcontent.innerHTML = `
  <div class="eddited">
  <textarea class="editcontent">${commentedited.textContent}</textarea>
  <div class="updated-btn">
  <button class="update">update</button>
  </div>
  </div>`;
  

    counter.style.display="none";
  
});

// send button 
sendcomment.forEach(sendcomment => {
sendcomment.addEventListener("click", () => {
  // Fetch the JSON data from the correct path and handle it
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      console.log(data.currentUser); // Check the structure of the data

      // Initialize replies using currentUser's information
      initializeReplies(data.currentUser);
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });

  function initializeReplies(user) {
    // Create the new comment HTML structure
    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `
      <div class="reactions">
        <div class="likes">
          <div class="counter">
            <p class="plus" onclick="plus()">+</p>
            <p class="score">0</p> 
            <p class="moins" onclick="moins()">-</p>
          </div>
        </div>
        <div class="comment-content">
          <div class="head-comment">
            <div class="time-comment">
              <img src="${user.image.png}" class="avatar" alt="avatar user">
              <h3 class="name-comment">${user.username}</h3>
              <span class="time-posted">Just now</span>
            </div>
            <div class="actions"> 
              <button class="delete"><img src="images/icon-delete.svg" alt="delete">Delete</button>
              <button class="edit"><img src="images/icon-edit.svg" alt="edit">Edit</button>
            </div>
          </div>
          <div class="body_comment">
            <p class="text-comment">${text.value}</p> 
          </div>
        </div>
      </div>
    `;

    // Append the new comment to the container
    commentsContainer.appendChild(newComment);
    const scoreElement = newComment.querySelector(".score");
    const plusBtn = newComment.querySelector(".plus");
    const moinsBtn = newComment.querySelector(".moins");
  
    let scoreValue = parseInt(scoreElement.textContent);
  
    // Event listener for incrementing score
    plusBtn.addEventListener("click", () => {
      scoreValue++;
      scoreElement.textContent = scoreValue;
    });
  
    // Event listener for decrementing score
    moinsBtn.addEventListener("click", () => {
      if (scoreValue > 0) {
        scoreValue--;
        scoreElement.textContent = scoreValue;
      }
    });
  
  
  }
});

});

// replu button 
replycomment.forEach((reply, index) => {
  reply.addEventListener("click", () => {
    // Create the new comment HTML structure
    const newreplyComment = document.createElement("div");
    newreplyComment.classList.add("comment");
    newreplyComment.innerHTML = `
      <div class="send">
        <div class="element-comment">
          <img src="images/avatars/image-juliusomo.png" alt="myAvatar">
          <textarea class="text" name="" id="" placeholder="Add a comment ..."></textarea>
          <button class="sendcommentt">SEND</button>
        </div>
      </div>
    `;

    // Append the new comment to the specific reply comment container
    replycommentcontainer[index].appendChild(newreplyComment);
  });
});




