(function(){
    'use strict';
    //this binds the boss component to #boss
    //e.g. <div id="boss"></div>
    //we also register boss sub components here

    //register header component
    Vue.component('boss-hd', {
        template: `<div id="header">
                        <span>&#931 boss</span>
                  </div>`
    });

    //register boss component
    Vue.component('boss', {
        template: `<div>
                    <boss-hd></boss-hd>
                    <div id="glayout"></div>
                    <div id="logo">&#931</div>
                  </div>`
    });

    //add the boss component
    $('#boss').html('<boss></boss>');

    //create vue instance
    var vm = new Vue({
        el: '#boss'
    });
});