class AddColumnToComment < ActiveRecord::Migration[6.1]
  def change
    add_reference :comments, :user, null: false, foreign_key: true
    add_reference :comments, :work, null: false, foreign_key: true
  end
end
