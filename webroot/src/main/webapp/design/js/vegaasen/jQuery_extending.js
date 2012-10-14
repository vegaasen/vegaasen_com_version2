/*
 * jQuery additions / extensions required for my site..
 * 
 * @author vegaasen
 */

jQuery.expr[':'].hiddenByParent = function(a) {
   return jQuery(a).is(':hidden') && jQuery(a).css('display') != 'none' && jQuery(a).css('visibility') == 'visible';
};
