async function signUpFormHandler(event){
  const userName = document.querySelector("#username-signup").value.trim() 
  const password = document.querySelector('#password-signup').value.trim();
  
  const response = await fetch("/api/users", {
      method: 'POST',
      body: JSON.stringify({userName, password}),
      headers: {"Content-Type": "application/json"}
  }); 
  if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  } 
  document.querySelector("#signup-form").addEventListener("submit", signUpFormHandler)
