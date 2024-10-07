import axios from "axios";

// 인증을 제외한 요청 함수
const sendPostIdentityVerify = async (params) => {
    try {
        const response = await axios.get('http://localhost:8080/api/identity/add-verify', {
            params: {  // 쿼리 파라미터로 전달할 값
                name: params.name,
                phoneNo: params.phoneNo,
                identity: params.identity,
                telecom: params.telecom
            }
        });
        return response.data; // 성공 시 서버에서 받은 데이터를 반환
    } catch (error) {
        console.error('Error during identity verification:', error);
        throw error; // 에러 발생 시 에러를 throw
    }
};

export default sendPostIdentityVerify;
