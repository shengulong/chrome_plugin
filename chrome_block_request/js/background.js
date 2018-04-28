// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// 'use strict';//监听所有请求
var key = ["https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_65682a2.js"];
function getLocalStorage() {
    key = window.localStorage.key ? JSON.parse(window.localStorage.key) : key;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var url = details.url;
        for (var i = 0, len = key.length; i < len; i++) {
            
            if (key[i] == url) {
                return { cancel: true };         
            }
        }
        
        return { cancel: false }; 
    },
     	
     
    { urls: ["<all_urls>"] }, 
    ["blocking"]
);
// getLocalStorage();
window.addEventListener('storage', getLocalStorage, false);