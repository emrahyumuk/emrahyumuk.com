---
title: "C#’ ta For Döngüsü"
date: 2011-01-17T22:00:00.000Z
permalink: "c-sharp-for-dongusu"
categories: ["Programlama"]
tags: ["atama operatörleri","C Sharp","C sharp dersleri","C#","c#.net","combobox","combobox yıl sıralama","for döngüsü","programlama","Visual Studio","yazılım"]
---
For döngüsü ile bir olayın kaç kez gerçekleşeceğini ifade ederiz . For döngüsünde döngü şartlarını üç ifade ile belirleriz. ilk ifade de başlangıç değeri, ikinci döngü koşulu, üçüncü de ise artış miktarını yazarak for döngüsünü oluştururuz.

<pre>for(Başlangıç; Koşul; Artış)
{
     //koşul doğru olduğu sürece yapılacaklar
}</pre>

<!--more-->

  
Başlangıç kısmında bir değişken tanımlayıp başlangıç değerine eşitliyoruz. Koşul kısmında for döngüsünün içine girme koşulunu yazıyoruz. Artış kısmına ise başlangıç kısmında tanımladığımız değişkenin kaçar kaçar artacağını belirliyoruz.

Mesela 1&#8242;den 100&#8242;e kadar olan sayıların toplamını yapan bir for döngüsü yazalım

<pre>int Toplam = 0;

for (int i = 1; i &lt;= 100; i++)
{
      Toplam += i;
}</pre>

Başlangıç kısmında int tipinde, i isminde bir değişken tanımlıyoruz. Koşul kısmında i değişkeni 100 den küçük veya eşit olduğu sürece for döngüsünü çalıştıracağımızı belirtiyoruz. Ve artış kısmında i değişkenimizin değerini her döngüde 1 arttıracağımızı belirtiyoruz. for döngüsü her döndüğünde 1 artan i değişkenini Toplam değişkenin son değeri ile topluyor. i değişkeni 1'den 100'e kadar bütün sayıları alıp da döngüye girdiği için Toplam değişkeni en son 1'den 100'e kadar olan sayıların toplamına eşitleniyor.

for döngüsünde i++; Toplam+=i ifadelerinde olduğu gibi atama operatörlerini sıklıkla kullanırız.

<table style="border-color: #c4c1bf; border-width: 1px;" border="1">
  <tr>
    <td>
      <strong>i++;<br /> i+=1;<br /> i=i+1;</strong>
    </td>
    
    <td>
      i'nin değerini 1 artıyor
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>i- -;<br /> i-=1;<br /> i=i-1;</strong>
    </td>
    
    <td>
      i'nin değerini 1 azaltıyor
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Toplam=Toplam+i;<br /> Toplam+=i;</strong>
    </td>
    
    <td>
      Toplam değerine i değişkeninin değerini ekliyor.
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Sayi=Sayi+5;<br /> Sayi+=5;</strong>
    </td>
    
    <td>
      Sayi değişkenine 5 ekliyor.
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Sayi=Sayi-5;<br /> Sayi-=5;</strong>
    </td>
    
    <td>
      Sayi değişkenini 5 azaltıyor
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Sayi=Sayi*5;<br /> Sayi*=5</strong>
    </td>
    
    <td>
      Sayi değişkenini 5 ile çarpıyor
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Sayi=Sayi/5;<br /> Sayi/=5;</strong>
    </td>
    
    <td>
      Sayi değikenini 5'e bölüyor
    </td>
  </tr>
</table>

tabloda gördüğümüz bütün işlemlerde sonuçlar tekrar aynı değişkene atanır. yani Sayi değişkeninin değeri 20 ise Sayi/=5; yazdığımızda Sayi değişkenini 5'e böleriz ve sonuç 4 olur. Böylece Sayi değişkeninin son değeri artık 4'tür.

<span style="color: #c0c0c0;">.</span>

**ÖRNEK:**

1920'den 2011'e kadar olan yılların ComboBox'a yazılması:

<pre>for (int yil = 1920; yil &lt;= 2011; yil++)
{
       comboBox1.Items.Add(yil);
}</pre>

<img class="alignnone" title="combobox yil sıralama" src="http://www.emrahyumuk.com/images/blog/combobox.jpg" alt="combo box yıllar" width="363" height="513" />