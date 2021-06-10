(function($){

    //제이쿼리 객체의 fn공간에 myValidation으로 플러그인 등록
    //옵션으로 받은 객체를 opt인수로 전달
    $.fn.myValidation = function(opt){
        //내부에서 MyValidation생성자로 인스턴스 생성 
        //이대 첫번째 인수 this --> $("#myForm")
        new MyValidation(this, opt);
        return this;
    }

    function MyValidation(el,opt){
        this.init(el);  
        this.bindingEvent(opt);
    }
    MyValidation.prototype.init = function(el){
        //el로 전달받는거 자체가 제이쿼리 선택자이기 때문에
        //다시 제이쿼리 선택자로 감쌀 필요가 없음
        // el --> $("#myForm")
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
        var msg = $("[name="+name+"]").attr("placeholder");
    
        if(txt==""){
            alert(msg);
            $("[name="+name+"]").addClass("error");
            return false;
        }else{
            if(txt.length < len){
                alert("최소 "+len+"글자 이상 입력하세요!");
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
            if(pwd1.length >= 5){
                i++;
            }else{
                alert("비밀번호는 5자리 이상 입력하세요.");
            }
    
            if( num.test(pwd1) ){
                i++;
            }else {
                alert("비밀번호에 숫자를 포함하세요.");
            }
    
            if( eng.test(pwd1) ){
                i++;
            }else{
                alert("비밀번호에 문자를 포함하세요.");
            }
    
            if( spc.test(pwd1) ){
                i++;
            }else{
                alert("비밀번호에 특수문자를 포함하세요.");
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
            alert("두 개의 비밀번호를 동일하게 입력하세요.")
            $pwd1.addClass("error");
            $pwd2.addClass("error");
            return isConfirm;
        }
    
    }
    MyValidation.prototype.isCheck = function(name){
        var isCheck = $("input[name="+name+"]").is(':checked');   
    
        if(isCheck){
            $("input[name="+name+"]").parent().find("p").hide();
            return true;
        }else{
            $("input[name="+name+"]").parent().find("p").show();
            return false;
        }
    }
    MyValidation.prototype.isSelect = function(name){
        var sel = $("select[name="+name+"]").children("option:selected").val();
        var msg = $("select[name="+name+"]").children("option").eq(0).text();
    
        if(sel == ""){
            alert(msg);
            $("select[name="+name+"]").addClass("error");
            return false;
        }else{
            $("select[name="+name+"]").removeClass("error");
            return true;
        }
    }
    
})(jQuery);





