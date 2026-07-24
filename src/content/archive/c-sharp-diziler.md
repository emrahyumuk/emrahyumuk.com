---
title: "C#’ ta Diziler"
date: 2011-01-18T22:00:00.000Z
permalink: "c-sharp-diziler"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","c sharp diziler","C#","c#.net","çok boyutlu diziler","diziler","matris","sayısal loto","tek boyutlu diziler"]
---
Matematikteki &#8220;Matris&#8221; olayına C#&#8217;ta &#8220;Diziler&#8221; diyoruz. Sadece bir satır veya sadece bir sütundan oluşan matrise tek boyutlu dizi, satır ve sütunlardan oluşan matrislere çok boyutlu diziler diyoruz. Matris konusuna **<a href="http://tr.wikipedia.org/wiki/Matris_(matematik)" target="_blank">buradan</a>** göz atabilirsiniz.  
<!--more-->

Tek satırlı matris: **A(1,n)=[0,1,2,3,4,5,6,7,........,n]**  
sadece tek satırdan n tane sütundan oluşan ve n tane elemanı olan bir dizi.

<pre>VeriTipi[] DiziAdı = new VeriTipi[ElemanSayisi];</pre>

<span style="color: #c0c0c0;">.</span>

Satır ve Sütunlardan oluşan matris:  
<img class="alignnone" title="matris c# dizi" src="http://www.emrahyumuk.com/images/blog/matris.png" alt="" width="311" height="109" />

n tane sütun ve m tane satırdan oluşan ve m*n elemanlı çok boyutlu bir dizi.

<pre>VeriTipi[,] DiziAdı = new VeriTipi [SatırSayisi,SütunSayisi];</pre>

C#&#8217;ta diziler referans tipinde değişkenlerdendir. C#&#8217;ta tanımlanan tüm diziler System.Array sınıfından türemiş bir nesnedir.

5 adet sayiyi tutan bir dizi tanımlamak istersek;

<pre>int[] Sayilar = new int[5];</pre>

bu dizinin elemanları şu şekilde tanımlarız;

<pre>Sayilar[0]=23; // Sayilar isimli dizinin ilk elemanı
Sayilar[1]=1256; // ikinci elamanı
Sayilar[2]=12; // üçüncü elemanı
Sayilar[3]=2300; // dördüncü elemanı
Sayilar[4]=125; // beşinci elemanı</pre>

Görüldüğü gibi dizinin ilk elamanı 0&#8242;dan başlıyor.

Aynı diziyi şu şekilde de tanımlayabiliriz.

<pre>int[] Sayilar = {23, 1256, 12, 2300, 125};</pre>

şimdi de for döngüsü ile bir dizinin bütün elemanlarına ulaşıp toplama yapıp sonuca ulaşalım.

<pre>int[] Sayilar = {23, 1256, 12, 2300, 125};

int Toplam=0;

for(int i=0; i &lt; 5; i++)
{
     Toplam += Sayilar[i];
}</pre>

for döngüsü her dönüşünde sırasıyla dizinin bütün elemanlarına ulaşıp Toplam değişkenine ekleyecek. Toplam değişkeninin en son değeri dizideki bütün elemanların toplamı olacak.

for döngüsünde koşul kısmında dizinin eleman sayısı olan 5 yerine Sayilar.Length de yazabiliriz. Sayilar.Length Sayilar dizisinin eleman sayısını verir.

<pre>int[] Sayilar = {23, 1256, 12, 2300, 125};

int Toplam=0;

for(int i=0; i &lt; Sayilar.Length; i++)
{
     Toplam += Sayilar[i];
}</pre>

<span style="color: #800000;"><strong>Length</strong>:</span> Dizinin eleman sayısını verir.  
**int ElemanSayisi= Sayilar.Length;**

<span style="color: #800000;"><strong>Clear</strong>:</span> Dizideki bütün elemanları temizler dizi int tipindeyse bütün elemanlar 0 değerini alır. eğer string dizisiyse bütün elemanlar boş "" değerini alır.  
**Array.Clear (Sayilar);**

**<span style="color: #800000;">Reverse</span>**: Dizinin eleman sırasını tersine çevirir.  
**Array.Reverse(Sayilar);**

<span style="color: #800000;"><strong>Sort</strong>: </span>Dizinin elemanlarını büyükten küçüğe sıraya dizer. eğer string dizisiyse harf sırasına göre dizer.  
**Array.Sort(Sayilar);**  
.

1 tane sayısal loto kuponunda 8 tane kolon vardır ve her kolonda 6 sayı mevcuttur. Bu kupondaki 8 kolonu da oynadığımızı düşünelim. Bu kolonları alt alta yazalım. Oluşan dizi 8 satırlı 6 sütunlu bir dizi olacaktır. Bu diziye 2 boyutlu dizi diyoruz.  
<img class="alignnone" title="sayısal loto" src="http://www.emrahyumuk.com/images/blog/sayisal-loto.jpg" alt="" width="205" height="314" />

<pre>int[,] SayisalLotoKuponu = new int [8, 6];</pre>

şimdi kuponlardaki sayıları belirleyelim;

<pre>//Birinci kolon
SayisalLotoKuponu [0,0] = 7;
SayisalLotoKuponu [0,1] = 8;
SayisalLotoKuponu [0,2] = 15;
SayisalLotoKuponu [0,3] = 21;
SayisalLotoKuponu [0,4] = 27;
SayisalLotoKuponu [0,5] = 36;

SayisalLotoKuponu [2,4] = 27;  // 3. kolonun 5. sayısı

SayisalLotoKuponu [7,5] = 36; // 8. kolonun 6. sayısı</pre>

Dikkat edilecek nokta eleman sayıları 0'dan başladığı için istediğimiz satır ve sütuna ulaşabilmek için satır ve sütun sayısını 1 eksiltip yazıyoruz. Yani 4.kuponun 3. sayısına ulaşmak için  
**SayisalLotoKuponu [3,2];**  
yazıyoruz.

Şimdi de bu kupondan 3 adet olduğunu düşünelim. Yani hepsinin 8 kolonu oynanmış 3 adet kupon. Bu da 3 boyutlu dizi oluyor.

<pre>int[, ,] SayisalLotoKuponlari = new int [8, 6, 3];</pre>

Kuponlardaki sayıları yazarsak;

<pre>//Birinci Kupon Birinci kolon
SayisalLotoKuponlari [0,0,0] = 7;
SayisalLotoKuponlari [0,1,0] = 8;
SayisalLotoKuponlari [0,2,0] = 15;
SayisalLotoKuponlari [0,3,0] = 21;
SayisalLotoKuponlari [0,4,0] = 27;
SayisalLotoKuponlari [0,5,0] = 36;

SayisalLotoKuponlari [2,4,1] = 27;  // 2.Kuponun 3.kolonundaki 5.sayı

SayisalLotoKuponlari [7,5,2] = 36; // 3.Kuponun 8.kolonundaki 6.sayı</pre>