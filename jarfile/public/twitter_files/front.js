if(!Array.forEach){Array.prototype.forEach=function(D,E){var C=E||window;for(var B=0,A=this.length;B<A;++B){D.call(C,this[B],B,this)}};Array.prototype.map=function(E,F){var D=F||window;var A=[];for(var C=0,B=this.length;C<B;++C){A.push(E.call(D,this[C],C,this))}return A};Array.prototype.filter=function(E,F){var D=F||window;var A=[];for(var C=0,B=this.length;C<B;++C){if(!E.call(D,this[C],C,this)){continue}A.push(this[C])}return A};Array.prototype.every=function(D,E){var C=E||window;for(var B=0,A=this.length;B<A;++B){if(!D.call(C,this[B],B,this)){return false}}return true};Array.prototype.indexOf=function(B,C){var C=C||0;for(var A=0;A<this.length;++A){if(this[A]===B){return A}}return -1}}Array.prototype.contains=function(A){if(Array.contains){return this.contains(A)}return this.indexOf(A)>-1};Array.prototype.insert=function(A){if(!this.contains(A)){this.push(A)}};if(!Array.remove){Array.remove=function(D,C,B){var A=D.slice((B||C)+1||D.length);D.length=C<0?D.length+C:C;return D.push.apply(D,A)}}Function.prototype.method=function(A,B){this.prototype[A]=B;return this};Function.prototype.augmentProto=function(A){for(key in A){this.prototype[key]=A[key]}return this};Function.prototype.pBind=function(B){var A=this;return function(){return A.apply(B,arguments)}};Function.prototype.widget=function(){this.prototype.bind=function(B,A){this.$root.bind(B,A);return this};this.prototype.trigger=function(A,B){this.$root.trigger(A,B)};this.prototype.find=function(A){return this.$root.find(A)};return this};String.prototype.toCamel=function(){return this.replace(/[-_\s]\D/gi,function(A){return A.charAt(A.length-1).toUpperCase()})};String.prototype.escapeHTML=function(){return this.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")};window.twttr=window.twttr||{};twttr.augmentObject=function(B,C){for(var A in C){B[A]=C[A]}return B};twttr.augmentObject(twttr,{namespaceOf:function(A){return twttr.is.object(A)?A:window},merge:function(){var C=arguments;var F=arguments[arguments.length-1];var B=false;if(twttr.is.nil(C[0])||!twttr.is.def(C[0])){if(C.length<2){return{}}[].shift.call(C);return this.merge.apply(this,C)}if(twttr.is.bool(F)){B=F;[].pop.call(C)}for(var E=0,A=C.length-1;E<A;E++){for(var D in C[E+1]){if(B&&C[0][D]&&twttr.is.object(C[0][D])&&!twttr.is.fn(C[0][D])&&twttr.is.object(C[E+1][D])&&!twttr.is.fn(C[E+1][D])){this.merge(C[0][D],C[E+1][D])}else{C[0][D]=C[E+1][D]}}}return C[0]},extend:function(B,C){var A=function(){};A.prototype=C.prototype;B.prototype=new A();B.prototype.constructor=B;B.uber=C.prototype;if(C.prototype.constructor==Object.prototype.constructor){C.prototype.constructor=C}},klass:function(A,B){return twttr.magic(A,B)},augmentAndExtend:function(B,C,D){var A=twttr.namespaceOf(B);A[C]=function(){A[C].uber.constructor.apply(this,arguments)};twttr.extend(A[C],D);return A[C]},auxo:function(C,D,B){var A=twttr.is.object(B)?B:twttr;return twttr.augmentAndExtend(A,C,D)},augmentString:function(C,A){var B=window;C.split(".").forEach(function(F,E,D){B=B[F]=B[F]||(twttr.is.def(D[E+1])?{}:A)});return B},magic:function(B,A){if(twttr.is.string(B)){return twttr.augmentString(B,A)}else{return twttr.augmentObject(B,A)}},inspect:function(B){console.clear();var C=$(B);var H=C.data("events");var A=0;var G=0;var E=[];var D=[];for(key in H){E.push(key);A++;D.push("\n*******************\n");D.push("Events for "+key+"\n\n");for(fn in H[key]){var F=H[key][fn];G++;D.push(F.toString()+"\n")}}console.log("************* Summary *************");console.log("for target",C);console.log(A+" types of events",E);console.log(G,"Total Event Listeners");console.log("Event listeners assigned to target");console.log(D.join(" "))},is:{bool:function(A){return typeof A==="boolean"},nil:function(A){return A===null},def:function(A){return !(typeof A==="undefined")},number:function(A){return typeof A==="number"&&isFinite(A)},fn:function(A){return typeof A==="function"},array:function(A){return A?this.number(A.length)&&this.fn(A.splice):false},string:function(A){return typeof A==="string"},blank:function(A){return A===""},falsy:function(A){return A===false||A===null||A===undefined},object:function(A){return(A&&(typeof A==="object"||this.fn(A)))||false}},widget:function(A){A.prototype.bind=function(C,B){this.$element.bind(C,B)}}});if(!window.console){var names=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var i=0;i<names.length;++i){window.console[names[i]]=function(){}}}function _(C,A){if(twttr.i18n){var B=twttr.i18n[C];if(B){C=B}}return replaceParams(C,A)}function replaceParams(B,A){if(A){for(var C in A){B=B.replace(new RegExp("\\%\\{"+C+"\\}","gi"),A[C])}}return B}var h=function(){var A=$("<div/>");return function(B){return B?A.text(B).html().replace(/\"/gi,"&quot;"):B}}();function unh(A){return A?A.replace(/&(amp;)+/g,"&").replace(/&[a-z]+;/gi,function(B){if(unh.HTML_ESCAPE_TOKENS[B]){return unh.HTML_ESCAPE_TOKENS[B]}return B}):A}window.unh.HTML_ESCAPE_TOKENS={"&lt;":"<","&gt;":">","&quot;":'"'};function addSlashes(A){return A.replace(/\'/g,"\\'").replace(/\"/g,'\\"')}var reverseString=function(A){return A?A.split("").reverse().join(""):A};var numberWithDelimiter=function(B,A,C){A=A?A:",";C=C?C:".";parts=(""+B).split(".");parts[0]=reverseString(reverseString(parts[0]).replace(/(\d\d\d)/g,"$1"+A));if(parts[0][0]==A){parts[0]=parts[0].substring(1)}return parts.join(C)};var timeAgo=function(C){if(!C){return false}var H=new Date();var G=new Date(C);if(document.all){G=Date.parse(C.replace(/( \+)/," UTC$1"))}var D=H-G;var B=1000,F=B*60,A=F*60;if(isNaN(D)||D<0){return false}var E=-1;$.each([5,10,20],function(){if(D<this*B){E=this;return false}});if(E!=-1){return _("less than %{time} seconds ago",{time:E})}if(D<B*40){return _("half a minute ago")}if(D<F){return _("less than a minute ago")}if(D<B*90){return _("1 minute ago")}if(D<F*45){return _("%{time} minutes ago",{time:Math.round(D/F)})}if(D<F*90){return _("about 1 hour ago")}if(D<A*24){return _("about %{time} hours ago",{time:Math.round(D/A)})}return false};var updateTimeAgo=function(){$(".timestamp").each(function(){var B=$(this);var A=timeAgo(B.meta().time);if(A&&B.find("*").length==0){B.html(A)}});$(".timestamp-title").each(function(){var B=$(this);var A=timeAgo(B.meta().time);if(A){B.attr("title",A)}})};var DEBUG=false;$.extend({log:function(A){if(window.console){console.log(A)}},debug:function(A){if(DEBUG){console.log(A)}},inspect:function(B){var A="{\n";for(var C in B){A+="\t"+C+": "+B[C]+"\n"}A+="}";console.log(A);return A}});(function(){if(document.all){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var A=new Number(RegExp.$1);if(A>=8){$.browser.msie8=true}else{if(A>=7){$.browser.msie7=true}else{$.browser.msie6=true}}}}})();var _tmp={};twttr.augmentObject(twttr,{templates:{},timeouts:{},wait:function(){var A={};twttr.clearWait=function(B){if(twttr.is.def(A[B])){clearTimeout(B);delete A[B]}};return function(E,C){var B="TIMER_"+(new Date()).getTime();var D=setTimeout(function(){if(!twttr.is.def(A[B])){return }E()},C);A[B]=D;return B}}(),processJson:function(json){if(typeof (json)=="object"){var evals=[];$.each(json,function(selector,content){var c=selector.charAt(0);if(c=="$"){evals.push(content)}else{if(c=="!"){var notification=window[selector.substring(1)+"Notification"];if(notification){(new notification()).setMessage(content).show()}}else{var $contentPadded=$("<div></div>").html(content);var $content=$(selector,$contentPadded);if($content.length==1){$(selector).replaceWith($content)}else{$(selector).html(content)}$(selector).show()}}});$.each(evals,function(index,js){if(js){eval(js)}})}},googleAnalytics:function(A){if(window.pageTracker){window.pageTracker._trackEvent("Ajax","refresh",A,null)}},trackPageView:function(C,B,D){if(window.pageTracker){var A;if(C){A=C.toString();if(B){A="/search/tweets/"+encodeURIComponent(h(page.query))}if(D){A=A+D}window.pageTracker._trackPageview(A)}else{window.pageTracker._trackPageview()}}},fadeAndReplace:function(A,B){$(A).fadeOut("medium",function(){$(A).html(B)});$(A).fadeIn("medium")},error:function(A){alert(A?A:_("Whoops! Something went wrong. Please refresh the page and try again!"))},loading:function(){$("#loader").fadeIn(200)},loaded:function(){$("#loader").fadeOut(200)},updateLocation:function(A,E){if(!E){E=document}if(A){var D=A.replace(/^https?:\/\/.+?\//,"").replace(/#/gi,"%23").replace(/\s/gi,"+");var C=D.replace(/[^\w\d_-].*$/,"");var B=(C.length>0)?$(E).find("#"+C):[];if(B.length>0){B.get(0).id=C+"_tmp_for_update_location"}E.location.hash=D;if(B.length>0){B.get(0).id=C}}},NON_CHAR_KEY_CODES:[8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93],isNonCharKeyCode:function(A){return $.inArray(A.keyCode,twttr.NON_CHAR_KEY_CODES)!=-1||((A.ctrlKey||A.metaKey)&&$.inArray(A.keyCode,[67,88])!=-1)}});$.extend($.expr[":"],{onthepage:"($(elem).is(':visible') && $(elem).parents(':hidden').length == 0)"});jQuery.fn.move=function(A){var B=$(this).html();$(this).remove();$(A).html(B)};jQuery.fn.meta=function(){var B={type:"attr",name:"data"};var C=$(this);if(C.length==1){return C.metadata(B)}else{var A=[];C.each(function(){A.push($(this).metadata(B))});return A}};jQuery.fn.visible=function(A){$(this).each(function(){$(this).css("visibility",A?"visible":"hidden")})};jQuery.fn.isLoading=function(){$(this).addClass("loading")};$.fn.isLoaded=function(){$(this).removeClass("loading")};$.fn.replace_text=function(C,B){var A=$(this).html();if(A){$(this).html(A.replace(C,B))}};var pluralize=function(C,B,A){return C==1?B:A};var setDocumentTitle=function(A){document.title=unh(A)||""};var addCountToDocumentTitle=function(A){document.title=(A?"("+numberWithDelimiter(A)+") ":"")+document.title.replace(/\([^)]*[0-9]\)\s+/gi,"")};var getCurrentUserScreenName=function(){return page.user_screenname||$('meta[name="session-user-screen_name"]:first').get(0).content};var sessionUserIsPageUser=function(){try{return $('meta[name="session-user-screen_name"]:first').get(0).content==$('meta[name="page-user-screen_name"]:first').get(0).content}catch(A){return false}};$.fn.focusEnd=function(){return this.each(function(){var A=this;if(A.style.display!="none"){if($.browser.msie){A.focus();var B=A.createTextRange();B.collapse(false);B.select()}else{A.setSelectionRange(A.value.length,A.value.length);A.focus()}}})};$.fn.focusFirstTextField=function(){return this.find("input[type=text]:visible:enabled:first").focus().length>0},$.fn.focusFirstTextArea=function(){return this.find("textarea:visible:enabled:first").focus().length>0};$.fn.focusFirstTexttarget=function(){return this.focusFirstTextField()||this.focusFirstTextArea()};$.fn.maxLength=function(A){return this.each(function(){$(this).keydown(function(B){return this.value.length<=A||twttr.isNonCharKeyCode(B)})})};$.fn.replaceClass=function(B,A){return this.each(function(){var C=$(this);if(C.hasClass(B)){C.removeClass(B).addClass(A)}else{if(C.hasClass(A)){C.removeClass(A).addClass(B)}}})};$.fn.isSelectAll=function(A){return this.each(function(){var B=$(this);if(typeof (A)=="string"){var D=$(A).find("input[type=checkbox]")}else{var D=A}function C(){var E=true;D.each(function(){if(!this.checked){E=false;return false}});B.get(0).checked=E}B.click(function(){var E=B.get(0).checked;D.each(function(){this.checked=E});$(this).trigger("select-all-changed",E)});D.click(function(){C();$(this).trigger("checkbox-changed",this.checked)})})};function bodytarget(){return $("body")}twttr.klass("twttr.Observer",function(){this.fns=[]}).method("listen",function(A){this.fns.push(A)}).method("unlisten",function(A){this.fns=this.fns.filter(function(B){if(B!==A){return B}})}).method("trigger",function(C,B){var A=B||window;this.fns.forEach(function(D){D.call(A,C)})});twttr.klass("twttr.User",function(A){this.screen_name=A}).method("update",function(B,A){twttr.tweeters[this.screen_name][B]=A;return this}).method("updateAll",function(B){for(var A in B){twttr.tweeters[this.screen_name][A]=B[A]}return this}).method("data",function(B){var A=twttr.tweeters[this.screen_name];return B?A[B]:A});twttr.augmentString("twttr.Tweeter",{UserFetchTimeout:5000,UserFetchUrl:"/users/show",_bail:false,_requesting:false,bail:function(){this._bail=true},isRequesting:function(){return this._requesting},getCurrentUser:function(A){return this.findById(page.sessionUserId,A)},find:function(F,C,G){var B,A;var D=this;if(twttr.is.fn(C)){B=window;A=C}else{B=C;A=G}var E=twttr.is.def(F.screen_name)?F.screen_name.toLowerCase():null;if(E&&twttr.tweeters[E]){A.call(B,new twttr.User(E),true);return true}else{$.ajax({url:this.UserFetchUrl,type:"GET",data:F,dataType:"json",timeout:this.UserFetchTimeout,beforeSend:function(){D._requesting=true},success:function(K){D._requesting=false;var H=K.user;if(H){var I={};var J=H.screen_name.toLowerCase();I[J]=H;twttr.Tweeter.merge(I,true);if(D._bail){D._bail=false;return false}A.call(B,new twttr.User(J),false)}else{if(D._bail){D._bail=false;return false}A.call(B,null,false)}},error:function(H){D._requesting=false;if(D._bail){D._bail=false;return false}A.call(B,null,false)}});return false}},findByScreenName:function(B,A,C){return this.find({screen_name:B,hovercard:true},A,C)},findById:function(D,A,C){var B=twttr._birdtags[D];if(twttr.is.def(B)){this.findByScreenName(B,A,C)}else{this.find({user_id:D,hovercard:true},A,C)}},merge:function(){twttr.tweeters={};twttr._birdtags={};return function(D,A){var D=D||{};if(A){twttr.merge(twttr.tweeters,D,true)}else{var C=twttr.merge(D,twttr.tweeters,true);twttr.merge(twttr.tweeters,C,true)}for(var B in twttr.tweeters){twttr._birdtags[twttr.tweeters[B].user_id]=B}}}()});twttr.loadTemplate=function(A,B){if(twttr.templates[A]){return twttr.templates[A]}B=B||function(){};$.get("/mustaches/"+A+".html",null,function(D){var C={templates:{}};C.templates[A]=D;twttr.merge(twttr,C,true);B(twttr.templates)},"html")};twttr.loadTemplates=function(A,B){B=B||function(){};A.forEach(function(D,C){twttr.loadTemplate(D,function(E){var F=A.every(function(G){return twttr.is.def(E[G])});if(F){B(twttr.templates)}})})};twttr.SimplePositioner={setPosition:function(C,G,E){var D={inline:false,direction:null,offsets:{inline:{top:0,left:0},below:{top:0,left:0},above:{top:0,left:0}}};var F=twttr.merge({},D,E,true);var B=C instanceof jQuery?C:$(C);var A=G instanceof jQuery?G:$(G);var H=A.offset();this._opts=F;if(!F.inline){switch(F.direction){case"above":this._positionAbove(B,A,H,F.offsets.above);break;case"below":this._positionBelow(B,A,H,F.offsets.below);break;default:if((H.top-$(document).scrollTop())>(F.itemHeight||B.height())){this._positionAbove(B,A,H,F.offsets.above)}else{this._positionBelow(B,A,H,F.offsets.below)}break}}else{this._positionInline(B,A,H,F.offsets.inline);B.css("left",H.left+F.offsets.inline.left)}},_positionAbove:function(C,B,H,A){$("body").addClass("loading-hoverer-above");C.addClass("position_above").removeClass("position_below").removeClass("position_inline");var G=Math.round(H.top+A.top);var F=$("body");var E=parseInt(F.css("padding-top"));G+=E>0?12:0;var D=F.outerHeight()-G-B.height();C.css({bottom:D,left:this._getLeftPosition(C,B,H)+A.left})},_positionBelow:function(A,C,D,E){var B=Math.round(D.top+C.height()+E.top);A.addClass("position_below").removeClass("position_above").removeClass("position_inline");A.css({top:B,left:this._getLeftPosition(A,C,D)+E.left})},_positionInline:function(A,B,D,C){A.css("top",D.top+C.top).addClass("position_inline").removeClass("position_below").removeClass("position_above")},_getLeftPosition:function(A,B,C){return Math.round(C.left+(B.width()/2))}};twttr.unparam=function(F){var E={};var C=F.split("&");for(var B=0,A=C.length;B<A;B++){var D=C[B].split("=",2);E[decodeURIComponent(D[0])]=(D.length==2?decodeURIComponent(D[1].replace(/\+/g," ")):null)}return E};$.fn.isHomeSearchForm=function(){return this.each(function(){var B=$(this);var A=$(B.find('input[type="text"]')[0]);var C=B.find("#home_search_submit");C.click(function(){B.submit();return false});B.submit(function(){var D=A.val();if(D!=""){C.addClass("loading");searchSummize(D,B,"processHomepageSearch");$("#trends_list li").removeClass("active")}return false});B.bind("loaded",null,function(D){C.removeClass("loading")})})};function processHomepageSearch(A){$(".wrapper, .wrapper-footer-ie").show();$("#signin_q").val(page.query);$(".logo").unbind();$("#trends, #trend_info span").remove();$("#big_signup").remove();processSummize(A)}window.SEARCH_CALLBACKS={summize:"processHomepageSearch",load:"pageHomepageLoadSearch",searchLink:"processHomepageSearchLink",trendLink:"processHomepageTrendLink",searchForm:"processHomepageSearchForm",hashtagLink:"processHomepageHashtagLink",inResultsLink:"processHomepageInResultsLink",more:"processHomepageSearchMore",refresh:"processHomepageSearchRefresh"};$.each(window.SEARCH_CALLBACKS,function(){window[this]=window.processHomepageSearch});function initializeSidebar(){action=page.query;if(action){var B=$.grep($("#trends_list li a"),function(C){return $(C).attr("name")==page.query})[0];if(B){var A=$(B).parent("li");if(A.length){A.addClass("active")}}}}twttr.updateLocation=function(A){if(A){A.replace(/^https?:\/\/.+?\//,"").replace(/\"/gi,"%22").replace(/#/gi,"%23").replace(/\s/gi,"+");var B=document.location.search;B.replace(/\"/gi,"%22").replace(/#/gi,"%23").replace(/\s/gi,"+");if("search"+B!=A){document.location.hash=A}}};function setTitleAndHeading(A){setDocumentTitle(_("%{query} - Twitter Search",{query:page.query}));if($("#timeline li").length){$("h2#timeline_heading").html(_("Realtime results for <strong>%{query}</strong>",{query:h(page.query)}))}else{$("h2#timeline_heading").html(_("No results for <strong>%{query}</strong>",{query:h(page.query)}))}}$.fn.isLanguageMenu=function(){return this.each(function(){var C=$(this);var A=$("#lf");var B=$(".language-select li + li");B.click(function(D){var E=B.offset();if($(window).height()<$("body").height()){C.css({top:E.top-C.height()-10,left:E.left})}else{C.css({top:E.top+B.height()-8,left:E.left})}C.toggle();return false});$(document).click(function(){C.hide()});C.find("li").click(function(){A.find("#lang").val(this.id);A.submit()})})};$.fn.isSigninMenu=function(){return this.each(function(){var A=$(this);var B=true;$(".signin").bind("click focus",function(D){D.preventDefault();if(!B){return }B=false;setTimeout(function(){B=true},500);var C=$(this);var E=C.offset();A.css({top:E.top+C.height(),left:E.left-A.width()+C.width()});C.toggleClass("menu-open");A.toggle();if(C.hasClass("menu-open")){setTimeout(function(){$("#username").focus()},50)}else{$("#home_search_q").focus()}});A.mouseup(function(){return false});$(document).mouseup(function(C){if($(C.target).parent("a.signin").length==0){$(".signin").removeClass("menu-open");A.hide()}})})};$(function(){$("#home_search_q").focusEnd();$("#home_search").isHomeSearchForm();$(".language-menu").isLanguageMenu();$("#signin_menu").isSigninMenu();$("#trend_info img").tipsy({gravity:"s",offsetTop:-7});$("#trend_description img").tipsy({gravity:"s",offsetTop:-22});var A=$("#forgot_username_link");A.tipsy({gravity:"w",offsetLeft:7});A.bind("click",function(B){$("#username").focus();B.preventDefault()});$("#trends a").isSearchLink(SEARCH_CALLBACKS.trendLink);$("#trends_list a").isSearchLink(SEARCH_CALLBACKS.trendLink).bind("loading",null,function(B){$(this).parent("li").addClass("loading")}).bind("loaded",null,function(B){$(this).parent("li").removeClass("loading")});$(".logo").click(function(){return false})});var searchSummize=function(E,B,F,A){page.query=E;var D=$("body#search #timeline li.search_result").attr("id");if(D&&page.retainTimeline){page.maxId=D.substring(7)}else{page.maxId=null}var C={q:page.query,rpp:20,maxId:page.maxId,callback:F||window.SEARCH_CALLBACKS.summize,layout:"none"};if(A){C.page=A}$("#side #q").val(E);B.trigger("loading");return $.ajax({url:page.summizeSearchUrl,data:C,dataType:"script",cache:false,complete:function(){$("#side #primary_nav li").removeClass("active");$("body").attr("id","search");var H="";if($("body.front").length){H=$("#trends_list li.active").length?"front/trends":"front/custom_search"}else{var G=$("#side li.active a.search-link").parents("div#trends, div#saved_searches");H=G.length==0?$("#side div#custom_search.active").attr("id"):G.attr("id")}twttr.trackPageView($("body").attr("id"),(page.query&&page.query.length>0?page.query:null),"/"+H+(!page.retainTimeline?"/ajax":"/ajax/more"));B.trigger("loaded");page.retainTimeline=null;page.isTimelineChange=false}})};var sponsoredSearch=function(A){if(page.showSS){$.ajax({url:"/timeline/garuda_search",data:{query:page.query,authenticity_token:twttr.form_authenticity_token},type:"post",dataType:"html",success:function(B){clearTimelineIfNewSearch();$("#timeline").prepend(B);processSummizeInternal(A)},error:function(){clearTimelineIfNewSearch();processSummizeInternal(A)}})}else{clearTimelineIfNewSearch();processSummizeInternal(A)}};var processSummize=function(A){var B=getPageNumAndUrl(A)[0];if(B==2){sponsoredSearch(A)}else{clearTimelineIfNewSearch();processSummizeInternal(A)}};var clearTimelineIfNewSearch=function(){var A=(page.query!="");if(A){if(!page.retainTimeline){$("#timeline").empty();$("#pagination").empty();$("#content .no-results").remove();$("#results_update").hide()}}};var getPageNumAndUrl=function(A){var E=$(A);var B=1;var D;var C=E.find(".paginator a.next");if(C.length){D=C.attr("href");D.match(/\?.*page=([0-9]+)/gi);B=RegExp.$1;B=B?parseInt(B):1}return[B,D]};var processSummizeInternal=function(B){var J=page.trendDescriptions[page.query];if(J){$("#trend_info").hide();$("#trend_description span").text(_("%{trend} is a popular topic on Twitter right now.",{trend:J[0]}));$("#trend_description p").html(J[1]);$("#trend_description").show()}else{$("#trend_description").hide();$("#trend_info").show()}var H=$(B);var M=$(".homepage #timeline").length;var C=M&&!$(".homepage #timeline li").length;var F=$("#timeline");var L=(page.query!="");$("body").attr("id","search");var E=getPageNumAndUrl(B)[1];var D=[];if(L){D=renderResultsFromSummize(H,F,M)}$("#container, #side_base").show();F.find(".msgtxt a").each(twttr.appendClassesToSearchResults);F.find(".msgtxt").prev().addClass("tweet-url screen-name");F.find("span.vcard a").addClass("tweet-url profile-pic");F.find(".search_result").find(".status-body a,.vcard a").each(function(){var P=$(this);var N=P.attr("href");if(N.match(/^\/search\?q=([^&]+)/)){P.removeAttr("target");var O=decodeURIComponent(RegExp.$1);P.attr("title",O);P.isSearchLink(O.match(/^#/)?SEARCH_CALLBACKS.hashtagLink:SEARCH_CALLBACKS.inResultsLink)}else{if(N.match(/^https?:\/\/twitter\.com/)){P.removeAttr("target")}}});if(page.searchResults=(D.length>0&&L)){if(!M){enfavoriteSummize(D)}page.maxId=D[0];if(E){$("#pagination").empty().html('<a id="search_more" class="round more" rel="next" href="'+E+'">'+_("more")+"</a>").find("a").isSearchMoreButton(M)}else{$("#pagination").empty().html('<p class="no-more-tweets">'+_("Older tweets are temporarily unavailable.")+"</p>")}}else{var I=[_("Try a more general search."),_("Try using different words.")];var K='<div class="no-results">'+_("Suggestions:")+"<ol>";for(var G=0;G<I.length;G++){K+="<li>"+_(I[G])+"</li>"}K+="</ol></div>";setTimeout(function(){$("#timeline_heading").after(K)},1)}twttr.updateLocation("search?q="+encodeURIComponent(page.query));initializeSidebar();var A=$("#sidebar_search_q, #home_search_q");if(A.val()!=page.query){A.val(page.query);A.css("color","#000")}onPageChange(C);$("#side #rssfeed a.search-rss").attr("href","http://search.twitter.com/search.atom?q="+h(encodeURIComponent(page.query)));summizeRefresh()};if(!window.SEARCH_CALLBACKS){window.SEARCH_CALLBACKS={summize:"processSummize",load:"pageLoadSearch",searchLink:"processSearchLink",trendLink:"processTrendLink",savedSearchLink:"processSavedSearchLink",searchForm:"processSearchForm",hashtagLink:"processHashtagLink",inResultsLink:"processInResultsLink",more:"processSearchMore",refresh:"processSearchRefresh"};$.each(window.SEARCH_CALLBACKS,function(){window[this]=window.processSummize})}function renderResultsFromSummize(C,B,A){var D=[];C.find(".result").each(function(){var J=$(this);J.find(".location,.thread,.to_av,p.clearleft,.expand,#share").remove();var F=$(J.find(".avatar").get(0));F.replaceWith('<span class="thumb vcard author">'+F.html()+"</span>");var L=$(J.find(".info").get(0));var M,G,E;L.find("a.lit").each(function(){E=$(this).attr("href");var P=E.match(/\/(\w+)\/statuses\/(\d+)/);M=P[2];D.push(M);G=P[1]});var H=L.find(".source").remove();L.find("a").remove();L.html('<a href="'+E+'">'+L.html()+"</a>");L.append(H);var O='<span class="meta entry-meta">'+L.html().replace(/\u00B7/g,"")+"</span>";L.remove();var N=$(J.find(".msg").get(0));N.replaceWith(($.browser.msie6?'<img src="http://s.twimg.com/a/1269387398/images/white.png" width="1" height="50" align="left">':"")+N.html().replace(/a>\s*:\s*<span/,"a> <span")+O);var K=J.html();if(!A){K='<span class="actions"><div><a href="#" class="fav-action non-fav" id="status_star_'+M+'"> &nbsp; </a></div></span>'+K;K+='<ul class="actions-hover"><li><span class="reply"><span class="reply-icon icon"></span><a href="/home?status=@'+G+"%20&in_reply_to_status_id="+M+"&in_reply_to="+G+'">Reply</a></span></li><li><span class="retweet-link"><span class="retweet-icon icon"></span><a href="#" title="Retweet">Retweet</a></span></li></ul>'}var I=$('<li class="hentry status search_result u-'+G+'" id="status_'+M+'"><span class="status-body">'+K+"</span></li>");B.append(I)});return D}function enfavoriteSummize(A){if(page.loggedIn&&A.length>0){$timeline=$("#timeline");$.ajax({type:"POST",dataType:"json",url:"/favourings/intersect_for_search",data:{authenticity_token:twttr.form_authenticity_token,"status_id[]":A,twttr:true},beforeSend:null,success:function(B){$.map(B,function(C){$timeline.find("#status_"+C+" .non-fav").addClass("fav").removeClass("non-fav")})},complete:null})}}function summizeRefresh(){if(page.timelineRefresher){page.timelineRefresher.stop();page.timelineRefresher=null;addCountToDocumentTitle()}var B=$("#results_update");B.data("count",0);var A=$("#new_results_notification").meta().search;if(page.summizeRefresher||$("#results_update").length==0){return }page.newResults=null;page.summizeRefresher=new Occasionally(A.delay*1000,A.max_delay*1000,function(){var C=false;$.ajax({dataType:"script",url:page.summizeSearchUrl,data:{q:page.query,since_id:page.maxId,refresh:true,callback:"processSummizeRefresh"},cache:false,callback:null})},function(){return page.newResults},A.decay);page.summizeRefresher.start()}function processSummizeRefresh(B){if(decodeURIComponent(B.query).replace(/\+/g," ")==page.query&&B.total){page.maxId=B.max_id;var C=page.summizeRefreshResults=(page.summizeRefreshResults||0)+B.total;var A=$("#results_update").is(":visible")?"":' style="display:none;"';var D='<a id="results_update" class="minor-notification"'+A+">";D+=(C==1)?_("1 more tweet since you started searching."):_("%{results_count} more tweets since you started searching.",{results_count:numberWithDelimiter(C)});D+="</a>";$("#results_update").replaceWith(D);$("#results_update:hidden").slideDown();$("#results_update").attr("title",page.query).attr("href","/search?q="+encodeURIComponent(h(page.query))).isSearchLink(SEARCH_CALLBACKS.refresh).click(function(){addCountToDocumentTitle();return false});if(C){addCountToDocumentTitle(C)}page.newResults=true}else{page.newResults=false}}$.fn.isSearchMoreButton=function(A){return this.each(function(){var B=$(this);B.click(function(){B.blur();var D=B.attr("href");D.match(/\?.*page=([0-9]+)/gi);var C=RegExp.$1;page.retainTimeline=true;$("#timeline li:last-child").addClass("last-on-page");searchSummize(page.query,B,SEARCH_CALLBACKS.more,C);B.addClass("loading").html("");return false})})};function onPageChange(A){var C=$("body").attr("id");setTitleAndHeading(C);if(!A){if(page.summizeRefresher){page.summizeRefresher.stop();page.summizeRefresher=null;page.summizeRefreshResults=null}if(!page.retainTimeline){$("#results_update").hide()}$(".no-results").remove();$("#new_results_count").html("0")}$(".in-page-link").isInPageLink();$(".in-page-list-link").isListInPageLink();try{$(".in-page-list-label").isListInPageLabel();$(".in-page-label").isInPageLabel()}catch(B){}if(C=="list"||C=="list_show"){C=(window.location.hash||window.location.pathname).replace(/^#/,"").replace(/^([^\/])/,"/$1");if(C.indexOf("/list")!=0){C="/list"+C}}twttr.trackPageView(C,(page.query&&page.query.length>0?page.query:null),A?null:"/ajax")}$.fn.isSearchLink=function(A){return this.each(function(){var B=$(this);B.click(function(C){C.preventDefault();if($.browser.msie){this.hideFocus=true}if(page.isTimelineChange&&page.currentTimelineChange){page.currentTimelineChange.abort();page.$oldTimelineLink.trigger("aborted");page.isTimelineChange=false}page.isTimelineChange=true;page.currentTimelineChange=searchSummize(B.attr("name")?B.attr("name"):B.attr("title"),B,A);if(B.parents("#side").length>0){$("#side ul.sidebar-menu li").removeClass("active");B.parent("li").addClass("active")}$("#trends_list li.active a").removeClass("active")})})};$.fn.isSearchForm=function(){return this.each(function(){var B=$(this);var A=$(B.find('input[type="text"]')[0]);var C=B.find("#sidebar_search_submit");A.Watermark(_("Search")).focus(function(){A.select();return true});C.click(function(){B.submit()});B.submit(function(){var D=A.val();if(D!=""){C.addClass("loading");searchSummize(D,B,SEARCH_CALLBACKS.searchForm)}$("#side ul.sidebar-menu li").removeClass("active");$("#side #custom_search").addClass("active");return false});B.bind("loaded",null,function(D){C.removeClass("loading")})})};function loadTrendDescriptions(){$("#trends a").each(function(){var A=$(this);var C=A.parent().find("em");if(C.length){var B=A.text();var D=C.text().replace(new RegExp(B.replace(/([^\w])/gi,"\\$1"),"gi"),"<strong>"+B+"</strong>");page.trendDescriptions[A.attr("title")]=[B,D]}})}$(document).ready(function(){$("#tweet_search_submit").click(function(){$("#tweet_search").submit()});$("#content #trend_description img").tipsy({gravity:"s"});page.trendDescriptions={};loadTrendDescriptions();if($("body").attr("id")=="search"){onCondition(function(){return page.summizeResults},function(){window[SEARCH_CALLBACKS.summize](page.summizeResults)})}});twttr.appendClassesToSearchResults=function(){var A=$(this);A.addClass("tweet-url");if(A.text().match(/^@/)){A.addClass("username")}else{if(A.text().match(/^#/)){A.addClass("hashtag")}else{A.addClass("web")}}};(function(){jQuery.inherits=function(A,C){function B(){}B.prototype=C.prototype;A.prototype=new B();A.prototype.constructor=A}})();(function(){jQuery.fn.equals=function(A){return this.get(0)==A.get(0)}})();(function(){jQuery.fn.hasParent=function(A){var B=false;this.parents().map(function(){if($(this).equals(A)){B=true}});return B}})();function Notification(B){this.$bar=jQuery('<div class="notification-bar"></div>');this.$barContainer=jQuery('<div class="notification-bar-container"></div>');this.$barContents=jQuery('<div class="notification-bar-contents"></div>');this.$barBackground=jQuery('<div class="notification-bar-bkg"></div>');this.$message=jQuery('<div class="message"></div>');this.$bar.hide();this.$barBackground.hide();var A=this;this.$bar.click(function(C){A.removeAfterEvent(C)});this.className=B}Notification.SLIDE_SPEED_IN_MS=300;Notification.prototype.remove=function(){var A=this;this.slideUp(function(){A.$bar.remove();A.$barBackground.remove();window.clearTimeout(A.timeout)})};Notification.prototype.removeAfterEvent=function(B){var A=$(B.target);if(A.get(0).nodeName.toLowerCase()=="a"&&A.hasParent(this.$message)){return }this.remove()};Notification.prototype.setMessage=function(A){this.msg=A;return this};Notification.prototype.show=function(){this.$message.addClass(this.className).html(this.msg);this.$barContainer.append(this.$barBackground).append(this.$bar.append(this.$barContents.append(this.$message)));jQuery("#notifications").append(this.$barContainer);this.$barBackground.height(this.$bar.height());this.showBar();if(this.onShow){this.onShow()}return this};Notification.prototype.removeInMilliseconds=function(){var A=this;this.timeout=window.setTimeout(function(){A.remove()},A.timeoutInMilliseconds)};Notification.prototype.showBar=function(){this.$bar.show();this.$barBackground.show()};Notification.prototype.onShow=function(){this.removeInMilliseconds()};Notification.prototype.slideUp=function(A){this.$bar.slideUp(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideUp(Notification.SLIDE_SPEED_IN_MS,A)};function ShortNotification(){Notification.call(this,"message-info");this.timeoutInMilliseconds=3000}jQuery.inherits(ShortNotification,Notification);ShortNotification.prototype.showBar=function(){this.$bar.slideDown(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideDown(Notification.SLIDE_SPEED_IN_MS)};function InfoNotification(){Notification.call(this,"message-info");this.timeoutInMilliseconds=6000}jQuery.inherits(InfoNotification,Notification);InfoNotification.prototype.showBar=function(){this.$bar.slideDown(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideDown(Notification.SLIDE_SPEED_IN_MS)};function ProgressNotification(){Notification.call(this,"message-progress");this.timeoutInMilliseconds=1000}jQuery.inherits(ProgressNotification,Notification);ProgressNotification.prototype.setProgressMessage=function(A){return this.setMessage(A)};ProgressNotification.prototype.setCompletedMessage=function(A){this.completedMsg=A;return this};ProgressNotification.prototype.onShow=function(){};ProgressNotification.prototype.cancel=function(){this.timeoutInMilliseconds=0;this.removeInMilliseconds()};ProgressNotification.prototype.done=function(){this.$message.addClass("message-progress-done").removeClass(this.className).html(this.completedMsg);this.removeInMilliseconds()};function ErrorNotification(){Notification.call(this,"message-error");this.timeoutInMilliseconds=8000}jQuery.inherits(ErrorNotification,Notification);function Occasionally(A,D,C,B,E){this.interval=A;this.maxDecayTime=D;this.job=C;this.decayCallback=B;this.timesRun=0;this.decayRate=1;this.decayMultiplier=E||1.25;this.maxRequests=360}Occasionally.prototype.start=function(){this.stop();this.run()};Occasionally.prototype.stop=function(){if(this.worker){window.clearTimeout(this.worker)}};Occasionally.prototype.run=function(){var A=this;this.decayRate=this.decayCallback()?Math.max(1,this.decayRate/this.decayMultiplier):this.decayRate*this.decayMultiplier;var B=this.interval*this.decayRate;B=(B>=this.maxDecayTime)?this.maxDecayTime:B;this.worker=window.setTimeout(function(){A.execute()},Math.floor(B))};Occasionally.prototype.execute=function(){this.job();if(++this.timesRun<this.maxRequests){this.run()}};twttr.countClick=function(){var A=twttr.createTrackingParameters(this);twttr.asyncClickCount(A)};twttr.countAds=function(A){if(A.parents(".garuda-tweet").get(0)){var B=twttr.createAdTrackingParameters(A);twttr.asyncAdsClickCount(B)}};twttr.asyncClickCount=function(A){(new Image()).src="/abacus?"+$.param(A)};twttr.asyncAdsClickCount=function(A){(new Image()).src="/abacus/garuda_click?"+$.param(A)};twttr.createAdTrackingParameters=function(I){var A=function(){var S=I.attr("class");var Q=["web","profile-pic","screen-name","hashtag","username","retweet-link","reply","fav","non-fav","entry-meta"];for(var R in Q){if(I.hasClass(Q[R])){return Q[R]}}}();var P=I.closest(".status");var E=P.find(".meta").children("a").get(0).href.split("/");var M=E[E.length-1];var O=$('meta[name="session-userid"]');var H=O.attr("content")||-1;var G=$('meta[name="client-ip"]');var F=G.attr("content")||-1;var D=JSON.parse(P.attr("data"));var C=D.advertiser_id;var L=D.campaign_id;var K=D.ad_id;var B=D.impression_id;var J=page.query;var N=twttr.form_authenticity_token||$('input[name="authenticity_token"]').attr("value");return{url:I.attr("href"),linkType:A,tweetId:M,userId:H,userIP:F,advertiserId:C,time:(new Date).getTime(),campaignId:L,adId:K,impressionId:B,query:J,authenticity_token:N}};twttr.createTrackingParameters=function(F){var B=$(F);var A=function(){var K=B.attr("class");var I=["hashtag","profile-pic","screen-name","username","web"];for(var J in I){if(K.indexOf(I[J])!==-1){return I[J]}}}();var E=B.closest(".status").find(".meta").children("a").get(0).href.split("/");var G=E[E.length-1];var H=$('meta[name="session-userid"]');var D=H.attr("content")||-1;var C=twttr.form_authenticity_token||$('input[name="authenticity_token"]').attr("value");return{url:F.href,linkType:A,tweetId:G,userId:D,authenticity_token:C,time:(new Date).getTime()}};twttr.registerTracker=function(C,A,B){C.live(A,B)};twttr.setupTracking=function(){twttr.registerTracker($("#content a.tweet-url"),"mousedown",twttr.countClick);var A=$("#content .garuda-tweet").find("a.tweet-url, .entry-meta, .fav-action.non-fav, .fav-action.fav, .meta, .reply");twttr.registerTracker(A,"mousedown",function(){twttr.countAds($(this))})};$(document).ready(function(){twttr.setupTracking()});function scribe(A,C,B){B=B||{};if(window.DARKMODE_SCRIBE){return this}if(typeof (A)=="function"){A=A.call(this)}var D={log:JSON.stringify(A)};if(B.filter){D.filter=B.filter}if(C){D.category=C}(new Image()).src="/scribe?"+$.param($.extend(D,{ts:(new Date()).getTime()}))}(function(A){A.extend(A.fn,{scribe:function(C,E,D){var B=this;D=D||{};this[(D.clientEvent||"mousedown")](function(F){window.scribe.call(this,C,E,D)});return this}})})(jQuery);/*
 * Copyright (c) 2007 Josh Bush (digitalbush.com)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Version: Beta 1
 * Release: 2007-06-01
 */
(function($) {
	var map=new Array();
	$.Watermark = {
		ShowAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==""){
					map[i].obj.val(map[i].text);
					map[i].obj.css("color",map[i].WatermarkColor);
				}else{
				    map[i].obj.css("color",map[i].DefaultColor);
				}
			}
		},
		HideAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==map[i].text)
					map[i].obj.val("");
			}
		}
	}

	$.fn.Watermark = function(text,color) {
		if(!color)
			color="#aaa";
		return this.each(
			function(){
				var input=$(this);
				var defaultColor=input.css("color");
				map[map.length]={text:text,obj:input,DefaultColor:defaultColor,WatermarkColor:color};
				function clearMessage(){
					if(input.val()==text)
						input.val("");
					input.css("color",defaultColor);
				}

				function insertMessage(){
					if(input.val().length==0 || input.val()==text){
						input.val(text);
						input.css("color",color);
					}else
						input.css("color",defaultColor);
				}

				input.focus(clearMessage);
				input.blur(insertMessage);
				input.change(insertMessage);

				insertMessage();
			}
		);
	};
})(jQuery);
/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor', 'borderColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}

	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break;

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};

	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};

})(jQuery);
/* Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.3
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {

$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});

		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);

		// Make sure it is running
		q.stopped = false;

		// Run it immediately for the first time
		q.run();

		// Contnue the chain
		return this;
	},

	expire: function(type, fn, fn2) {
		var self = this;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});

		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context || document;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;

	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;

	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;

	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;

		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});

		// Clear out matched elements
		this.elements = [];

		// Stop the Live Query from running until restarted
		this.stopped = true;
	},

	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;

		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);

		// Set elements to the latest set of matched elements
		this.elements = els;

		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);

			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});

			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,

	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},

	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},

	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},

	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;

			// Save a reference to the original method
			var old = $.fn[n];

			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);

				// Request a run of the Live Queries
				$.livequery.run();

				// Return the original methods result
				return r;
			}
		});
	},

	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});

		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},

	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });


// Save a reference to the original init method
var init = $.prototype.init;

// Create a new init method that exposes two new properties: selector and context
$.prototype.init = function(a,c) {
	// Call the original init and save the result
	var r = init.apply(this, arguments);

	// Copy over properties if they exist already
	if (a && a.selector)
		r.context = a.context, r.selector = a.selector;

	// Set properties
	if ( typeof a == 'string' )
		r.context = c || document, r.selector = a;

	// Return the result
	return r;
};

// Give the init function the jQuery prototype for later instantiation (needed after Rev 4091)
$.prototype.init.prototype = $.prototype;

})(jQuery);/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';
      
      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;
      
      data = "{}";
      
      var getData = function(data) {
        if(typeof data != "string") return data;
        
        if( data.indexOf('{') < 0 ) {
          data = eval("(" + data + ")");
        }
      }
      
      var getObject = function(data) {
        if(typeof data != "string") return data;
        
        data = eval("(" + data + ")");
        return data;
      }
      
      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }
      
      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

})(jQuery);//Licensed under The MIT License
//Copyright (c) 2008 Jason Frame (jason@onehackoranother.com)


(function($) {
    $.fn.tipsy = function(opts) {

        opts = $.extend({fade: false, gravity: 'n'}, opts || {});
        // ...Added by andy@twitter.com 20090717
        if(!opts['offsetTop']) { opts['offsetTop'] = 0; }
        if(!opts['offsetLeft']) { opts['offsetLeft'] = 0; }
        if(!opts['header']) { opts['header'] = ''; }
        if(!opts['footer']) { opts['footer'] = ''; }
        if(!opts['hideTimeout']) { opts['hideTimeout'] = 100; }
        if(!opts['showTimeout']) { opts['hideTimeout'] = 0; }
        if(!opts['additionalCSSClass']) { opts['additionalCSSClass'] = ''; }
        var showTimeoutKey = false;
        // ...Added by andy@twitter.com 20090717
        var tip = null, cancelHide = false;
        this.hover(function() {

            // ...Added by andy@twitter.com 20090717
            var linkText = $(this).text();
            var header = opts['header'].replace('%{link}', linkText);
            var footer = opts['footer'].replace('%{link}', linkText);
            // ...Added by andy@twitter.com 20090717

            $.data(this, 'cancel.tipsy', true);

            var tip = $.data(this, 'active.tipsy');
            if (!tip) {
                $('.tipsy').hide();
                tip = $('<div class="tipsy '+ opts['additionalCSSClass'] +'"><div class="tipsy-inner">' + header + $(this).attr('title') + footer + '</div></div>');
                tip.css({position: 'absolute', zIndex: 100000});
                $(this).attr('title', '');
                $.data(this, 'active.tipsy', tip);
            // Added by rael@twitter.com 20090628...
            } else if ($(this).attr('title') != '') {
              tip.find('.tipsy-inner').html($(this).attr('title'));
              $(this).attr('title', '');
            // ...Added by rael@twitter.com 20090628
            }

            var pos = $.extend({}, $(this).offset(), {width: this.offsetWidth, height: this.offsetHeight});
            // ...Added by andy@twitter.com 20090717
            pos.top = pos.top + opts['offsetTop'];
            pos.left = pos.left + opts['offsetLeft'];

            // remove open tips if timeout to fade
            $('.tipsy').hide();
            // ...Added by andy@twitter.com 20090717
            tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
            var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;

            switch (opts.gravity.charAt(0)) {
                case 'n':
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                    break;
                case 'l':
                    //left north align
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - 18}).addClass('tipsy-north');
                    break;
                case 's':
                    tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                    break;
                case 'e':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                    break;
                case 'w':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                    break;
            }
            // ...Added by andy@twitter.com 20090717
            function show() {
              if (opts.fade) {
                  tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 1});
              } else {
                  tip.css({visibility: 'visible'});
              }
            }
            if(opts['showTimeout']) {
              showTimeoutKey = setTimeout(show, opts['showTimeout']);
            } else {
              show();
            }
        }, function() {
            clearTimeout(showTimeoutKey);
            // ...Added by andy@twitter.com 20090717
            $.data(this, 'cancel.tipsy', false);
            var self = this;
            setTimeout(function() {
                if ($.data(this, 'cancel.tipsy')) return;
                var tip = $.data(self, 'active.tipsy');
                if (opts.fade) {
                    tip.stop().fadeOut(function() { $(this).remove(); });
                } else {
                    tip.remove();
                }
            }, opts['hideTimeout']);
        });

    };
})(jQuery);
/*
 * jQuery Form Plugin
 * version: 2.36 (07-NOV-2009)
 * @requires jQuery v1.2.6 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function() {
			$(this).ajaxSubmit({
				target: '#output'
			});
			return false; // <-- important!
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function')
		options = { success: options };

	var url = $.trim(this.attr('action'));
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || '';

	options = $.extend({
		url:  url,
		type: this.attr('method') || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options || {});

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (var n in options.data) {
		  if(options.data[n] instanceof Array) {
			for (var k in options.data[n])
			  a.push( { name: n, value: options.data[n][k] } );
		  }
		  else
			 a.push( { name: n, value: options.data[n] } );
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else
		options.data = q; // data is the query string for 'post'

	var $form = this, callbacks = [];
	if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
	if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			$(options.target).html(data).each(oldSuccess, arguments);
		});
	}
	else if (options.success)
		callbacks.push(options.success);

	options.success = function(data, status) {
		for (var i=0, max=callbacks.length; i < max; i++)
			callbacks[i].apply(options, [data, status, $form]);
	};

	// are there files to upload?
	var files = $('input:file', this).fieldValue();
	var found = false;
	for (var j=0; j < files.length; j++)
		if (files[j])
			found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if ((files.length && options.iframe !== false) || options.iframe || found || multipart) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive)
		   $.get(options.closeKeepAlive, fileUpload);
	   else
		   fileUpload();
	   }
   else
	   $.ajax(options);

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit]', form).length) {
			alert('Error: Form elements must not be named "submit".');
			return;
		}

		var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

		var id = 'jqFormIO' + (new Date().getTime());
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ opts.iframeSrc +'" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				this.aborted = 1;
				$io.attr('src', opts.iframeSrc); // abort op in progress
			}
		};

		var g = opts.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) $.event.trigger("ajaxStart");
		if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
		}
		if (xhr.aborted)
			return;

		var cbInvoked = 0;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				options.extraData = options.extraData || {};
				options.extraData[n] = sub.value;
				if (sub.type == "image") {
					options.extraData[name+'.x'] = form.clk_x;
					options.extraData[name+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		setTimeout(function() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

			// ie borks in some cases when setting encoding
			if (! options.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (opts.timeout)
				setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (options.extraData)
					for (var n in options.extraData)
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
								.appendTo(form)[0]);

				// add iframe to doc and submit the form
				$io.appendTo('body');
				io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				t ? form.setAttribute('target', t) : $form.removeAttr('target');
				$(extraInputs).remove();
			}
		}, 10);

		var domCheckCount = 50;

		function cb() {
			if (cbInvoked++) return;

			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var ok = true;
			try {
				if (timedOut) throw 'timeout';
				// extract the server response from the iframe
				var data, doc;

				doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

				var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
				 	if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						cbInvoked = 0;
						setTimeout(cb, 100);
						return;
					}
					log('Could not access iframe DOM after 50 tries.');
					return;
				}

				xhr.responseText = doc.body ? doc.body.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': opts.dataType};
					return headers[header];
				};

				if (opts.dataType == 'json' || opts.dataType == 'script') {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta)
						xhr.responseText = ta.value;
					else {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						if (pre)
							xhr.responseText = pre.innerHTML;
					}
				}
				else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				data = $.httpData(xhr, opts.dataType);
			}
			catch(e){
				ok = false;
				$.handleError(opts, xhr, 'error', e);
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				opts.success(data, 'success');
				if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
			}
			if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
			if (g && ! --$.active) $.event.trigger("ajaxStop");
			if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

			// clean up
			setTimeout(function() {
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		};

		function toXml(s, doc) {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		};
	};
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	return this.ajaxFormUnbind().bind('submit.form-plugin', function() {
		$(this).ajaxSubmit(options);
		return false;
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0)
				return;
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length == 0) return a;

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) return a;
	for(var i=0, max=els.length; i < max; i++) {
		var el = els[i];
		var n = el.name;
		if (!n) continue;

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		var v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(var j=0, jmax=v.length; j < jmax; j++)
				a.push({name: n, value: v[j]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: n, value: v});
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0], n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) return;
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++)
				a.push({name: n, value: v[i]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: this.name, value: v});
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
			continue;
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (typeof successful == 'undefined') successful = true;

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1))
			return null;

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) return null;
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				if (one) return v;
				a.push(v);
			}
		}
		return a;
	}
	return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea')
			this.value = '';
		else if (t == 'checkbox' || t == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
			this.reset();
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b == undefined) b = true;
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select == undefined) select = true;
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio')
			this.checked = select;
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
		window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);
