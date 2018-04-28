// var value='shen';
function saveChanges() { 
        var url_value = document.getElementById('url_value');     
        value = url_value.value
        var block_list = new Array;
        var list = document.getElementById('block_list');
        for (var i = 3; i < list.childNodes.length; i++) {
                 block_list.push(list.childNodes[i].innerText);
             }
        block_list.push(value);    

        chrome.storage.local.set({key: block_list}, function() {
          console.log('Value is set to ' + value);
        });
        chrome.storage.local.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
          var block_list = new Array;
          block_list = result.key;
          var bg = chrome.extension.getBackgroundPage(); 
          bg.key = result.key;
          console.warn(bg.key);
          for (var i = block_list.length -1; i < block_list.length; i++) {
                 // var list = document.getElementById('block_list');
                 // list.childNodes[1].appendChild(block_list[i]);

                var node=document.createElement("tr");
                var textnode=document.createTextNode(block_list[i]);
                node.appendChild(textnode);
                document.getElementById("block_list").appendChild(node);
             }
        });
        
};

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
          var block_list = new Array;
          block_list = result.key;
          var bg = chrome.extension.getBackgroundPage(); 
          bg.key = [result.key];
          console.warn(bg.key);
          for (var i = 0; i < block_list.length; i++) {
                 // var list = document.getElementById('block_list');
                 // list.childNodes[1].appendChild(block_list[i]);

                var node=document.createElement("tr");
                var textnode=document.createTextNode(block_list[i]);
                node.appendChild(textnode);
                document.getElementById("block_list").appendChild(node);
             }
        });

    var dropdown = document.getElementById('add');
    dropdown.addEventListener('click', () => {
       saveChanges()
    });
    var clear_all = document.getElementById('clear');
    clear_all.addEventListener('click', () => {
       chrome.storage.local.clear(function(){
            console.log("执行清楚结束");
            document.getElementById("block_list").innerHTML="";        
       });
       
       // chrome.storage.clear();
    });

    


});
