defmodule ChatApiWeb.UserProfileController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Users

  action_fallback ChatApiWeb.FallbackController

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    if Map.has_key?(params, "slug") do
      slug = Map.get(params, "slug", nil)
      user_profile = Users.get_user_info_by_slug(slug)
      json(
        conn,
        %{
          data: %{
            id: user_profile.id,
            object: "user_profile",
            user_id: user_profile.user_id,
            full_name: user_profile.full_name,
            display_name: user_profile.display_name,
            profile_photo_url: user_profile.profile_photo_url,
            slug: user_profile.slug,
          }
        }
      )
    else
      with %{id: user_id} <- conn.assigns.current_user do
        user_profile = Users.get_user_info(user_id)
        render(conn, "show.json", user_profile: user_profile)
      end
    end
  end

  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"user_profile" => user_profile_params}) do
    with %{id: user_id} <- conn.assigns.current_user,
         params <- Map.merge(user_profile_params, %{"user_id" => user_id}),
         {:ok, _user_profile} <- Users.update_user_profile(user_id, params) do
      user_profile = Users.get_user_info(user_id)
      render(conn, "show.json", user_profile: user_profile)
    end
  end
end
