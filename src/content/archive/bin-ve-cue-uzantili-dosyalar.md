---
title: ".bin ve .cue uzantılı dosyalar"
date: 2008-08-01T21:00:00.000Z
permalink: "bin-ve-cue-uzantili-dosyalar"
categories: ["Bilgisayar"]
tags: ["bin","cue","iso","nero"]
---
<img class="alignleft" style="margin: 5px; float: left;" title=".bin .cue uzantılı dosyalar" src="http://img143.imageshack.us/img143/4898/cdbinuc6.png" alt="" width="150" height="150" />Bir dosya indirdik ve **.bin** uzantılı. eğer bu dosyanın yanında **.cue** uzantılı bir dosya varsa Nero ile cd&#8217;ye yazabiliriz. eğer cue uzantılı dosya yoksa bu dosyayı bizim oluşturmamız gerekiyor. Nasıl mı?

<!--more-->

ilk olarak &#8220;Yeni Metin Belgesi.txt&#8221; oluşturalım. oluşturduğumuz bu boş metin dosyasının içine,

<pre>&lt;span style="color: #ffffff;"&gt;.&lt;/span&gt;</pre>

FILE &#8220;DOSYA_ISMI.BIN&#8221;  
BINARY TRACK 01 MODE1/2352  
INDEX 01 00:00:00

**DOSYA_ISMI** kısmına .bin uzantılı dosyamızın ismi neyse onu yazıyoruz.

&#8220;Farklı Kaydet&#8221; i seçip **DOSYA_ISMI.CUE** olarak kaydediyoruz.

Sonra Nero ile iso dosyalarını yazdırdırır gibi bu dosyayı cdye yazabiliriz.

<a href="http://www.webhatti.com/resimli-program-anlatim/198240-iso-dosyalari-neroyla-cd-ye-yazma.html" target="_blank">Nero ile .cue veya .iso dosyaları nasıl cd veya dvd&#8217;ye yazılır</a>

<span style="color: #ffffff;">.</span>