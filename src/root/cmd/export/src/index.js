(function(args, client){
    
    $('body').append("<a id='downloadAnchorElem' style='display:none'></a>");
    
    var json = JSON.stringify(boss.fs.export());
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "boss.json");
    dlAnchorElem.click();
    
    $('#downloadAnchorElem').remove();
})