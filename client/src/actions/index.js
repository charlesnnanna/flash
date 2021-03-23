import Axios from Axios;
import { FETCH_USER } from './types'


const fetchUser = () => {
    return function (dispatch) {
        Axios
            .get('/api/current_user')
            .then(res => dispatch({type : FETCH_USER , payload : res}))
    }
       
}