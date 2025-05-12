class Card < ApplicationRecord
  has_many :deck_cards
  has_many :deck, through: :deck_cards
end
