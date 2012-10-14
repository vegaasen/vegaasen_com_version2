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
            $categories = get_the_category($postId);
            $content;
            $onClick = 'var cssClass = jQuery(this).attr("title");hideElementsNotWithinCategory(cssClass);showNotificationAndDisplayURI(cssClass);';
            if($categories!=null){
                foreach($categories as $category) {
                    if($category!=null) {
                        $content = $content . "<span title='" . $category->category_nicename . "' onclick='" . $onClick . "'>" . $category->cat_name . "</span>";
                    }
                }
                if($content!=null) {
                    $elements["error"]=false;
                    $elements["content"]=$content;
                    echo json_encode($elements);
                }
            }
        }
    }
?>