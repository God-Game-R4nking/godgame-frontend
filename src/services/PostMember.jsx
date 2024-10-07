import axios from 'axios';

// 회원가입 요청 함수
const sendSignUpRequest = async (requestBody) => {
    try {
        const response = await axios.post('http://localhost:8080/members', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;  // 성공 시 서버에서 받은 데이터를 반환
    } catch (error) {
        console.error("회원가입 요청 중 오류 발생:", error);
        throw error;  // 에러가 발생하면 호출한 쪽에서 처리할 수 있게 에러를 다시 던짐
    }
};

export default sendSignUpRequest;
