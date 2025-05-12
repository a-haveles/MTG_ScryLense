class AddTagsToCards < ActiveRecord::Migration[7.1]
  def change
    add_column :cards, :tags, :string
  end
end
