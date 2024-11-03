// Selectors for elements to update
const avatar_user = document.querySelectorAll(".avatar");
const name_user = document.querySelectorAll(".name-comment"); // Assuming this is for names
const time_posted = document.querySelectorAll(".time-posted"); // Example, assuming this class exists for time
const score_user = document.querySelectorAll(".score");
const content_comment = document.querySelectorAll(".text-comment");

// Fetch the JSON data from the correct path and handle it
try {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {

      initializeComment(data.comments);
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });
} catch (error) {
  console.error('Error fetching JSON:', error);
}

// Function to initialize comments based on JSON data
function initializeComment(comments) {
  comments.forEach((comment, index) => {
    // Update avatar image
    if (avatar_user[index]) {
      avatar_user[index].src = comment.user.image.png;  
    }
    if (score_user[index]) {
      score_user[index].textContent = comment.score;  
    }
    if (content_comment[index]) {
      content_comment[index].textContent = comment.content;  
    }
    if (name_user[index]) {
      name_user[index].textContent = comment.user.username;  
    }
    if (time_posted[index]) {
      time_posted[index].textContent = comment.createdAt;  
    }
  });
}
