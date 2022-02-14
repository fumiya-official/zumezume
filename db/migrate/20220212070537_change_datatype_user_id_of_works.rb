class ChangeDatatypeUserIdOfWorks < ActiveRecord::Migration[6.1]
  def up
    change_column :works, :user_id, :string, null: false
  end

  def down
    change_column :works, :user_id, :integer, null: false
  end
end
