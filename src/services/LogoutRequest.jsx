import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLocalStorage, removeLocalStorage, setLocalStorageToken } from "../utils/LocalStorageManager";

const sendLoginRequest = async () => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }


    try {
        const response = await axios.post('http://localhost:8080/auth/logout',
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : token
                }
            }
        );
        if (response.status === 200) {
            console.log('로그아웃 성공', response);
            const token = response.headers.authorization;
            removeLocalStorage('token');
            return response;
        } else {
            Swal.fire({ text: `요청 실패(${response.status})` });
        }
    } catch (error) {
        switch (error.status) {
            case 401:
                Swal.fire({ text: `비밀번호를 다시 확인해주세요` });
                break;
            case 404:
                Swal.fire({ text: `존재하지 않는 회원입니다` });
                break;
            default:
                Swal.fire({ text: `요청 실패(${error.status})` });
        }
    }
}
export default sendLoginRequest;