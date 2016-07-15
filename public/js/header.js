

$(document).ready(function(){
   $("#logout").bind("click", function(){
       $.ajax({
           type: 'POST',
           url: "/logout",
           async: true,
           cache: false,
           dataType: 'json',
           success: function (data) {
               console.log("===>" + data);
               if (data.status == "true") {
                   console.log("pull finished");
                   window.location.href = data.url;
               } else {
                   alert("出现异常");
               }
           },
           error: function () {
               alert("服务器 error！");
           }
       });
   });

});