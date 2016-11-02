(function(args, client, config){
    
    this.config = config;
    
    client.toolbar.set_title(config.name);
    
    //add template to body        
    $('body').append(config.template);
    
    //add css
    var target = $(config.selector);
    target.attr("style", target.attr("style") + "; " + config.css);
    
    //call controller onload
    config.onLoad(this, args, client);
})