describe("adduser command", function() {

  it("should add user", function() {
    client.exec('adduser steve root password');
    expect(boss.fs.validate_user('steve', boss.lib.utils.hashCode('password'))).toBeTruthy();
  });
});