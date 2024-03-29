(function($){

 
    $.fn.myValidation = function(opt){
        new MyValidation(this, opt);
        return this;
    }

    function MyValidation(el,opt){
        this.init(el);  
        this.bindingEvent(opt);
    }
    MyValidation.prototype.init = function(el){
        this.submit = el.find("input[type=submit]");
    }
    MyValidation.prototype.bindingEvent = function(opt){
        this.submit.on("click", function(e){  
          
            if(opt.isTxt){      
                for(var i=0; i<opt.isTxt.length; i++){
                    if( !this.isTxt(opt.isTxt[i]) ) e.preventDefault();
                }
            }        
          
            if(opt.isCheck){            
                for(var i=0; i<opt.isCheck.length; i++){
                    if( !this.isCheck(opt.isCheck[i]) ) e.preventDefault();
                }
            }
           
            if(opt.isSelect){     
                for(var i=0; i<opt.isSelect.length; i++){
                    if( !this.isSelect(opt.isSelect[i]) ) e.preventDefault();
                }
            }  
            
            if(opt.isPwd){      
                if( !this.isPwd(opt.isPwd[0], opt.isPwd[1]) ) e.preventDefault();  
            }
          
        }.bind(this));
    }
    MyValidation.prototype.isTxt = function(name){
        var len = 5;    
        var txt = $("[name="+name+"]").val();
    
        if(txt==""){
            $("input[name="+name+"]").parent().find("p").css({opacity:"1"});
            $("[name="+name+"]").addClass("error");
            return false;
        }else{
            if(txt.length < len){
                $("input[name="+name+"]").parent().find("p").text("최소 "+len+"글자 이상 입력하세요.").css({opacity:"1"});
                $("[name="+name+"]").addClass("error");
                return false;
            }else {
                $("[name="+name+"]").removeClass("error");
                return true;
            }
        }
    }
    MyValidation.prototype.isPwd = function(name1,name2){
        var $pwd1 = $("input[name="+name1+"]");
        var $pwd2 = $("input[name="+name2+"]");
        var pwd1 = $pwd1.val();
        var pwd2 = $pwd2.val();  
        var isConfirm = false;
        var i=0;
    
        var num = /[0-9]/;
        var eng = /[a-zA-Z]/;
        var spc = /[~!@#$%^&*()_+\]\[-]/;
    
        if(pwd1 === pwd2){
            
    
            if( num.test(pwd1) ){
                i++;
            }else {
                $pwd1.parent().find("p").text("비밀번호에 숫자를 포함하세요.").css({opacity:"1"});
            }
    
            if( eng.test(pwd1) ){
                i++;
            }else{
                $pwd1.parent().find("p").text("비밀번호에 문자를 포함하세요.").css({opacity:"1"});
            }
    
            if( spc.test(pwd1) ){
                i++;
            }else{
                $pwd1.parent().find("p").text("비밀번호에 특수문자를 포함하세요.").css({opacity:"1"});
            }
            if(pwd1.length >= 5){
                i++;

            }else{
                $pwd1.parent().find("p").text("5자 이상 입력하세요.").css({opacity:"1"});
            }
            
    
            if(i===4){
                $pwd1.removeClass("error");
                $pwd2.removeClass("error");
                isConfirm = true;
                return isConfirm;
            }else{
                $pwd1.addClass("error");
                $pwd2.addClass("error");
                return isConfirm;
            }
    
            
        }else{
            $pwd2.parent().find("p").text("두개의 비밀번호를 동일하게 입력하세요.").css({opacity:"1"});
            $pwd1.addClass("error");
            $pwd2.addClass("error");
            return isConfirm;
        }
    
    }
    MyValidation.prototype.isCheck = function(name){
        var isCheck = $("input[name="+name+"]").is(':checked');   
    
        if(isCheck){
            $("input[name="+name+"]").parent().parent().find("p").css({opacity:"0"});
            return true;
        }else{
            $("input[name="+name+"]").parent().parent().find("p").css({opacity:"1"});
            return false;
        }
    }
    MyValidation.prototype.isSelect = function(name){
        var sel = $("select[name="+name+"]").children("option:selected").val();
    
        if(sel == ""){
            $("select[name="+name+"]").addClass("error");
            return false;
        }else{
            $("select[name="+name+"]").removeClass("error");
            return true;
        }
    }
    
})(jQuery);





