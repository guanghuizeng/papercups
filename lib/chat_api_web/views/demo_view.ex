defmodule ChatApiWeb.DemoView do
  use ChatApiWeb, :view
  alias ChatApiWeb.DemoView

  def render("index.json", %{demos: demos}) do
    %{data: render_many(demos, DemoView, "demo.json")}
  end

  def render("show.json", %{demo: demo}) do
    %{data: render_one(demo, DemoView, "demo.json")}
  end

  def render("demo.json", %{demo: demo}) do
    %{
      id: demo.id,
      object: "demo",
      name: demo.name,
      count: demo.count
    }
  end
end
