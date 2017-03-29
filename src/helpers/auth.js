import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function getPosts(){
  var getPostsFromDB = ref.child("posts/")
  getPostsFromDB.on("child_added", function(data, prevChildKey) {   
   var newPlayer = data.val();    
    console.log("Title: " + newPlayer.title);
   console.log("category: " + newPlayer.category);  
   console.log("Content: " + newPlayer.content); 

   //document.getElementById("showPosts").innerHTML =  "<h1> " + newPlayer.title + "</h1>";     

    var table = document.getElementById("postid");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
    cell1.innerHTML = newPlayer.title;
    cell2.innerHTML = newPlayer.category;
    cell3.innerHTML = newPlayer.content /*"<button onclick="+ this.openPost() +">Click me</button>"*/;
   });

// export function getCategory(){
//   var playersRef = firebase.database().ref("posts/");
// playersRef.orderByChild("category").on("child_added", function(data) {
//    console.log(data.val().category);
// })
// }
 
var dataNew = [];
getPostsFromDB.orderByChild("category").on("child_added", function(data) {
   console.log(data.val().category);
   dataNew += data.val().category
});
console.log("dataNew "+ dataNew)
      // store_user_char(user_char);    
}

export function savePost (title ,category, content) {
  return ref.child(`posts/`)
    .push({
      title: title,
      category : category,
      content: content
    })
     
}