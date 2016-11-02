($(document).ready(function() {
    //start doing stuff!!
    var root = JSON_IMAGE;
    var main_boss = new Boss(root, 'main');
    var client = new BossTermClient(main_boss);

    $('#terminal').terminal(client.exec, {
        greetings: '',
        name: 'boss',
        prompt: 'username: '
    });
}));