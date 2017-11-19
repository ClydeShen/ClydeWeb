<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Projects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="description" content="projects of Longzhen Shen">
        <meta name="keywords" content="projects, portfolio, Clyde, Longzhen Shen, 申龙臻, 作品, PHP, magento">
        <meta name="robots" content="INDEX,FOLLOW">
        <!--                <link rel="icon" href="http://shenlongzhen.info/media/favicon/default/logo.png" type="image/x-icon">
                        <link rel="shortcut icon" href="http://shenlongzhen.info/media/favicon/default/logo.png" type="image/x-icon">-->
        <link href="../css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="../css/bootstrap-theme.css" rel="stylesheet" type="text/css"/>
        <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link href="css/portfolio.css" rel="stylesheet" type="text/css"/>
        <link href="css/YTPlayer.css" rel="stylesheet" type="text/css"/>
        <script src="../js/jquery.min.js" type="text/javascript"></script>
        <script src="../js/jquery.isotope.min.js" type="text/javascript"></script>
        <script src="../js/bootstrap.js" type="text/javascript"></script>
        <script src="js/jquery.mb.YTPlayer.min.js" type="text/javascript"></script>
        <script>
            jQuery(function () {
                jQuery(".player").mb_YTPlayer();
            });
            $(window).load(function () {
                var $container = $('.portfolioContainer');
                $container.isotope({
                    filter: '*',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

                $('.portfolioFilter a').click(function () {
                    $('.portfolioFilter .current').removeClass('current');
                    $(this).addClass('current');

                    var selector = $(this).attr('data-filter');
                    $container.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    });
                    return false;
                });
            });
        </script>
    </head>
    <body>
        <div class="player" data-property="{videoURL:'6D-A6CL3Pv8',containment:'body',autoPlay:true, mute:true, startAt:3, stopAt: 257,showControls: false,showAnnotations: false,opacity:1}">My video</div>
        <div class="container projectbody">
            <div class="row headtop">
                <div class="pull-left portfolio-logo"></div>
                <div class="pull-left portfolio-title"><h1>Portfolio</h1></div>
            </div>
            <div class="row projects">
                <div class="portfolioFilter">
                    <a href="#" class="current btn btn-white" data-filter="*" >All Categories</a>
                    <a href="#" class="btn btn-white" data-filter=".tangren">Tangren</a>
                    <a href="#" class="btn btn-white" data-filter=".anns">Ann's</a>
                </div>
                <div class="portfolioContainer">
                    <div class="item tangren  ">
                        <h2>Y&Y</h2>
                    </div>
                    <div class="item tangren  ">
                        <h2>ECKOM</h2>
                    </div>
                    <div class="item tangren ">
                        <h2>KINGDOM TOUR</h2>
                    </div>
                    <div class="item anns ">
                        <h2>Ann’s</h2>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
