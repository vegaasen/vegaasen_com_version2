<?php
/**
 * @author vegaasen
 * @since 0.1g v2
 */

    require('../../blog/wp-blog-header.php');

    $postId = "";
    if(!empty($_POST['postId'])) {
        $postId = $_POST['postId'];
        if($postId!=null || $postId!="") {
            $tags = get_the_tags($postId);
            $content;
            if($tags!=null){
                foreach($tags as $tag) {
                    if($tag!=null) {
                        $content = $content . "<span title='" . $tag->name . "'>" . $tag->name . "</span>";
                    }
                }
                if($content!=null) {
                    $elements["error"]=false;
                    $elements["content"]=$content;
                    echo json_encode($elements);
                }
            }else{
                $content = "No tags";
                $elements["error"]=false;
                $elements["content"]=$content;
                echo json_encode($elements);
            }
        }
    }
?>