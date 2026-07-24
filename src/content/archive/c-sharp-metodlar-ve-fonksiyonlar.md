---
title: "C#’ta Metotlar ve Fonksiyonlar"
date: 2011-01-23T22:00:00.000Z
permalink: "c-sharp-metodlar-ve-fonksiyonlar"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","C#","c# fonksiyonlar","c# metodlar","c# metotlar","c#.net","fonksiyonlar","metodlar","metotlar","programlama","visual c#"]
---
Bazen yazdığımız programda belirli durumlarda aynı işlemi yaptırmak gerekir. Mesela bir butona tıklandığı zaman sadece toplama işlemi yapılacak, başka bir butona tıklandığında toplama işlemi yapılıp bir de bu toplama işleminin sonucu tek mi çift mi ona bakılacak olsun. Bu durumda iki kez toplama işleminin kodlarını yazmamız gerekir. Eğer bir de döngülerle aynı işlemleri tekrarlamak gerektiğinde programımız  daha da uzar ve programın performansı da düşer. Böyle durumlarda metot  (fonksiyon) kullanarak yapacağımız işlemleri oluşturduğumuz metotların içine yazarız ve tekrar kullanacağımız zaman bu metodu çağırırız. (C#&#8217;ta metot ve fonksiyonlar aynı anlamda kullanılır. Burada metot olarak isimlendireceğiz. )  
<!--more-->

**<span style="color: #ff0000;">Değer Döndürmeyen Metot Oluşturma ve Çağırma</span>**

<pre>private void Topla()
{
int x;
x = 5;

int y;
y = 3;

int z = x + y;

}</pre>

Oluşturduğumuz Topla isimli metotta int tipinde Rakam1 ve Rakam2 parametrelerini metot içinde tanımlıyoruz. Bu metodu, başka bir metot veya olay içinde şu şekilde çağırıyoruz;

<pre>Topla();</pre>

Bu metodu çağırdığımızda yapacağı işlem 5 ve 3 toplamak olacaktır. Ama biz sadece 3 ile 5&#8242;i toplamak istemiyoruz. Bir yerde 5 ile 10&#8242;u başka bir yerde 20 ile 25&#8242;i toplamak istiyoruz. O zaman parametrelerimizi aşağıdaki gibi tanımlamalıyız.

<pre>private void Topla(int x, int y)
 {
 int z = x + y;
}</pre>

bu metodu şu şekilde çağırıyoruz.

<pre>Topla(5, 10);  // 5 ile 10'u toplar</pre>

<pre>Topla(20, 25); // 20 ile 25'i toplar</pre>

<span style="color: #c0c0c0;">.</span>  
<span style="color: #ff0000;"><strong><strong>Değer Döndüren Metot </strong>Oluşturma ve Çağırma</strong></span>

En son parametreli metot kullanarak yapmış olduğumuz gibi 20 ile 25&#8242;i toplayacağız ve bu toplamı bir TextBox içine yazacağız. Yani metotta yapmış olduğumuz toplamanın sonucunu textBox1&#8242;in Text&#8217;ine atayacağız. Bunun için değer döndüren metot kullanmalıyız. Metotlar değer döndürmediğinde void ile tanımlanırlar. değer döndürdüklerinde ise döndürdükleri değerin veri tipiyle tanımlanırlar.

<pre>private int Topla(int x, int y)
 {
     int z = x + y;
     return z;

}</pre>

Burada geriye döndürdüğümüz değer toplama işleminin sonucu olan z değişkenidir. z değişkeninin veri tipini int olarak tanımladığımız için Topla isimli metodumuzu da int ile tanımlıyoruz.

Eğer metottaki elde ettiğimiz veriyi veya sonucu, o metot dışında herhangi bir değişkene veya nesneye atayacaksak değer döndüren metot kullanmalıyız. Metodumuz şu şekilde çağırılır ve

<pre>int ToplamaSonucu = Topla (20, 25);</pre>

burada Topla fonksiyonunda toplama sonucu olan geri döndürdüğümüz z değişkeni, ToplamaSonucu isimli değişkene atanıyor. ToplamaSonucu isimli değişkenin değeri 20 ile 25&#8242;in toplamıi yani 55 olur.

textBox1 isimli metin kutusuna da toplama sonucunu şu şekilde yazdırabiliriz

<pre>textBox1.Text = Topla(20, 25).ToString();</pre>

textBox1&#8242;in Text&#8217;i string olduğu için ToString() ile int tipindeki Topla metodu string&#8217;e çeviriyoruz. Metin kutusunda 55 değerini görürüz.

Sonuç olarak değer döndürmeyen metot yazarken void anahtar kelimesi kullanılır. Değer döndüren metotlarda ise void yerine geriye döndürülen değerin veri tipi yazılır (int, byte, short, string, bool vs&#8230;).

<span style="color: #c0c0c0;">.</span>

konuyu daha ayrıntılı incelemek için msdn&#8217;e bakabilirsiniz.  
<http://msdn.microsoft.com/en-us/library/ms173114(v=vs.110).aspx>