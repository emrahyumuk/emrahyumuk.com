---
title: "WordPress Sürüm Yükseltme (Güncelleme)"
date: 2008-05-04T21:00:00.000Z
permalink: "wordpress-surum-yukseltme-guncelleme"
categories: ["İnternet"]
tags: ["güncelleme","sürüm yükseltme","wordpress"]
---
<img class="alignleft alignnone size-medium wp-image-124" style="border: 1px solid black; margin: 5px; float: left;" title="wordpress" src="http://www.emrahyumuk.com/blog/wp-content/uploads/wordpress.jpg" alt="wordpress" width="142" height="142" />wordpress&#8217; in yeni sürümü çıkalı epey zaman oldu. daha yeni olduğundan sorun olmaması için biraz bekledim. nasıl sürüm yükseltiliyor onu araştırdım. türkçesi de çıkınca dün başarılı bir şekilde sürüm yükselttim.

**sürüm yükseltmek için neler yaptım?**

<!--more-->

<span style="color: #ffffff;">.</span>

ilk önce ne olur ne olmaz dedim bir yedek aldım.

**wp-content **klasörü ve **wp-config.php** dosyası haricinde ne kadar dosya varsa hepsini sildim.  
(eğer farklı bir dil kullanıyorsanız wp-includes klasörü içindeki languages dosyasını da silmeyin.)

sonra **wp-content** klasörü içindeki **cache.php** dosyasını da sildim. (bu dosya websitenizde olmayabilir)

wordpress&#8217; in yeni sürümünü indirdim, zipli dosyadan çıkardım. yeni sürüm dosyalarından **wp-content **klasörünün içinde languages klasöründeki &#8220;**tr_TR.mo**&#8220; dosyasını websitemdeki **wp-content/languages** içine attım. ve yeni sürüm dosyalarından wp-content klasörünü sildim. kalan bütün dosyaları websiteme yükledim.

sonra http://www.emrahyumuk.com**/wp-admin/upgrade.php **sayfasına girdim. veritabanını yükselt dedim ve wordpress&#8217;i güncellemiş oldum.

Wordpress yeni sürümünü **<a href="http://www.wordpress-tr.com/indir" target="_blank">buradan</a>** indirebilirsiniz.