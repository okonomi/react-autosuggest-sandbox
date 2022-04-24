# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'net/http'
require 'uri'
require 'rubyXL'

# download from soumu.go.jp
# https://www.soumu.go.jp/denshijiti/code.html
uri = URI.parse("https://www.soumu.go.jp/main_content/000730858.xlsx")
response = Net::HTTP.get_response(uri)

workbook = RubyXL::Parser.parse_buffer(response.body)

LocalGovernment.delete_all
[0, 1].each do |idx|
  worksheet = workbook[idx]
  worksheet.each_with_index do |row, i|
    # skip header
    next if i == 0
    # finish when empty row
    break if row[0].nil?

    begin
      LocalGovernment.create(
        code: row[0].value,
        name: "#{row[1].value}#{row[2].value}"
      )
    rescue ActiveRecord::RecordNotUnique
    end
  end
end
