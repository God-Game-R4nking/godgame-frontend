import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: ${(props) => props.$display};
    flex-direction: ${(props) => props.$flexDirection};
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    align-items: ${(props) => props.$alignItems};
    justify-content: ${(props) => props.$justifyContent};
    margin-bottom: ${(props) => props.$marginBottom};
    margin-right: ${(props) => props.$marginRight};
    position: ${(props) => props.$position};
    left: ${(props) => props.$left};
    right: ${(props) => props.$right};
    top: ${(props) => props.$top};
`;

const LayoutStyle = (props) => {
    const { display, flexDirection, width, height, alignItems, justifyContent, children, marginRight, marginBottom, position, left, right, top } = props;

    return (
        <StyledDiv
            $display={display}
            $flexDirection={flexDirection}
            $width={width}
            $height={height}
            $alignItems={alignItems}
            $justifyContent={justifyContent}
            $marginBottom={marginBottom}
            $marginRight={marginRight}
            $position={position}
            $left={left}
            $right={right}
            $top={top}
        >
            {children}
        </StyledDiv>
    );
};

export default LayoutStyle;
