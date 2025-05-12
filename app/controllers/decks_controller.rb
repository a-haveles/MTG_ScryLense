class DecksController < ApplicationController
  skip_before_action :verify_authenticity_token  # Accept API POSTs from React

  def new
  end

  def create
    deck_params = params.permit(:name, :decklist, :deck)
  
    deck = Deck.create!(name: deck_params[:name])
  
    deck_params[:decklist].to_s.lines.each do |line|
      count, card_name = line.strip.split(' ', 2)
      next unless count && card_name
  
      card = Card.find_or_initialize_by(name: card_name)
      if card.new_record?
        data = ScryfallClient.fetch_card_data(card_name)
        if data
          card.scryfall_data = data
      
          # Scrape tags
          set = data["set"]
          collector_number = data["collector_number"]
          if set && collector_number
            raw_tags = TaggerScraper.new(set, collector_number).fetch_tags
            card.tags = raw_tags.uniq
          end
      
          card.save!
        else
          raise "Could not retrieve Scryfall data for '#{card_name}'"
        end
      end
  
      deck.deck_cards.create!(card: card, count: count.to_i)
    end
  
    render json: { id: deck.id, name: deck.name }, status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def tag_summary
    deck = Deck.find(params[:id])
  
    # Gather all tags from associated cards
    all_tags = deck.cards.flat_map(&:tags).compact
  
    # Count frequency
    tag_counts = all_tags.each_with_object(Hash.new(0)) do |tag, counts|
      counts[tag] += 1
    end
  
    render json: tag_counts.sort_by { |_tag, count| -count }.to_h
  end

  def show
  end
end
