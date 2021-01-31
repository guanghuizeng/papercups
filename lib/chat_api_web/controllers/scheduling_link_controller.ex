defmodule ChatApiWeb.SchedulingLinkController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Users

  alias ChatApi.Schedules
  alias ChatApi.Schedules.Schedule

  alias ChatApi.SchedulingLinks
  alias ChatApi.SchedulingLinks.SchedulingLink

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, filters) do
    with %{id: user_id} <- conn.assigns.current_user do
      scheduling_links = SchedulingLinks.list_scheduling_links_by_user(user_id, filters)
      render(conn, "index.json", scheduling_links: scheduling_links)
    end
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => id}) do
    scheduling_link = SchedulingLinks.get_scheduling_link!(id)
    render(conn, "show.json", scheduling_link: scheduling_link)
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"user" => user, "link" => link}) do
    #    scheduling_link = SchedulingLinks.get_scheduling_link!(id)
    Logger.info(inspect(user))
    Logger.info(inspect(link))

    user_info = Users.get_user_info_by_slug(user)
    if user_info do
      scheduling_link = SchedulingLinks.get_scheduling_link_by_url(user_info.user_id, link)
      Logger.info(inspect(scheduling_link))
      render(conn, "show.json", scheduling_link: scheduling_link)
    else
      Logger.info(inspect(user_info))
      render(
        conn,
        "show.json",
        scheduling_link: %{
          id: 1
        }
      )
    end
  end


  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"scheduling_link" => scheduling_link_params}) do
    %{
      "name" => name,
      "description" => description,
      "durations" => durations,
      "location" => location,
      "url" => url,
      "color" => color,
      "fields" => fields,
      "email_reminders" => email_reminders,
      "organizer" => organizer,
    } = scheduling_link_params

    with %{account_id: account_id, id: author_id} <- conn.assigns.current_user,
         #         {:ok, %Schedule{} = schedule} <-
         #           Schedules.create_default_schedule(),
         {:ok, %SchedulingLink{} = scheduling_link} <-
           SchedulingLinks.create_scheduling_link(
             %{
               name: name,
               description: description,
               durations: durations,
               location: location,
               url: url,
               color: color,
               fields: fields,
               email_reminders: email_reminders,
               organizer: organizer
               #             schedule: schedule,
             }
           ) do
      conn
      |> put_status(:created)
      |> render("show.json", scheduling_link: scheduling_link)
    end
  end

  @spec update(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def update(conn, %{"id" => id, "scheduling_link" => scheduling_link_params}) do
    scheduling_link = SchedulingLinks.get_scheduling_link!(id)

    with {:ok, %SchedulingLink{} = scheduling_link} <- SchedulingLinks.update_scheduling_link(
      scheduling_link,
      scheduling_link_params
    ) do
      render(conn, "show.json", scheduling_link: scheduling_link)
    end
  end

  def preset_to_intervals() do

  end

  def weekday_label(day) do
    Enum.at(["mo", "tu", "we", "th", "fr", "sa", "su"], day - 1)
  end

  @doc """
  schedules = [
    {
      rules: [
        byday: [
          'mo',
          'tu',
          'fr',
          'sa',
        ],
        start: "2021-01-29 17:18:14.747035+08:00"
        end: "2021-01-31 17:18:14.747035+08:00"
      ]
    } ,
    {
      rules: [
        byday: [
          'mo',
          'tu',
          'fr',
          'sa',
        ],
        start: "2021-01-29 10:18:14.747035+08:00"
        end: "2021-01- 10:18:14.747035+08:00"
      ]
    }
  ]
  """
  def schedules_to_intervals(current, endTime, schedules) do
    day_seconds = 60 * 60 * 24
    if (DateTime.compare(current, endTime) != :eq) do
      day = weekday_label(Date.day_of_week(DateTime.to_date(current)))
      Enum.filter(
        List.flatten(
          Enum.map(
            schedules,
            fn (schedule) ->
              Enum.map(
                schedule.rules,
                fn (rule) ->
                  %{
                    "byday" => byday,
                    "startTime" => startTime,
                    "endTime" => endTime,
                  } = rule

                  if (Enum.member?(byday, day)) do
                    %{
                      startAt: DateTime.add(current, startTime * 60, :second),
                      endAt: DateTime.add(current, endTime * 60, :second),
                    }
                  end
                end
              )
            end
          )
        ),
        fn (x) -> x != nil end
      ) ++ schedules_to_intervals(DateTime.add(current, day_seconds, :second), endTime, schedules)
    else
      []
    end
  end

  def combine_intervals(intervals, others) do
    intervals ++
    Enum.map(
      others,
      fn (interval) ->
        with %{"startAt" => startAt, "endAt" => endAt} <- interval do
          {:ok, startTime, 0} = DateTime.from_iso8601(startAt)
          {:ok, endTime, 0} = DateTime.from_iso8601(endAt)
          %{
            startAt: startTime,
            endAt: endTime
          }
        end
      end
    )
  end

  def sort_intervals(intervals) do
    Enum.sort(intervals, &(DateTime.compare(&1.startAt, &2.startAt) != :gt))
  end

  def eliminate_intervals(intervals, current) do
    interval = Enum.at(intervals, 0)
    if interval do
      if (
           DateTime.compare(current.endAt, interval.startAt) == :gt || DateTime.compare(
             current.endAt,
             interval.startAt
           ) == :eq) do
        eliminate_intervals(
          Enum.slice(intervals, 1..-1),
          %{startAt: current.startAt, endAt: max(current.endAt, interval.endAt)}
        )
      else
        [
          %{startAt: current.startAt, endAt: current.endAt} |
          eliminate_intervals(Enum.slice(intervals, 1..-1), Enum.at(intervals, 0))
        ]
      end
    else
      [current]
    end
  end

  def eliminate_intervals(intervals) do
    eliminate_intervals(Enum.slice(intervals, 1..-1), Enum.at(intervals, 0))
  end

  def complement_intervals(intervals) do
    first = Enum.at(intervals, 0)
    second = Enum.at(intervals, 1)
    if (second) do
      [
        %{
          startAt: first.endAt,
          endAt: second.startAt
        } |
        complement_intervals(Enum.slice(intervals, 1..-1))
      ]
    else
      []
    end
  end

  def complement_intervals(startTime, endTime, intervals) do
    if (length(intervals) == 0) do
      [
        %{
          startAt: startTime,
          endAt: endTime
        }
      ]
    else
      first = Enum.at(intervals, 0)
      last = Enum.at(intervals, -1)
      [
        if (DateTime.compare(startTime, first.startAt) == :lt) do
          %{
            startAt: startTime,
            endAt: first.startAt
          }
        else
          []
        end
        | complement_intervals(intervals)
      ] ++ if (DateTime.compare(endTime, last.endAt) == :gt) do
        [
          %{
            startAt: last.endAt,
            endAt: endTime
          }
        ]
      else
        []
      end
    end
  end

  def intervals(startTime, endTime, schedules, overrides) do
    allow_overrides = Enum.filter(overrides, fn (rule) -> Map.get(rule, "type") == "allow" end)
    block_overrides = Enum.filter(overrides, fn (rule) -> Map.get(rule, "type") == "block" end)

    intervals_from_schedules = schedules_to_intervals(startTime, endTime, schedules)
    intervals_with_overrides = combine_intervals(intervals_from_schedules, allow_overrides)
    sorted_intervals = sort_intervals(intervals_with_overrides)
    eliminated_intervals = eliminate_intervals(sorted_intervals)
    complemented_intervals = complement_intervals(startTime, endTime, eliminated_intervals) # as result

    complement_intervals_overrides = combine_intervals(complemented_intervals, block_overrides)
    complement_intervals(startTime, endTime, eliminate_intervals(sort_intervals(complement_intervals_overrides)))

  end

  def test_get_intervals() do
    day = 60 * 60 * 24
    schedules = [
      %{
        "rules" => [%{
          "byday" => [
            "mo",
            "tu",
            "we",
            "th",
            "fr",
            "sa",
            "su",
          ],
          "endTime" => 1020,
          "startTime" => 540
        }]
      },
      #      %{
      #        rules: [%{
      #          byday: [
      #            "mo"
      #          ],
      #          endTime: 780,
      #          startTime: 540
      #        }]
      #      }
    ]

    overrides = [
      %{
        "type" => "allow",
        "startAt" => "2021-02-01T18:00:00Z",
        "endAt" => "2021-02-01T20:00:00Z"
      },
      %{
        "type" => "block",
        "startAt" => "2021-02-01T10:00:00Z",
        "endAt" => "2021-02-01T11:00:00Z"
      },
      %{
        "type" => "block",
        "startAt" => "2021-02-02T16:00:00Z",
        "endAt" => "2021-02-02T18:00:00Z"
      }
    ]

    {:ok, startTime, 0} = DateTime.from_iso8601("2021-01-30T00:00:00Z")
    endTime = DateTime.add(startTime, day * 7, :second)

    intervals(startTime, endTime, schedules, overrides)
  end

  @doc """
  get available intervals for given scheduling link

    # 1. preset schedules
    # 2. overrides
    # 3. scheduled events
  """
  @spec intervals(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def intervals(conn, %{"user" => user, "link" => link, "from" => from, "to" => to}) do
    user_info = Users.get_user_info_by_slug(user)
    if user_info do
      with {:ok, startTime, 28800} <- DateTime.from_iso8601(from),
           {:ok, endTime, 28800} <- DateTime.from_iso8601(to),
           scheduling_link <- SchedulingLinks.get_scheduling_link_by_url(user_info.user_id, link),
           %{"organizer": organizer} <- scheduling_link,
           %{"availability" => availability} <- organizer,
           %{"overrides" => overrides, "presets" => presets} <- availability,
           schedules <- Schedules.list_schedules_by_ids(presets)
        do
#        Logger.info(inspect(availability))
#        Logger.info(inspect(presets))
#
#        Logger.info("===========")
#
#        Logger.info(inspect(startTime))
#        Logger.info(inspect(endTime))
#        Logger.info(inspect(schedules))
#        Logger.info(inspect(overrides))
#
#
#        Logger.info(inspect(intervals(startTime, endTime, schedules, overrides)))

        scheduled_events = []

        json(
          conn,
          %{
            data: intervals(startTime, endTime, schedules, overrides)
          }
        )
      end



    else
            json(
              conn,
              %{
                data: [

                ]
              }
            )
    end

  end
end
