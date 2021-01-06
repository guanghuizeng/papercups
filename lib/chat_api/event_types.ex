defmodule ChatApi.EventTypes do
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.EventTypes.EventType

  @spec create_event_type(map()) :: {:ok, EventType.t()} | {:error, Ecto.Changeset.t()}
  def create_event_type(attrs \\ %{}) do
    %EventType{}
    |> EventType.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_event_type!(binary()) :: EventType.t()
  def get_event_type!(id), do: Repo.get!(EventType, id)

  @spec list_event_types_by_user(binary(), map()) :: [EventType.t()]
  def list_event_types_by_user(user_id, filters) do
    EventType
    |> Repo.all()
  end

  @spec get_event_type_by_url(binary()) :: [EventType.t()]
  def get_event_type_by_url(url) do
    EventType
    |> where(url: ^url)
    |> Repo.one()
  end

  @spec update_event_type(EventType.t(), map()) :: {:ok, EventType.t()} | {:error, Ecto.Changeset.t()}
  def update_event_type(%EventType{} = event_type, attrs) do
    event_type
    |> EventType.changeset(attrs)
    |> Repo.update()
  end

end
