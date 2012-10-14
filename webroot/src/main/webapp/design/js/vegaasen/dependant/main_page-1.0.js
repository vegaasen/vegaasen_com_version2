/**
 * This is only beeing used on the frontal page.
 * NOTE: The ONCLICK-function for .full_attributes > .full_categories > span-objects is defined in:
 * /functions/wp/find_post_categories.php!
 *
 * @author vegaasen
 * @version 0.2b
 * @since 0.1d
 */

var activateErrors = false;
var chosenPostID = 0;
var WRITE_A_THOUGH_ELEMENT = jQuery(".yourThought");
var SLIDING_TIMEOUT = 300;
var SLOW_SLIDING_TIMEOUT = 500;
var QUICK_SLIDING_TIMEOUT = 100;
var ONE_MINUTE = (60 * 1000);
var REFRESH_INTERVAL_TWITTER = ONE_MINUTE * 5;
var EMPTY = "";
var OK = true;
var CONTACT_TEXT = "Are you ready for some development action?<br/>Ship me an " +
    "<a class='contact' href='mailto:vegaasen@gmail.com?subject=Hello! I would like to contact you&body=(some nice text in here:-))'>e-mail</a>. Or hook me up " +
    "<a class='contact' href='http://www.twitter.com/vegaasen' target='_blank'>@twitter</a>!<br/>Don't be shy:-)";

//These link headers are beeing used in the menu-bar
var LINK_HEADER = new Array();
LINK_HEADER[0] = "About";
LINK_HEADER[1] = "Home";
LINK_HEADER[2] = "Blog";
LINK_HEADER[3] = "Contact";
LINK_HEADER[4] = "Favorites";

