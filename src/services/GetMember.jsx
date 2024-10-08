import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 회원 정보 가져오기
const getMemberRequest = async () => {
    const token = JSON.parse(getLocalStorage('token')); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.get('http://localhost:8080/members/my-info',  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가
            },
        });

        if (response.status === 200) {
            console.log("회원 정보:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("회원 정보 가져오기 실패", error);
        if (error.response && error.response.status === 404) {
            alert("해당되는 회원을 찾지 못했습니다.");
        }
    }
};

export default getMemberRequest;
