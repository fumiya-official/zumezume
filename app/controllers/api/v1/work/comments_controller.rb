class Api::V1::Work::CommentsController < ApplicationController

  def index
    comments = Comment.joins(:work).joins(:user).where(work_id: params[:work_id]).select('comments.id, comment, nickname AS author, name AS author_id').order(updated_at: :desc)
    # comments = Comment.where(work_id: work_id[:work_id]).order(updated_at: :desc)
    render json: comments
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors, status: 422
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      render json: comment
    else
      render json: comment.errors, status: 422
    end
  end

  def destroy
    if Comment.destroy(params[:id]).destroy
      head :no_content
    else
      render json: { error: "Failed to destory" }, status: 422
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:comment, :user_id, :work_id)
    end

    def work_id
      params.permit(:work_id)
    end
end