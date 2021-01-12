defmodule ChatApi.Events do
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.Events.Event

  @spec create_event(map()) :: {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_event!(binary()) :: Event.t()
  def get_event!(id), do: Repo.get!(Event, id)

  @spec list_by_start_time(binary(), binary()) :: [Event.t()]
  def list_by_start_time(from_time, to_time) do
    query = from e in Event,
                 where: e.start_time > ^from_time and e.start_time < ^to_time,
                 select: e
    Repo.all(query)
  end
end
