import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// For more .. https://firebase.google.com/docs/web/setup#available-libraries

//  firebaselocalConfig is from "../localkey.js"
// Key for website
// const firebaseConfig = {
//     apiKey: "AIzaSyBU0r_2MGgtMDvQYMwLlIIsvbDp5ktAQ4M",
//     authDomain: "gif-tools-1d6ce.firebaseapp.com",
//     projectId: "gif-tools-1d6ce",
//     storageBucket: "gif-tools-1d6ce.appspot.com",
//     messagingSenderId: "194164895475",
//     appId: "1:194164895475:web:9e71cc12714539cc17d186"
// };

const firebaseConfig = firebaselocalConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

document.getElementById("fbsignin").onclick = () => {
    document.getElementById("fbsignin").classList.add("loading");

    var email = document.getElementsByName("email")[0].value
    var password = document.getElementsByName("password")[0].value

    document.getElementById("signout").onclick = () => {
        signOut(getAuth()).then(console.log("signing output"));
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed in 
            const user = userCredential.user;
            // ...
            var username = email;
            if (user.displayName != null) {
                username = user.displayName
            }

            document.getElementById("fbsignin").classList.remove("loading");
            document.getElementById("signout").classList.toggle("disabled")
            document.querySelector("#signout i").classList.toggle("red")
            document.querySelector("#loginform i").classList.toggle("disabled")

            $("#dlglogin").modal('hide');
            console.log("Success", user)
            if (user.photoURL !== null) {
                document.getElementById("userdp").src = user.photoURL;
            } else {
                // document.getElementById("userdp").src = "/images/square-image.png";
            }


            //

            user.getIdTokenResult()
                .then((idTokenResult) => {
                    // Confirm the user is an Admin.

                    console.log("Claims ", idTokenResult.claims);
                    /* if (!!idTokenResult.claims.admin) {
                       // Show admin UI.
                     
                       //showAdminUI();
                     } else {
                       // Show regular user UI.
                       showRegularUI();
                     }*/
                })
                .catch((error) => {
                    console.log(error);
                });

            user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                authtoken = idToken;
                document.cookie = "token=" + idToken;
                console.log("token is", idToken);
                // loadModel();
            }).catch(function (error) {
                // Handle error
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error", error)
        });

}

onAuthStateChanged(auth, user => {

    console.log("User is ", user, user != null ? user.email : "")
    if (user != null) {
        $(".item.sign-out").toggleClass("grey")
    }
});
