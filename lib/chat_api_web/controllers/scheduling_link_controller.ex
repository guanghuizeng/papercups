defmodule ChatApiWeb.SchedulingLinkController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Users

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

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"user" => user, "link" => link}) do
    #    scheduling_link = SchedulingLinks.get_scheduling_link!(id)
    Logger.info(inspect(user))
    Logger.info(inspect(link))

    user_info = Users.get_user_info_by_slug(user)
    if user_info do
      scheduling_link = SchedulingLinks.get_scheduling_link_by_url(user_info.user_id, link)
      Logger.info(inspect(scheduling_link))
      render(conn, "show.json", scheduling_link: scheduling_link)
    else
      Logger.info(inspect(user_info))
      render(
        conn,
        "show.json",
        scheduling_link: %{
          id: 1
        }
      )
    end
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
      "email_reminders" => email_reminders,
      "organizer" => organizer,
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
               fields: fields,
               email_reminders: email_reminders,
               organizer: organizer
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

    with {:ok, %SchedulingLink{} = scheduling_link} <- SchedulingLinks.update_scheduling_link(
      scheduling_link,
      scheduling_link_params
    ) do
      render(conn, "show.json", scheduling_link: scheduling_link)
    end
  end

  @doc """
  get available intervals for given scheduling link
  """
  @spec intervals(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def intervals(conn, %{"user" => user, "link" => link, "from" => from, "to" => to}) do
    json(
      conn,
      %{
        data: [
            %{
              "endAt": "2021-01-28T09:00:00Z",
              "rank": 1,
              "startAt": "2021-01-28T07:50:00Z"
            },
            %{
              "endAt": "2021-01-28T14:00:00.000Z",
              "rank": 1,
              "startAt": "2021-01-28T12:00:00.000Z"
            },
            %{
              "endAt": "2021-01-29T09:00:00.000Z",
              "rank": 1,
              "startAt": "2021-01-29T01:00:00.000Z"
            },
            %{
              "endAt": "2021-01-29T14:00:00.000Z",
              "rank": 1,
              "startAt": "2021-01-29T12:00:00.000Z"
            },
            %{
              "endAt": "2021-01-30T09:00:00.000Z",
              "rank": 1,
              "startAt": "2021-01-30T01:00:00.000Z"
            }
          ]
      }
    )
  end
end
