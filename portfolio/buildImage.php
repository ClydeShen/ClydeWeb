<?php

$a = array(
    "eckom" => array(
        "title" => "Eckom",
        "url" => array("image/eckom.jpg", "image/eckom1.jpg", "image/eckom2.jpg"),
        "des" => "Eckom was the first project from client at Tangren ltd. It provide customisized applications and system toolkit for autoparts manufacturers. At this stage, I was a beginner of PHP and web techs and tried to learn as much as I can.",
        "skill" => array("PHP"=>35, "HTML"=>45,"CSS"=>30, "JavaScript"=>30, "JQuery"=>25, "MySQL"=>25),
        "link" => "http://www.eckomautoparts.com/"
    ),
    "yyfood" => array(
        "title" => "Y&Y Frozen Food",
        "url" => array("image/yy2.jpg", "image/yy1.jpg", "image/yy3.jpg", "image/yy4.jpg"),
        "des" => "Y&Y Frozen Food as the first e-commence project. It allowed people to make order online. In terms of e-commence features, I tried to write them from scratch at the first version, but even it was not perfect, I learned a lot from that. Eventually, I changed it to WordPress&Woo-Commence at the second version.",
        "skill" =>  array("PHP"=>55, "HTML"=>60,"CSS"=>55, "JavaScript"=>40, "JQuery"=>40, "MySQL"=>55,"Bootstrap"=>25,"WordPress"=>70,"MySQL"=>50),
        "link" => "http://yyfood.co.nz/"
    ),
    "kindom" => array(
        "title" => "Kingdom Tour",
        "url" => array("image/kingdom.jpg","image/kingdom1.png","image/kingdom2.png"),
        "des" => "The Challenges from Kingdom Tour was lots of front-end and e-commence requirements on multilingual site. I spend time in front-end and creating own MVC framework. Through this project, I gained knowledge of MVC structure and front-end skills",
        "skill" => array("PHP"=>80, "HTML"=>85,"CSS"=>95, "JavaScript"=>80, "JQuery"=>75, "MySQL"=>75,"Bootstrap"=>70,"MVC"=>55),
        "link" => "http://www.bizwall.co.nz/"
    ),
    "oldanns" => array(
        "title" => "Ann's Volcanic Motel (Previous Version)",
        "url" => array("image/anns.jpg", "image/ann1.jpg"),
        "des" => "The first project I got after graduation was updating website for Ann's Volcanic Motel. I was excited to learn PHP from my first PHP project. Good news was I increased traffic and page views for this website.",
        "skill" => array("PHP"=>15, "HTML"=>30,"CSS"=>15, "JavaScript"=>10, "JQuery"=>10),
        "link" => "#"
    ),
    "newanns" => array(
        "title" => "Ann's Volcanic Motel (New Version)",
        "url" => array("image/annv2.png","image/annsv2_a.jpg","image/annsv2_b.jpg"),
        "des" => "To gain the Qualmark Award, Ann's Volcanic Motel need update their website from pure PHP to WordPress. I backed up all of data from old hosting and installed WordPress on new hosting. I edited some features and contents in the source code beause there is no perfect theme and plugin.",
        "skill" => array("WordPress"=>95,"Photoshop"=>25,"PHP"=>35, "HTML"=>30,"CSS"=>15,"MySQL"=>20),
        "link" => "http://www.rotoruamotel.co.nz/"
    ),
    "hellopet" => array(
        "title" => "Hello Pets",
        "url" => array("image/Hellopets.jpg","image/Hellopets1.jpg","image/Hellopets2.jpg"),
        "des" => "Hello Pets is a small breeding program. This project is I did in spare time, not urgen but I need format many pictures using Photoshop and change some style of the theme. It running on my Linode VPS",
        "skill" =>array("WordPress"=>90,"Photoshop"=>15,"HTML"=>25,"CSS"=>10,"Apache"=>25,"MySQL"=>20),
        "link" => "http://hellopets.co.nz/"
    ),
    "aimy" => array(
        "title" => "Aimy Plus",
        "url" => array("image/aimyplus.jpg","image/aimy.png","image/contact.jpg"),
        "des" => "AIMY Plus is a cloud based software solution. It already accomplished more than 6 million dollar bookings within 6 months. I responsible for back-end and front-end developing of full features of the contact manager that is to manage more than 110,000 contact details in AIMY Plus. I optimised legacy code and reducing redundant data to decrease response time from 8 seconds to 0.5 seconds in average",
        "skill" => array("C# ASP.Net"=>85,"SQL Server"=>85, "MVC"=>100,"Kendo UI"=>90,"HTML"=>75,"CSS"=>65,"Bootstrap"=>65,"JQuery"=>90,"Entity Framework"=>70,"AJAX"=>90),
        "link" => "http://www.aimyplus.com/"
    )
);
$result = json_encode($a);
echo $result;

$a = array(
    "eckom" => array(
        "title" => "",
        "url" => array("", "", ""),
        "des" => "",
        "skill" => "")
);

