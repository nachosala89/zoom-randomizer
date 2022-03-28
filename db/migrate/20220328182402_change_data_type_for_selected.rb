class ChangeDataTypeForSelected < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :selected
  end
end
