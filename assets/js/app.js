var url="";

var feeds = {
'Downtown' : 'http://downtown.dk/rss',
'Dealhunter' : 'http://dealhunter.dk/rss',
'Dealicious' : 'http://www.dealicious.dk/modules/feeder/rss.php',
'Takeoffer' : 'http://www.takeoffer.dk/rss',
'Tipster' : 'tipster.dk/feed.php?ename=København',
'Just-Half-Price' : 'http://www.just-half-price.dk/feed.php' ,
'Wellness Deals' : 'http://www.wellnessdeal.dk/deals.xml',
'Slå Til Nu' : 'http://www.slaatilnu.dk/site/slaatilnu.dk/rss/weekly.xml',
'Groupon' : 'http://api.groupon.de/feed/api/v1/deals/oftheday/DK/kobenhavn',
'Deal2Deal' : 'http://www.deal2deal.dk/feed.php',
'Pinq' : 'http://pinq.dk/feed/',}

			/*<li onclick="url=''"><a href="#page2">Downtown</a><img src="http://static.downtown.dk/favicon.ico" class="ui-li-icon"></li>
            <li onclick="url=''"><a href="#page2">Dealhunter</a><img src="http://dealhunter.dk/favicon.ico" class="ui-li-icon"></li>
            <li onclick="url=''"><a href="#page2">Takeoffer</a><img src="http://www.takeoffer.dk/favicon.ico" class="ui-li-icon"></li>
			<li onclick="url=''"><a href="#page2">Dealicious</a><img src="http://www.dealicious.dk/img/favicon.ico?1328584070" class="ui-li-icon"></li>
            <li onclick="url=''"><a href="#page2">Tipster</a><img src="http://tipster.dk/static/icon/favicon.ico" class="ui-li-icon"></li>
			<li onclick="url=''"><a href="#page2">Just Half Price</a><img src="http://www.just-half-price.dk/themes/icon/favicon.ico" class="ui-li-icon"></li>
            <!--<li onclick="url=''"><a href="#page2">Wellness Deals</a><img src="assets/icons/rss.png" class="ui-li-icon"></li>-->
			<li onclick="url=''"><a href="#page2">Slå til nu</a><img src="http://www.slaatilnu.dk/site/slaatilnu.dk/templates/images/favicon.ico" class="ui-li-icon"></li>
            <!--<li onclick="'"><a href="#page2">Deal2Deal</a><img src="assets/icons/rss.png" class="ui-li-icon"></li>-->
            <li onclick="url=''"><a href="#page2">Groupon</a><img src="http://static.dk.groupon-content.net/s/images/layout/favicon_groupon.ico" class="ui-li-icon"></li>
			<li onclick="url=''"><a href="#page2">Pinq</a><img src="http://pinq.dk/wp-content/themes/pinq/images/favicon.ico" class="ui-li-icon"></li>*/
$(document).ready(function()
{
    for(var feed in feeds)
	{
		//build a feed from the (feed name, feed url)
		buildFeed(feed,feeds[feed])
	}
	$('ul').listview('refresh');
});

function buildFeed(title, url)
{
	jQuery.getFeed({
       url: url,
       success: function(feed)
       {
			//make the feedcontent / list items
			var feedcontent = "";
            for(var i = 0; i < feed.items.length && i < 10; i++)
            {
                var item = feed.items[i];
				var desc = $(item.description);
				var img = desc.find("img");
				var description = desc.text();
                feedcontent += '<li><a href="'+item.link+'"><h3 class="ui-li-heading">'+item.title+'</h3><p class="ui-li-desc">'+description+'</p></a></li>';
            }
			//append a new feed to the masterlist
			$("#feedlist").append('<li><a href="#'+title+'"></a><img src="assets/img/'+title+'.png" class="ui-li-icon"></li>');
			//append a new section that contains the feed items for the new feed
			$("body").append('<section id="'+title+'" data-role="page" data-theme="b"><header data-role="header"><h1>'+title+'</h1></header><div data-role="content" class="content">'+feedcontent+'<ul data-role="listview" data-inset="true"></ul></div><footer data-role="footer"><h2>example by Oikos Development</h2></footer></section>');
       }
    });
}

function refreshFeed()
{
            $('#page2 ul').listview('refresh');
            $.mobile.pageLoading( true );
}