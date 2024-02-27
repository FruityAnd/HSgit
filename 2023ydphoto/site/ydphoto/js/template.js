(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        // 컨텐츠 텝메뉴 시작
        var $container = $('#container');
        var $ydTabBox = $('#contents .yd_tab_box');
        $ydTabBox.each(function(){
            var $this = $(this),
                $ydTabList = $this.find('.yd_tab_list'),
                $ydTabItem = $ydTabList.find('.yd_tab_item'),
                $ydTabBtn = $ydTabItem.find('button.yd_tab_btn');

            $ydTabBtn.on('click', function(){
                var $myBtn = $(this),
                    $myItem = $myBtn.parent('.yd_tab_item'),
                    $otherItem = $myItem.siblings('.yd_tab_item'),
                    $otherBtn = $otherItem.find('button.yd_tab_btn'),
                    MyItemIndex = $myItem.index(),
                    IsActive = $myItem.is('.active'),
                    $myList = $myItem.parent('.yd_tab_list'),
                    $ctsList = $myList.siblings('.yd_cts_list'),
                    $myCtsItem = $ctsList.find('.yd_cts_item').eq(MyItemIndex),
                    $otherCtsItem = $myCtsItem.siblings('.yd_cts_item');
                if(!IsActive){
                    $otherItem.removeClass('active');
                    $otherBtn.removeAttr('title');
                    $myItem.addClass('active');
                    $myBtn.attr('title', '선택됨');
                    $otherCtsItem.removeClass('active');
                    $myCtsItem.addClass('active');
                }
            });
        });
        // 컨텐츠 텝메뉴 끝

        // 반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            }
        });
        // 반응형 테이블 끝

        //가짜 셀렉트 박스 시작
        var $ydSelectBox = $container.find('.yd_fake_select_box');

        $ydSelectBox.each(function (){
            var $ydSelectBox = $(this),
                $realSel = $ydSelectBox.find('.real_select'),
                $realSelOp = $realSel.find('option'),
                $fakeSel = $ydSelectBox.find('.fake_select'),
                $fakeSelOpenBtn = $fakeSel.find('button.fake_select_open_btn'),
                $fakeSelOpenBtnText = $fakeSelOpenBtn.find('.text'),
                $fakeSelList = $fakeSel.find('.fake_select_list'),
                $fakeSelItem = $fakeSelList.find('.fake_select_item'),
                $fakeSelBtn = $fakeSelItem.find('button.fake_select_btn'),
                $fakeSelItemActive = $fakeSelItem.siblings('.fake_select_item.active'),
                $fakeSelItemActiveText = $fakeSelItemActive.find('button.fake_select_btn'),
                $fakeSelItemActiveIndex = $fakeSelItemActive.index(),
                $startSelOp = $realSelOp.eq($fakeSelItemActiveIndex);
                console.log($fakeSelItemActiveText)

            $startSelOp.attr('selected', true);
            $fakeSelOpenBtnText.text($fakeSelItemActiveText.text());

            //진짜셀렉트 옵션 텍스트
            $fakeSelItem.each(function (){
                var $ThisItemIndex = $(this).index(),
                    $fakeSelBtnText = $(this).find('button.fake_select_btn').text(),
                    $realSelOpText = $realSelOp.eq($ThisItemIndex).text($fakeSelBtnText);
            });

            $fakeSelOpenBtn.on('click', function (){
                if($ydSelectBox.hasClass('active')) {
                    $ydSelectBox.removeClass('active');
                    $(this).attr('title', '셀렉트박스 열기');
                } else {
                    $ydSelectBox.addClass('active');
                    $(this).attr('title', '셀렉트박스 닫기');
                }
            });

            $fakeSelBtn.on('click',function (){
                var $fakeSelItemIndex = $(this).closest('.fake_select_item').index();

                $(this).attr('title', '선택됨').closest('.fake_select_item').addClass('active').siblings().removeClass('active').children().removeAttr('title');
                $realSelOp.eq($fakeSelItemIndex).attr('selected', true).siblings().attr('selected', false);
                $fakeSelOpenBtnText.text($(this).text()).closest('button.fake_select_open_btn').attr('title', '셀렉트박스 열기');
                $ydSelectBox.removeClass('active');
                $fakeSelOpenBtn.focus();
            });
        });
        //가짜 셀렉트 박스 끝

    });
})(jQuery);