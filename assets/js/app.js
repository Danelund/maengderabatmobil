//define feeds that should be listed
var feeds = {
'Downtown' : 'http://downtown.dk/rss',
'Dealhunter' : 'http://dealhunter.dk/rss',
'Dealicious' : 'http://www.dealicious.dk/modules/feeder/rss.php',
'Takeoffer' : 'http://www.takeoffer.dk/rss',
'Tipster' : 'tipster.dk/feed.php?ename=København',
'Just-Half-Price' : 'http://www.just-half-price.dk/feed.php' ,
'Wellnessdeals' : 'http://www.wellnessdeal.dk/deals.xml',
'SlåTilNu' : 'http://www.slaatilnu.dk/site/slaatilnu.dk/rss/weekly.xml',
'Groupon' : 'http://api.groupon.de/feed/api/v1/deals/oftheday/DK/kobenhavn',
'Deal2Deal' : 'http://www.deal2deal.dk/feed.php',
'Pinq' : 'http://pinq.dk/feed/'}

function init(){
    for(var feed in feeds)
	{
		//build a feed from the (feed name, feed url)
		buildFeed(feed,feeds[feed]);
	}
	$('#feedlist').listview('refresh');
}

function buildFeed(title, url)
{
			//append a new feed to the masterlist
			$("#feedlist").append('<li><a href="#'+title+'" id="'+title+'-link">'+title+'</a><img src="assets/img/'+title+'.png" class="ui-li-icon"></li>');
			//append a new section that contains the feed items for the new feed
			$("body").append('<section id="'+title+'" data-role="page" data-theme="b"><header data-role="header"><h1>'+title+'</h1></header><div data-role="content" class="content"><ul data-role="listview" data-inset="true" class="feedcontent"></ul></div><footer data-role="footer"><h2>example by Oikos Development</h2></footer></section>');
			
	$("#"+title+"-link").click(function(){
		$.mobile.showPageLoadingMsg();
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
				$("#"+title+" .feedcontent").append(feedcontent).listview('refresh');
				$.mobile.hidePageLoadingMsg();
		   }
		});
	});
}

function refreshFeed()
{
            $.mobile.pageLoading( true );
}