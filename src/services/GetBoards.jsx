import axios from 'axios';

// 게시글 여러개 가져오기
const getBoardsRequest = async (page, size) => {
    const response = await axios.get(`http://localhost:8080/boards/gets?page=${page}&size=${size}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log("aszdasd : ");
    console.log(response.data);
    return response.data;
};

export default getBoardsRequest;
