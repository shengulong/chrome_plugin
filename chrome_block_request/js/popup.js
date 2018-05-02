// var value='shen';
function saveChanges() {
    var url_value = document.getElementById('url_value');
    value = url_value.value
    var block_list = new Array;
    var list = document.getElementById('block_list');
    for (var i = 3; i < list.childNodes.length; i++) {
        if (list.childNodes[i].innerText) {
            block_list.push(list.childNodes[i].innerText);
        }

    }
    if (value) {
        block_list.push(value);
    }


    chrome.storage.local.set({ key: block_list }, function() {
        console.log('Value is set to ' + value);
    });
    chrome.storage.local.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
        var block_list = new Array;
        block_list = result.key;
        var bg = chrome.extension.getBackgroundPage();
        bg.key = result.key;
        console.warn(bg.key);
        for (var i = block_list.length - 1; i < block_list.length; i++) {
            // var list = document.getElementById('block_list');
            // list.childNodes[1].appendChild(block_list[i]);

            var node = document.createElement("tr");
            var textnode = document.createTextNode(block_list[i]);
            node.appendChild(textnode);
            document.getElementById("block_list").appendChild(node);
        }
    });

};

function removeElement(_element) {
    var _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
    saveChanges();
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

            var node_tr = document.createElement("tr");
            var node = document.createElement("td");
            // node.setAttribute("onclick", "removeElement(this)"); 
            var textnode = document.createTextNode(block_list[i]);
            node.appendChild(textnode);
            node_tr.appendChild(node);
            document.getElementById("block_list").appendChild(node_tr);
        }
    });

    var dropdown = document.getElementById('add');
    dropdown.addEventListener('click', () => {
        saveChanges();
    });
    var clear_all = document.getElementById('clear');
    clear_all.addEventListener('click', () => {
        chrome.storage.local.clear(function() {
            console.log("执行清楚结束");
            document.getElementById("block_list").innerHTML = "";
        });

        // chrome.storage.clear();
    });
    var table_body = document.getElementById("block_list");
    table_body.addEventListener('click', () => {

        var td = event.srcElement; // 通过event.srcElement 获取激活事件的对象 td 


        // alert("行号：" + (td.parentElement.rowIndex + 1) + "，内容：" + td.innerText); 
        removeElement(td.parentElement);
        //       var tab = document.getElementById("test") ;
        //       //表格行数
        //       var rows = tab.rows.length ;
        // //表格列数
        // var cells = tab.rows.item(0).cells.length ;
        // alert("行数"+rows+"列数"+cells);
    })
    // for (var i=0;i<input_all.length-1;i++) {
    //   // console.warn(input_all[i]);
    //   input_all[i].addEventListener('click', ()=>{
    //     removeElement(this);
    //   });
    // }
});