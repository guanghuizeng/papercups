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
      description: event_type.description,
      url: event_type.url,
      color: event_type.color,
    }
  end
end
