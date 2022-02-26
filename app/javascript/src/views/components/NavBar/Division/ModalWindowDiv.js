import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Overlay,
  ModalWindowWrapper,
  Content,
  Text,
  ButtonWrapper,
  Button
} from '../../../../styles/ModalWindow'

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
            <ButtonWrapper>
              <Button onClick={handleClick}>
                閉じる
              </Button>
            </ButtonWrapper>
          </Content>
        </ModalWindowWrapper>
      </Overlay>
    </>
  )
}

export default ModalWindowDiv