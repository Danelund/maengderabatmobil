var url="";

function init()
{
    $("#page2").bind("pageshow", function onPageShow(event, ui)
    {
        $.mobile.pageLoading();
        refreshFeed();
    });

    $("#page2").bind("pagehide", function onPageHide(event, ui)
    {
        $("#page2 ul").empty();
    });
}

function refreshFeed()
{
    jQuery.getFeed({
       url: url,
       success: function(feed)
       {
               $("#page2 ul").append('<li data-role="divider" data-theme="b">'+feed.title+'</li>');

            for(var i = 0; i < feed.items.length && i < 10; i++)
            {
                var item = feed.items[i];
                $("#page2 ul").append('<li><a href="'+item.link+'">'+item.title+'</a></li>');
            }

            $('#page2 ul').listview('refresh');
            $.mobile.pageLoading( true );
       }
    });
}