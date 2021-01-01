defmodule ChatApiWeb.ScheduleView do
  use ChatApiWeb, :view
  alias ChatApiWeb.ScheduleView

  def render("index.json", %{schedules: schedules}) do
    %{data: render_many(schedules, ScheduleView, "schedule.json")}
  end

  def render("show.json", %{schedule: schedule}) do
    %{data: render_one(schedule, ScheduleView, "schedule.json")}
  end

  def render("schedule.json", %{schedule: schedule}) do
    %{
      id: schedule.id,
      object: "schedule",
      name: schedule.name,
      rules: schedule.rules,
      timezone: schedule.timezone,
    }
  end
end
