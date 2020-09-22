const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");



export class Firebase {


    constructor() {
        
        this._config = {

                apiKey: "AIzaSyBih4s8Dz9wtiVsxJWz02gj2JRxlHjXr0Y",
                authDomain: "whatsapp-clone-e04a5.firebaseapp.com",
                databaseURL: "https://whatsapp-clone-e04a5.firebaseio.com",
                projectId: "whatsapp-clone-e04a5",
                storageBucket: "whatsapp-clone-e04a5.appspot.com",
                messagingSenderId: "384082235892",
                appId: "1:384082235892:web:10bd3333aa3a742896a9a1",
                measurementId: "G-ZQ0F8G647X"
                };
        
                this.init()

            }


            init(){

                if(!window._initializedFirebase) {

                    firebase.initializeApp(this._config)

                    window._initializedFirebase  = true 
                }


            }

            databaseRules(){

                firebase.database.rule.json({

                        "rules": {
                          "tokens": {
                              ".indexOn": ["uid", "token"],
                              ".read": "auth != null",
                              ".write": "auth != null",
                              "$token": {
                                  ".validate": "newData.hasChildren(['uuid', 'token']) && newData.child('uuid').val() == auth.uuid"
                              }
                          },
                          "notifications": {
                              ".read": "auth != null",
                              ".write": "auth != null",
                              "$notification": {
                                  ".validate": "newData.hasChildren(['user', 'message', 'userProfileImg'])"
                              }
                          }
                        }
                })

            }


            static db(){

                return firebase.firestore()

            }

            static hd(){

                return firebase.storage()

            }

            initAuth(){

                let provider = new firebase.auth.GoogleAuthProvider()

                return new Promise((s, f) => {

                    firebase.auth().signInWithPopup(provider)
                    .then(result => {

                        let token = result.credential.accessToken 
                        let user = result.user 

                        s({
                            user, 
                            token
                        })

                    }).catch(error => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        // The email of the user's account used.
                        let email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        let credential = error.credential;
                        f(errorCode, errorMessage, email, credential)
                    })


                })

            }
}
