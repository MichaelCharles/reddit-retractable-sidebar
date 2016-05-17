/* global $ */

/***********************************
 * Slow down there tiger. This isn't the script you're looking
 * for. This is the script for the GitHUb pages version of the
 * toggle button. While it does duplicate the functionality,
 * it is a bit different than what you'll find in userscript.js
 * 
 * So, if you're curious about what's going on with the userscript,
 * "userscript.js" is the file you should be looking at.
 * ********************************/


(function() {
    'use strict';
    var pseudoCookie = "false";

    var leftIcon = '<i class="material-icons">chevron_left</i>';
    var rightIcon = '<i class="material-icons">chevron_right</i>';
    $("head").append("<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' type='text/css'>");
    var $content = $("main");
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
        cursor: "pointer"
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

    function setCookie(cname, cvalue, exdays) {
        pseudoCookie = cvalue;
    }

    function getCookie(cname) {
        return pseudoCookie;
    }

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
    $("body").on("keypress", function(e) {
        var tagName = e.target.tagName.toLowerCase();
        console.log(e.keyCode);
        if (tagName === "input" || tagName === "textarea") {
            return /*do nothing */;
        }
        else {
            if (e.keyCode === 113) {
                $toggleButton.click();
            }
        }
    });

})();