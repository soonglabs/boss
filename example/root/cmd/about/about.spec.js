describe("about command", function() {

  it("should have output", function() {
    client.exec('about');
    expect(client.text).toBeDefined();
    client.clear();
  });
});