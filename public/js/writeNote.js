let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');

  const d = new Date();
  const year = d.getFullYear();	//Get the year as a four digit number (yyyy)
  const month = d.getMonth() + 1;	//Get the month as a number (0-11)
  const day = d.getDate();	//Get the day as a number (1-31)
  const hour = d.getHours();	//Get the hour (0-23)
  const mins = d.getMinutes(); //Get the minute (0-59)
  const created = day + "/" + month + "/" + year + " " + hour + ":" + mins;

  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    created: created,
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
  });
}