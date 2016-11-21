({
    'log':function(txt, client){client.out(txt);},
    'error':function(txt, client){client.out('[[;Red;]' + txt + ']');}
});