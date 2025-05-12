class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.jsonb :scryfall_data

      t.timestamps
    end
  end
end
