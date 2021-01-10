defmodule ChatApiWeb.BookingController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    json(
      conn,
      %{
        ok: true,
        data: %{
          hello: "world"
        }
      }
    )
  end

end
