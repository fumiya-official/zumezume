class Api::V1::Auth::LoginController < DeviseTokenAuth::SessionsController
  after_action :session_print
  after_action :set_csrf_token_header, only: %i[destroy]
end
