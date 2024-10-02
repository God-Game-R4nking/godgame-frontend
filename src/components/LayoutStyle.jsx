import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: ${(props) => props.$display || 'flex'};
    flex-direction: ${(props) => props.$flexDirection || 'column'};
    align-items: ${(props) => props.$alignItems};
    justify-content: ${(props) => props.$justifyContent};
    margin-bottom: ${(props) => props.$marginBottom};
`;

const LayoutStyle = (props) => {
    const { display, flexDirection, alignItems, justifyContent, children, marginBottom } = props;

    return (
        <StyledDiv
            $display={display}
            $flexDirection={flexDirection}
            $alignItems={alignItems}
            $justifyContent={justifyContent}
            $marginBottom={marginBottom}
        >
            {children}
        </StyledDiv>
    );
};

export default LayoutStyle;
