class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :session_print
  
  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
