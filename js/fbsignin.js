import {
    initializeApp,
    getApp,
  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
  // For more .. https://firebase.google.com/docs/web/setup#available-libraries
  
  let firebaseConfig;
  let app;
  
  import("../localkey.js")
    .then((obj) => {
      firebaseConfig = obj.firebaselocalConfig;
      console.log("setting up local key", firebaseConfig);
      app = initializeApp(firebaseConfig);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged user=1111=", user);
        if (user != null) {
          $(".item.sign-out").toggleClass("grey");
          $("#approve-btn").removeClass("disabled");
          $("#loginform").hide();
        } else {
          $("#approve-btn").addClass("disabled");
        }
      });
    })
    .catch((err) => {
      console.log("Setting up web key", err);
      firebaseConfig = {
        apiKey: "AIzaSyBU0r_2MGgtMDvQYMwLlIIsvbDp5ktAQ4M",
        authDomain: "gif-tools-1d6ce.firebaseapp.com",
        projectId: "gif-tools-1d6ce",
        storageBucket: "gif-tools-1d6ce.appspot.com",
        messagingSenderId: "194164895475",
        appId: "1:194164895475:web:9e71cc12714539cc17d186",
        databaseURL:
          "https://gif-tools-1d6ce-default-rtdb.asia-southeast1.firebasedatabase.app",
      };
  
      app = initializeApp(firebaseConfig);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged user=2222=", user);
        if (user != null) {
          $(".item.sign-out").toggleClass("grey");
          $("#approve-btn").removeClass("disabled");
          $("#loginform").hide();
          if (email === "3gpp@5gindiaforum.in") {
            $("#3gpp-records-icon").show();
          } else {
            $("#3gpp-records-icon").hide();
          }
        } else {
          $("#approve-btn").addClass("disabled");
          $("#3gpp-records-icon").hide();
        }
      });
    });
  
  document.getElementById("fbsignin").onclick = () => {
    const defaultApp = getApp();
    const auth = getAuth(defaultApp);
  
    document.getElementById("fbsignin").classList.add("loading");
  
    // var email = document.getElementsByName("email")[0].value
    var email = document.getElementById("email").value;
    var password = document.getElementsByName("password")[0].value;
  
    document.getElementById("signout").onclick = () => {
      signOut(getAuth()).then(console.log("signing output"));
    };
    console.log("email", email);
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        var username = email;
        if (user.displayName != null) {
          username = user.displayName;
        }
  
        document.getElementById("fbsignin").classList.remove("loading");
        document.getElementById("signout").classList.toggle("disabled");
        document.querySelector("#signout i").classList.toggle("red");
        document.querySelector("#loginform i").classList.toggle("disabled");
  
        $("#dlglogin").modal("hide");
        console.log("Success", user);
        $("#loginform").hide();
        if (user.photoURL !== null) {
          document.getElementById("userdp").src = user.photoURL;
        } else {
          // document.getElementById("userdp").src = "/images/square-image.png";
        }
  
        //
  
        // user
        //   .getIdTokenResult()
        //   .then((idTokenResult) => {
        //     // Confirm the user is an Admin.
  
        //     console.log("Claims ", idTokenResult.claims);
        /* if (!!idTokenResult.claims.admin) {
                         // Show admin UI.
                       
                         //showAdminUI();
                       } else {
                         // Show regular user UI.
                         showRegularUI();
                       }*/
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
  
        // user
        //   .getIdToken(/* forceRefresh */ true)
        //   .then(function (idToken) {
        //     // Send token to your backend via HTTPS
        //     // ...
        //     authtoken = idToken;
        //     document.cookie = "token=" + idToken;
        //     console.log("token is", idToken);
        //     // loadModel();
        //   })
        //   .catch(function (error) {
        //     // Handle error
        //   });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error", error);
      });
  };
  