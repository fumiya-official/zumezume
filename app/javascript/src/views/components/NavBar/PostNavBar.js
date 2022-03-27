import React, { useState, useContext } from "react";
import LogoDiv from "./Division/LogoDiv";
import SettingDiv from "./Division/SettingDiv";
import ModalWindowDiv from "./Division/ModalWindowDiv";
import { postWork, editWork  } from "../../../request/api/work";
import { StateAuthContext } from "../../../context/AuthContext";
import { WorkDataContext, WorkInputContext } from "../../../context/WorkContext";
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
  /**
   * @type {[boolean, Function]} - show_save_modal; true: 保存完了のモーダルウィンドウを表示
   * @type {[boolean, Function]} - show_post_modal; true: 投稿完了のモーダルウィンドウを表示
   * @type {[boolean, Function]} - show_error_modal; true: 投稿ができない旨のモーダルウィンドウを表示
   * @type {[number, Function]} - work_id; 編集するworkのid
   * @param {Object} state - ユーザ情報
   *  @property {number} id - ユーザid
   * @param {Object} data - workデータ関連
   *  @property {Object} work - work
   *    @property {string} title - タイトル
   *    @property {string} content - 本文
   * @param {Object} input - workの入力関連
   *  @property {boolean} invalid_title - true: タイトルが原因でリクエストできない
   *  @property {boolean} invalid_content - true: 本文が原因でリクエストできない
   */
  const [show_save_modal, setShowSaveModal] = useState(false)
  const [show_post_modal, setShowPostModal] = useState(false)
  const [show_error_modal, setShowErrorModal] = useState(false)
  const [work_id, setWorkId] = useState(null)
  const { state } = useContext(StateAuthContext)
  const data = useContext(WorkDataContext)
  const input = useContext(WorkInputContext)

  const handlePostWork = async (release) => {
    const post_data = {
      title: data.work.title,
      content: data.work.content,
      release: release, // true: 公開, false: 非公開
      user_id: state.id,
    }

    if (release && (input.invalid_title || input.invalid_content)) {
      setShowErrorModal(true)
      return
    }

    try {
      const resp =
        props.action === "post"
          ? await postWork(post_data)
          : await editWork(post_data, data.work.id);
      
      release
        ? (setWorkId(resp.data.id), setShowPostModal(true))
        : setShowSaveModal(true)
    }
    catch(err) {
      console.log(err)
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
              <Button onClick={() => handlePostWork(false)}>キャンセル</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button onClick={() => handlePostWork(false)}>保存</Button>
            </ButtonWrapper>
            <FillButtonWrapper>
              <FillButton onClick={() => handlePostWork(true)} >投稿</FillButton>
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
