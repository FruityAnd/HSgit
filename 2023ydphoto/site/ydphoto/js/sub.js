(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');
        $sideDepthItem.on('click.menu', function (event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target,
                IsActive = $this.is('.active'),
                ThisIsLink = $this.is('.link');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    if (!ThisIsLink) {
                        var $Depth = $this.children('.depth'),
                            DepthDisplay = $Depth.css('display');
                        if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                            if (!IsActive) {
                                $this.removeClass('active_prev active_next');
                                $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                                $this.prev('.depth_item').addClass('active_prev');
                                $this.next('.depth_item').addClass('active_next');
                            } else {
                                $this.removeClass('active');
                                $this.siblings('.depth_item').removeClass('active_prev active_next');
                            }
                            event.preventDefault();
                        }
                    }
                }
            }

            event.stopPropagation();
        }).each(function (index, element) {
            var $element = $(element);
            if ($element.children('.depth').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
            }
        });
        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
        }

        //여기서부터 코드 작성해주세요
        
        // 서브비주얼 로케이션 메뉴
        var $pathBox = $('.sub_head .path_box'),
            $pathItem = $pathBox.find('.path_item'),
            $pathButton = $pathItem.find('.path_inner .path_button .btn'),
            $pathMenuList = $pathItem.find('.path_inner .path_menu_list');
        $pathButton.on('click',function(){
            var $this = $(this);
            $this.closest($pathItem).toggleClass('active').siblings().removeClass('active').find($pathMenuList).slideUp();
            $pathButton.attr('title', '메뉴 열기');
            if($this.closest($pathItem).is('.active') === true){
                $this.attr('title', '메뉴 닫기').closest($pathItem).find($pathMenuList).stop().slideDown();
            } else if($this.closest($pathItem).is('.active') === false){
                $this.attr('title', '메뉴 열기').closest($pathItem).find($pathMenuList).stop().slideUp();
            }
        });

        
        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);