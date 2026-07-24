---
title: "C#’ ta Döngüler (for-foreach-do-while)"
date: 2011-01-21T22:00:00.000Z
permalink: "c-sharp-donguler-for-foreach-do-while"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","C#","c# döngüler","c# örnekler","c#.net","do while döngüsü","döngüler","for döngüsü","foreach döngüsü","programlama","while döngüsü"]
---
Daha önce for döngüsünü **<a href="http://www.emrahyumuk.com/c-sharp-for-dongusu/" target="_blank">burada</a>** anlatmıştım. Şimdi is foreach, while, do-while döngülerini göreceğiz ve for döngüsü ile bu döngüleri karşılaştıracağız.

<!--more-->

<span style="color: #c0c0c0;">.</span>

**<span style="color: #800000;">FOREACH DÖNGÜSÜ</span>**

For döngüsüne benzeyen foreach döngüsü, tanımlamış olduğumuz dizinin elamanlarına daha kolay erişebilmemizi sağlıyor. foreach yerine for döngüsü ile de aynı işlemi yaptırabiliriz.

<pre>foreach (VeriTipi DegiskenAdi in DiziAdi)
{

}</pre>

Dizideki elemanlara her döngüde sırayla erişiyor. ve her seferinde DegiskenAdi yazan yerde tanımlamış olduğumuz değişkene atıyor.

<pre>int[] dogalSayilar= {10, 21, 35, 67, 78};

foreach (int sayi in dogalSayilar)
{
      MessageBox.Show(sayi.ToString());

}</pre>

dogalSayilar dizisinin içindeki her bir değeri sayi isimli değişkene atar. süslü parantezler içine sayi+=1; yazamayız. foreach içinde değer ataması yapamayız, sadece değerleri okuyabiliriz.

aynı programı for döngüsü kullanarak yazarsak;

<pre>int[] dogalSayilar= {10, 21, 35, 67, 78};

for (int i = 0; i &lt; dogalSayilar.Lenght; i++)
{
MessageBox.Show(dogalSayilar[i].ToString());
}</pre>

burada da aynı şekilde dogalSayilar dizisindeki her bir elemana erişip mesaj kutusu ile ekranda görülmesini sağlıyoruz.

foreach döngüsünün for döngüsünden farkları;  
*foreach'te dizideki her elemanı sırayla okuruz. for'da istediğimiz aralıklarda okuruz.  
*foreach'te değer ataması yapamayız, sadece okuruz; fakat for'da hem okuyabilir hem de değer ataması yapabiliriz.  
*foreach'ten önce dizi tanımlamamız gerekir, for'u dizi tanımlamadan da kullanabiliriz.

<span style="color: #c0c0c0;">.</span>

**<span style="color: #800000;">WHILE DÖNGÜSÜ</span>**

sadece koşula bağlı bir döngü olan while döngüsünü for döngüsü yerine kullanabiliriz.

<pre>while (Koşul)
{
   // Koşul sağlandığı sürece yapılacaklar
}</pre>

koşul doğru olduğu sürece while döngüsü devam eder.

<pre>int Sayi = 5;

while (Sayi &lt; 50)
{
      Sayi*=2 ;
}</pre>

Sayi değişkeninin ilk değeri 5'tir. while döngüsüne geldiğinde 5<100 doğru olduğundan döngüye girer. ilk döngü sonunda değeri 10 olur. tekrar döngüye girer. ikinci döngü sonunda değeri 20 olur. hala 50'den küçük olduğu için yani koşulumuzu sağladığı için döngüye girmeye devam eder. üçüncü döngü sonunda 40 değerini alır. dördüncü döngüye de girer ve son değeri 80 olur. Sayi değişkeninin son değeri 50'den küçük olmadığı için bir daha döngüye girmez.

Daha önce 1'den 100'e kadar olan sayıların toplamını for döngüsü ile yapmıştık, şimdi de while döngüsü ile yapalım.

<pre>int Toplam = 0;
int Sayi = 0;

while (Sayi &lt;= 100)
{
     Toplam += Sayi;
     Sayi++;
}</pre>

for döngüsünde ise 1'den 100'e kadar olan sayıların toplamını şu şekilde yapmıştık.

<pre>int Toplam = 0;

for (int i = 1; i &lt;= 100; i++)
{
      Toplam += i;
}</pre>

while döngüsünde sadece koşul ifadesi kullandığımız için artış miktarını döngünün içinde arttırılacak değişkeni ise döngü öncesinde tanımlıyoruz.

<span style="color: #c0c0c0;">.</span>

**<span style="color: #800000;">DO-WHILE DÖNGÜSÜ</span>**

do-while döngüsünün diğer döngülerden farkı ilk önce işlem yapıp sonra koşulu kontrol etmesidir.

<pre>do
{
   // Yapılacaklar

} while (Koşul);</pre>

Koşul yanlış olsa bile en az bir kez de olsa döngüye girilir.

<pre>int Sayi = 500;

do
{
       Sayi *= 2;

} while (Sayi &lt; 100);</pre>

Sayi değişkeninin değeri koşulu sağlamıyor. Çünkü 100'den büyük. Fakat buna rağmen döngü içine girer, Sayi değişkenin değeri 1000 olur ve koşul ifadesinde kontrol edilir, 100'den büyük olduğu için bir daha döngüye girmez. Sayi değişkenin son değeri artık 1000'dir.

dikkat edilmesi gereken hususlardan biri de diğer döngülerden farklı olarak while satırı sonunda noktalı virgül koyuyoruz.

<span style="color: #c0c0c0;">.</span>