($(document).ready(function() {
    //start doing stuff!!
    var root = JSON_IMAGE;
    var name = 'BOSS-dev';
    var boss = new Boss(root, name);
    var client = new BossTermClient(boss);
    //let's open in the shell!
    boss.cmd['shell'](null, client);
}));