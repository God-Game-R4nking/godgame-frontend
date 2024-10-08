import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 회원 정보 가져오기
const getMemberListRequest = async (requestParam) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const queryString = requestParam.memberIds.map(id => `memberIds=${id}`).join('&');
        const response = await axios.get(`http://localhost:8080/members/game-member?${queryString}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
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


export default getMemberListRequest;
