<!DOCTYPE HTML>
<?php
    //Wordpress-requirements
    require('blog/wp-blog-header.php');
    $configuration = parse_ini_file('_framework/site/site-config.ini', false);
?>
<html>
    <head>
        <title>Vegard Aasen - v2 [<?php printf($configuration['version.number'])?>] - In Progress</title>
        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>
        <link href="favico.gif" rel="shortcut icon" type="image/gif"/>
        <link href="design/css/site.css" rel="stylesheet" media="screen" type="text/css"/>
        <link href="design/css/site_handheld_tablet_high.css" rel="stylesheet" media="only screen and (max-device-width: 750px), only screen and (max-width: 750px)" type="text/css"/>
        <!--link href="design/css/site_handheld_tablet.css" rel="stylesheet" media="only screen and (max-device-width: 600px), only screen and (max-width: 600px)" type="text/css"/-->
        <link href="design/css/site_handheld_high_quality.css" rel="stylesheet" media="only screen and (max-device-width: 480px), only screen and (max-width: 480px)" type="text/css"/>
        <link href="design/css/site_handheld_low_quality.css" rel="stylesheet" media="only screen and (max-device-width: 219px), only screen and (max-width: 219px)" type="text/css"/>
        <link href="design/css/colors.css" rel="stylesheet" media="screen" type="text/css"/>
        <script type="text/javascript" src="https://apis.google.com/js/plusone.js">{lang: 'en-GB'}</script>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8;">
        <meta name="google-site-verification" content="2F2-RvpYA8iyYAK7FNzok9qySKu6thi5vTBWIrfnUbc" />
        <meta name="viewport" content="width=device-width" />
    </head>
    <body id="homebody">
        <div id="main_sections">
            <section id="showcase">
                <div class="menu large_spacer">
                    <span class="the_master_that_rule_them_all" title="<?php printf($configuration['cool.text'])?>">vegard aasen</span>
                    <hr class="spacer"/>
                    <nav>
                        <section id="section_nav">
                            <a href="javascript:void(0)" title="Home" class="nav_element">home</a>
                            <a href="javascript:void(0)" title="About" class="nav_element">about</a>
                            <a href="javascript:void(0)" title="Blog" class="nav_element">blog</a>
                            <a href="javascript:void(0)" title="Contact" class="nav_element">contact</a>
                            <a href="javascript:void(0)" title="Favorites" class="nav_element">favorites</a>
                        </section>
                    </nav>
                </div>
                <div id="twitterLiveFeed">
                    <div class="bubble">
                        <div class="arrow">
                            <!--emtpydiv-->
                        </div>
                        <div class="rounded_big">
                            <div id="twitter_spinner"></div>
                            <div class="content">
                            </div>
                            <div class="poster">
                                <span class="link"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="favoriteBookmarks">
                    <div class="bubble">
                        <div class="arrow">
                            <!--emtpydiv-->
                        </div>
                        <div class="rounded_big">
                            <div id="favorite_spinner"></div>
                            <div class="content">
                                <h1><?php printf($configuration['favorites.text']) ?></h1>
                                <?php
                                    $bookmarks = get_bookmarks();
                                    if($bookmarks!=null||empty($bookmarks)) {
                                        foreach($bookmarks as $bookmark) {
                                            ?>
                                                <p>
                                <a href="<?php printf($bookmark->link_url)?>"
                                   rel="<?php printf($bookmark->link_rel)?>"
                                   title="<?php printf($bookmark->link_description)?>"
                                   target="<?php printf($bookmark->link_target)?>">
                                    <?php printf($bookmark->link_name)?>
                                   </a>
                                            </p>
                                            <?php
                                        }
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="items_showcase_coll">
                    <div id="notifications">
                        <div class="notification">
                            <span class="description">
                                Filter:
                                <span class="sorting"></span>
                                <span class="removeAll">(clear)</span>
                            </span>
                        </div>
                    </div>
                    <div id="items">
                        <div id="page_wrapper">
                            <!-- Will be associated with pagination-->
                            <!--Each of the items must have a "left" thats equal to +230px-->

<?php

        $rollingId = 0;
        $skip = false;
        $restrictedCategoriesFlips = $configuration['restricted-categories-flips'];
        query_posts('posts_per_page=100');
        while(have_posts()) : the_post();
            $definedCategories = get_the_category();
            $tags = get_the_tags();
            foreach($definedCategories as $category){
                foreach($restrictedCategoriesFlips as $restrictedCategoryFlip) {
                    if($category->category_nicename==$restrictedCategoryFlip) {
                        $skip = true;
                    }
                }
            }
            if(!$skip) {
                $skip=false;
?>
                            <div id="item_00<?php printf($rollingId) ?>" class="item_small_thumb" title="<?php foreach($definedCategories as $cat) printf($cat->category_nicename ) ?>">
                                <div class="postId"><?php printf(the_ID()); ?></div>
                                <div id="item_00<?php printf($rollingId) ?>_teaser" class="item_teaser">
                                    <div class="item_content_wrapper">
                                        <div class="item_content_info">
                                            <div class="content_image">
                                                <?php
                                                    $thumbnail = get_the_post_thumbnail();
                                                    if($thumbnail!=null) {
                                                        printf($thumbnail);
                                                    }else{
                                                ?>
                                                    <img rel="thumbnail.missing" src="design/images/defaults/img_missing.png"/>
                                                <?php
                                                    }
                                                ?>
                                            </div>
                                            <div class="content_header" title="<?php printf(the_ID()) ?>"><?php the_title();?></div>
                                            <div class="content_teaser">
                                                <?php
                                                    $strippedContent = strip_tags($post->post_content);
                                                    $stringLength = strlen($strippedContent);
                                                    if($stringLength >= 115) {
                                                        printf(substr($strippedContent,0,115) . "...");
                                                    }else {
                                                        printf($strippedContent . "...");
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                        <div class="item_content_cat_text">
                                            <span class="category_text" title="<?php foreach($definedCategories as $cat) printf($cat->category_nicename ) ?>">
                                                <a href="javascript:void(0);"><?php foreach($definedCategories as $cat) printf($cat->cat_name) ?></a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="item_00<?php printf($rollingId) ?>_full" class="item_full">
                                    <!--When clicked on an item, this is the "big version" thats beeing showed-->
                                    <div id="item_00<?php printf($rollingId) ?>f" class="item_exposed_full">
                                        <div class="exposed_container">
                                            <div class="spinner"></div>
                                            <div class="actions">
                                                <div class="close" title="Hide/Close">
                                                    <a class="closeLink" href="javascript:void(0);" onfocus="this.blur();"
                                                       onclick="">
                                                        <img src="design/images/actions/close.png" alt="close"/>
                                                    </a>
                                                </div>
                                                <div class="next" title="Next">
                                                    <a href="javascript:void(0);" onfocus="this.blur();">
                                                        <img src="design/images/actions/next.png" alt="close"/>
                                                    </a>
                                                </div>
                                                <div class="prev" title="Previous">
                                                    <a href="javascript:void(0);" onfocus="this.blur();">
                                                        <img src="design/images/actions/previous.png" alt="close"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="exposed_content">
                                                <div class="content_header">
                                                    <?php printf(the_title()); ?>
                                                </div>
                                                <div class="content_full">
                                                    <!--ContentPlaceHolder-->
                                                </div>
                                                <div class="attributes">
                                                    <div class="categories">
                                                        Categories:
                                                        <?php
                                                            foreach($definedCategories as $cat) {
                                                               printf("<span title='" . $cat->category_nicename . "'>" . $cat->cat_name . "</span>");
                                                            }
                                                        ?>
                                                    </div>
                                                    <div class="tags">
                                                        Tags:
                                                        <?php
                                                            if($tags!=null) {
                                                                foreach($tags as $tag) {
                                                                   printf("<span title='" . $tag->name . "'>" . $tag->name . "</span>");
                                                                }
                                                            }else{
                                                                print("No tags");
                                                            }
                                                        ?>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="footer">
                                                <div class="share">
                                                    <a class="share_link twitter" href="http://www.twitter.com/home?status=I found this interresting @ www.vegaasen.com: <?php printf(the_title());?>" target="_blank">
                                                        <div class="share_element twitter"></div>
                                                    </a>
                                                    <a class="share_link facebook" href="http://www.facebook.com/sharer.php?u=http://www.vegaasen.com/#<?php printf(the_ID()); ?>" target="_blank">
                                                        <div class="share_element facebook"></div>
                                                    </a>
                                                    <a class="share_link favorite" href="javascript:createBookmark();">
                                                        <div class="share_element favorite"></div>
                                                    </a>
                                                    <a class="share_link stumbleupon" href="http://www.stumbleupon.com/submit?url=http://www.vegaasen.com/#<?php printf(the_ID()); ?>" target="_blank">
                                                        <div class="share_element stumbleupon"></div>
                                                    </a>
                                                    <a class="share_link digg" href="http://digg.com/submit?phase=2&url=http://www.vegaasen.com/#<?php printf(the_ID()); ?>" target="_blank">
                                                        <div class="share_element digg"></div>
                                                    </a>
                                                </div>
                                                <div class="comments">
                                                    <div class="title">
                                                        <?php printf($configuration['comments.text']) ?>
                                                        <span class="writeComment">
                                                            <?php printf($configuration['comments.write.text']) ?>
                                                        </span>
                                                    </div>
                                                    <div class="content" title="<?php printf(the_ID()); ?>">
                                                        <!--Placeholder for commentsOnLoad-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<?php
                $rollingId++;
            }
            $skip=false;
        endwhile;
?>

<?php
            if($rollingId==null||$rollingId==0) {
?>
                                No flips found. (Or no interesting flips at least..)
<?php
            }
?>
                        </div>
                    </div>
                </div>
            </section>
            <section id="articlebubble">
                <div id="article_full">
                     <div class="container">
                        <div class="full_spinner"></div>
                        <div class="article_actions">
                            <div class="close_full">
                                <a class="closeLink" href="javascript:void(0);" onfocus="this.blur();"
                                   onclick="">
                                    <img src="design/images/actions/close.png" alt="close"/>
                                </a>
                            </div>
                        </div>
                        <div class="full_content">
                            <div class="full_header"></div>
                            <div class="full_all_content"></div>
                            <div class="full_attributes">
                                <div class="full_categories"></div>
                                <div class="full_tags"></div>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="share">
                                <a class="share_link twitter" href="" target="_blank">
                                    <div class="share_element twitter"></div>
                                </a>
                                <a class="share_link facebook" href="" target="_blank">
                                    <div class="share_element facebook"></div>
                                </a>
                                <a class="share_link favorite" href="javascript:createBookmark();">
                                    <div class="share_element favorite"></div>
                                </a>
                                <a class="share_link stumbleupon" href="" target="_blank">
                                    <div class="share_element stumbleupon"></div>
                                </a>
                                <a class="share_link digg" href="" target="_blank">
                                    <div class="share_element digg"></div>
                                </a>
                            </div>
                            <div class="full_comments">
                                <div class="title">
                                    <?php printf($configuration['comments.text']) ?>
                                    <span class="writeComment">
                                        <?php printf($configuration['comments.write.text']) ?>
                                    </span>
                                </div>
                                <div class="content">
                                    <!--Placeholder for commentsOnLoad-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="articles_spread_out">
                    <h1>Recent Thoughts and Jibberish</h1>
                    <div class="articles">
                        <!-- and out comes a fancylist of all the article titles..-->
<?php
    $rollingId = 0;
    $randomColor = "scheme3";
    $colorId;
    $skip = false;
    $restrictedCategories = $configuration['restricted-categories'];
    while(have_posts()) : the_post();
        $categories = get_the_category();
        $randomColor = $configuration['color-schemes'];
        if($randomColor!=null) {
            $colorId = $randomColor[array_rand($randomColor, 1)];
            if($colorId=="" || $colorId==null) {
                $colorId = "scheme3";
            }
        }else{
            $colorId = "scheme3";
        }
        foreach($categories as $category){
            foreach($restrictedCategories as $restrictedCategory) {
                if($category->category_nicename==$restrictedCategory) {
                    $skip = true;
                }
            }
        }
        if(!$skip) {
?>
                        <a href="javascript:void(0)" title="<?php the_ID(); ?>" class="recentArticle <?php if($colorId!=null) {printf($colorId);} ?>">
                            <span title="<?php printf(the_title()); ?>"><?php printf(the_title()); ?></span>
                        </a>
<?php
            $rollingId++;
        }
        $skip = false;
        endwhile;
        if($rollingId==null||$rollingId==0) {
?>
                        The mindset is empty. A feature, or by design?
<?php
        }
?>
                    </div>
                </div>
            </section>
        </div>
        <section id="addYourThought">
            <div class="head">
                <div class="actions">
                    <div class="closeThoughts" title="Hide/Close">
                        <a class="closeLink" href="javascript:void(0);" onfocus="this.blur();"
                           onclick="">
                            <img src="design/images/actions/close.png" alt="close"/>
                        </a>
                    </div>
                </div>
                <div class="title"><?php printf($configuration['thought.head.title'])?></div>
            </div>
            <div class="yourThought">
                <!--Placeholder for addThought-->
            </div>
            <div class="error">
                <?php printf($configuration['thought.validation.error'])?>
            </div>
        </section>
        <footer>
            <div id="google">
                <g:plusone size="small" count="false"></g:plusone>
            </div>
            <div id="goingUp">
                <a title="<?php printf($configuration['bottom.text'])?>" href="javascript:void(0)">↑↑↑</a>
            </div>
        </footer>
        <div id="spinner" class="hidden">
            <img rel="spinner.gif" src="design/images/ajax/spinner.gif" alt="Ajax spinner">
        </div>

        <!--Dependancyscripts-->
        <script src="design/js/jquery/jquery-min.js?version=<?php printf($configuration['version.jquery.number'])?>" type="text/javascript"></script>
        <script src="design/js/jquery/jquery-ui-shake.min.js?version=<?php printf($configuration['version.jquery.number'])?>" type="text/javascript"></script>
        <script src="design/js/history/bundled/html4+html5/jquery.history.js?version=<?php printf($configuration['version.jquery.number'])?>" type="text/javascript"></script>
        <script src="design/js/vegaasen/vaa_framework.js?version=<?php printf($configuration['version.number'])?>" type="text/javascript"></script>
        <script src="design/js/vegaasen/dependant/main_page-1.0.js?version=<?php printf($configuration['version.number'])?>" type="text/javascript"></script>
        <script src="design/js/vegaasen/dependant/google_analytics.js?version=<?php printf($configuration['version.number'])?>" type="text/javascript"></script>
    </body>
</html>