import styled from "styled-components";
import GitHubIcon from "./GitHubIcon";
import ResetIcon from "./ResetIcon";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.3rem;
  margin: 0;
`;

const TopRight = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ToggleButton = styled.button`
  padding: 0.5rem;
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: scale(1.1);
  }
`;

const Select = styled.select`
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.buttonBackground};
  }
`;

const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Header({
  t,
  theme,
  toggleTheme,
  lang,
  setLang,
  languages,
  requestReset,
  showResetAlert,
}) {
  return (
    <Container>
      <Title>{t("title")}</Title>
      <TopRight>
        <GitHubLink href="https://github.com/" target="_blank" rel="noreferrer">
          <GitHubIcon size={36} theme={theme} />
        </GitHubLink>
        <ToggleButton onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </ToggleButton>
        {showResetAlert && (
          <ToggleButton onClick={requestReset}>
            <ResetIcon size={22} />
          </ToggleButton>
        )}
        <Select value={lang} onChange={e => setLang(e.target.value)}>
          {languages.map(l => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </Select>
      </TopRight>
    </Container>
  );
}
