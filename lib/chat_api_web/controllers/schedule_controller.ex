defmodule ChatApiWeb.ScheduleController do
  use ChatApiWeb, :controller

  alias ChatApi.Schedules
  alias ChatApi.Schedules.Schedule

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      schedules = Schedules.list_schedules_by_user(user_id, filters)
      render(conn, "index.json", schedules: schedules)
    end
  end

  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"schedule" => schedule_params}) do
    %{"name" => name, "rules" => rules, "timezone" => timezone} = schedule_params

    with %{account_id: account_id, id: user_id} <- conn.assigns.current_user,
         {:ok, %Schedule{} = schedule} <-
           Schedules.create_schedule(%{
             name: name,
             rules: rules,
             timezone: timezone,
             user_id: user_id
           }) do
      conn
      |> put_status(:created)
      |> render("show.json", schedule: schedule)
    end
  end


  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"id" => id, "schedule" => schedule_params}) do
    schedule = Schedules.get_schedule!(id)

    with {:ok, %Schedule{} = schedule} <- Schedules.update_schedule(schedule, schedule_params) do
      render(conn, "show.json", schedule: schedule)
    end
  end
end
