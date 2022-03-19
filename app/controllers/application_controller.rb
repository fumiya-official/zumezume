class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  helper_method :current_user, :user_signed_in?, :authenticate_user!

  def set_csrf_token_header
    new_csrf_token = form_authenticity_token
    response.set_header('X-CSRF-Token', new_csrf_token)
    session[:_csrf_token] = new_csrf_token
  end

  def session_print
    logger.debug('CSRFトークン')
    logger.debug(session[:_csrf_token])
  end
  
  def print_current_user
    logger.debug('current_user')
    logger.debug(current_api_v1_user)
  end
end