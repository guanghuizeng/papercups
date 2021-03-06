defmodule ChatApi.Schedules do
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.Schedules.Schedule

  @spec create_schedule(map()) :: {:ok, Schedule.t()} | {:error, Ecto.Changeset.t()}
  def create_schedule(attrs \\ %{}) do
    %Schedule{}
    |> Schedule.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_schedule!(binary()) :: Schedule.t()
  def get_schedule!(id), do: Repo.get!(Schedule, id)

  @spec list_schedules_by_user(binary(), map()) :: [Schedule.t()]
  def list_schedules_by_user(user_id, filters) do
    Schedule
    |> Repo.all()
  end

  @spec get_schedule!(binary()) :: Schedule.t()
  def get_schedule!(id), do: Repo.get!(Schedule, id)

  @spec update_schedule(Schedule.t(), map()) :: {:ok, Schedule.t()} | {:error, Ecto.Changeset.t()}
  def update_schedule(%Schedule{} = schedule, attrs) do
    schedule
    |> Schedule.changeset(attrs)
    |> Repo.update()
  end

end
