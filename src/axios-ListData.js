import axios from 'axios' ; 


const instance = axios.create({

        baseURL : "https://todo-da0b2.firebaseio.com/"

})

export default instance;