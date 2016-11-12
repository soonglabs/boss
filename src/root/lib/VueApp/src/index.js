(function(template, config){
    'use strict';
    $('body').append(template);
    return new Vue(config);
});