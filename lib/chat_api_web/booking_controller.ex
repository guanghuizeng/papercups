defmodule ChatApiWeb.BookingController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  @doc """
  Get available spots.



  """
  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    %{"event_type_id" => event_type_id, "start_time" => start_time, "end_time" => end_time } = params
    # event_type_id => schedule
    # start_time & end_time => list of days
    # date => day of week => rule => spots
    # query events by time
    # remove occupied time from spots

    json(
      conn,
      %{
        ok: true,
        data: [
          %{
            date: "2021-01-09",
            status: "unavailable",
            spots: [],
            invitee_events: [],
          },
          %{
            date: "2021-01-12",
            status: "available",
            spots: [
              %{
                status: "available",
                start_time: "2021-01-12T09:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T09:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T09:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T10:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T10:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T11:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T11:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T11:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T11:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T12:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T12:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T12:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T12:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T13:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T13:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T13:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T13:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T14:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T14:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T14:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T14:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T15:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T15:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T15:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T15:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T16:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T16:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T16:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-12T16:45:00+08:00",
              },
            ],
            invitee_events: [],
          },
          %{
            date: "2021-01-13",
            status: "available",
            spots: [
              %{
                status: "available",
                start_time: "2021-01-13T09:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T09:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T10:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T10:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T10:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T10:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T11:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T11:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T11:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T11:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T12:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T12:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T12:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T12:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T13:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T13:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T13:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T13:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T14:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T14:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T14:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T14:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T15:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T15:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T15:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T15:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T16:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T16:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T16:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-13T16:45:00+08:00",
              },
            ],
            invitee_events: [],
          },
          %{
            date: "2021-01-14",
            status: "available",
            spots: [
              %{
                status: "available",
                start_time: "2021-01-14T09:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T09:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T09:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T09:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T10:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T10:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T10:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T10:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T11:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T11:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T11:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T11:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T12:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T12:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T12:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T12:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T13:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T13:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T13:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T13:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T14:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T14:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T14:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T14:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T15:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T15:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T15:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T15:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T16:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T16:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T16:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-14T16:45:00+08:00",
              },
            ],
            invitee_events: [],
          },
          %{
            date: "2021-01-15",
            status: "available",
            spots: [
              %{
                status: "available",
                start_time: "2021-01-15T09:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T09:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T09:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T09:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T10:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T10:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T10:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T10:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T11:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T11:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T11:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T11:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T12:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T12:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T12:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T12:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T13:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T13:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T13:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T13:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T14:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T14:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T14:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T14:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T15:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T15:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T15:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T15:45:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T16:00:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T16:15:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T16:30:00+08:00",
              },
              %{
                status: "available",
                start_time: "2021-01-15T16:45:00+08:00",
              },
            ],
            invitee_events: [],
          },
        ]
      }
    )
  end

end
