import Link from "next/link";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #f7146b;
  color: white;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <h1>Checkpoint : frontend</h1>
      <StyledLink href="/countries/list">Countries</StyledLink>
    </HeaderContainer>
  );
}