jQuery(document).ready(function() {
    fetchNewestTwitterFeed();
    setInterval(function() {fetchNewestTwitterFeed()}, REFRESH_INTERVAL_TWITTER);
    jQuery.ajaxSetup({cache:false});

    jQuery(".category_text").click(function() {
        var mainParentElementWithClass = jQuery(jQuery(this).closest('.item_small_thumb')).attr('title');
        var cssClass = jQuery(this).attr('title');
        if(mainParentElementWithClass.indexOf(cssClass)!=-1) {
            //should always be true, otherwise there must be something terrible wrong..
            hideElementsNotWithinCategory(cssClass);
            showNotificationAndDisplayURI(cssClass);
        }
    });
    jQuery(".exposed_content > .attributes > .categories > span").click(function() {
        var mainParentElementWithClass = jQuery(jQuery(this).closest('.item_small_thumb')).attr('title');
        var cssClass = jQuery(this).attr('title');
        if(mainParentElementWithClass.indexOf(cssClass)!=-1) {
            //should always be true, otherwise there must be something terrible wrong..
            hideElementsNotWithinCategory(cssClass);
            showNotificationAndDisplayURI(cssClass);
        }
    });
    jQuery(".notification .removeAll").click(function() {
        jQuery("#page_wrapper > div.item_small_thumb").show(QUICK_SLIDING_TIMEOUT);
        jQuery("#notifications").hide(SLIDING_TIMEOUT);
        jQuery(".description > .sorting").html("");
        history.pushState(null,null,"/");
    });
    jQuery(".exposed_container .writeComment").click(function() {
        var actualComment = jQuery(this).closest(".comments");
        var postId = jQuery(actualComment).find(".content").attr("title");
        fetchElementWithAjax(postId, WRITE_A_THOUGH_ELEMENT, "/_functions/wp/add_post_comment.php", 'GET', 'html');
        jQuery("#addYourThought").show(SLIDING_TIMEOUT);
    });
    jQuery(".full_comments .writeComment").click(function() {
        if(chosenPostID!==0 && chosenPostID > 0) {
            fetchElementWithAjax(chosenPostID, WRITE_A_THOUGH_ELEMENT, "/_functions/wp/add_post_comment.php", 'GET', 'html');
            jQuery("#addYourThought").show(SLIDING_TIMEOUT);
        }
    });
    jQuery(".item_content_info").click(function() {
        var item_title = jQuery(jQuery(this).find('.content_header')).attr('title');
        var spinner = jQuery(jQuery(jQuery(jQuery(this)
            .closest('.item_small_thumb'))
                .find('.item_full'))
                    .find(".spinner"));
        jQuery(spinner).html(jQuery("#spinner").html()).show();
        var closestExpandable = jQuery(jQuery(this).closest('.item_small_thumb')).find('.item_full');
        var commentsLoadingClass = jQuery(closestExpandable).find('.exposed_container > .footer > .comments > .content');
        var postId = jQuery(commentsLoadingClass).attr('title');
        var contentClass = jQuery(closestExpandable).find('.content_full');
        fetchElementWithAjax(postId, contentClass, "/_functions/wp/find_post_content.php", 'POST', 'JSON', spinner);
        fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html', '');
        closestExpandable.show(QUICK_SLIDING_TIMEOUT);
        jQuery(jQuery(this).closest('.item_teaser')).hide();
        jQuery("body,html").animate({scrollTop:jQuery(jQuery(jQuery(this).closest('.item_small_thumb'))
                .find('.item_full'))
                .offset()
                .top-10},
            SLIDING_TIMEOUT);
        pushStateToBrowser(item_title); // Push state to browser
    });
    jQuery(".closeThoughts > .closeLink").click(function() {
        jQuery("#addYourThought").hide(QUICK_SLIDING_TIMEOUT);
        jQuery("#addYourThought > .yourThought").html("");
    });
    jQuery(".close > .closeLink").click(function() {
        jQuery(this).closest('.item_full').hide(QUICK_SLIDING_TIMEOUT);
        removeContentFromMinimizedElement(jQuery(this));
        jQuery(jQuery(this).closest('.item_small_thumb')).find('.item_teaser').show();
        pushStateToBrowser(EMPTY); // Clear state in browser
    });
    jQuery(".close_full > .closeLink").click(function() {
        jQuery(this).closest('#article_full').hide(QUICK_SLIDING_TIMEOUT);
        jQuery(".articles_spread_out").show();
        jQuery(".full_all_content").html("");
        jQuery(".full_header").html("");
        jQuery(".full_categories").html("");
        jQuery(".full_tags").html("");
        jQuery(".full_comments > .content").html("");
    });
    jQuery(".prev").click(function() {
        var closestElementOfItem = jQuery(this).closest('.item_small_thumb');
        var currentCategory = jQuery(this).closest('.item_small_thumb').attr("title");
        var previousElement = jQuery(closestElementOfItem).prev();
        if(!jQuery(".sorting").is(":empty")) {
            OK = false;
            while(!OK) {
                if(currentCategory===jQuery(previousElement).attr("title")) {
                    OK = true;
                }else{
                    if(jQuery(previousElement).attr("class")===undefined) {
                        //LAST ELEMENT HIT! Just saying "OK"
                        OK = true;
                        break;
                    }
                    previousElement = jQuery(jQuery(previousElement).closest('.item_small_thumb')).prev();
                    OK = false;
                }
            }
        }
        if(jQuery(previousElement).attr('class')!==undefined && OK) {
            var closestExpandable = jQuery(previousElement).find('.item_full');
            var spinner = jQuery(closestExpandable).find(".spinner");
            jQuery(spinner).html(jQuery("#spinner").html()).show();
            var commentsLoadingClass = jQuery(closestExpandable).find('.exposed_container > .footer > .comments > .content');
            var postId = jQuery(commentsLoadingClass).attr('title');
            var contentClass = jQuery(closestExpandable).find('.content_full');

            fetchElementWithAjax(postId, contentClass, "/_functions/wp/find_post_content.php", 'POST', 'JSON', spinner);
            fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html', '');

            jQuery(closestElementOfItem).find('.item_full').hide(QUICK_SLIDING_TIMEOUT);
            jQuery(closestElementOfItem).find('.item_teaser').show();

            jQuery(previousElement).find('.item_full').show(QUICK_SLIDING_TIMEOUT);
            jQuery(previousElement).find('.item_teaser').hide();
            removeContentFromMinimizedElement(jQuery(this));
        }else{
            jQuery(closestElementOfItem).effect("shake", {times:3}, 30);
        }
    });
    jQuery(".next").click(function() {
        var closestElementOfItem = jQuery(this).closest('.item_small_thumb');
        var currentCategory = jQuery(this).closest('.item_small_thumb').attr("title");
        var nextElement = jQuery(closestElementOfItem).next();
        if(!jQuery(".sorting").is(":empty")) {
            OK = false;
            while(!OK) {
                if(currentCategory===jQuery(nextElement).attr("title")) {
                    OK = true;
                }else{
                    if(jQuery(nextElement).attr("class")===undefined) {
                        //LAST ELEMENT HIT! Just saying "OK"
                        OK = true;
                        break;
                    }
                    nextElement = jQuery(jQuery(nextElement).closest('.item_small_thumb')).next();
                    OK = false;
                }
            }
        }
        if(jQuery(nextElement).attr('class')!==undefined && OK) {
            var closestExpandable = jQuery(nextElement).find('.item_full');
             var spinner = jQuery(closestExpandable).find(".spinner");
            jQuery(spinner).html(jQuery("#spinner").html()).show();
            var commentsLoadingClass = jQuery(closestExpandable).find('.exposed_container > .footer > .comments > .content');
            var postId = jQuery(commentsLoadingClass).attr('title');
            var contentClass = jQuery(closestExpandable).find('.content_full');

            fetchElementWithAjax(postId, contentClass, "/_functions/wp/find_post_content.php", 'POST', 'JSON', spinner);
            fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html', '');

            jQuery(closestElementOfItem).find('.item_full').hide(QUICK_SLIDING_TIMEOUT);
            jQuery(closestElementOfItem).find('.item_teaser').show();

            jQuery(nextElement).find('.item_full').show(QUICK_SLIDING_TIMEOUT);
            jQuery(nextElement).find('.item_teaser').hide();
            removeContentFromMinimizedElement(jQuery(this));
        }else{
            jQuery(closestElementOfItem).effect("shake", {times:3}, 30);
        }
    });
    jQuery("#goingUp > a").click(function() {
        jQuery("html,body").animate({scrollTop:jQuery("html,body").offset().top}, SLIDING_TIMEOUT);
    });
    jQuery(".nav_element").click(function() {
        if(jQuery(this).attr("title")===LINK_HEADER[0]) {
            hideElementsNotWithinCategory(LINK_HEADER[0].toLowerCase());
            showNotificationAndDisplayURI("Its all about me!");
        }else if(jQuery(this).attr("title")===LINK_HEADER[1]) {
            jQuery("#page_wrapper > div.item_small_thumb").show(QUICK_SLIDING_TIMEOUT);
            jQuery("#notifications").hide(SLIDING_TIMEOUT);
            jQuery("#favoriteBookmarks").hide();
            fetchNewestTwitterFeed();
            history.pushState(null,null,"/");
        }else if(jQuery(this).attr("title")===LINK_HEADER[2]) {
            jQuery("body,html").animate({scrollTop:jQuery("#articlebubble").offset().top-20}, SLIDING_TIMEOUT);
            pushStateToBrowser(LINK_HEADER[2]);
        }else if(jQuery(this).attr("title")===LINK_HEADER[3]) {
            jQuery("#twitter_spinner").html(jQuery("#spinner").html()).show();
            jQuery("#twitterLiveFeed > .bubble > .rounded_big > .content").html(CONTACT_TEXT);
            jQuery("#twitterLiveFeed > .bubble > .rounded_big > .poster > span.link").html("");
            jQuery("#twitter_spinner").hide();
            pushStateToBrowser(LINK_HEADER[3]);
        }else if(jQuery(this).attr("title")===LINK_HEADER[4]) {
            if(jQuery("#favoriteBookmarks").is(":visible") || jQuery("#favoriteBookmarks").css("display") == "block") {
                jQuery("#favoriteBookmarks").hide();
                pushStateToBrowser("");
            }else{
                jQuery("#favoriteBookmarks").show();
                pushStateToBrowser(LINK_HEADER[4]);
            }
        }
    });
    jQuery(".recentArticle").click(function() {
        jQuery(".full_spinner").html(jQuery("#spinner").html()).show();
        jQuery("#article_full").show(QUICK_SLIDING_TIMEOUT);
        jQuery(".articles_spread_out").hide();
        var postId = jQuery(this).attr("title");
        chosenPostID = postId;
        var url_post_content = "/_functions/wp/find_post_content.php";
        var url_post_title = "/_functions/wp/find_post_title.php";
        var url_post_comments = "/_functions/wp/find_post_comments.php";
        var url_post_categories = "/_functions/wp/find_post_categories.php";
        var url_post_tags = "/_functions/wp/find_post_tags.php";
        jQuery.ajax({
			type : 'POST',
			url : url_post_content,
			dataType : 'JSON',
			data : {postId : postId},
			success : function (data) {
				jQuery(".full_all_content").html(data['content']);
                jQuery("body,html").animate({scrollTop:jQuery("#article_full")
                    .offset()
                    .top-10},
                    SLIDING_TIMEOUT
                );
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("sorry!" + XMLHttpRequest + textStatus + errorThrown);
			}
		});
        jQuery.ajax({
			type : 'POST',
			url : url_post_title,
			dataType : 'JSON',
			data : {postId : postId},
			success : function (data) {
				jQuery(".full_header").html(data['content']);
                jQuery("#article_full .container > .footer > .share > .twitter").
                    attr("href", "http://www.twitter.com/home?status=I found this interresting @ www.vegaasen.com:" + data['content']);
                jQuery("#article_full .container > .footer > .share > .facebook").
                    attr("href", "http://www.facebook.com/sharer.php?u=http://www.vegaasen.com/#!" + data['content']);
                jQuery("#article_full .container > .footer > .share > .stumbleupon").
                    attr("href", "http://www.stumbleupon.com/submit?url=http://www.vegaasen.com/#!" + data['content']);
                jQuery("#article_full .container > .footer > .share > .digg").
                    attr("href", "http://digg.com/submit?phase=2&url=http://www.vegaasen.com/#!" + data['content']);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("sorry!" + XMLHttpRequest + textStatus + errorThrown);
			}
		});
        var commentsLoadingClass = jQuery(".container > .footer > .full_comments > .content");
        fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html');
        jQuery.ajax({
			type : 'POST',
			url : url_post_categories,
			dataType : 'JSON',
			data : {postId : postId},
			success : function (data) {
				jQuery(".full_categories").html("Categories: " + data['content']);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("sorry!" + XMLHttpRequest + textStatus + errorThrown);
			}
		});
        jQuery.ajax({
			type : 'POST',
			url : url_post_tags,
			dataType : 'JSON',
			data : {postId : postId},
			success : function (data) {
				jQuery(".full_tags").html("Tags: " + data['content']);
                jQuery(".full_spinner").hide();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("sorry!" + XMLHttpRequest + textStatus + errorThrown);
                jQuery(".full_spinner").hide();
			}
		});
    });
});

