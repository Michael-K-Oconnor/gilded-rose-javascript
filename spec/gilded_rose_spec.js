describe("Gilded Rose", function() {
  it("Normal items sell_in decreases 1 day at a time if not past sell_in date", function() {
    let items = [];
    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item("Aged Brie", 2, 0));
    items.push(new Item("Elixir of the Mongoose", 5, 7));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    items.push(new Item("Conjured Mana Cake", 3, 6));
    update_quality(items);
    expect(items[0].sell_in).toEqual(9);
    expect(items[1].sell_in).toEqual(1);
    expect(items[2].sell_in).toEqual(4);
    expect(items[3].sell_in).toEqual(14);
    expect(items[4].sell_in).toEqual(4);
  });

  it("Sulfuras sell_in is 0 and doesnt change", function() {
    let items = [];
    items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    update_quality(items);
    expect(items[0].sell_in).toEqual(0);
  });

  it("Quaility can never be less than 0", function() {
    let items = [];
    items.push(new Item("+5 Dexterity Vest", 10, 0));
    items.push(new Item("Aged Brie", 2, 0));
    items.push(new Item("Elixir of the Mongoose", 5, 0));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 0));
    items.push(new Item("Conjured Mana Cake", 3, 0));
    update_quality(items);
    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(1);
    expect(items[2].quality).toEqual(0);
    expect(items[3].quality).toEqual(1);
    expect(items[4].quality).toEqual(0);
  });

  it("Most items quality decreases by 1 normally", function() {
    let items = [];
    items.push(new Item("+5 Dexterity Vest", 10, 2));
    items.push(new Item("Elixir of the Mongoose", 5, 2));
    update_quality(items);
    expect(items[0].quality).toEqual(1);
    expect(items[1].quality).toEqual(1);
  });

  it("After sell_in day is 0, quality decreases twice as fast", function() {
    let items = [];
    items.push(new Item("+5 Dexterity Vest", 0, 20));
    items.push(new Item("Elixir of the Mongoose", 0, 7));
    items.push(new Item("Conjured Mana Cake", -1, 6));
    update_quality(items);
    expect(items[0].quality).toEqual(18);
    expect(items[1].quality).toEqual(5);
    expect(items[2].quality).toEqual(2);
  });

  it("Aged brie quality increases by 1", function() {
    let items = [];
    items.push(new Item("Aged Brie", 2, 0));
    update_quality(items);
    expect(items[0].quality).toEqual(1);
  });

  it("Quality can never be more than 50, except Sulfuras", function() {
    let items = [];
    items.push(new Item("Aged Brie", 2, 50));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50));
    update_quality(items);
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
  });

  it("Sulfuras quality is 80 and never alters", function() {
    let items = [];
    items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    update_quality(items);
    expect(items[0].quality).toEqual(80);
  });

  it("Backstage pass quality increases by 2 when sellin days is 10 or less", function() {
    let items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 6, 16));
    update_quality(items);
    expect(items[0].quality).toEqual(22);
    expect(items[1].quality).toEqual(18);
  });

  it("Backstage pass quality increases by 3 when sellin days is 5 or less", function() {
    let items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 16));
    update_quality(items);
    expect(items[0].quality).toEqual(23);
    expect(items[1].quality).toEqual(19);
  });

  it("Backstage pass quality is 0 when sell_in is 0 days or less", function() {
    let items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5));
    update_quality(items);
    expect(items[0].quality).toEqual(0);
  });

  it("Conjoured items decrease twice as fast", function() {
    let items = [];
    items.push(new Item("Conjured Mana Cake", 3, 6));
    update_quality(items);
    expect(items[0].quality).toEqual(4);
  });
});
