document.body.innerHTML += '<div id="boss"></div>';
var boss = new Boss(JSON_IMAGE, 'BOSS-test');
var client = new TestClient(boss);
client.exec('root');
client.exec('pass');