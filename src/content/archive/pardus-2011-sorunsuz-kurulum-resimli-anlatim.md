---
title: "Pardus 2011 Sorunsuz Kurulum (Resimli Anlatım)"
date: 2011-01-27T22:00:00.000Z
permalink: "pardus-2011-sorunsuz-kurulum-resimli-anlatim"
categories: ["Linux"]
tags: ["disk bölümlendirme","harddisk bölümlendirme","linux işletim sistemi kurulumu","pardus 2011","pardus 2011 disk ayırma","pardus 2011 easybcd kullanım","pardus 2011 kurulum","pardus 2011 usb bellekten kurulum","pardus kurulum","pardus sorunsuz kurulum","resimli anlatım"]
---
Çoğu kullanıcı Pardus&#8217;u Windows ile birlikte kullanmaktadır. Pardus gibi herhangi bir Linux işletim sistemini silmeye kalktığımızda veya yerine başka bir işletim sistemi kurmaya kalktığımızda Grub sorunlarıyla karşılaşırız ve Windows&#8217;a ulaşamayız. Sonrasında çeşitli işlemlerle bunu düzeltebiliriz ancak bilmeyen biri bütün harddiske format atabilir. Bu tarz sorunları yaşamamanız için Pardus&#8217;u harddiskin başına değil kurmuş olduğunuz  diskin başına yükleyeceğiz ve Windows üzerinde  EasyBCD programını kullanarak windows&#8217;a ve pardus&#8217;e ulaşabileceğiz. Daha sonrasında Pardus&#8217;un bulunduğu diske format atsak bile windows&#8217;a zarar gelmeyecek. Bu anlatacaklarım bütün Linux işletim sistemlerinin kurulumunda ve kullanımında geçerlidir. Artık istediğiniz kadar Linux işletim sistemi kurup deneyip silebilirsiniz. Hatta iki veya daha fazla işletim sistemi de kullanabilirsiniz. Anlatım biraz uzun olacak ama dikkatli okuyup işlemleri adım adım yaparsanız artık linux aleminde de istediğiniz gibi cirit atmayı öğreneceksiniz.

<!--more-->

Pardus 2011&#8242;i indirip dvd&#8217;ye yazdırmak için **<a href="http://www.emrahyumuk.com/pardus-2011-dvdye-nasil-yazilir/" target="_blank">buraya</a>**, usb flash belleğe yazdırmak için ise **<a href="http://www.emrahyumuk.com/pardus-2011-usb-flash-bellek-yazdirmak/" target="_blank">buraya</a>** bakınız.

Kuruluma geçmeden önce ilk olarak Windows üzerinden Pardus için bir bölüm ayıracağız. Onun için **[buradan][1]** PartitionWizard programını indirelim. Ücretsiz harddiski bölümlendirme programı olan Partition Wizard&#8217;ı bilgisayarınıza kurun. Kurduktan sonra masaüstüne gelen kısayola tıkladığınızda karşınıza şu ekran gelecek.

<img class="alignnone" title="partition wizard harddisk bölümlendirme" src="http://www.emrahyumuk.com/images/blog/partitionwizard.jpg" alt="" width="504" height="373" />

ilk olarak bölümlendireceğiniz diski seçin, **Move/Resize**&#8216; a tıklayın. Karşınıza gelen ekranda **Unlocated Space After** kısmına 10000 yazın. Ve **Ok**&#8216;e tıklayın. Son olarak da sağ üst köşede **Apply**&#8216;a tıklayın. İşlem Bittiğinde seçtiğiniz diskten 10GB&#8217;lık bir bölüm Pardus&#8217;u kurmanız için ayrılacak. Disk bölümünü herhangi bir formata çevirmeyin. **Unallocated** olarak kalsın.

Artık Pardus 2011 dvd&#8217;miz veya usb belleğimiz hazırsa kuruluma geçebiliriz.

Dvd veya usb belleği taktıktan sonra bilgisayarınızı yeniden başlatın ve başlarken **F12** tuşuna basınız. Karşınıza gelen ekranda Dvd&#8217;den kurulum yapacaksanız cd-rom&#8217;u, usb&#8217;den kurulum yapacaksanız usb&#8217;nizi seçiniz.

Karşınıza Pardus 2011&#8242;in kuruluma başlangıç ekranı gelecek.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum1.jpg" alt="" width="610" height="458" />

