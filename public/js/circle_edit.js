/**
 * Created by zhoutengteng on 16/7/5.
 */



function viewOne(result, name) {
    var tr = $('<tr class="template-upload fade in"> </tr>');
    var td1 = $('<td> </td>');
    var span1 = $('<span class="preview"> </span>');
    var canvas = $('<canvas width = "62"  height="62"> </canvas>');
    var ctx=canvas.get(0).getContext("2d");
    var img = new Image();
    img.src = result;
    img.onload = function(){
        ctx.drawImage(img,0,0);
    };
    var td2 = $('<td> </td>');
    var p1 = $('<p class="fileName"></p>');
    p1.html(name);
    var td3 = $('<td> </td>');
    var button = $('<button class="btn btn-warning cancel">  <i class="glyphicon glyphicon-ban-circle"></i> <span>Cancel</span> </button>');
    $(button).bind("click", function(){
        tr.remove();
    });
    $(tr).append(td1);
    $(tr).append(td2);
    $(tr).append(td3);
    $(td1).append(span1);
    $(span1).append(canvas);
    $(td2).append(p1);
    $(td3).append(button);
    //alert(canvas.get(0).toDataURL("imgage/png"))
    return tr;
}


$('document').ready(function(){
    $('#content').bind('keyup',function(){
        var num_txt1 = $('#num');
        var content = $('#content');
        var txtval = content.val().length;
        var str = parseInt(600-txtval);
        console.log(str);
        if(str > 0 ){
            num_txt1.html('剩余可输入'+str+'字');
        }else{
            num_txt1.html('剩余可输入0字');
            content.val(content.val().substring(0,700)); //这里意思是当里面的文字小于等于0的时候，那么字数不能再增加，只能是600个字
        }
    });


    $('#add').change(function(){
        var str= $(this).val();
        var arr = str.split('\\');//注split可以用字符或字符串分割
        var name =arr[arr.length-1];//这就是要取得的图片名称
        var files = $(this).prop('files');//获取到文件列表

        if(files.length == 0){
            alert('请选择文件');
        }else{
            //alert(files.length);
            var reader = new FileReader();//新建一个FileReader
            reader.readAsDataURL(files[0]);//读取文件
            reader.onload = function(evt){ //读取完文件之后会回来这里
                var fileString = evt.target.result;
                var file = $("#add").prop('files')[0];
                if(!/image\/\w+/.test(file.type)){
                    alert("看清楚，这个需要图片！");
                } else {
                    $('table[role="presentation"] tbody').append(viewOne(fileString, name));
                }
                //$('#show').html(fileString); //设置隐藏input的内容
                //alert(fileString)
            }
        }
    });

    //判断浏览器是否支持FileReader接口
    if(typeof FileReader == 'undefined'){
        var result=$("#result");
        var file=$("#file");
        result.html("<p>你的浏览器不支持FileReader接口！</p>");
        //使选择控件不可操作
        file.attr("disabled","disabled")
    }

    $('button.btn.btn-danger.delete').bind("click", function(){
        $('table tbody').empty();
    });


    $('#submit').bind("click", function () {
        var theme = $('#theme').val();
        var content = $('#content').val();
        var ps = $('table tbody p');
        var canvas = $('table tbody canvas');
        var pic = {
            "number": ps.length
        };
        //console.log(canvas)
        //console.log($(p).html());
        if (ps.length == 1) {
            pic[ps.text()] = canvas.get(0).toDataURL("image/png");
        } else if (ps.length >= 2) {
            for (var i = 0; i < ps.length; i++) {
                var p = ps[i];
                pic[$(p).html()] = canvas[i].toDataURL("image/png");
            }
        }
        console.log(pic);
        theme.replace(/(^\s*)|(\s*$)/g,'');
        content.replace(/(\s*$)/g,'');
        if (theme.length > 0 && content.length > 0) {
            $.ajax({
                type: 'POST',
                url: "/circle/edit",
                async: true,
                data: {
                    "theme": theme,
                    "content": content,
                    "pic": pic
                },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    //console.log(data)
                    if (data.status == "true") {
                        //alert(data.url);
                        alert("提交成功");
                        window.location.href = data.url;
                    } else {
                        alert("编写上传失败");
                        console.log(data)
                    }
                },
                error: function () {
                    alert("服务器问题");
                }
            });
        } else {
            alert("请输入标题或者正文");
        }
    });


    //$('.button1').bind("click", function readAsDataURL(){
    //    //检验是否为图像文件
    //    var file = $("#add").prop('files')[0];
    //    if(!/image\/\w+/.test(file.type)){
    //        alert("看清楚，这个需要图片！");
    //        return false;
    //    }
    //    var reader = new FileReader();
    //    //将文件以Data URL形式读入页面
    //    reader.readAsDataURL(file);
    //    reader.onload=function(e){
    //        var result=$("#result");
    //        //显示文件
    //        //result.html('<img src="' + this.result +'" alt="" />')
    //        //console.log(this.result);
    //        var canvas= $("#myCanvas");
    //        var ctx=canvas.get(0).getContext("2d");
    //        var img=new Image();
    //        img.src = this.result;
    //        img.onload = function(){
    //            ctx.drawImage(img,0,0);
    //        };
    //    };
    //
    //});
    //
    //$('.button2').bind("click", function readAsBinaryString(){
    //    var file = $("#add").prop('files')[0];
    //    var reader = new FileReader();
    //    //将文件以二进制形式读入页面
    //    reader.readAsBinaryString(file);
    //    reader.onload=function(f){
    //        var result=$("#result");
    //        //显示文件
    //        result.html(this.result);
    //    }
    //})
    //
    //$('.button3').bind("click", function readAsText(){
    //    var file = $("#add").prop('files')[0];
    //    var reader = new FileReader();
    //    //将文件以文本形式读入页面
    //    reader.readAsText(file, "UTF-8");
    //    reader.onload=function(f){
    //        var result=$("#result");
    //        //显示文件
    //        result.html(this.result);
    //    }
    //})


    //$('#fileupload').fileupload({
    //    progressall: function (e, data) {
    //        var progress = parseInt(data.loaded / data.total * 100, 10);
    //        $('#progress .bar').css(
    //            'width', progress + '%'
    //        );
    //    }
    //});
    //$('#fileupload').fileupload({
    //    dataType: 'json',
    //    add: function (e, data) {
    //        data.context = $('<p/>').text('Uploading...').appendTo(document.body);
    //        data.submit();
    //    },
    //    done: function (e, data) {
    //        data.context.text('Upload finished.');
    //    }
    //});
    //$('#fileupload').fileupload('enable');
    //$('#fileupload').fileupload({ "dd": 'json' })
});

