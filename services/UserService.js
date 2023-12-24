import * as SecureStore from 'expo-secure-store';
import * as MailComposer from "expo-mail-composer";
import { firebase, db } from '../config';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

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
                password: password
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
            return success();
        } catch(e) {
            return error(e);
        }

    }

    async LogOut(success, error){

        try{
            var content = "Log Out";
            if( content.message === "Log Out" ){
                await SecureStore.deleteItemAsync('user');
                return success();
            }
            return error("Unauthorized");
        } catch(e) {
            return error(e);
        }
        
    }

    async codeVerification(object, success, error){
        try{
            return success();
        } catch(e) {
            return error(e);
        }

    }

    async sendResetRequest(email, success, error){
        try{
            MailComposer.composeAsync({
                subject: "Reset",
                body: "reset",
                recipients: [email]
            });
        } catch(e) {
            return error(e);
        }

    }

}