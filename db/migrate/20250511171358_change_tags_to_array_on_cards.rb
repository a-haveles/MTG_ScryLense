class ChangeTagsToArrayOnCards < ActiveRecord::Migration[7.1]
  def change
    remove_column :cards, :tags, :string
    add_column :cards, :tags, :string, array: true, default: [], null: false
  end
end
