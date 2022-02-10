class ChangeNameToUser < ActiveRecord::Migration[6.1]
  def up
    change_column :users, :name, :string, null: false
  end

  def down
    change_column :users, :name, :string
  end
end
