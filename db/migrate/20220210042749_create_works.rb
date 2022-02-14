class CreateWorks < ActiveRecord::Migration[6.1]
  def change
    create_table :works do |t|
      t.integer :user_id, :null => false
      t.string :title
      t.text :content
      # 0: 非公開, 1: 公開, 2: 限定公開
      t.integer :release, :default => 0, :null => false

      t.timestamps
    end
  end
end
