import { firebase, db } from '../config';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

export default class HotelService{
      
    async AddHotel(object, success, error){

        const hotelName = object["hotelName"];
        const hotelDescription = object["hotelDescription"];
        const services = object["services"];
        const prize = object["prize"];

        try{
            const hotelsCollectionRef = collection(db, 'hotels');
            await addDoc(hotelsCollectionRef, {
                name: hotelName,
                description: hotelDescription,
                services: services,
                prize: prize,
            }).then(() => {
                return success();
            });

        } catch(e) {
            return error(e);
        }

    }

}