class CreateMeetings < ActiveRecord::Migration[7.0]
  def change
    create_table :meetings do |t|
      t.references :user, optional: true, foreign_key: true

      t.timestamps
    end
  end
end
