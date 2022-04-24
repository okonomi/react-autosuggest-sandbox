class CreateLocalGovernments < ActiveRecord::Migration[7.0]
  def change
    create_table :local_governments do |t|
      t.string :code
      t.string :name

      t.timestamps
    end
    add_index :local_governments, :code, unique: true
  end
end
