const targetID = window.location.pathname
const id = targetID.split('/')[3]


async function editPostHandler(e) {
    e.preventDefault();
    
    const title = document.getElementsByName('post-title')[0].value;
    const post_text = document.getElementsByName('post')[0].value;
    console.log(title, post_text)
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