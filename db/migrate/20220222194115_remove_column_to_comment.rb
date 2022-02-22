class RemoveColumnToComment < ActiveRecord::Migration[6.1]
  def change
    remove_columns :comments, :user_id, :work_id 
  end
end
