# app/services/scryfall_client.rb
require 'httparty'

class ScryfallClient
  include HTTParty
  base_uri 'https://api.scryfall.com'

  def self.fetch_card_data(card_name)
    response = get("/cards/named", query: { fuzzy: card_name })
    return nil unless response.success?

    JSON.parse(response.body)
  end
end