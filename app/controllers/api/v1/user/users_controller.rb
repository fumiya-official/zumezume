class Api::V1::User::UsersController < ApplicationController
  def index
    if params[:name]
      user = User.find_by(name: params[:name])
      render json: user
    else
      render json: 'error'
    end
  end

  def show
    user = User.find(params[:id])
    logger.debug('作者')
    logger.debug(user)
    render json: user
  end

  def update
    user = User.find(params[:id])
    if user.update(update_params)
      render json: user
    else
      render json: user.errors, status: 422
    end
  end

  private
  
    def update_params
      params.require(:user).permit(:name, :nickname, :biography)
    end
end
