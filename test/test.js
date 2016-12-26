document.body.innerHTML += '<div id="boss"></div>';
var boss = new Boss(boss_image, 'BOSS-test', 'test');
var client = new TestClient(boss);
client.push(new boss.lib.Login(boss).username);
client.exec('test');
client.exec('test');