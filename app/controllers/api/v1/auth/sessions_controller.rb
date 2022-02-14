class Api::V1::Auth::SessionsController < ApplicationController

  def index
    if current_api_user
      logger.debug("認証済み")
      render json: { logged_in: true, data: current_api_user }
    else
      logger.debug("認証済みユーザはいません")
      render json: { logged_in: false }
    end
  end

  def check_uniqueness
    uniqueness = User.find_by("#{input_data_params[:name]}": input_data_params[:value])
    
    if uniqueness.nil?
      render json: { uniqueness: true }
    else
      render json: { uniqueness: false }
    end
  end

  private
    def input_data_params
      params.require(:check_data).permit(:name, :value)
    end
end