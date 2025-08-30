import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBackground};
    box-shadow: 0 0 5px ${props => props.theme.buttonBackground};
  }
`;

const FBInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== "active",
})`
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.active ? props.theme.buttonHover : props.theme.buttonBackground};
  color: white;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

export default function FilterBar({ search, setSearch, setFilter, t, filter }) {
  return (
    <Container>
      <SearchInput
        name="searchtodo"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={t("search")}
      />
      <FBInner>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </FilterButton>
        <FilterButton
          active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          {t("active")}
        </FilterButton>
        <FilterButton
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          {t("completed")}
        </FilterButton>
      </FBInner>
    </Container>
  );
}
