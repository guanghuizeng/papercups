defmodule ChatApiWeb.BookingController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Events
  alias ChatApi.Events.Event

  alias ChatApi.EventTypes
  alias ChatApi.EventTypes.EventType

  alias ChatApi.Schedules
  alias ChatApi.Schedules.Schedule


  # ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  def weekday_to_name(weekday) do
    Enum.at(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], weekday - 1)
  end

  def get_spots_per_duration(from_time, to_time, duration) do
    if DateTime.diff(from_time, to_time) > 0 do
      []
    else
      [
        %{start_time: DateTime.to_iso8601(from_time)} | get_spots_per_duration(
          DateTime.add(from_time, duration),
          to_time,
          duration
        )
      ]
    end
  end

  def get_spots_by_day(date, final, rules) do
    if Date.diff(date, final) > 0 do
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
            {:ok, from_time, _offset} = DateTime.from_iso8601(Date.to_iso8601(date) <> " " <> from <> ":00+08:00")
            {:ok, to_time, _offset} = DateTime.from_iso8601(Date.to_iso8601(date) <> " " <> to <> ":00+08:00")
            spots = get_spots_per_duration(from_time, to_time, 15 * 60)
            spots
          end
        )
        [
          %{
            date: Date.to_iso8601(date),
            status: "available",
            spots: list_of_spots
          } | get_spots_by_day(Date.add(date, 1), final, rules)
        ]
      else
        [
          %{
            date: Date.to_iso8601(date),
            status: "unavailable",
            spots: []
          } | get_spots_by_day(Date.add(date, 1), final, rules)
        ]
      end
    end
  end

  def filter_out_unavailable_time(start_date, to_date, spots_by_day) do
    # get events by start_time, filter by date range, start & to
    # find time spot, remove
    # get new spots
    # Events.list_by_start_time()
    with {:ok, from_time, _offset} = DateTime.from_iso8601(start_date <> "T00:00:00+08:00"),
         {:ok, to_time, _offset} = DateTime.from_iso8601(to_date <> "T23:59:59+08:00") do
      events = Events.list_by_start_time(from_time, to_time)
      Enum.map(
        spots_by_day,
        fn (spots) ->
          event = Enum.find(events, fn (e) -> spots.date == Date.to_iso8601(DateTime.to_date(e.start_time)) end)
          if event do
            %{
              date: spots.date,
              status: spots.status,
              spots: Enum.at(
                Enum.map(
                  spots.spots,
                  fn s ->
                    Enum.filter(
                      s,
                      fn spot ->
                        {:ok, start_time, _offset} = DateTime.from_iso8601(spot.start_time)
#                        Logger.info("==")
#                        Logger.info(inspect(start_time))
#                        Logger.info(inspect(event.start_time))
#                        Logger.info(inspect(DateTime.compare(start_time, event.start_time)))
#                        Logger.info(inspect(DateTime.compare(start_time, event.start_time) != :eq))
                        DateTime.compare(start_time, event.start_time) != :eq
                      end
                    )
                  end
                ),
                0
              )
            }
          else
            %{
              date: spots.date,
              status: spots.status,
              spots: Enum.at(
                spots.spots,
                0
              )
            }
          end
        end
      )
    end
  end

  def test_spots() do
#    raw_rules = ~s([{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"monday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"tuesday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"wednesday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"thursday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"friday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"saturday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"sunday"}])
    raw_rules = ~s([{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"monday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"tuesday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"wednesday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"thursday"},{"type":"wday","intervals":[{"from":"09:00","to":"17:00"}],"wday":"friday"}])
    {:ok, rules} = Jason.decode(raw_rules)

    start = "2021-01-01"
    end_date = "2021-01-31"

    {:ok, start_date} = Date.from_iso8601(start)
    {:ok, final_date} = Date.from_iso8601(end_date)

    spots_by_day = get_spots_by_day(start_date, final_date, rules)
    Logger.info(inspect(spots_by_day))
    filter_out_unavailable_time(start, end_date, spots_by_day)
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

    event_type = EventTypes.get_event_type!(event_type_id)
    schedule = Schedules.get_schedule!(event_type.schedule_id)
    {:ok, rules} = Jason.decode(schedule.rules)
    {:ok, start_date} = Date.from_iso8601(start_time)
    {:ok, final_date} = Date.from_iso8601(end_time)
    spots_by_day = get_spots_by_day(start_date, final_date, rules)
    conn
    |> render("show.json", spots: filter_out_unavailable_time(start_time, end_time, spots_by_day))

  end

end
