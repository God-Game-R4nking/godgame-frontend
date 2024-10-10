import axios from 'axios';

//게시판 생성 요청
const sendBoardRequest = async (requestBody) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/boards', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가

            },
        });
        if(response.status === 200 || response.status === 201){
            console.log("성공");
        }
    }catch(error) {
        console.error("실패", error);
        if(error.response.status === 409){
            alert("이미 있는 게시글입니다");
        }
    }
};

export default sendBoardRequest;
