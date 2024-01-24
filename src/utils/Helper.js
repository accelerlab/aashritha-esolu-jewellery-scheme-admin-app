// email validation
export const emailValidation = (email) => {
    const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return expression.test(String(email).toLowerCase())
}

export const passwordValidation = (password) => {
    //var expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/; 
    const expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,32}$/
    return expression.test(password)

}

export const phoneNumberValidation = (number) => {
    const expression = /^\d{10}$/;
    return expression.test(number)

}
import { Alert } from "react-native";
export const showAlert = (title, message) => {
    Alert.alert(title, message)
}
//checking image size
export const checkImageSize = (size) => {
    let maxsize = 2 * 1024 * 1024;
    if (size < maxsize) {
        return true;
    }

}

export const showErrorMsg = () => {
    Alert.alert("Warning", "Services arent available at the moment. Please try again after sometime or contact Admin")
}

//checking object is empty or not
export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

