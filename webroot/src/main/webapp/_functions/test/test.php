<?php
    require('../../blog/wp-blog-header.php');

    $categories = get_the_category("16");
    if($categories!=null){
        $balle = "";
        foreach($categories as $category) {
            echo $category->cat_name;
            if($category!=null) {
                $balle = $balle . "<span>" . $category->cat_name . "</span>";
            }
        }
        if($balle!=null) {
            echo "mhm" . $balle;
        }else{
            echo $balle;
            echo "null content?";
        }
    }else{
        echo "null?";
    }
?>
