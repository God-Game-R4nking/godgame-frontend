import axios from 'axios';

// 게시판 수정 요청
const sendBoardPatchRequest = async (boardId, requestBody) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.patch(`http://localhost:8080/boards/${boardId}`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가

            },
        });
        if (response.status === 200) {
            console.log("성공");
            return response.data;
        }
    } catch (error) {
        console.error("실패", error);
        if (error.response && error.response.status === 409) {
            alert("일치하는 게시글이 아닙니다");
        }
        throw error;
    }
};

export default sendBoardPatchRequest;