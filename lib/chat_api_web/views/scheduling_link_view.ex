defmodule ChatApiWeb.SchedulingLinkView do
  use ChatApiWeb, :view
  alias ChatApiWeb.SchedulingLinkView

  def render("index.json", %{scheduling_links: scheduling_links}) do
    %{data: render_many(scheduling_links, SchedulingLinkView, "scheduling_link.json")}
  end

  def render("show.json", %{scheduling_link: scheduling_link}) do
    %{data: render_one(scheduling_link, SchedulingLinkView, "scheduling_link.json")}
  end

  def render("scheduling_link.json", %{scheduling_link: scheduling_link}) do
    %{
      id: scheduling_link.id,
      object: "scheduling_link",
      name: scheduling_link.name,
      location: scheduling_link.location,
      description: scheduling_link.description,
      url: scheduling_link.url,
      color: scheduling_link.color,
      fields: scheduling_link.fields,
      email_reminders: scheduling_link.email_reminders,
      organizer: scheduling_link.organizer,
      period_type: scheduling_link.period_type,
      min_booking_time: scheduling_link.min_booking_time,
      max_booking_time: scheduling_link.max_booking_time,
      start_date: scheduling_link.start_date,
      end_date: scheduling_link.end_date,
      durations: scheduling_link.durations,
      before_buffer_time: scheduling_link.before_buffer_time,
      after_buffer_time: scheduling_link.after_buffer_time,
      created_at: scheduling_link.inserted_at,
    }
  end
end
