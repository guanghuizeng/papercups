defmodule ChatApi.Demos do
  import Ecto.Query, warn: false
  alias ChatApi.Repo

  alias ChatApi.Demos.Demo

  @spec create_demo(map()) :: {:ok, Demo.t()} | {:error, Ecto.Changeset.t()}
  def create_demo(attrs \\ %{}) do
    %Demo{}
    |> Demo.changeset(attrs)
    |> Repo.insert()
  end

  @spec get_demo!(binary()) :: Demo.t()
  def get_demo!(id), do: Repo.get!(Demo, id)

  @spec list_demos_by_user(binary(), map()) :: [Demo.t()]
  def list_demos_by_user(user_id, filters) do
    Demo
    |> Repo.all()
  end
end
