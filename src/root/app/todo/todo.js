(function(args, client){
    'use strict';

    var counter = window.app_number++;
    //load componenets
    eval(boss.fs.get_file('/app/todo', 'components.js'));

    var config = {
        title: 'todo',
        type: 'component',
        componentName: 'todo-' + counter,
        componentState: {}
    };

    window.layout.registerComponent('todo-' + counter, function( container, state ){
        container.getElement().html(
            '<div id="app-' + counter + '" class="app">' +
                '<todo-app>' +
                '</todo-app>' +
            '</div>'
        );
    });

    window.layout.root.contentItems[0].addChild(config);

    var vm = new Vue({
        el: '#app-' + counter
    });
});