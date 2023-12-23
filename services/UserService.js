import * as SecureStore from 'expo-secure-store';
import * as MailComposer from "expo-mail-composer";
import { firebase } from '../config';

export default class UserService{

    async SignUp(formData, success, error){
        const firstName = formData["firstName"];
        const lastName = formData["lastName"];
        const email = formData["email"];
        const phoneNumber = formData["phoneNumber"];
        const password = formData["pwd"];
        try{
            var message = '';
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'https://login-97204.firebaseapp.com',
                })
                .then(() => {
                    message = 'Verification email sent';
                }).catch((error) => {
                    error(error.message)
                })
                .then(() => {
                    firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .add({
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        password
                    })
                })
                .catch((error) => {
                    error(error.message);
                })
            })
            .catch((error => {
                error(error.message);
            }))
            return success(message);
        } catch(e) {
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