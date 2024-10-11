import axios from "axios";
import { getLocalStorage } from "../utils/LocalStorageManager";

const sendLogoutRequest = async () => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    const response = await axios.post('http://localhost:8080/auth/logout', null,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }
    );

    return response;
}
export default sendLogoutRequest;