defmodule ChatApiWeb.EventTypeView do
  use ChatApiWeb, :view
  alias ChatApiWeb.EventTypeView

  def render("index.json", %{event_types: event_types}) do
    %{data: render_many(event_types, EventTypeView, "event_type.json")}
  end

  def render("show.json", %{event_type: event_type}) do
    %{data: render_one(event_type, EventTypeView, "event_type.json")}
  end

  def render("event_type.json", %{event_type: event_type}) do
    %{
      id: event_type.id,
      object: "event_type",
      name: event_type.name,
      location: event_type.location,
      description: event_type.description,
      url: event_type.url,
      color: event_type.color,
      period_type: event_type.period_type,
      min_booking_time: event_type.min_booking_time,
      max_booking_time: event_type.max_booking_time,
      start_date: event_type.start_date,
      end_date: event_type.end_date,
      duration: event_type.duration,
      before_buffer_time: event_type.before_buffer_time,
      after_buffer_time: event_type.after_buffer_time,
    }
  end
end
