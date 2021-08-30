const firebaseConfig = {
    apiKey: "AIzaSyB6PcUacP3ded7bMJqHytnXF9T1aoPYzic",
    authDomain: "environment-app-60295.firebaseapp.com",
    databaseURL: "https://environment-app-60295-default-rtdb.firebaseio.com",
    projectId: "environment-app-60295",
    storageBucket: "environment-app-60295.appspot.com",
    messagingSenderId: "1866028884",
    appId: "1:1866028884:web:a67d6aea74f8c62fd75ac1",
    measurementId: "G-K4N50VS1ME"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function post_views(){
    post= document.getElementById("post").value
    name= document.getElementById("name").value
    firebase.database().ref("Posts").push({
          user_name:name,
          postBYuser:post,
          likes:0
    });
    document.getElementById("post").value = "";
    document.getElementById("name").value = "";
}

function getData() { firebase.database().ref("/Posts").on('value', function(snapshot) { document.getElementById("posts").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['user_name'];
    message = message_data['postBYuser'];
    like = message_data['likes'];
    name_with_tag = "<h4>"+name+"&nbsp;&nbsp;<img src='trees.png' class='user_icon' style='width:20px'></h4>";
    post_with_tag = "<h4 class='message_h4>'>" + message + "</h4>";
    button_with_tag = "<button class='btn btn-warning' id="+ firebase_message_id + " value = "+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumps-up'>Like: " + like + "</span></button><hr>";
    row = name_with_tag + post_with_tag + button_with_tag + span_with_tag;
    document.getElementById("posts").innerHTML +=row;
//End code
 } });  }); }

getData();

function updateLike(message_id)
{
      console.log("Clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);
      firebase.database().ref("Posts").child(message_id).update({
            likes : update_likes
      });
}
