/**
  The MIT License (MIT)

  Copyright (c) 2014 Jeppe Rune Mortensen

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// ==UserScript==
// @id           RedditRetractableSidebar
// @name         Reddit Retractable Sidebar
// @namespace    http://michaelcharl.es
// @version      0.2.6
// @description  Make Reddit's Sidebar Retractable
// @icon         https://mca62511.github.io/reddit-retractable-sidebar/favicon.png
// @icon64       https://mca62511.github.io/reddit-retractable-sidebar/favicon.png
// @author       Michael Aubrey
// @domain       reddit.com
// @domain       www.reddit.com
// @match        https://www.reddit.com/*
// @match        https://reddit.com/*
// @match        http://www.reddit.com/*
// @match        http://reddit.com/*
// @grant        none
// @license         MIT

// ==/UserScript==


// The addJQuery function was taken from: https://gist.github.com/eristoddle/4440713
// This makes the script play nice with other things like Reddit Enhancement Suite
// Just doing @require was throwing an error
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

(function() {
  'use strict';
  var leftIcon = '<i class="material-icons">chevron_left</i>';
  var rightIcon = '<i class="material-icons">chevron_right</i>';
  $("head").append("<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' type='text/css'>");
  var $content = $("div.content");
  var $toggleButton = $("<div></div>");
  $toggleButton.css({
    background: "#CEE3F8",
    color: "#212121",
    display: "flex",
    'justify-content': "center",
    'align-items': "center",
    height: "42px",
    width: "42px",
    "font-size": "32px",
    "border-radius": "100px",
    "box-shadow": "0px 3px 5px 0px rgba(33,33,33,0.3)",
    position: "fixed",
    top: "50%",
    right: "-7px",
    cursor: "pointer",
    "z-index": "9983"
  });
  var $sidebar = $("div.side");

  function hideSidebar() {
    $sidebar.hide();
    $content.css({
      "margin-right": "15px"
    });
    $toggleButton.html(leftIcon);
    setCookie("isRetracted", "true", 30);
  }

  function showSidebar() {
    $sidebar.show();
    $content.css({
      "margin-right": "335px"
    });
    $toggleButton.html(rightIcon);
    setCookie("isRetracted", "false", 30);
  }


// These setCookie and getCookie functions were copied
// from w3schools.
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.reddit.com;path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  if (window.location.href.indexOf("/submit") === -1) {
    if (getCookie("isRetracted") == "true") {
      hideSidebar();
    }
    else {
      showSidebar();
    }
    $("body").append($toggleButton);
    $toggleButton.click(function() {
      var currentIcon = $toggleButton.html().trim();
      if (currentIcon === rightIcon) {
        hideSidebar();
      }
      else {
        showSidebar();
      }
    });
  }
})();