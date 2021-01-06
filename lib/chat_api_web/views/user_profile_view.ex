defmodule ChatApiWeb.UserProfileView do
  use ChatApiWeb, :view
  alias ChatApiWeb.UserView

  def render("show.json", %{user_profile: user_profile}) do
    %{data: render_one(user_profile, UserView, "user.json")}
  end

  def render("profile.json", %{user_profile: user_profile}) do
    %{
      id: user_profile.id,
      object: "user_profile",
      full_name: user_profile.full_name,
      display_name: user_profile.display_name,
      profile_photo_url: user_profile.profile_photo_url,
      slug: user_profile.slug,
    }
  end
end
