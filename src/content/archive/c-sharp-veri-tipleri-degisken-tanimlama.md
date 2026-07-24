---
title: "C# Veri Tipleri – Değişken Tanımlama"
date: 2010-12-28T22:00:00.000Z
permalink: "c-sharp-veri-tipleri-degisken-tanimlama"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","C#","c#.net","const","DateTime","decimal","değişken tanımlama","double","float","int","long","microsoft","programlama","sabit","veri tipleri","veri türleri","Visual Studio"]
---
Değişkenler bir programlama dilinde temel verileri saklamak ve bu verileri sonradan kullanmak için kullanılan bellek bölgeleridir.

C#&#8217;ta değişken şu şekildeki tanımlanır:

<pre>VeriTipi DegiskenAdi ;</pre>

<span style="color: #0000ff;">Tamsayı veri tipleri;</span> sbyte, byte, short, ushort, int, uint, long, ulong.

<span style="color: #0000ff;">Virgüllü Sayı Veri Tipleri;</span> float, double, decimal.

<span style="color: #0000ff;">Tek Karakter Veri Tipi;</span> char.

<span style="color: #0000ff;">Karakter dizisi Veri Tipi;</span> string.

<span style="color: #0000ff;">True/False Veri Tipi; </span>bool.

<span style="color: #0000ff;">Tarihsel Veri Tipi;</span> DateTime.

<!--more-->

<table style="width: 589px; height: 267px;" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #ff0000;"><strong>C# Adı</strong></span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #ff0000;"><strong>CTS Karşılığı</strong></span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #ff0000;"><strong>Açıklama</strong></span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #ff0000;"><strong>Max ve Min aralık yada değeri</strong></span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">sbyte</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Byte</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">8 bit işaretli tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">-128 : 127</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">short</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Int16</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">16 bit işaretli tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">-32.768 : 32.767</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">int</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Int32</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">32 bit işaretli tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">-2.147.483.648 : 2.147.483.647</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">long</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Int64</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">64 bit işaretli tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">-9.223.372.036.854.775.808 : 9.223.372.036.854.775.807</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">byte</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Byte</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">8 bit işaretsiz tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">0 : 255</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">ushort</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.UInt16</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">16 bit işaretsiz tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">0 : 65.535</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">uint</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.UInt32</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">32 bit işaretsiz tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">0 : 4.294.967.295</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">ulong</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.UInt64</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">64 bit işaretsiz tamsayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">0 : 18.446.744.073.709.551.615</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">float</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Single</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">32 bit tek kayan sayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">+yada &#8211; 1,5*10<sup>-45</sup> : + ya da &#8211; 3,4*10<sup>38 (virgülün sağında ve solunda 7 basamak)</sup></span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">double</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">Sytem.Double</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">64 bit çift kayan sayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">+yada &#8211; 5*10<sup>-324</sup> : + ya da &#8211; 1,7*10<sup>308 (virgülün sağında ve solunda 15-16 basamak)</sup></span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">decimal</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Decimal</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">128 bit ondalıklı sayı</span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">+yada &#8211; 1,0*10<sup>-28</sup> : + ya da &#8211; 7,9*10<sup>28 (virgülün sağında ve solunda 28-29 basamak) </sup></span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">bool</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Boolean</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;"><br /> </span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">true ya da false</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">char</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.Char</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">Tek Karakter<br /> </span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">16 Unicode karakterleri</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">string</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.String</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">Karakter dizileri<br /> </span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">16 Unicode karakter dizileri<br /> </span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" width="67">
      <span style="color: #0000ff;">DateTime</span>
    </td>
    
    <td valign="bottom" width="118">
      <span style="color: #0000ff;">System.DateTime</span>
    </td>
    
    <td valign="bottom" width="168">
      <span style="color: #0000ff;">Tarih<br /> </span>
    </td>
    
    <td valign="bottom" width="272">
      <span style="color: #0000ff;">gün/ay/yıl saat &#8211; 23.02.2010 12:00:00 </span>
    </td>
  </tr>
</table>

<pre>byte sayi1 = 0;  //0 ve 255 arası
sbyte sayi2 = -120; //-128 ve 127 arası
//hafızada 1byte yer kaplar

short sayi3 = 15056; //-32768 ve 32767 arası
ushort sayi4 = 65000; //0 ve 65535 arası
//hafızada 2 byte yer kaplar

int sayi5 = 148795413; //-2.147.483.648 ve +2.147.483.647 arası
uint sayi6 = 76745621; // 0 ve 4.294.967.295 arası
//hafızada 4 byte yer kaplar

long sayi7 = -7103456094932;
//-9.223.372.036.854.775.808 ile 9.223.372.036.854.775.807
ulong sayi8 = 1134576849039032; //0 ile 18.446.744.073.709.551.615
//hafızada 8 byte yer kaplar

float sayi9 = 11.29f; //4 byte //-3.402823E38 ve +3.402823E38
double sayi10 = 45.23d; // 8 byte //-1.79769313486232E308 ve +1.79769313486232E308
decimal sayi11 = 123.456M; //16 byte //-7.9E1028 ve +7.9E1028

DateTime Tarih = DateTime.Now; //8 byte // 1/1/0001 12:00:00 ve 31/12/9999 23:59:59
//DateTime.Now - şu anın tarihini atar

string AdSoyad = "Emrah Yumuk" ; // ~ (2 byte x harf adedi) yer kaplar

bool Evet = true; //4 byte //True veya False
bool Hayır = false;</pre>

NOT: Eğer tanımladığımız değişkenin en başına &#8220;const&#8221; yazarsak değişkeni sabitlemiş oluruz. Yazdığımız programda bir daha bu değişkeni değiştiremeyiz.

<pre>const int Sayi = 25;</pre>