**Türkçe** dil seçeneğini seçtikten sonra en üstte bulunan **Pardus 2011** yazısına tıklıyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum2.png" alt="" width="610" height="458" />

Sonra karşınıza lisans şartları ekranı gelecek. &#8220;**Şartları anladım ve kabul ediyorum**&#8220;a tik atıp sağ alt kısımdaki **ileri** butonuna tıklayınız.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum3.png" alt="" width="610" height="458" />

Lisansı onayladıktan sonra kurulum ortamının denetlenmesi ekranı gelecek. Yazmış olduğunuz dvd&#8217;nizde veya usb belleğinizdeki paketlerde hata veya eksik olup olmadığının kontrol edilmesi için &#8220;**Denetle**&#8221; ye tıklayınız.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum4.png" alt="" width="610" height="458" />

Eğer herhangi bir sorun yoksa &#8220;**Geçerlilik denetimi başarılı**&#8221; yazısı çıkacaktır. Eğer sorun varsa kuruluma devam etmeyiniz. Pardus iso dosyasını indirirken eksik inmiş olabilir veya Dvd&#8217;nize veya usb belleğinize yazarken sorun çıkmış olabilir. Tekrar yazıp en baştan kurmayı deneyin.

&#8220;**Geçerlilik denetimi başarılı**&#8221; yazısını gördükten sonra **ileri** butonuna tıklayınız.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum5.png" alt="" width="610" height="458" />

Bir sonraki ekranda klavye düzeninizi seçin. Yerleşimi Denetleme kısmında türkçe karakterleri (ğiçşıöü) yazarak sorun olup olmadığına bakabilirsiniz. Seçtikten sonra **ileri** butonuna tıklayın.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum6.png" alt="" width="610" height="458" />

Sonraki ekranda **saat ve tarih**i ayarlayın ve **ileri** butonuna tıklayın.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum7.png" alt="" width="610" height="458" />

Şimdi en önemli kısım olan &#8220;Disk Bölümlendirme&#8221; kısmına geldik. En alttaki &#8220;**Kendi Düzenini Yarat**&#8221; ı seçiyoruz. Ve **ileri** butonuna tıklıyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum8.jpg" alt="" width="610" height="458" />

Karşımıza Harddiskimizdeki disk bölümleri gelecek. 10 GB olarak ayırdığımız bölüm 10000 olarak bu kısımda görünecektir, üzerine tıklayıp altta **Oluştur>Standart>Disk Bölümü**&#8216; ne tıklıyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum9.png" alt="" width="610" height="458" />

