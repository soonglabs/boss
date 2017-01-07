(function(){
    'use strict';
    //this binds the boss component to #boss element
    //e.g. <div id="boss"></div>
    //why do we do this? So the user doesn't need
    //to know anything about Vuejs and all view
    //code and templates are in the image


    //register boss component
    Vue.component('boss', {
        template: `<div>
                    <div>
                        <nav class="nav">
                            <a href="#"><span>&#931</span></a>
                            <a href="#"><span>Apps</span></a>
                        </nav>
                    </div>
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