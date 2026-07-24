---
title: "C#’ta If-Else Karar Yapısı ve Karşılaştırma Operatörleri"
date: 2011-01-16T22:00:00.000Z
permalink: "c-sharp-if-else-karar-yapisi-karsilastirma-oparatorleri"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","C#","c#.net","else if","if else","if else karar yapısı","ilişkisel operatörler","karşılaştırma operatörleri","mantıksal operatörler","operatörler","Visual Studio"]
---
if-else karar yapısı ile belirlediğimiz bir koşulun doğru veya yanlış olması durumunda yapılması gerekenleri programa yaptırırız. Bunu yapmak için çeşitli karşılaştırma operatörleri kullanarak bir koşul oluşturur ve koşulun doğruluğuna göre yapılması gerekenleri belirleriz.

<span style="color: #c0c0c0;">.</span>

**if (Koşul)  
{  
//Koşul doğruysa yapılacaklar  
}  
else  
{  
//Koşul yanlışsa yapılacaklar  
}**

if-else yapısında koşulu belirtirken çeşitli karşılaştırma operatörleri kullanılır.

<!--more-->

<table style="border-color: #b4b2b1; border-width: 0px;" border="0">
  <tr>
    <td colspan="2">
      <span style="font-size: x-small;"><span style="line-height: 19px; -webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px;"><span style="color: #993300;"> <strong>İLİŞKİSEL OPERATÖRLER </strong></span></span></span>
    </td>
    
    <td colspan="2">
      <span style="font-size: x-small;"><span style="color: #993300;"> <strong>MANTIKSAL OPERATÖRLER</strong></span> </span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">==</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Eşittir</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">&</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Ve</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">!=</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Eşit değildir</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">|</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Veya</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">< </span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Küçüktür</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">&&</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Koşullu Ve</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">></span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Büyüktür</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">||</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Koşullu Veya</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;"><=</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Küçüktür veya eşittir</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">!</span>
    </td>
    
    <td>
      Değil
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">>=</span>
    </td>
    
    <td>
      <span style="-webkit-border-horizontal-spacing: 0px; -webkit-border-vertical-spacing: 0px; font-size: 13px; line-height: 19px;">Büyüktür veya eşittir</span>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
  </tr>
</table>

Mesela tanımladığımız Sayi isimli değikenimiz 5&#8242;e eşitse mesaj kutunda &#8220;Sayi 5&#8242;e eşittir&#8221;, eşit değilse &#8220;Sayı 5&#8242;e eşit değildir&#8221; yazsın.

<pre>byte Sayi = 5;

if (Sayi == 5)
{
MessageBox.Show("Sayı 5'e eşittir");
}
else
{
MessageBox.Show("Sayı 5'e eşit değildir");
}</pre>

Tanımladığımız Sayı değişkeni 5 olduğu için mesaj kutusunda &#8220;Sayi 5&#8242;e eşittir&#8221; yazacaktır.

Şimdi de Sayi değişkeni 5 eşit veya 10 eşitse mesaj kutunda &#8220;Sayi 5&#8242;e eşittir&#8221;, eşit değilse &#8220;Sayı 5&#8242;e eşit değildir&#8221; yazsın.

<pre>byte Sayi = 5;

if (Sayi == 5 || Sayi==10)
{
MessageBox.Show("Sayı 5'e eşittir");
}
else
{
MessageBox.Show("Sayı 5'e eşit değildir");
}</pre>

**<span style="text-decoration: underline;"><span style="color: #ff0000;">Veya |  -  Koşullu Veya ||</span></span>**  
İkisi de aynı anlama geliyor. İkisini de aynı amaçla kullanabiliriz. Fakat Veya(|) yazılan bütün karşılaştırmaları kontrol eder . Koşullu Veya(||) ise ilk doğru koşulda diğer koşullara bakmaya gerek olmadığı için hemen alt satıra geçer. Yani performans açısından Koşullu Veya(||) kullanılmalıdır.

**<span style="text-decoration: underline;"><span style="color: #ff0000;">Ve & &#8211; Koşullu Ve &&</span></span>**  
İkisi de aynı anlama geliyor. İkisini de aynı amaçla kullanabiliriz. Fakat Ve(&) yazılan bütün karşılaştırmaları kontrol eder . Koşullu Ve(&&) ise ilk yanlış koşulda diğer koşullara bakmaya gerek olmadığı için hemen else kısmına geçer. Yani performans açısından Koşullu Ve(&&) kullanılmalıdır.

**<span style="text-decoration: underline;"><span style="color: #ff0000;">Atama Operatörü =    Karşılatırma Operatörü Eşittir ==</span></span>**  
tek eşittir işareti (=) ile atama işlemlerini yapıyorken, iki eşittir işareti (eşit eşittir ==) ile karşılaştırma yapıyoruz. İf koşulu içinde  karşılaştırma yaptığımız için == kullanılır.

<span style="color: #c0c0c0;">.</span>

**ÖRNEK:**

textbox&#8217;a yazdığımız isim eğer Emrah Yumuk ise mesaj kutusunda &#8220;Hoşgeldiniz Sayın Emrah Yumuk&#8221;, eğer değilse &#8220;Kim olduğunuzu hatırlayamadım&#8221; yazsın.

<pre>string AdSoyad;

AdSoyad = textBox1.Text;

 if (AdSoyad == "Emrah Yumuk")
{
     MessageBox.Show("Hoşgeldiniz Sayın Emrah Yumuk");
}
else
{
     MessageBox.Show("Kim olduğunuzu hatırlayamadım");
}</pre>

<span style="color: #c0c0c0;">.</span>

Eğer birden fazla koşul varsa o zaman &#8220;else if&#8221; kullanılır.

<pre>if (Kosul1)
{
//Birinci koşulun yapılacak işler listesi
}
else if (Kosul2)
{
//ikinci koşulun yapılacak işler listesi
}
else if (Kosul3)
{
//üçüncü koşulun yapılacak işler listesi
}
else
{
//Diğer durumlar için yapılacak işler listesi
}</pre>

Kosul1 doğru olması durumunda if kısmındaki yapılacaklar listesi işletilir. else if ve else kısımlarına girilmeden program akışına devam eder. Kosul1 yanlışsa Kosul2&#8242;yi kontrol eder. Kosul2 doğrusuysa ikinci koşulun yapılacak işler listesini yapar. diğer else if koşuluna bakılmaz, program diğer else if ve else kısmına girmeden devam eder.