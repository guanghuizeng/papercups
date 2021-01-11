defmodule ChatApiWeb.BookingController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  alias ChatApi.Schedules
  alias ChatApi.Schedules.Schedule


  # ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  def weekday_to_name(weekday) do
    Enum.at(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], weekday)
  end

  def get_spots_per_duration(from_time, to_time, duration) do
    if NaiveDateTime.diff(from_time, to_time) > 0 do
      []
    else
      [
        NaiveDateTime.to_iso8601(from_time) | get_spots_per_duration(
          NaiveDateTime.add(from_time, duration),
          to_time,
          duration
        )
      ]
    end
  end

  def get_spots_per_day(date, final, rules) do
    if Date.diff(date, final) == 0 do
      # stop
      []
    else
      # 根据 day_of_weekday(date), 查询 rule
      # 如果查到，则应用得到 spots
      # 否则，unavailable
      weekday = weekday_to_name(Date.day_of_week(date))
      rule = Enum.find(rules, fn (x) -> x["wday"] == weekday end)
      if rule do
        list_of_spots = Enum.map(
          rule["intervals"],
          fn (x) ->
            %{"from" => from, "to" => to} = x
            {:ok, from_time} = NaiveDateTime.from_iso8601(Date.to_iso8601(date) <> " " <> from <> ":00")
            {:ok, to_time} = NaiveDateTime.from_iso8601(Date.to_iso8601(date) <> " " <> to <> ":00")
            spots = get_spots_per_duration(from_time, to_time, 15 * 60)
            spots
          end
        )
        [
          %{
            date: Date.to_iso8601(date),
            status: "available",
            spots: list_of_spots
          } | get_spots_per_day(Date.add(date, 1), final, rules)
        ]
      else
        [
          %{
            date: Date.to_iso8601(date),
            status: "unavailable",
            spots: []
          } | get_spots_per_day(Date.add(date, 1), final, rules)
        ]
      end
    end
  end

  @doc """
  Get available spots.



  """
  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, params) do
    %{"event_type_id" => event_type_id, "start_time" => start_time, "end_time" => end_time} = params
    # event_type_id => schedule
    # start_time & end_time => list of days
    # date => day of week => rule => spots
    # query events by time
    # remove occupied time from spots
    # return spots

    #    with {:ok, %EventType{} = event_type} <- Events.get_event!(event_type_id) do
    #      with {:ok, %Schedule{} = schedule} <- Schedules.get_schedule!(event_type.schedule_id) do
    #        {:ok, date} = Date.from_iso8601(start_time)
    #        {:ok, end_date} = Date.from_iso8601(end_time)
    #        rules = JSON.decode(schedule.rules)
    #        spots = get_spots_per_day(date, end_time, rules)
    #        json(
    #          conn,
    #          %{
    #            ok: true,
    #            data: spots
    #          }
    #        )
    #      end
    #    end

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
