defmodule ChatApi.SchedulingLinks do
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.SchedulingLinks.SchedulingLink

  @spec create_scheduling_link(map()) :: {:ok, SchedulingLink.t()} | {:error, Ecto.Changeset.t()}
  def create_scheduling_link(attrs \\ %{}) do
    %SchedulingLink{}
    |> SchedulingLink.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_scheduling_link!(binary()) :: SchedulingLink.t()
  def get_scheduling_link!(id), do: Repo.get!(SchedulingLink, id)

  @spec list_scheduling_links_by_user(binary(), map()) :: [SchedulingLink.t()]
  def list_scheduling_links_by_user(user_id, filters) do
    SchedulingLink
    |> Repo.all()
  end

  @spec get_scheduling_link_by_url(binary()) :: [SchedulingLink.t()]
  def get_scheduling_link_by_url(url) do
    SchedulingLink
    |> where(url: ^url)
    |> Repo.one()
  end

  @spec update_scheduling_link(SchedulingLink.t(), map()) :: {:ok, SchedulingLink.t()} | {:error, Ecto.Changeset.t()}
  def update_scheduling_link(%SchedulingLink{} = scheduling_link, attrs) do
    scheduling_link
    |> SchedulingLink.changeset(attrs)
    |> Repo.update()
  end

end