Gelen küçük pencerede **Kullan** kısmında tek slash işareti (**/**) ni seçiyoruz. **DosyaSistemi ext4**, **Boyut** kısmındaki barı en sona getiriyoruz, **10000 MB** oluyor. **OK&#8217;**e tıklıyoruz. (Karşımıza herhangi bir uyarı ekranı gelirse **Tamam**&#8216;ı tıklayınız). Ve son olarak da **ileri** butonuna tıklıyoruz. İleri butonuna tıkladığımızda takas alanı ilgili bir uyarı gelebilir, tamam deyip devam ediyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum10.jpg" alt="" width="610" height="458" />

Bu ekranda Grub&#8217;u (önyükleyici) nereye yüklemek istediğimizi seçeceğiz. Ekranda Öntanımlı ayarlar seçili olarak gelecek, fakat biz grub&#8217;u (önyükleyici) pardus&#8217;un bulunacağı bölümün başına kuracağımız için **Gelişmiş Ayarlar**&#8216;ı seçiyoruz. Ordan da **Pardus&#8217;un kurulu olduğu bölüm** seçeneğini seçiyoruz ve ileri butonuna tıklıyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum11.png" alt="" />

Bu ekranda yapmış olduğumuz ayarlar bir özet halinde bize sunulur. Eğer bir yanlışlık yoksa sol alttaki **Kurulumu Başlat** butonuna tıklıyoruz. Karşımıza gelecek onaylama penceresinde de **Değişiklikleri Disk Yaz**&#8216;a tıklıyıp kuruluma başlamayı onaylıyoruz.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum12.png" alt="" width="610" height="458" />

Ve Pardus 2011 bilgisayarınıza yüklenmeye başlayacak. Bilgisayarınızın özelliklerine göre kurulum yaklaşık 20 dk. sürecek. Bu sırada size Pardus hakkında ufak bilgilendirmeler yapılacak.

<img class="alignnone" title="pardus 2011 kurulum" src="http://www.emrahyumuk.com/images/blog/pardus2011kurulum13.png" alt="" width="610" height="458" />

Kurulum tamamlandığında ekranda bu işareti göreceksiniz. Artık bilgisayarınızı yeniden başlatabilirsiniz.

Bilgisayarınızı yeniden başlattığınızda önyükleyiciyi Pardus&#8217;u kurduğumuz diskin başına yüklediğimizden Pardus&#8217;e erişemeyeceğiz. Bunun için Windows üzerinden EasyBCD isimli ufak bir programla bazı ayarlar yapacağız.

İlk olarak EasyBCD programını **[buradan][2]** indirin.

EasyBCD programını ilk açtığınızda karşınıza bu ekran gelecektir.

<img class="alignnone" title="easybcd" src="http://www.emrahyumuk.com/images/blog/easybcd01.jpg" alt="" width="577" height="471" />

Gördüğünüz gibi sadece windows işletim sistemimiz görünmektedir şimdi Pardus işletim sistemimizi de buraya ekleyip bilgisayarın açılışında görebilmemizi sağlayacağız. Bunun için ilk olarak sol taraftaki butonlardan &#8220;**Add New Entry**&#8221; butonuna tıklıyoruz.

<img class="alignnone" title="easybcd" src="http://www.emrahyumuk.com/images/blog/easybcd2.jpg" alt="" width="573" height="471" />

**Add New Entry** butonuna tıkladıktan sonra karşımıza gelen ekranda Operating Systems kısmında Windows sekmesinin yanında bulunan **Linux/BSD** sekmesini tıklıyoruz. Type kısmı varsayılan olan **GRUB(Legacy)** olarak bırakıyoruz. Name kısmına **Pardus 2011** yazıyoruz. Ve Device kısmında ise Pardus&#8217;u kurduğumuz 10GB&#8217;lık disk bölümünü seçiyoruz.

Sol tarafta &#8220;Edit Boot Menu&#8221; butonuna tıkladığımızda ayar ekranı karşımıza gelecek.

<img class="alignnone" title="easybcd" src="http://www.emrahyumuk.com/images/blog/easybcd3.jpg" alt="" width="579" height="469" />

Buradan varsayılan işletim sistemini, açılışta bekleme süresini vs. ayarları değiştirebilirsiniz. Bu bölümdeki ayarları isterseniz olduğu gibi de bırakabilirsiniz. Sağ alttaki **Save Setting** butonuna tıkladığınızda yaptığınız değişiklikler kaydedilmiş olacak.

Şimdi bilgisayarımızı yeniden başlatalım.Artık açılış ekranlarından Pardus 2011&#8242;i seçerek Pardus 2011 işletim sistemize ulaşabiliriz. Pardus 2011&#8242;de karşınıza ilk olarak kullanıcı adı, şifre vs. belirleyeceğiniz ekranlar çıkacak. Bu ayarları yaptıktan sonra işletim sistemimiz açılacak.

İstediğiniz zaman Partition Wizard programı ile Pardus&#8217;un bulunduğu diske format atabilir ve windowsunuza hiçbir zarar gelmeden kurmuş olduğunuz işletim sistemlerini kaldırabilirsiniz.

Bu uygulamaları sadece Pardus için değil bütün linux işletim sistemleri için yapabilirsiniz. Hatta Pardus&#8217;un yanına bir tane daha linux işletim sistemi ekleyebilirsiniz.

**Linux işletim sistemi yüklerken yapmanız gerekenler;**  
** 1) **Partition programı ile linux işletim sistemi kuracağınız disk bölümü ayırma  
** 2)** Linux işletim sistemi kurulumu sırasında Önyükleyiciyi (GRUB) linux işletim sistemini kuracağınız diskin başına yüklenmesini sağlamak  
** 3)** EasyBCD programı ile Linux işletim sisteminizi açılış yöneticisine eklemek.

 [1]: http://dl.dropbox.com/u/233963/Programlar/PartitionWizard.rar
 [2]: http://dl.dropbox.com/u/233963/Programlar/EasyBCD.rar