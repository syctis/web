import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

document.addEventListener('DOMContentLoaded', () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCOkD74tX5w-kcgrmUjc65TIpj_BwUZeyY",
        authDomain: "aimer-3cffe.firebaseapp.com",
        projectId: "aimer-3cffe",
        storageBucket: "aimer-3cffe.appspot.com",
        messagingSenderId: "128270248676",
        appId: "1:128270248676:web:c156f2ffc2c932d1201af1",
        measurementId: "G-ZLLBD3ZY67"
      };

 
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const database = getDatabase(app);

   const leaderboardBody = document.getElementById('leaderboardBody');
   const nameInput = document.getElementById('nameInput');
   const popupTime = document.getElementById('popupTime');
   const submitScoreButton = document.getElementById('submitScoreButton');

   submitScoreButton.addEventListener('click', () => {
       const userName = nameInput.value;
       const userScore = parseFloat(popupTime.textContent);

       if (userName && userScore) {
           const leaderboardRef = ref(database, 'leaderboard');

           push(leaderboardRef, {
               name: userName,
               score: userScore
           })
           .then(() => {
               console.log('Score submitted successfully');
               displayLeaderboard(); // Refresh the leaderboard
               nameInput.value = ''; // Clear the input field
           })
           .catch((error) => {
               console.error('Error submitting score: ', error);
           });
       }
   });

   function displayLeaderboard() {
       const leaderboardRef = ref(database, 'leaderboard');

       // Rest of your display leaderboard code...
   }

   displayLeaderboard();
});

    // Event listener for the submit score button
    submitScoreButton.addEventListener('click', () => {
        console.log('Submit button clicked');
        const userName = nameInput.value;
        const userScore = parseFloat(popupTime.textContent);
        console.log('User name:', userName);
        console.log('User score:', userScore);

        if (userName && userScore) {
            const leaderboardRef = database.ref('leaderboard');

            leaderboardRef.add({
                name: userName,
                score: userScore
            })
            .then(() => {
                console.log('Score submitted successfully');
                displayLeaderboard(); // Refresh the leaderboard
                nameInput.value = ''; // Clear the input field
            })
            .catch((error) => {
                console.error('Error submitting score: ', error);
            });
        }
    });