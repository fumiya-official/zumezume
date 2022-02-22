class RemoveColumnToWork < ActiveRecord::Migration[6.1]
  def change
    remove_column :works, :user_id
  end
end
