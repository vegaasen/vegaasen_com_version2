var SERVICE_LOCATION = "http://88.90.114.94:8001/pap/rest/paper/";
//var SERVICE_LOCATION = "http://rest.vegaasen.com/pap/rest/paper/";
//var SERVICE_LOCATION = "http://localhost:8001/rest/paper/";
var activateErrors = false;

jQuery(".info > a.begin").click(function(){
    jQuery(this).hide();
    jQuery("#services").show();
    jQuery(".app > #services > .loader").html(jQuery("#spinner").html());

    var serviceUrl = SERVICE_LOCATION + "getAllPapers?reversed=false";
    jQuery.ajax({
        type: 'GET',
        url: serviceUrl,
        dataType: 'xml',
        crossDomain: true,
        success: function(xml){
            jQuery(xml).find("paper").each(function() {
                jQuery("#allPapers").append(
                    jQuery("<option />").text(jQuery(this).find("name").text() + " [" + jQuery(this).find("paperAdded").text()  + "]").val(jQuery(this).find("name").text().toLowerCase())
                );
            });
            jQuery(".app > #services > .loader").hide();
        }
        ,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(activateErrors) {
                alert("Could not parse the data. Reason: " +
                    errorThrown, + " .. " + XMLHttpRequest + " ...." + textStatus);
            }
            jQuery(".app > #services > .loader").hide();
        }
    });
});

jQuery("#request").click(function() {
    if(jQuery("#allPapers").val().indexOf("Choose") === -1 && jQuery("#allPapers").val().indexOf("=") === -1) {
        jQuery(".app > #services > .loader").html(jQuery("#spinner").html()).show();
        jQuery(".cite").html("Working with your request. Please wait...");
        jQuery(".storyteller").html("Aasen");
        var serviceUrlGenerated = false;
        if(jQuery(".latest input#latestPaper:checked")) {
            var serviceUrl = SERVICE_LOCATION + "getLatestIssue;"
            var serviceMethod = "paperId=" + jQuery("#allPapers").val() + "&quality=" + jQuery(".qualityOpt input[name=quality]:checked").val();
            serviceUrlGenerated = true;
        }else if(jQuery(".specific input#specificPaperIssue").val()!==""){
            alert("Using specific!");
        }
        if(serviceUrlGenerated){
            jQuery.download(serviceUrl, serviceMethod, 'GET');
            jQuery(".cite").html(
                "Enjoy the requested issue of <strong>" +
                jQuery("#allPapers").val() +
                "</strong> in quality <strong>" +
                jQuery(".qualityOpt input[name=quality]:checked").val() + "</strong>"
            );
            jQuery(".storyteller").html("REST Application");
            jQuery(".app > #services > .loader").hide();
        }else{
            jQuery(".cite").html("Are you sure everything is OK with the parameters?");
            jQuery(".storyteller").html("Vegaasen.com :-)");
        }
    }else{
        jQuery(".cite").html("Woops! Thats not a valid option. Choose something else, please");
        jQuery(".storyteller").html("REST Application");
    }
});

jQuery("#generateUrl").click(function() {
    if(jQuery("#allPapers").val().indexOf("Choose") === -1 && jQuery("#allPapers").val().indexOf("=") === -1) {
        jQuery(".app > #services > .loader").html(jQuery("#spinner").html()).show();
        jQuery(".cite").html("Working with your request. Please wait...");
        jQuery(".storyteller").html("Aasen");
        var serviceUrlGenerated = false;
        if(jQuery(".latest input#latestPaper:checked")) {
            var serviceUrl = SERVICE_LOCATION + "getLatestIssue?paperId=" + jQuery("#allPapers").val() + "&quality=" + jQuery(".qualityOpt input[name=quality]:checked").val();
            serviceUrlGenerated = true;
        }else if(jQuery(".specific input#specificPaperIssue").val()!==""){
            
        }
        jQuery(".cite").html("<a href='" + serviceUrl + "'>" + serviceUrl + "</a>");
        jQuery(".cite").css("color","red");
    }else{
        jQuery(".cite").html("Woops! Thats not a valid option.");
        jQuery(".storyteller").html("REST Application");
    }
});

jQuery("#latestPaper").click(function() {
    if(jQuery("#latestPaper").is(':checked')) {
        jQuery(".specific #specificPaperIssue").attr("disabled", "disabled");
        jQuery(".timespan input[type=range]").attr("disabled", "disabled");
    }else{
        jQuery(".specific #specificPaperIssue").removeAttr("disabled");
        jQuery(".timespan input[type=range]").removeAttr("disabled");
    }
});

jQuery("#fromSpan").change(function() {
    jQuery("#fromSpanRangeValue").html(jQuery(this).val());
});

jQuery("#toSpan").change(function() {
    jQuery("#toSpanRangeValue").html(jQuery(this).val());
});