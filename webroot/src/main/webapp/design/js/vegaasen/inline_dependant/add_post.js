/**
 * Simple script for handling posting thoughts
 *
 * @author vegaasen
 * @since 0.2b
 */

jQuery(".submitThough").click(function() {
    var theForm = jQuery(this).closest(".form");
    var postId = jQuery(theForm).find(".postId").val();
    var comment = jQuery(theForm).find(".comment").val();
    var website = jQuery(theForm).find(".website").val();
    var email = jQuery(theForm).find(".email").val();
    var author = jQuery(theForm).find(".author").val();

    var shouldContinue = verifyValidEmailAddress(email);
    if(shouldContinue) {
        var parameters = {
            postId : postId,
            comment : comment,
            website : website,
            email : email,
            author : author
        };

        var commentsLoadingClass;
        jQuery(".exposed_container > .footer > .comments > .content").each(function() {
            if(jQuery(this).attr("title")===postId) {
                commentsLoadingClass = jQuery(this);
            }
        });

        jQuery.ajax({
                type : 'POST',
                url : "/_functions/wp/submit/submit_thought.php",
                dataType : 'JSON',
                data : parameters,
                success : function (data) {
                    jQuery(".yourThought").html("Added comment!");
                    jQuery("#addYourThought").delay(1000).fadeOut(300);
                    fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html');
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    jQuery(".yourThought").html("Added comment!");
                    jQuery("#addYourThought").delay(1000).fadeOut(300);
                    fetchElementWithAjax(postId, commentsLoadingClass, "/_functions/wp/find_post_comments.php", 'GET', 'html');
                }
            });
    }else{
        var errorElement = "#addYourThought .error";
        jQuery(errorElement).stop(true,true);
        jQuery(errorElement).show();
        jQuery(errorElement).effect("shake", {times:5}, 10);
        jQuery(errorElement).fadeOut(4000);
        jQuery("#addYourThought .email").focus();
    }
});