import styled from 'styled-components'

export const Overlay = styled.div`
  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWindowWrapper = styled.div`
  z-index: 5;
  background-color: white;
  box-sizing: border-box;
  border-radius: 8px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 9rem;
  text-align: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 22rem;
`;

export const Content = styled.div`
  padding: 1rem;
  position: absolute;
`;

export const Text = styled.p`
  font-size: 14px;
  margin: auto;
  margin-top: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 1em 0.2em;
`;

export const Button = styled.div`
  font-size: 12px;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 0.1em 1em;
  color: #aaa;

  &:hover {
    cursor: pointer;
    border: 1px solid #333;
    color: #333;
  }
`;