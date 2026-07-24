---
title: "Pardus 2011′i USB Belleklere Yazdırmak"
date: 2011-01-24T22:00:00.000Z
permalink: "pardus-2011-usb-flash-bellek-yazdirmak"
categories: ["Linux"]
tags: ["bootable usb","dd","dd uygulaması","flash bellek","flash bellek kurulum","işletim sistemi","linux","pardus","pardus 2011","pardus 2011 flash bellek yazdırma","usb bellek","usb bellek kurulum"]
---
Dvd kopyalamak yerine usb belleklere pardus 2011&#8242;i kolay bir şekilde yazdırabilirsiniz. Özellikle netbooklara Pardus kuracaksanız usb belleğe yazdırmanız gerekmektedir.

Pardus 2011&#8242;i indirmediyseniz **[buradan][1]** indiriniz.

İndirmiş olduğunuz Pardus dosyasının ismini  Pardus olarak değiştirin ve Yerel Disk C:&#8217;ye kopyalayın&#8230;

<!--more-->

Usb belleği kuruluma hazırlamak için dd uygulamasını kullanacağız. Windows için dd uygulamasını **[buradan][2]** indiriniz. indirmiş olduğunuz sıkıştırılmış rarlı dosyayı Pardus dosyamızın yanına Yerel disk C&#8217; ye çıkartın. dd.exe dosyanız C: &#8216;de bulunsun.

**Başlat>Donatılar>Komut İstemi**

Komut İstemi&#8217;ne sağ tıklayıp yönetici olarak çalıştıra tıklayınız. Karşınıza aşağıdaki pencere gelecek.

<img class="alignnone" title="pardus 2011 usb bellek kurulum yazdırma" src="http://www.emrahyumuk.com/images/blog/dd-usb-komut.jpg" alt="pardus 2011 bootable flash bellek" width="599" height="298" />

dd.exe dosyamız C:&#8217; de bulunduğu için komut satırımız **C:\>** şeklinde olması gerekiyor. bunun için komut satırına **cd/** yazıp enter&#8217;a tıklıyoruz.

C:\Windows\system32>**cd/**

komut satırımız C:\> olmuşsa şunu yazıyoruz:  **dd &#8211;list**

C:\>**dd &#8211;list**

dd &#8211;list yazdıktan sonra karşınıza harddisk bölümleriniz gelmişse dd.exe doğru dizindedir ve çalışıyordur. şimdi yapmanız gereken usb belleğimizin hangi bölümde olduğuna bakmak. Mesela benim G: diskinde.

şimdi ise şu komutu yazıp enter&#8217;a basıyoruz:

**dd if=&#8221;C:\Pardus.iso&#8221; of=\\.\g: bs=4M**

**C:\Pardus.iso** indirmiş olduğumuz pardus&#8217;un yolunu gösteriyor. indirmiş olduğunuz Pardus iso dosyasının C:&#8217;de olması gerekiyor

**g: **usb belleğin bulunduğu disk, sizde nerdeyse onu yazın.

komutta yer alan diğer bütün karakterleri aynen yazın, boşluklara dikkat edin.

eğer yerel disk C: altta açıksa kapatın çünkü kullanılıyor hatası verecektir.

Eğer herhangi bir hata yoksa aşağıdaki ekran karşımıza çıkacaktır. Bu işleminizin başladığı anlamına geliyor. Bir süre bekleyiniz.

<span style="color: #ff6600;">Eğer bu ekran yerine hata alırsanız C:\Pardus.iso&#8217;yu tırnak işaretsiz olarak yazıp tekrar deneyin.</span>  
<span style="color: #ff6600;"><strong>dd if=C:\Pardus.iso of=\\.\g: bs=4M</strong> </span>

<img class="alignnone" title="pardus 2011 usb bellek yazdırma" src="http://www.emrahyumuk.com/images/blog/dd-usb-komut2.jpg" alt="pardus linux flash bellek kurulum" width="589" height="143" />

altında records in ve records out yazılarını gördüğünüz anda usb belleğe yazma işlemi bitmiştir. pencereyi kapatabilirsiniz.

<img class="alignnone" title="pardus 2011 flash bellek kurulum" src="http://www.emrahyumuk.com/images/blog/dd-usb-komut3.jpg" alt="pardus bootable usb bellek" width="493" height="159" />

Kurulum işlemini geçmek için bilgisayarı yeniden başlatın, F12 tuşuna basın karşınıza başlangıç ekranı yani harddisk, cd-rom ve usb belleğinizin adının olduğu bir ekran gelecek. usb belleğinizi seçip kuruluma başlayabilirsiniz.

&nbsp;

**<span style="color: #ff0000;">Not:</span> Bu yöntemde hata alan arkadaşlar <span style="text-decoration: underline; color: #008080;"><a href="http://tr.pardus-wiki.org/NASIL:Kal%C4%B1p_dosyas%C4%B1n%C4%B1_USB_belle%C4%9Fe_yazmak" target="_blank"><span style="color: #008080; text-decoration: underline;">buradan</span></a></span> diğer kurulum yollarını deneyebilirler.**

<span style="color: #c0c0c0;">.</span>

 [1]: ftp://ftp.pardus.org.tr/pub/ISO/Kurulan/2011/Pardus-2011-i686.iso
 [2]: http://dl.dropbox.com/u/233963/Programlar/dd.rar