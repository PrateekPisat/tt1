defmodule Tt1.TimeTest do
  use Tt1.DataCase

  alias Tt1.Time

  describe "blocks" do
    alias Tt1.Time.Block

    @valid_attrs %{end: ~N[2010-04-17 14:00:00.000000], start: ~N[2010-04-17 14:00:00.000000]}
    @update_attrs %{end: ~N[2011-05-18 15:01:01.000000], start: ~N[2011-05-18 15:01:01.000000]}
    @invalid_attrs %{end: nil, start: nil}

    def block_fixture(attrs \\ %{}) do
      {:ok, block} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Time.create_block()

      block
    end

    test "list_blocks/0 returns all blocks" do
      block = block_fixture()
      assert Time.list_blocks() == [block]
    end

    test "get_block!/1 returns the block with given id" do
      block = block_fixture()
      assert Time.get_block!(block.id) == block
    end

    test "create_block/1 with valid data creates a block" do
      assert {:ok, %Block{} = block} = Time.create_block(@valid_attrs)
      assert block.end == ~N[2010-04-17 14:00:00.000000]
      assert block.start == ~N[2010-04-17 14:00:00.000000]
    end

    test "create_block/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Time.create_block(@invalid_attrs)
    end

    test "update_block/2 with valid data updates the block" do
      block = block_fixture()
      assert {:ok, block} = Time.update_block(block, @update_attrs)
      assert %Block{} = block
      assert block.end == ~N[2011-05-18 15:01:01.000000]
      assert block.start == ~N[2011-05-18 15:01:01.000000]
    end

    test "update_block/2 with invalid data returns error changeset" do
      block = block_fixture()
      assert {:error, %Ecto.Changeset{}} = Time.update_block(block, @invalid_attrs)
      assert block == Time.get_block!(block.id)
    end

    test "delete_block/1 deletes the block" do
      block = block_fixture()
      assert {:ok, %Block{}} = Time.delete_block(block)
      assert_raise Ecto.NoResultsError, fn -> Time.get_block!(block.id) end
    end

    test "change_block/1 returns a block changeset" do
      block = block_fixture()
      assert %Ecto.Changeset{} = Time.change_block(block)
    end
  end
end
