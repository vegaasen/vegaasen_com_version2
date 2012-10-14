<?php
/**
 * Simple form for posting thoughts/comments to the items/articles on my site.
 *
 * @author vegaasen
 * @since 0.2b
 */

$configuration = parse_ini_file('../../_framework/site/site-config.ini', false);
 ?>

<?php
    $postId = "";
    if(!empty($_GET['postId'])) {
        $postId = $_GET['postId'];
?>

<div class="form" title="addComment">
    <p class="formAuthor">
        <label for="author<?php print($postId); ?>">Name</label>
        <span class="required">*</span>
        <input class="author" id="author<?php print($postId); ?>" type="text" aria-required="true" placeholder="Your Name" size="30" value="" name="author">
    </p>
    <p class="formEmail">
        <label for="email<?php print($postId); ?>">Email</label>
        <span class="required">*</span>
        <input class="email" id="email<?php print($postId); ?>" type="email" placeholder="your@email.com" aria-required="true" size="30" value="" name="email">
    </p>
    <p class="formWebsite">
        <label for="website<?php print($postId); ?>">Website</label>
        <input class="website" id="website<?php print($postId); ?>" type="text" aria-required="false" size="30" placeholder="http://yourwebsite.com" value="" name="website">
    </p>
    <p class="formComment">
        <label for="comment<?php print($postId); ?>">Thoughts</label>
        <span class="required">*</span>
        <textarea placeholder="Your fantastic thoughts.." class="comment" id="comment<?php print($postId); ?>" aria-required="true" rows="8" cols="45" name="comment"></textarea>
    </p>
    <p class="formSubmit">
        <input id="submit<?php print($postId); ?>" class="submitThough" type="button" value="<?php printf($configuration['thought.button.add.comment'])?>" name="submit">
        <input class="postId" type="hidden" value="<?php print($postId); ?>" name="postId">
    </p>
</div>

<script src="design/js/vegaasen/inline_dependant/add_post.js" type="text/javascript"></script>

<?php
    }
?>