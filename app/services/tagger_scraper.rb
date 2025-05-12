require 'ferrum'

class TaggerScraper
  BASE_URL = "https://tagger.scryfall.com/card"

  def initialize(set, collector_number)
    @url = "#{BASE_URL}/#{set}/#{collector_number}"
  end

  def fetch_tags
    browser = Ferrum::Browser.new(timeout: 10)
    browser.goto(@url)

    # Wait for tag elements to load
    browser.network.wait_for_idle

    # Now we can query the tag elements
    selected_section = browser.at_css('.card-layout--tagging section:nth-child(3)')

    tag_texts = []
  
    if selected_section
      taggings_element = selected_section.at_css('.taggings')
  
      if taggings_element
        tag_elements = taggings_element.css('a, span.tag-row-flex')
        tag_texts = tag_elements.map(&:text).map(&:strip).reject(&:empty?)
      else
        tag_texts = nil
      end
    else
      tag_texts = nil
    end
  
    browser.quit
    tag_texts
  end
end