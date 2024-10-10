import axios from 'axios';

// 게시글 여러개 가져오기
// http://localhost:8080/comments/gets?boardId=12&page=1&size=10
const getCommentsRequest = async (boardId, page, size) => {
    const response = await axios.get(`http://localhost:8080/comments/gets?boardId=${boardId}&page=${page}&size=${size}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export default getCommentsRequest;
