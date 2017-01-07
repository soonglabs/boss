(function(){
    'use strict';
    //this binds the boss component to #boss
    //e.g. <div id="boss"></div>

    //register boss component
    Vue.component('boss', {
        template: `<div>
                        <div id="header">
                    <span>&#931 boss</span>
                    </div>
                    <div id="glayout">
                        <div id="logo">&#931</div>
                    </div>
                </div>`
    });

    //add the boss component
    $('#boss').html('<boss></boss>');

    //create vue instance
    var vm = new Vue({
        el: '#boss'
    });
});