defmodule ChatApiWeb.ScheduledEventView do
  use ChatApiWeb, :view
  alias ChatApiWeb.ScheduledEventView

  def render("index.json", %{scheduled_events: scheduled_events}) do
    %{data: render_many(scheduled_events, ScheduledEventView, "scheduled_event.json")}
  end

  def render("show.json", %{scheduled_event: scheduled_event}) do
    %{data: render_one(scheduled_event, ScheduledEventView, "scheduled_event.json")}
  end

  def render("scheduled_event.json", %{scheduled_event: scheduled_event}) do
    %{
      id: scheduled_event.id,
      object: "scheduled_event",
      invitee_full_name: scheduled_event.invitee_full_name,
      invitee_email: scheduled_event.invitee_email,
      guest_name: scheduled_event.guest_name,
      start_time: scheduled_event.start_time
    }
  end

  def render("show_public.json", %{scheduled_event: scheduled_event}) do
    %{data: render_one(scheduled_event, ScheduledEventView, "scheduled_event_public.json")}
  end

  def render("scheduled_event_public.json", %{scheduled_event: scheduled_event}) do
    %{
      id: scheduled_event.id,
      object: "scheduled_event",
      invitee_full_name: scheduled_event.invitee_full_name,
      invitee_email: scheduled_event.invitee_email,
      guest_name: scheduled_event.guest_name,
      start_time: scheduled_event.start_time
    }
  end
end
