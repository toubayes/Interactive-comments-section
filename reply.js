// Selectors for elements to update
const avatar = document.querySelectorAll(".reply .avatar");
const user = document.querySelectorAll(".reply .name-comment");
const posted = document.querySelectorAll(".reply .time-posted");
const score = document.querySelectorAll(".reply .score");
const content = document.querySelectorAll(".reply .text-comment");
const user_reply = document.querySelectorAll(".reply .reply-user");

// Fetch the JSON data from the correct path and handle it
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Check the structure of the data

    // Loop through each comment and initialize replies
    data.comments.forEach(comment => {
      if (Array.isArray(comment.replies) && comment.replies.length > 0) {
        initializeReplies(comment.replies);
      }
    });
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

// Function to initialize replies based on JSON data
function initializeReplies(replies) {
  replies.forEach((reply, index) => {
    // Update avatar image
    if (avatar[index]) {
      avatar[index].src = reply.user.image.png;  
    }

    // Update score
    if (score[index]) {
      score[index].textContent = reply.score;  
    }

    // Update content of the reply
    if (content[index]) {
      content[index].textContent = reply.content;  
    }

    // Update username
    if (user[index]) {
      user[index].textContent = reply.user.username;  
    }

    // Update time posted
    if (posted[index]) {
      posted[index].textContent = reply.createdAt;  
    }

    // Update replyingTo
    if (user_reply[index]) {
      user_reply[index].textContent = ` @${reply.replyingTo}`;
    }
  });
}

