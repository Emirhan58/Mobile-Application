import { firebase, db } from '../config';
import { collection, doc, setDoc } from "firebase/firestore";

export default class UserService{

    async SignUp(formData, success, error) {
        const firstName = formData["firstName"];
        const lastName = formData["lastName"];
        const email = formData["email"];
        const phoneNumber = formData["phoneNumber"];
        const password = formData["pwd"];
      
        try {
          var message = '';
          
          await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async () => {
              await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://login-97204.firebaseapp.com',
              })
              .then(() => {
                message = 'Verification email sent';
              });
              
              const userUID = firebase.auth().currentUser.uid;
              const userDocRef = doc(collection(db, 'users'), userUID);
      
              await setDoc(userDocRef, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                isAdmin: false
              }).then(() => {
                    return success(message);
              })
            });
        } catch (e) {
          error(e);
        }
      }
      

    async LogIn(object, success, error){

        const email = object["email"];
        const password = object["pwd"];

        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            if(firebase.auth().currentUser.emailVerified){
                return success();
            }
            else{
                await firebase.auth().signOut();
                return error("Please verify your email");
            }
        } catch(e) {
            return error(e);
        }

    }

    async LogOut(success, error){

        try{
            await firebase.auth().signOut();
            return success();
        } catch(e) {
            return error(e);
        }
        
    }

    async getInfo(userUID, success, error){
        try{
            let doc = firebase.firestore()
            .collection('users')
            .doc(userUID)
            .get();

            if (!doc.exists){
                error('No user data found!')
            } else {
                return success(doc.data());
            }
        } catch(e) {
            return error(e);
        }
    }

    async sendResetRequest(email, success, error){
        try{
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                success("Password reset email sent");
            }).catch((err) => {
                error(err);
            })
        } catch(e) {
            return error(e);
        }

    }

}