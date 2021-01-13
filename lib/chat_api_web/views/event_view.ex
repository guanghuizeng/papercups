defmodule ChatApiWeb.EventView do
  use ChatApiWeb, :view
  alias ChatApiWeb.EventView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{
      id: event.id,
      object: "event",
      guest_name: event.guest_name,
      start_time: event.start_time
    }
  end
end
