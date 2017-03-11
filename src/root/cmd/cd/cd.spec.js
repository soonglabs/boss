describe("adduser command", function() {

  it("change directory", function() {
    client.exec('cd Documents');
    expect(client.cwd).toEqual('/home/test/Documents');
    client.exec('cd /');
    expect(client.cwd).toEqual('/');
    client.exec('cd ~');
    expect(client.cwd).toEqual('/home/test');
    client.exec('cd ..');
    expect(client.cwd).toEqual('/home');
    client.exec('cd ./test');
    expect(client.cwd).toEqual('/home/test');
    client.exec('cd ~/Documents');
    expect(client.cwd).toEqual('/home/test/Documents');
  });
});