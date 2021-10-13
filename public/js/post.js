async function newPostHandler(e) {
e.preventDefault();

const title = document.querySelector('input[name="post-title"]').value;
const post_text = document.querySelector('textarea[name="post"]').value;

const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(response.ok) {
      document.location.replace('/dashboard');
  } else {
      console.log(response.statusText);
  }
}

document.querySelector('.create-post-btn').addEventListener('click', newPostHandler);