function hideElementsNotWithinCategory(categoryName) {
    jQuery("#page_wrapper > div[title!="+categoryName+"]").each(function() {
        jQuery(this).hide(QUICK_SLIDING_TIMEOUT);
    });
}

function fetchNewestTwitterFeed() {
    jQuery("#twitterLiveFeed > .bubble > .rounded_big > .content").html("");
    jQuery("#twitterLiveFeed > .bubble > .rounded_big > .poster > span.link").html("");
    jQuery("#twitter_spinner").html(jQuery("#spinner").html()).show();
    var twitterFWURL = '/_framework/twitter/twitter-conf.php';
    jQuery.ajax({
        type: 'GET',
        url: twitterFWURL,
        dataType: 'xml',
        success: function(data){
            var currStatus = jQuery('status', data);
            var twitterUser = currStatus.children('user').eq(0).children('screen_name').text();
            var twitterMsg = currStatus.children('text').eq(0).text();
            twitterMsg = formatTwitterMessage(twitterMsg);
            jQuery("#twitterLiveFeed > .bubble > .rounded_big > .content").html(twitterMsg);
            jQuery("#twitterLiveFeed > .bubble > .rounded_big > .poster > span.link").html("<a href='http://twitter.com/" + twitterUser + "' target='_blank'>@" + twitterUser +  "</a>");
            jQuery("#twitter_spinner").hide();
        }
        ,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(activateErrors) {
                alert("Could not parse the data. Reason: " + errorThrown);
            }
        }
    });
}

