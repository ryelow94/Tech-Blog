const deleteID = window.location.pathname
const idTwo = deleteID.split('/')[3]


async function deletePostHandler(e) {
    e.preventDefault();
    const response = await fetch(`/api/posts/`+idTwo, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: idTwo
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
    
    document.querySelector('.delete-btn').addEventListener('click',deletePostHandler);