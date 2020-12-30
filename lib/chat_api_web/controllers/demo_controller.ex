defmodule ChatApiWeb.DemoController do
  use ChatApiWeb, :controller

  alias ChatApi.Demos
  alias ChatApi.Demos.Demo

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      demos = Demos.list_demos_by_user(user_id, filters)
      render(conn, "index.json", demos: demos)
    end
  end

  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"demo" => demo_params}) do
    %{"name" => name, "count" => count} = demo_params

    with %{account_id: account_id, id: author_id} <- conn.assigns.current_user,
         {:ok, %Demo{} = demo} <-
           Demos.create_demo(%{
           name: name,
           count: count
           }) do
      conn
      |> put_status(:created)
      |> render("show.json", demo: demo)
    end
  end


end
