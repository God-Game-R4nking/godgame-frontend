import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home, Room, Reload, Plus, Notification, Setting, Board, Community, Rank, Question, Banner, TitleBar } from "./NavigationElements";
import { Title } from "./Texts";
import AddRoomModal from "./AddRoomModal";

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
`;

const NavBar = styled.div`
    display: flex;
`;

const Div = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`;

const NavigationBar = (props) => {
    const { mode, username, AddRoom, category, handleLeave } = props;
    
    if (mode === 'lobby') {
        return (
            <Nav>
                <NavBar>
                    <Link to="/home"><Home /></Link>
                    <Reload />
                    <AddRoomModal ButtonStyle={Plus} AddRoom={AddRoom} />
                </NavBar>
                <Div>
                    <TitleBar>&nbsp;게임 대기실</TitleBar>
                </Div>
            </Nav>
        );
    } else if (mode === 'room') {
        return (
            <Nav>
                <NavBar>
                    <Link to="/home"><Home onClick={handleLeave}/></Link>
                    <Reload />
                    <Setting />
                </NavBar>
                <Div>
                    <TitleBar>&nbsp;게임 대기실</TitleBar>
                </Div>
            </Nav>
        );
    } else {
        return (
            <Nav>
                <NavBar>
                    <Link to="/home"><Home /></Link>
                    <Link to="/lobby"><Room /></Link>
                    <Link to="/notification"><Notification /></Link>
                    <Link to="/board"><Board /></Link>
                    <Link to="/community"><Community /></Link>
                    <Link to="/rank"><Rank /></Link>
                    <Link to="/question"><Question /></Link>
                    <Reload />
                    <Banner>{username} 님 환영합니다</Banner>
                </NavBar>
                <Div>
                    <TitleBar>&nbsp;{category}</TitleBar>
                </Div>
            </Nav>
        );
    }

};

export default NavigationBar;