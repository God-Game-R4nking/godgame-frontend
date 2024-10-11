import React, { useEffect, useState } from "react";
import HomeUI from "../components/HomeUI";
import styled from "styled-components";
import img_1st from "../assets/1st.png";
import img_2nd from "../assets/2nd.png";
import img_3rd from "../assets/3rd.png";
import img_etc from "../assets/etc.png";
import getRankRequest from "../services/GetRank";

const Container = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const RankContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
`;

const Rank1st = styled.div`
    background-image: url(${img_1st});
    background-size: cover;
    width: 100px;
    height: 100px;
`;

const Rank2nd = styled.div`
    background-image: url(${img_2nd});
    background-size: cover;
    width: 100px;
    height: 100px;
`;

const Rank3rd = styled.div`
    background-image: url(${img_3rd});
    background-size: cover;
    width: 100px;
    height: 100px;
`;

const RankEtc = styled.div`
    background-image: url(${img_etc});
    background-size: cover;
    width: 100px;
    height: 100px;
`

const RankPage = () => {
    const [rank, setRank] = useState([]);

    const GetRank = async () => {
        const response = await getRankRequest();
        setRank(response.data.data);
        console.log(rank);
    }

    useEffect(() => {
        GetRank();
    }, []);

    return (
        <HomeUI category={"명예의 전당"}>
            <Container>
                {rank[0] ?
                    <RankContainer>
                        <Rank1st></Rank1st>
                        <Text>{`${rank[0]?.nickName} ${rank[0]?.totalPoint} 점`}</Text>
                    </RankContainer> : null}
                {rank[1] ?
                    <RankContainer>
                        <Rank2nd></Rank2nd>
                        <Text>{`${rank[1]?.nickName} ${rank[1]?.totalPoint} 점`}</Text>
                    </RankContainer>
                    : null}
                {rank[2] ?
                    <RankContainer>
                        <Rank3rd></Rank3rd>
                        <Text>{`${rank[2]?.nickName} ${rank[2]?.totalPoint} 점`}</Text>
                    </RankContainer>
                    : null}
                {rank[3] ?
                    <RankContainer>
                        <RankEtc></RankEtc>
                        <Text>{`${rank[3]?.nickName} ${rank[3]?.totalPoint} 점`}</Text>
                    </RankContainer>
                    : null}
                {rank[4] ?
                    <RankContainer>
                        <RankEtc></RankEtc>
                        <Text>{`${rank[4]?.nickName} ${rank[4]?.totalPoint} 점`}</Text>
                    </RankContainer>
                    : null}
            </Container>
        </HomeUI>
    );
}

export default RankPage;