<?php
/**
 * The comment-fetching mechanism. This is correctly the same for both "flip-based content showing, as well for the
 * bigger one seen @ the posts located @ the bottom..
 * @author vegaasen
 * @since 0.1g v2
 */

require('../../blog/wp-blog-header.php');
$configuration = parse_ini_file('../../_framework/site/site-config.ini', false);

 ?>

<?php

$postId = "";
    if(!empty($_GET['postId'])) {
        $postId = $_GET['postId'];
        $commentOpts = array(
            'post_id' => $postId,
            'order' => 'ASC'
        );
        $comments = get_comments($commentOpts);
        if(!empty($comments)) {
        ?>
            <ul class="commentList">
            <?php
                foreach($comments as $comment) {
            ?>
                <li class="commentPost">
                    <div class="post">
                        <div class="avatarWrap">
                            <div class="avatar">
                                <?php print(get_avatar( $comment, 34, '', 'avatar')); ?>
                            </div>
                            <span class="poster">
                                <?php
                                if($comment->comment_author!=='') {
                                        if($comment->comment_author_email!=='') {
                                            ?>
                                            <a href="mailto:<?php printf($comment->comment_author_email); ?>?subject=Comment @ vegaasen&body=Content here.." title="Send author an email.">
                                                <?php printf($comment->comment_author);?>
                                            </a>
                                            <?php
                                            }else{
                                                printf($comment->comment_author);
                                            }
                                    }else{
                                        ?>
                                            <span class="i">anonymous</span>
                                        <?php
                                            }
                                        ?>
                            </span>
                            <span class="date">
                                <time>
                                    <?php
                                        //print(comment_date( '\- \o\n M jS \(D\) g:i a', $comment->comment_ID));
                                        print(comment_date( 'd\/m\/Y', $comment->comment_ID));
                                    ?>
                                </time>
                            </span>
                        </div>
                        <div class="content">
                            <div class="postContent">
                                <?php
                                    if($comment->comment_content!==null && $comment->comment_content!=='') {
                                        printf($comment->comment_content);
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </li>
            <?php
                }
            ?>
            </ul>
<?php
        }else{
?>
    <div class="error">
       <?php printf($configuration['comments.not.found.text'])?>
    </div>
<?php
        }
    }
?>