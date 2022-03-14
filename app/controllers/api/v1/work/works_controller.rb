class Api::V1::Work::WorksController < ApplicationController
  before_action only:[:create]

  def index
    if params[:name]
      # ユーザページの作品表示用
      works = Work.joins(:user).where(users: { name: params[:name] }).select('works.id, works.updated_at, release, user_id, title, content, nickname AS author, name AS author_id').order(updated_at: :desc)
    else
      works = Work.joins(:user).select('works.id, release, user_id, title, content, nickname AS author, name AS author_id').order(updated_at: :desc)
    end
    
    render json: works
  end

  def show
    work = Work.joins(:user).select('works.id, release, user_id, title, content, nickname AS author, name AS author_id').find(params[:id])
    render json: work
  end

  def create
    work = Work.new(work_params)
    if work.save
      render json: work
    else
      render json: work.errors, status: 422
    end
  end

  def update
    work = Work.find(params[:id])
    if work.update(work_params)
      render json: work
    else
      render json: work.errors, status: 422
    end
  end

  def destroy
    if Work.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, statu: 422
    end
  end

  private
  
    def work_params
      params.require(:work).permit(:user_id, :title, :content, :release)
    end
end