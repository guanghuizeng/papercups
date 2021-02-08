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

      start_at: scheduled_event.start_at,
      end_at: scheduled_event.end_at,
      state: scheduled_event.state,
      duration: scheduled_event.duration,
      link_description: scheduled_event.link_description,
      link_description_html: scheduled_event.link_description_html,
      summary: scheduled_event.summary,
      cancel_reason: scheduled_event.cancel_reason,
      cancel_reason_html: scheduled_event.cancel_reason_html,
      conferencing: scheduled_event.conferencing,
      attendees: scheduled_event.attendees,
    }
  end

  def render("show_public.json", %{scheduled_event: scheduled_event}) do
    %{data: render_one(scheduled_event, ScheduledEventView, "scheduled_event_public.json")}
  end

  def render("scheduled_event_public.json", %{scheduled_event: scheduled_event}) do
    %{
      id: scheduled_event.id,
      object: "scheduled_event",

      start_at: scheduled_event.start_at,
      end_at: scheduled_event.end_at,
      state: scheduled_event.state,
      duration: scheduled_event.duration,
      link_description: scheduled_event.link_description,
      link_description_html: scheduled_event.link_description_html,
      summary: scheduled_event.summary,
      cancel_reason: scheduled_event.cancel_reason,
      cancel_reason_html: scheduled_event.cancel_reason_html,
      conferencing: scheduled_event.conferencing,
      attendees: scheduled_event.attendees,
    }
  end
end
