<?php
/**
 * @author vegaasen
 * @since 0.1g v2
 */

    require('../../blog/wp-blog-header.php');

    $queryString = $_SERVER['QUERY_STRING'];

    $postId = "";
    if(!empty($_POST['postId'])) {
        $postId = $_POST['postId'];
        if($postId!=null || $postId!="") {
            $post = get_post($postId, ARRAY_A);
            if($post!=null) {
                if($post['post_title']!=null) {
                    $elements["error"]=false;
                    $elements["content"]=$post['post_title'];
                    echo json_encode($elements);
                }
            }
        }
    }
?>