document.body.innerHTML += '<div id="boss"></div>';
var boss = new Boss(boss_image, 'BOSS-test', 'test', {
    save: function(root){
        //DO NOTHING
    }
});
var client = new TestClient(boss);
client.exec('test');
client.exec('test');