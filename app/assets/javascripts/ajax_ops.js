function handle_ajax(event) {
  console.log('DOM fully loaded and parsed');
  const resultsDiv = document.getElementById('results-div');
  const restOpsDiv = document.getElementById('rest-ops');
  const listUsersButton = document.getElementById('list-users');
  const createUserButton = document.getElementById('create-user');
  const userName = document.getElementById('user-username');
  const userPassword = document.getElementById('user-password');
  const updateUserButton = document.getElementById('update-user');
  const userID = document.getElementById('user-id');
  const userName1 = document.getElementById('user-username1');
  const userPassword1 = document.getElementById('user-password1');
  const users_path = 'http://localhost:3001/api/v1/users';
  const deleteUserButton = document.getElementById('delete-user');
  const delUserID = document.getElementById('del-user-id');
  const factsUserID = document.getElementById('facts-user');
  const listUserFactsButton = document.getElementById('list-user-facts');
  const createFactUserID = document.getElementById('create-fact-user');
  const createFactButton = document.getElementById('create-fact');
  const fact = document.getElementById('fact');
  const likes = document.getElementById('likes');

  restOpsDiv.addEventListener('click', (event) => {
    if (event.target === listUsersButton) {
      fetch(users_path).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createUserButton) {
      var dataObject = {
        username: userName.value,
        password: userPassword.value
      }
      fetch(users_path,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateUserButton) {
      var dataObject = {
        username: userName1.value,
        password: userPassword1.value
      }
      if (dataObject.username === "") {  // blank usernames not supported
        delete dataObject.username;
      }
      if (dataObject.password === "") { // blank passwords not supported
        delete dataObject.password;
      }
      fetch(`${users_path}/${userID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    }
    // Delete a user
    else if (event.target === deleteUserButton) {
        fetch(`${users_path}/${delUserID.value}`,
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        }).then((response) => {
          if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
        });
    }
    // List user's facts
    else if (event.target === listUserFactsButton) {
      fetch(`${users_path}/${factsUserID.value}/facts`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }).then((response) => {
        if (response.status === 200) {
        response.json().then((data) => {
          resultsDiv.innerHTML = '';
          let parag = document.createElement('P');
          parag.textContent = JSON.stringify(data);
          resultsDiv.appendChild(parag);
        });
      } else {
        response.json().then((data) => {
          alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      }
      });
    }
    // Create a fact
    else if (event.target === createFactButton) {
      var dataObject = {
        fact_text: fact.value,
        likes: likes.value
      }
      if (dataObject.fact === "") {  // blank fact is not supported
        delete dataObject.fact;
      }
      if (dataObject.likes === "") { // blank likes is not supported
        delete dataObject.likes;
      }
      fetch(`${users_path}/${createFactUserID.value}/facts`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObject)
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    }
  });
}
