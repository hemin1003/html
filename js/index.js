$(function() {
	function init() {
		var H = $(window).height(),
			W = $(window).width();
		$(".cover").css({"width": W, "height": H});
		$(".go_rank,.rank").click(function() {
			$(".home_page").hide();
			$(".rank_page").fadeIn(500);
		});
		$(".footer_left").click(function() {
			$(".cover,.zhuanpan").fadeIn(100);

		});
		$(".cover,.turn_close").click(function() {
			$(".cover").fadeOut(300);
			$(".zhuanpan").hide();
			$('.cover_fuck,.cover_quit').hide();
			$(".turntable-bg").fadeIn(300);
		});
		$(".xuan_home").click(function() {
			$(".rank_page,.tudi_all").hide();
			$(".home_page").fadeIn(300);
		});
		$(".xuan_rules a").click(function () {
		    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -0+ "rem"}, 500);
		    return false;
		});
		$(".xuan_tudi,.tudi_action").click(function() {
			$(".home_page").hide();
			$(".tudi_all").fadeIn(400);
		});
		$(".cover_quit").click(function() {
			$(".cover_quit,.cover_fuck").hide();
			$(".turntable-bg").fadeIn(300);
		});
	}
	var page = 1;
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	var uid = getQueryString('uid');
	var token = getQueryString('token');
	var uid1 = "163252b8d4111iq";
	var token1 = "cdeb0c6f-0cd0-4bb0-8c75-11118bcb7d20";
	var hostname = "http://jiayou88.cn";
	var testname = "http://5ishenma.cn:8084";
	function Ajaxfn() {
		var Url1 = testname+"/yfax-htt-api/api/htt/queryHolidayActivityRanking";
		var Url2 = testname+"/yfax-htt-api/api/htt/queryHolidayActivityInviteUser";
		var Url4 = testname+"/yfax-htt-api/api/htt/queryHolidayActivityStudentList";
		$.get(Url1,{"phoneNum": uid,"access_token": token},function(res){
			console.log(res);
			var now_rank = res.data.userRanking,
				up_rank = res.data.newRealUserGap;
		    // 前三名数据渲染
		    // console.log(now_rank);
		    if(now_rank == -1) {
				$(".rank_page_now").text("您未上榜！");
			}
			else if(now_rank > 999 ) {
				$(".rank_page_now span").text("999+");
			}

		    $(".rank_page_now span").text(now_rank);
		    $(".rank_page_now font").text(up_rank);
		    for(var i = 0; i < 3; i++) {
		    	var name = res.data.rankingList[i].phoneNum,
		    		tudi = res.data.rankingList[i].realNewUsers,
		    		pic = res.data.rankingList[i].wechatHeadImgurl || "images/default_quesiton_icon.png";

		    	// 排行榜
		    	$(".rank_list"+(i+1)+" .rank_num").text(tudi);
		    	$(".rank_list"+(i+1)+" .rank_name").text(name);

		    	$(".r_page_web_name").eq(i).text(name);
		    	$(".r_duti_num").eq(i).text(tudi);	
		    }


		    // 排行榜渲染
		    for(var j = 3; j < 30; j++) {

		    	var name = res.data.rankingList[j].phoneNum,
		    		tudi = res.data.rankingList[j].realNewUsers;
		    	$(".r_false").before("<tr><td>"+(j+1)+"</td><td>"+name+"</td><td>"+tudi+"</td></tr>");
		    }
		});

		// 九宫格 
		$.get(Url2,{"phoneNum": uid,"access_token": token}, function(res){
			// var Img = res.data.headImgUr || "images/default_list_header_icon.png";
			// $(".a_mian_pic img").attr("src",Img);
			console.log(res);
			$(".cover_num span").text(res.data.remainLotteryTimes);
			if(res.data.remainLotteryTimes <= 0) {
			}
			var invite_tudi = res.data.inviteUserCount,
				use_tudi = res.data.realUserCount,
				income = res.data.allIncome,
				indexs,
				curStep = parseFloat(res.data.curStep);
			$(".tudi_num1 font").text(invite_tudi);
			$(".tudi_num2 font").text(use_tudi);
			$(".tudi_num3 font").text(income);
			$(".a_mian_oder").text(use_tudi);
			console.log(curStep);
			for(var i = 0; i < 13; i++) {
				if($(".lafite_list"+(i+1)+" .aw_con_list_font div span").text() == curStep) {
					indexs = i;
				}
			}
			console.log(indexs);
			var all_num = $(".lafite_list"+(indexs+2)+" .aw_tudi font").text() || 2;
			$(".a_mian_oder2").text(all_num);
			$(".aw_title_font span").text($(".lafite_list"+(indexs+1)+" .aw_con_list_font div span").text());

			// 进度条长度
			var Wid = (use_tudi/all_num)*100;
			if((Wid/100) > 1) {
				$(".a_mian_fill").css("width","100%");
			}else {
				$(".a_mian_fill").css("width",Wid+"%");
			}

			// 九宫格默认样式
			if($(".aw_tudi font").eq(indexs+1).text() == 0) {
				$(".a_mian_fill").css("width","50%");
				$(".award_con_list img").eq(0).attr("src","images/default_selected_reward_img_1.png");
				$(".lafite_list1 .aw_con_list_font div").css("color","#FFEE2D");
				$(".lafite_list1 .aw_con_list_font div span").css("color","#FFEE2D");
				$(".lafite_list1 .aw_con_list_font .aw_tudi").css("color","white");
			}else {
				// 即将完成样式
				if(indexs == 11) {
					$(".lafite_list"+(indexs+2)+" img").attr("src","images/default_selected_reward_img_2.png");
				}else {
					$(".lafite_list"+(indexs+2)+" img").attr("src","images/default_selected_reward_img_1.png");
				}
				
				$(".lafite_list"+(indexs+2)+" .aw_con_list_font div").css("color","#FFEE2D");
				$(".lafite_list"+(indexs+2)+" .aw_con_list_font div span").css("color","#FFEE2D");
				$(".lafite_list"+(indexs+2)+" .aw_con_list_font .aw_tudi").css("color","white");
			}
			

			// 已完成 
			for(var j = 0;j < indexs+1; j++) {
				$(".lafite_list"+(j+1)+" .aw_con_list_font div").html('<img src="images/default_already_img.png"/>');
			}

			console.log(res);
			
		});

			function showpage() {
				$(".table_page_middle span").text(page);
				// 收徒总榜
				$.post(Url4,{"phoneNum": uid,"access_token": token,"curPage": page},function(res){
					$(".table_page_middle font").text(Math.ceil(res.data.totalCount/10));
					console.log(res);
					if(Math.ceil(res.data.totalCount/10) == 1) {
						$(".table_page_right").css("color","#939393");
					}
					if(res.data.totalCount == 0) {
						$(".table_page_middle span").text("0");
						$(".table_page_right").css("color","#939393");
					}
					for(var i = 0; i < 10; i++) {
						var name = res.data.studentslist[i].nickName,
							status = res.data.studentslist[i].isValid,
							data = res.data.studentslist[i].registerDate,
							status2;
							// console.log(status);
							if(status == 0) {
								status2 = "无效";
							}else if(status == 1) {
								status2 = "有效";
							}else if (status == 2) {
								status2 = "异常";
							}
						$(".tudi_false").before("<tr class='fuck'><td>"+name+"</td><td>"+status2+"</td><td>"+data+"</td></tr>");
					}
					
				});
			}
			showpage();

		$(".table_page_left").click(function() {
			page--;
			if(page <= 1) {
				// 处理分子分母为0的情况
				if($(".table_page_middle font").text() == 0) {
					page =0;
				}else {
					page = 1;
					$(".table_page_left").css("color","#939393");
					$(".table_page_right").css("color","#00A5F4");
				}
			}else {
				$(".table_page_right").css("color","#00A5F4");
			}
			$(".fuck").remove();
			showpage();
		});
		$(".table_page_right").click(function() {
			page++;
			if(page >= Number($(".table_page_middle font").text())) {
				page = Number($(".table_page_middle font").text());
				$(".table_page_right").css("color","#939393");
				// 处理分子分母为0的情况
				if($(".table_page_middle span").text() == 0) {
					$(".table_page_left").css("color","#939393");
				}else {
					$(".table_page_left").css("color","#00A5F4");
				}
			}else {
				$(".table_page_left").css("color","#00A5F4");
			}
			$(".fuck").remove();
			showpage();
		});
	}
	init();
	Ajaxfn();

	// 抽奖
    var rotateTimeOut = function (){
        $('#rotate').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;

    var rotateFn = function (awards, angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle:0,
            animateTo:angles+2810,
            duration:8000,
            callback:function (){
            	$(".turntable-bg").hide();
            	$('.cover_fuck,.cover_quit').css({"display": "block","animation": "action_translateY 2s linear", "animation-fill-mode":"forwards"});
                $(".cover_fuck").text("+"+parseInt(txt));
                bRotate = !bRotate;
            }
        })
    };

    $('.pointer').click(function (){
    	// 防止多次点击
    	if(bRotate)return;
    	var Url3 = testname+"/yfax-htt-api/api/htt/doHolidayActivityLuckyDraw";
    	$.post(Url3,{"phoneNum": uid,"access_token": token},function(res){
			var times = res.data.remainlotteryTimes,
				item = res.data.resultCode;
			$(".cover_num span").text(times);
			// var item = 1;
			// console.log(res);
			if(item == -1) {
				// alert("抽奖次数已用完");
			}else {
				$('.cover_fuck').hide();
				switch (item) {
		            case 0:
		                rotateFn(0, 360, '88888金币');
		                break;
		            case 1:
		                rotateFn(1, 45, '200金币');
		                break;
		            case 2:
		                rotateFn(2, 90, '10000金币');
		                break;
		            case 3:
		                rotateFn(3, 135, '500金币');
		                break;
		            case 4:
		                rotateFn(4, 180, '8888金币');
		                break;
		            case 5:
		                rotateFn(5, 225, '500M流量');
		                break;
		            case 6:
		                rotateFn(6, 270, '5000金币');
		                break;
		            case 7:
		                rotateFn(7, 315, '30元话费');
		                break;
		        }
			}  
	    });
    });
})