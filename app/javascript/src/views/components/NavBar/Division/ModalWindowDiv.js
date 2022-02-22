import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Overlay = styled.div`
  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWindowWrapper = styled.div`
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

const Content = styled.div`
  padding: 1rem;
  position: absolute;
`;

const Text = styled.p`
  font-size: 14px;
  margin: auto;
  margin-top: 1rem;
`;

const CloseModalButton = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-top: 2rem;
  font-size: 12px;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 0.1rem 1rem;

  &:hover {
    cursor: pointer;
    border: 1px solid #777;
  }
`;

const ModalWindowDiv = (props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    props.path ?
      navigate(props.path)
      :
      props.setShowErrorModal(false)
  }
  
  return (
    <>
      <Overlay>
        <ModalWindowWrapper>
          <Content>
            <Text>{props.text}</Text>
            <CloseModalButton onClick={handleClick}>
              閉じる
            </CloseModalButton>
          </Content>
        </ModalWindowWrapper>
      </Overlay>
    </>
  )
}

export default ModalWindowDiv