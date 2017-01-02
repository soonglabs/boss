describe("echo command", function() {

  it("should output string", function() {
    client.exec('echo test');
    expect(client.text).toEqual('test');
    client.clear();
  });
});