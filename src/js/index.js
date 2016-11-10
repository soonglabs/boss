($(document).ready(function() {
    //start doing stuff!!
    var root = JSON_IMAGE;
    var name = 'BOSS-dev';
    var main_boss = new Boss(root, name);
    var client = new BossTermClient(main_boss);

    $('#terminal').terminal(client.exec, {
        greetings: '',
        name: 'boss',
        prompt: name + '$ username:'
    });
}));