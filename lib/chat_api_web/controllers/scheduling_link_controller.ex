defmodule ChatApiWeb.SchedulingLinkController do
  require Logger
  use ChatApiWeb, :controller

  alias ChatApi.Users

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
                    byday: byday,
                    startTime: startTime,
                    endTime: endTime,
                  } = rule

                  if (Enum.member?(byday, day)) do
                    %{
                      start: DateTime.add(current, startTime * 60, :second),
                      end: DateTime.add(current, endTime * 60, :second),
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
        {:ok, startTime, 0} = DateTime.from_iso8601(interval.start)
        {:ok, endTime, 0} = DateTime.from_iso8601(interval.end)
        %{
          start: startTime,
          end: endTime
        }
      end
    )
  end

  def sort_intervals(intervals) do
    Enum.sort(intervals, &(DateTime.compare(&1.start, &2.start) != :gt))
  end

  def eliminate_intervals(intervals, current) do
    interval = Enum.at(intervals, 0)
    if interval do
      if (
           DateTime.compare(current.end, interval.start) == :gt || DateTime.compare(
             current.end,
             interval.start
           ) == :eq) do
        eliminate_intervals(Enum.slice(intervals, 1..-1), %{start: current.start, end: max(current.end, interval.end)})
      else
        [
          %{start: current.start, end: current.end} |
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
          start: first.end,
          end: second.start
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
          start: startTime,
          end: endTime
        }
      ]
    else
      first = Enum.at(intervals, 0)
      last = Enum.at(intervals, -1)
      [
        if (DateTime.compare(startTime, first.start) == :lt) do
          %{
            start: startTime,
            end: first.start
          }
        else
          []
        end
        | complement_intervals(intervals)
      ] ++ if (DateTime.compare(endTime, last.end) == :gt) do
        [
          %{
            start: last.end,
            end: endTime
          }
        ]
      else
        []
      end
    end
  end

  def test_eliminate_intervals() do
    intervals = []

  end

  def test_get_intervals() do
    day = 60 * 60 * 24
    schedules = [
      %{
        rules: [%{
          byday: [
            "mo",
            "tu",
            "we",
            "th",
            "fr",
            "sa",
            "su",
          ],
          endTime: 1020,
          startTime: 540
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

    allow_overrides = [
      %{
        "type": "allow",
        "start": "2021-02-01T18:00:00Z",
        "end": "2021-02-01T20:00:00Z"
      },
    ]

    block_overrides = [
      %{
        "type": "block",
        "start": "2021-02-01T10:00:00Z",
        "end": "2021-02-01T11:00:00Z"
      },
      %{
        "type": "block",
        "start": "2021-02-02T16:00:00Z",
        "end": "2021-02-02T18:00:00Z"
      }
    ]

    {:ok, startTime, 0} = DateTime.from_iso8601("2021-01-30T00:00:00Z")
    endTime = DateTime.add(startTime, day * 7, :second)

    intervals_from_schedules = schedules_to_intervals(startTime, endTime, schedules)
    intervals_with_overrides = combine_intervals(intervals_from_schedules, allow_overrides)
    Logger.info(inspect(intervals_with_overrides))
    sorted_intervals = sort_intervals(intervals_with_overrides)
    Logger.info(inspect(sorted_intervals))
    eliminated_intervals = eliminate_intervals(sorted_intervals)
    Logger.info(inspect(eliminated_intervals))
    complemented_intervals = complement_intervals(startTime, endTime, eliminated_intervals) # as result

    complement_intervals_overrides = combine_intervals(complemented_intervals, block_overrides)
    eliminate_intervals(sort_intervals(complement_intervals_overrides))

  end

  @doc """
  return available intervals for the scheduling link
  """
  def intervals_trial() do
    # predefined
    # from time, to time
    # scheduling link: preset schedules, overrides
    # scheduled events

    # step 1: preset schedules => intervals


  end

  @doc """
  get available intervals for given scheduling link



  """
  @spec intervals(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def intervals(conn, %{"user" => user, "link" => link, "from" => from, "to" => to}) do
    user_info = Users.get_user_info_by_slug(user)
    if user_info do
      scheduling_link = SchedulingLinks.get_scheduling_link_by_url(user_info.user_id, link)

      # find related scheduled events
      scheduled_events = []


      Logger.info(inspect(scheduling_link))
    else

    end

    json(
      conn,
      %{
        data: [
          %{
            "endAt": "2021-01-28T09:00:00Z",
            "rank": 1,
            "startAt": "2021-01-28T07:50:00Z"
          },
          %{
            "endAt": "2021-01-28T14:00:00.000Z",
            "rank": 1,
            "startAt": "2021-01-28T12:00:00.000Z"
          },
          %{
            "endAt": "2021-01-29T09:00:00.000Z",
            "rank": 1,
            "startAt": "2021-01-29T01:00:00.000Z"
          },
          %{
            "endAt": "2021-01-29T14:00:00.000Z",
            "rank": 1,
            "startAt": "2021-01-29T12:00:00.000Z"
          },
          %{
            "endAt": "2021-01-30T09:00:00.000Z",
            "rank": 1,
            "startAt": "2021-01-30T01:00:00.000Z"
          }
        ]
      }
    )
  end
end
