require "test_helper"

class DecksControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get decks_new_url
    assert_response :success
  end

  test "should get create" do
    get decks_create_url
    assert_response :success
  end

  test "should get show" do
    get decks_show_url
    assert_response :success
  end
end
