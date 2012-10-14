/**
 * This js-file will contain most of the various functionallity that can be done on vegaasen.com
 * User: WindowsUser
 * Date: 30.10.11
 * Time: 20:02
 */

/**
 * Close the actual frame that is opened, and displays another one [e.g its container]
 * @param objectToCloseId - Mandatory
 * @param hideStyle - can be [fadeOut,fast,slow] - Optional
 * @param objectToDisplayId - Optional
 */

function closeElement(objectToCloseId, hideStyle, objectToDisplayId) {
    if (objectToCloseId !== null && verifyInDOM(objectToCloseId)) {
        if (hideStyle === "fadeOut") {
            jQuery(objectToCloseId).fadeOut();
        } else if (hideStyle === "fast") {
            jQuery(objectToCloseId).hide("fast");
        } else if (hideStyle === "slow") {
            jQuery(objectToCloseId).hide("slow");
        } else {
            jQuery(objectToCloseId).hide();
        }

        if (objectToDisplayId !== null && verifyInDOM(objectToDisplayId)) {
            showElement(objectToDisplayId);
        }
    }
}

function removeContentFromElement(element) {
    if(element!==null || element!==undefined) {
        jQuery(element).html("");
    }
}

function showElement(objectToDisplayId) {
    if (objectToDisplayId !== null && verifyInDOM(objectToDisplayId)) {
        jQuery(objectToDisplayId).show();
    }
}

function verifyInDOM(element) {
    if (element !== null && element !== undefined) {
        var ele = jQuery(element);
        if (ele !== null && ele !== undefined) return true;
    }
    return false;
}

function isVisible(element) {
    if(jQuery(element).css('display')!=='none') {
        return false;
    }else{
        return (jQuery(element).is(":visible"))
    }
}

/**
 * Enables pop Up Messaging elements using jQuery
 * Can be activated like this:
 *  - add
 *
 * @param options
 */
jQuery.fn.popUpMessage = function(options) {
    var settings = jQuery.extend({
        id: 'popUp',
        clazz: 'popUpFollower',
        top: 0,
        left: 15
    }, options);

    var handle;

    function tooltip(event) {
        if (! handle) {
            // Create an empty div to hold the tooltip
            handle = jQuery('<div style="position: absolute" class="' + settings.clazz + '" id="' + settings.id + '"></div>').appendTo(document.body).hide();
        }

        if (event) {
            // Make the tooltip follow cursor
            handle.css({
                top: (event.pageY - settings.top) + "px",
                left: (event.pageX + settings.left) + "px"
            });
        }

        return handle;
    }

    this.each(function() {
        jQuery(this).hover(
            function(e) {
                if (this.title) {
                    this.t = this.title;
                    this.title = '';
                    this.alt = '';

                    tooltip(e).html(this.t).fadeIn('fast');
                }
            },
            function() {
                if (this.t) {
                    this.title = this.t;
                    tooltip().hide(0);
                }
            }
        );

        jQuery(this).mousemove(tooltip);
    });
};

/**
 * Regexp-checker + outputter
 *
 * @param object
 * @param regexp
 * @param message
 * @returns {Boolean}
 */
function checkRegexp(object, regexp, message) {
    if (!(regexp.test(object.val()))) {
        // object.addClass("val-error");!!
        // TODO: create a method that updates the "error-text"
        return false;
    } else {
        return true;
    }
}

/**
 * This class will make a element float with the frame.
 *
 * @using CSS CLASS fixedpos
 * @param elem -
 *            must be of type {jQuery,$}('<element/>');
 */

function elementFollowWindowTop(elem) {
    var eletop = elem.offset().top; // todo, add properties here.
    jQuery(window).scroll(function(event) {
        var eley = jQuery(this).scrollTop();
        if (eley >= eletop) {
            elem.addClass('fixedpos');
        } else {
            elem.removeClass('fixedpos');
        }
    });
}

/**
 * Write a cookie to the browser
 *
 * @param cname Cookie Name
 * @param cvalue Cookie Value
 * @param params Cookie Params
 */
function writeCookie(cname, cvalue, params) {
    if (params !== null) {
        jQuery.cookie(cname, cvalue, params);
    } else {
        jQuery.cookie(cname, cvalue);
    }
}

/**
 * Get a registered cookie that is contained in the browser
 */
function getCookie(cname) {
    if (cname !== null) {
        return jQuery.cookie(cname);
    }
}

function closeFeedPr(pid, reopen) {
    if ($('#item_' + pid).length > 0) {
        var url = $('#url').val();
        var prev_type = document.getElementById('prev_type');
        $("#current_open").val("none");
        $("#prev_open").val("none");
        if (document.getElementById('menu_' + pid)) document.getElementById('menu_' + pid).className = $("#prev_type").val();
        printClosed(pid, $("#moduleholder_o").val(), false);
    }
}

function randomColorScheme() {
    return "#ffffff";
}

/**
 * Works as a submitter for ajax. This is generic for everywhere I use this sh!t
 *
 * @param url 'pages/portfolio/qd_submit.php'
 * @param dataset content : jQuery("#"+jcontent).val()
 * @param successContent content
 * @param errorContent content
 * @returns true|false, no content.
 */

function submitData(url, dataset, successContent, errorContent) {
    if (url !== null && dataset !== null && successContent !== null && errorContent !== null) {
        jQuery.ajax({
            type : 'POST',
            url : url,
            dataType : 'JSON',
            data : dataset,
            success : function (data) {
                successContent;
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                errorContent;
            }
        });
        return true;
    }
    return false;
}

/**
 * Registers a bookmark for vegaasen.com.
 */
function createBookmark() {
    var title = "www.vegaasen.com - good thoughts and jibberish";
    var url = "http://www.vegaasen.com/";
    if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else if (window.external) {
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) {
        return true;
    }
}

function pushStateToBrowser(URI) {
    history.pushState(null, null, "/#" + URI);
}

function fetchElementWithAjax(postId, itemClassId, url, type, dataType, spinner) {
    jQuery.ajax({
        type : type,
        url : url,
        dataType : dataType,
        data : {postId : postId},
        success : function (data) {
            if(dataType==="html") {
                jQuery(itemClassId).html(data);
            } else {
                jQuery(itemClassId).html(data['content']);
            }
            if(spinner!==undefined && spinner!=="") {
                jQuery(spinner).hide();
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert("sorry!" + XMLHttpRequest + textStatus + errorThrown);
            if(spinner!==undefined && spinner!=="") {
                jQuery(spinner).hide();
            }
        }
    });
}

/**
 * Function to validate email input
 * @param email
 * @return true|false based on validation
 */
function verifyValidEmailAddress(email) {
    var verifyRegExpr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    return verifyRegExpr.test(email);
}

/**
 * Function to validate url input
 * @param email
 * @return true|false based on validation
 */
function verifyValidURL(url) {
    var verifyRegExpr = /(((http|ftp|https):\/\/)|www\.)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#!]*[\w\-\@?^=%&amp;/~\+#])?/;
    return verifyRegExpr.test(url);
}


String.prototype.count=function(s1) {
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
};