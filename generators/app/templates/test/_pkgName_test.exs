defmodule <%= pkgCapitalizedName %>Test do
  use ExUnit.Case

  test "should return a hello message" do
    assert <%= pkgCapitalizedName %>.awesome "Livia" == "Hello Livia"
  end
end
