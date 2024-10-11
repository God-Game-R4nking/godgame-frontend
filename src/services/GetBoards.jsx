import axios from 'axios';

// 게시글 여러개 가져오기
const getBoardsRequest = async (title, content, page, size) => {
    const response = await axios.get(`http://localhost:8080/boards/gets?title=${title}&content=${content}&page=${page}&size=${size}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export default getBoardsRequest;
