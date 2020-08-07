require 'test_helper'

class AjaxControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get ajax_home_url
    assert_response :success
  end

end
