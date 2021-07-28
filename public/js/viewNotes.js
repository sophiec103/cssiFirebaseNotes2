let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function getNotes(userId){
    console.log("getting notes for " + userId);
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) => {
        const data = db.val();
        renderData(data);
    });
}

function renderData(data){
    let html = "";
    for (const dataKey in data){
        const note = data[dataKey];
        const cardHtml = renderCard(note);
        setRandomColor();
        html += cardHtml;
    }
    document.querySelector("#app").innerHTML = html;
}

let counter = 0;
function renderCard(note){
    counter++;
    const name = googleUser.displayName.split(" ")[0] + " " + googleUser.displayName.split(" ")[1].substring(0,1) + ".";
    return `
    <div class="column is-one-quarter">
      <div class = "card flip-card">
        <div class="flip-card-inner" id = "id${counter}">
          <div class = "flip-card-front">   
             <span class="card-header-title">${note.title} ~ ${name}</span>
             <div class="card-content">
               <div class="content">${note.text}</div>
             </div>
          </div>
          <div class="flip-card-back">
            <span class="card-header-title">${note.title} ~ ${name}</span>
            <div class="card-content">
              <div class="content">Note created: <br> ${note.created}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
  return "hsl(" + Math.random() * 361 + ", 100%, 90%)"
}

function setRandomColor() {
//   (`#id${counter}`).css("background-color", getRandomColor());
  var style = document.createElement('style');
  style.innerHTML = `
  #id${counter} {
    background: ${getRandomColor()}
  }
  `;
  document.head.appendChild(style);
}