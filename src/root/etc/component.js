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
                    <header class="navbar">
                        <section class="navbar-section">
                            <a href="#" v-on:click="toggleAbout"><span><strong>&#931</strong></span></a>
                            <div class="dropdown">
                                <a href="#" v-on:click="update" class="dropdown-toggle" tabindex="0">
                                    Apps <i class="icon-caret"></i>
                                </a>
                                <ul class="menu">
                                    <li v-for="app in getApps()" class="menu-item">
                                        <a v-on:click="startApp(app)" href="#">[ {{app}} ]</a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                         <section class="navbar-section">
                            <span>{{date}}</span>
                        </section>
                    </header>

                    <div id="glayout"></div>
                    <div id="logo">&#931</div>

                    <!-- about modal -->
                    <div id="about-modal" class="modal">
                        <div class="modal-overlay"></div>
                        <div class="modal-container">
                            <div class="modal-header">
                                <button v-on:click="toggleAbout" class="btn btn-clear float-right"></button>
                                <div class="modal-title">About Boss</div>
                            </div>
                            <div class="modal-body">
                                <div class="content">
                                    <pre>Browser Operating System Simulator (BOSS) v0.0.1
Copyright 2017 -- Soong Research Labs</pre>
                                </div>
                            </div>
                        </div>
                    </div>

                  </div>`,
        data: function(){
            return {
                date: new Date().toLocaleDateString()
            }
        },
        methods: {
            toggleAbout: function(){
                $('#about-modal').toggleClass('active');
            },
            startApp: function(app){
                boss.app[app]('', boss.lib.navbar.getClient());
            },
            getApps: function(){
                return boss.navbar.apps;
            },
            update: function(){
                this.$forceUpdate();
            }
        }
    });

    //register apps with navbar
    boss.lib.navbar.setApps(Object.keys(boss.app));

    //add the boss component
    $('#boss').html('<boss></boss>');

    //create vue instance
    var vm = new Vue({
        el: '#boss'
    });
});