function formatTwitterMessage(message) {
    var numberOfHHashesAndAtsInMessage = message.count('#') + message.count('@');
    var positionsFound = new Array();
    var tempMessage = message;
    var originalLength = message.length;
    var tempMessageLength = originalLength;
    for(var i = 0; i<numberOfHHashesAndAtsInMessage;i++) {
        if(tempMessage.indexOf('#')!=-1) {
            tempMessageLength = tempMessage.length;
            positionsFound[i] = tempMessage.indexOf('#') + (originalLength - tempMessageLength);
            tempMessage = tempMessage.substring(tempMessage.indexOf('#')+1, tempMessage.length-1);
        }
    }
    if(positionsFound.length>0) {
        var pattern = new RegExp("\s{0}[@|#][A-Z-a-z0-9_]+");
        tempMessage = message;
        for(i=0;i<numberOfHHashesAndAtsInMessage;i++) {
            var foundTwitterMention = pattern.exec(tempMessage);
            var formattedTwitterMention =
                "<a href='http://twitter.com/" +
                    foundTwitterMention + "' class='twitterMention' alt='" +
                    foundTwitterMention + "' target='_blank'>" +
                    foundTwitterMention +
                "</a>";
            message = message.replace(foundTwitterMention, formattedTwitterMention);
            tempMessage = tempMessage.substring(tempMessage.indexOf('#')+1, tempMessage.length-1);
        }
    }
    return message;
}

function showNotificationAndDisplayURI(cssClass) {
    jQuery("#notifications").show(SLIDING_TIMEOUT);
    jQuery("#notifications > .notification > .description > .sorting").html(cssClass);
    pushStateToBrowser(cssClass);
}

function removeContentFromMinimizedElement(element) {
    jQuery(jQuery(element).closest('.exposed_container')).find('.content_full').empty();
    jQuery(jQuery(jQuery(element)).closest('.exposed_container')).find('.footer > .comments > .content').empty();
}