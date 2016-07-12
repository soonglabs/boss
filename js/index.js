($(document).ready(function() {
    //start doing stuff!!
    var root;
    if(localStorage['fs.main']){
        root = JSON.parse(localStorage['fs.main']);
    } else{
        root = JSON_IMAGE;
    }

    var main_boss = new Boss(root, 'main');
    var client = new BossTermClient(main_boss);

    $('#terminal').terminal(client.exec, {
        greetings: '',
        name: 'boss',
        prompt: 'username: '
    });
}));