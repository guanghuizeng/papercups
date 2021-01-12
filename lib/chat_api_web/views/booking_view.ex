defmodule ChatApiWeb.BookingView do
  use ChatApiWeb, :view

  alias ChatApiWeb.BookingView

  def render("show.json", %{spots: spots}) do
    %{data: render_many(spots, BookingView, "spot.json")}
  end


  def render("spot.json", %{booking: booking}) do
#    {:ok, result} = Jason.encode(booking)
#    result
    booking
  end
end
