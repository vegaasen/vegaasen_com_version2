<?php
/**
 * Submit the comment/thought to WP!
 *
 * @author vegaasen
 * @since 0.2b
 */

require('../../../blog/wp-blog-header.php');

    if(!empty($_POST['postId']) && !empty($_POST['author']) && !empty($_POST['email']) && !empty($_POST['comment'])) {
        $postId = $_POST['postId'];
        $author = $_POST['author'];
        $email = $_POST['email'];
        $comment = $_POST['comment'];
        $website = "";
        if(!empty($_POST['website'])) {
            $website = $_POST['website'];
        }
        $time = current_time('mysql');

        $thoughtData = array(
            'comment_post_ID' => $postId,
            'comment_author' => $author,
            'comment_author_email' => $email,
            'comment_author_url' => $website,
            'comment_content' => $comment,
            'comment_type' => '',
            'comment_parent' => 0,
            'comment_approved' => 0,
            'comment_date' => $time,
            'comment_author_IP' => $_SERVER['REMOTE_ADDR'],
            'comment_agent' => $_SERVER['HTTP_USER_AGENT']
        );

        $savedCommentId = wp_insert_comment($thoughtData);
        if($savedCommentId!== null && !empty($savedCommentId)) {
            $elements["error"]=false;
            $elements["content"]=$savedCommentId;
        }else{
            $elements["error"]=true;
            $elements["content"]="Could not save comment. Sorry..";
        }
        print(json_encode($elements));
    }
?>
 
