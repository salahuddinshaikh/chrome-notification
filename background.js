/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function show(title = "",event="") {
    if (localStorage.action) {
        if(localStorage.action=="started"){
            if(title != null ){
                new Notification(title,{
                    icon: 'file5d975155ab6d5-favicon.png',
                    body: event
                });
            }
        }
    }
}
// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  setInterval(function() {
      if (localStorage.user_id && localStorage.action=="started") {
            $.ajax({
                url: 'https://www.technokeens.com/projects/index.php/Technokeens_notification',
                type: 'POST',
                dataType: 'JSON',
                header: {
                    "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
                },
                data: {
                    user_id: localStorage.user_id
                },
                success: function(result) {
                    if (result.status == 200) {
                        var notification_list = result.notification_list;
                        var notifications = notification_list.notifications;
                        if (notifications.length != 0) {
                            $.each(notifications, function(index, value) {
                                if (value.is_read == "0") {
                                    console.log(value.project_title);
                                    show(value.project_title, value.event);
                                }
                            });
                        }
                    }
                }
            })
        }
    }, 150000);
}
