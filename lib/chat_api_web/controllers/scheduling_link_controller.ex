defmodule ChatApiWeb.SchedulingLinkController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.SchedulingLinks
  alias ChatApi.SchedulingLinks.SchedulingLink

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      scheduling_links = SchedulingLinks.list_scheduling_links_by_user(user_id, filters)
      render(conn, "index.json", scheduling_links: scheduling_links)
    end
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => id}) do
    scheduling_link = SchedulingLinks.get_scheduling_link!(id)
    render(conn, "show.json", scheduling_link: scheduling_link)
  end


  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"scheduling_link" => scheduling_link_params}) do
    %{
      "name" => name,
      "description" => description,
      "durations" => durations,
      "location" => location,
      "url" => url,
      "color" => color,
      "fields" => fields,
    } = scheduling_link_params

    with %{account_id: account_id, id: author_id} <- conn.assigns.current_user,
         #         {:ok, %Schedule{} = schedule} <-
         #           Schedules.create_default_schedule(),
         {:ok, %SchedulingLink{} = scheduling_link} <-
           SchedulingLinks.create_scheduling_link(
             %{
               name: name,
               description: description,
               durations: durations,
               location: location,
               url: url,
               color: color,
               fields: fields
               #             schedule: schedule,
             }
           ) do
      conn
      |> put_status(:created)
      |> render("show.json", scheduling_link: scheduling_link)
    end
  end

  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"id" => id, "scheduling_link" => scheduling_link_params}) do
    scheduling_link = SchedulingLinks.get_scheduling_link!(id)

    with {:ok, %SchedulingLink{} = scheduling_link} <- SchedulingLinks.update_scheduling_link(scheduling_link, scheduling_link_params) do
      render(conn, "show.json", scheduling_link: scheduling_link)
    end
  end

end
