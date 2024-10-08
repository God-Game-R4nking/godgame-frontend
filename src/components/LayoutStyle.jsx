import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: ${(props) => props.$display || 'flex'};
    flex-direction: ${(props) => props.$flexDirection || 'column'};
    align-items: ${(props) => props.$alignItems};
    justify-content: ${(props) => props.$justifyContent};
    margin-bottom: ${(props) => props.$marginBottom};
    margin-right: ${(props) => props.$marginRight};
    position: ${(props) => props.$position};
    left: ${(props) => props.$left};
    right: ${(props) => props.$right};
`;

const LayoutStyle = (props) => {
    const { display, flexDirection, alignItems, justifyContent, children, marginRight, marginBottom, position, left, right } = props;

    return (
        <StyledDiv
            $display={display}
            $flexDirection={flexDirection}
            $alignItems={alignItems}
            $justifyContent={justifyContent}
            $marginBottom={marginBottom}
            $marginRight={marginRight}
            $position={position}
            $left={left}
            $right={right}
        >
            {children}
        </StyledDiv>
    );
};

export default LayoutStyle;
