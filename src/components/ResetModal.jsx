import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: prop => prop !== "primary",
})`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${props => (props.primary ? "#3b82f6" : "#ef4444")};
  color: white;
`;

export default function ResetModal({ t, confirmReset, cancelReset }) {
  return (
    <Overlay>
      <ModalBox>
        <p>{t("resetAlert")}</p>
        <div style={{ marginTop: "1rem" }}>
          <Button primary onClick={confirmReset}>
            {t("okButtonText")}
          </Button>
          <Button onClick={cancelReset}>{t("cancelButtonText")}</Button>
        </div>
      </ModalBox>
    </Overlay>
  );
}
