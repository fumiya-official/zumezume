import React, { useState, useContext, useEffect } from "react";
import LogoDiv from "./Division/LogoDiv";
import SettingDiv from "./Division/SettingDiv";
import ModalWindowDiv from "./Division/ModalWindowDiv";
import AxiosWrapper from "../../../request/AxiosWrapper";
import { StateAuthContext } from "../../../context/AuthContext";
import { WorkDataContext, WorkInputContext } from "../../../context/WorkContext";
import { useNavigate } from "react-router-dom";
import {
  NavBarWrapper,
  Header,
  Left,
  Center,
  Right,
  ButtonWrapper,
  Button,
  FillButtonWrapper,
  FillButton
} from "../../../styles/NavBar/NavBarStyle";


const PostNavBar = (props) => {
  const [show_save_modal, setShowSaveModal] = useState(false)
  const [show_post_modal, setShowPostModal] = useState(false)
  const [show_error_modal, setShowErrorModal] = useState(false)
  const [work_id, setWorkId] = useState(null)
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()
  const data = useContext(WorkDataContext)
  const input = useContext(WorkInputContext)
  // 現在のユーザとworks.user_idが一致しなければWorkListに遷移
  // useEffect(() => {
  //   console.log(state)
  //   if (props.value.user_id) {
  //     if (props.action === "edit" && props.value.user_id !== state.id) {
  //       navigate("/works")
  //     }
  //   }
  // }, [props.value.user_id])

  const handleSave = () => {
    const post_data = {
      title: data.work.title,
      content: data.work.content,
      release: 0,
      user_id: state.id,
    }

    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${props.value.id}`, { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setShowSaveModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handlePost = () => {
    if (input.invalid_title || input.invalid_content) {
      setShowErrorModal(true)
      return
    }
    
    const post_data = {
      title: data.work.title,
      content: data.work.content,
      release: 1,
      user_id: state.id,
    }
    
    if (props.action === "post") {
      AxiosWrapper.post("/work/works", { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setWorkId(resp.data.id)
          setShowPostModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else if (props.action === "edit") {
      AxiosWrapper.patch(`/work/works/${props.value.id}`, { work: post_data }, { withCredentials: true })
        .then((resp) => {
          setWorkId(resp.data.id)
          setShowPostModal(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <ButtonWrapper>
              <Button onClick={handleSave}>キャンセル</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button onClick={handleSave}>保存</Button>
            </ButtonWrapper>
            <FillButtonWrapper>
              <FillButton onClick={handlePost} >
                投稿
              </FillButton>
            </FillButtonWrapper>
            <SettingDiv />
          </Right>
        </Header>
        { show_save_modal && (
          <ModalWindowDiv text={"作品を保存しました"} path={"/works"} />
        )}
        { show_post_modal && (
          <ModalWindowDiv text={"作品を投稿しました"} path={`/works/${work_id}`} />
        )}
        { show_error_modal && (
          <ModalWindowDiv text={"制限文字数を越えています"} setShowErrorModal={setShowErrorModal}/>
        )}
      </NavBarWrapper>
    </>
  );
};

export default PostNavBar;
