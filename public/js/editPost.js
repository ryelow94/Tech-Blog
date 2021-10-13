const targetID = window.location.pathname
const id = targetID.split('/')[3]


async function editPostHandler(e) {
    e.preventDefault();
    
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post"]').value;
    
    const response = await fetch(`/api/posts/`+id, {
        method: 'PUT',
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
    
    document.querySelector('.edit-post-btn').addEventListener('click',editPostHandler);