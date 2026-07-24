---
title: "WordPress sitenizde anasayfada anlamsız karakterlerin çıkması ve çözümü"
date: 2013-09-20T21:00:00.000Z
permalink: "wordpress-sitenizde-anasayfada-anlamsiz-karakterlerin-cikmasi-ve-cozumu"
categories: ["Diğer","İnternet"]
tags: ["anlamsız karakterler","htaccess","wordpress","wordpress sorunu"]
---
Bir süre önce websitemi başka bir hosta taşıdıktan sonra websitemin anasayfası görünmüyordu ve karışık anlamsız karakterlerle doluydu.

<!--more-->

<img class="alignnone" src="http://www.emrahyumuk.com/images/blog/htaccess-sorunu.png" alt="wordpress karışık karakterler" width="560" height="349" />

&nbsp;

Wordpress&#8217;i güncellesem de yeniden yüklesem de sorunu çözemedim. .**htaccess** dosyasını açtığımda çok fazla ayar olduğunu gördüm ve bundan kaynaklanabileceğine düşündüm. .htaccess dosyasında sadece wordpress ayar satırlarını bıraktım, geri kalanını sildim.

<pre># BEGIN WordPress
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
&lt;/IfModule&gt;
# END WordPress</pre>

isterseniz .htaccess dosyasını [**buradan**][1] indirip sitenize koyabilirsiniz.

 [1]: http://www.emrahyumuk.com/images/blog/_download/htaccess.rar