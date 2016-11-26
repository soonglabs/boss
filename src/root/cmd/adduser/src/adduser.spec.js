describe("adduser command", function() {

  it("should add user", function() {
    client.exec('adduser scott root password');
    expect(boss.fs.validate_user('scott', boss.lib.utils.hashCode('password'))).toBeTruthy();
  });
});