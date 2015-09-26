defmodule <%= pkgCapitalizedName %>.Mixfile do
  use Mix.Project

  @name "<%= pkgCapitalizedName %>"

  @description """
    <%= pkgDescription %>
  """

  @version "<%= pkgVersion %>"

  @repo "https://github.com/<%= userName %>/<%= pkgSlugName %>"

  def project do
    [app: :<%= pkgSlugName %>,
     version: @version,
     elixir: "~> 1.0",
     name: @name,
     description: @description,
     package: package,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps,
     source_url: @repo]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [applications: [:logger]]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type `mix help deps` for more examples and options
  defp deps do
    []
  end

  defp package do
    [ contributors: ["<%= authorName %>"],
      licenses: ["<%= license %>"],
      links: %{"Github" => @repo} ]
  end
end
