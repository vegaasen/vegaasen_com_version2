<!DOCTYPE HTML>
<html>
    <head>
        <title>Vegard Aasen - Version2 - 404</title>
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
        <link href="/favico.gif" rel="shortcut icon" type="image/gif"/>
        <link href="/design/css/font.css" rel="stylesheet" media="screen" type="text/css"/>
        <link href="/design/css/site.css" rel="stylesheet" media="screen" type="text/css"/>
        <link href="paperservice.css" rel="stylesheet" media="screen" type="text/css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="google-site-verification" content="2F2-RvpYA8iyYAK7FNzok9qySKu6thi5vTBWIrfnUbc" />
        <meta name="viewport" content="width=device-width" />
    </head>
    <body id="appbody">
        <header>
            <h1>Paper Services</h1>
        </header>
        <div id="middle">
            <div class="content">
                <div class="info">
                    <p class="left">
                        This is a service that allows downloading of newest paperissues from some of Norways
                        local papers. <br/> All papers are downloaded as PDFs for the time beeing. <br/>
                        Please be patient when choosing/downloading an issue, as my computer is a bit slow. <br/>
                    </p>
                </div>
                <div class="app">
                    <div class="info">
                        <a href="javascript:void(0)" title="Favorites" class="begin">Click here to get started</a>
                    </div>
                    <div id="services">
                        <div class="loader"></div>
                        <div class="chooser">
                            <div class="all">
                                <select id="allPapers" class="papers select">
                                    <option disabled="disabled">Choose a paper:</option>
                                    <option disabled="disabled">===============</option>
                                </select>
                            </div>
                            <div class="options">
                                <div class="timespan">
                                    <div id="from" class="timespan">
                                        <h2>Browse a given ID-span</h2>
                                        <label for="fromSpan">From:</label>
                                        <input type="range" min="0" max="9999" step="1" value="10" id="fromSpan" />
                                        <span id="fromSpanRangeValue">0</span>
                                    </div>
                                    <div id="to" class="timespan">
                                        <label for="toSpan">To:</label>
                                        <input type="range" min="0" max="9999" step="1" value="3000" id="toSpan" />
                                        <span id="toSpanRangeValue">3000</span>
                                    </div>
                                </div>
                                <div class="specific">
                                    <h2>Specify a specific issue</h2>
                                    <label for="specificPaperIssue">Specify an paper issue:</label>
                                    <input type="text" id="specificPaperIssue" placeholder="Requires an ID. E.g: 1315"/>
                                </div>
                                <div class="latest">
                                    <h2>Select the latest issue!</h2>
                                    <label for="latestPaper">Fetch latest?:</label>
                                    <input type="checkbox" id="latestPaper" class="checkbox latestCb"/>
                                </div>
                                <div class="qualityOpt">
                                    <h3>Choose Quality</h3>
                                    <input checked="checked" type="radio" id="highQ" value="high" name="quality" class="quality radio input"/>
                                    <label for="highQ">High Quality</label><br/>
                                    <input type="radio" id="mediumQ" value="medium" name="quality" class="quality radio input"/>
                                    <label for="mediumQ">Medium Quality</label><br/>
                                    <input type="radio" id="lowQ" value="low" name="quality" class="quality radio input"/>
                                    <label for="lowQ">Low Quality</label><br/>
                                    <input type="radio" id="badQ" value="bad" name="quality" class="quality radio input"/>
                                    <label for="badQ">Bad Quality</label>
                                </div>
                                <div class="go">
                                    <label for="request">GO!</label>
                                    <input type="button" id="request" class="button submitRequest" value="Fetch resource(s)"/>
                                </div>
                                <div class="oops">
                                    <h2>Didn't work?</h2>
                                    <label for="generateUrl">Try to generate a URL to perform the request!</label><br/>
                                    <input type="button" id="generateUrl" class="button generateUrl" value="Generate URL"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <p class="important">
                <blockquote><cite class="cite">0.2222222223% guaranteed uptime.</cite> ~ <span class="storyteller">Vegard Aasen</span></blockquote>
            </p>
        </footer>
        <div id="spinner" class="hidden">
            <img rel="spinner.gif" src="/design/images/ajax/spinner.gif" alt="Ajax spinner">
        </div>
        <script src="/design/js/jquery/jquery-min.js?version=<?php printf($configuration['version.jquery.number'])?>" type="text/javascript"></script>
        <script src="/design/js/jquery/jquery-download.js?version=<?php printf($configuration['version.jquery.number'])?>" type="text/javascript"></script>
        <script src="design/js/vegaasen/dependant/google_analytics.js?version=<?php printf($configuration['version.number'])?>" type="text/javascript"></script>
        <script src="util.js" type="text/javascript"></script>
    </body>
</html>