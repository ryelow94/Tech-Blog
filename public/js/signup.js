async function signUpFormHandler(event){
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim() 
  const password = document.querySelector('#password-signup').value.trim();
  
  const response = await fetch("/api/users", {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {"Content-Type": "application/json"}
  }); 
  if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  } 
  document.querySelector("#sign-up-form").addEventListener("submit", signUpFormHandler)
