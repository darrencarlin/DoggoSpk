document.addEventListener("DOMContentLoaded", function(event) {
  const adminWords = document.getElementById("adminWords");
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

  const userWords = db.collection("userWords");

  let adminWordsArray = [];
  userWords.get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      adminWordsArray.push({
        english: data.word.english,
        translation: data.word.translation
      });
    });

    adminWordsArray.forEach(word => {
      adminWords.innerHTML += `<li>${word.english} : ${word.translation}</li> `;
    });
  });
});
