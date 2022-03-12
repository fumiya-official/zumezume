class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private
    # ユーザ登録時
    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end

    # # ユーザ変更時
    # def account_update_params
    #   params.require(:user).permit(:id, :nickname, :name, :biography)
    # end
end
