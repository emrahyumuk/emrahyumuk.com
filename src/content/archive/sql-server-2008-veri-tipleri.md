---
title: "Sql Server 2008 Veri Tipleri"
date: 2012-01-22T22:00:00.000Z
permalink: "sql-server-2008-veri-tipleri"
categories: ["Programlama"]
tags: ["bigint","binary","bit","char","cursor","data types","date","DateTime","datetime2","datetimeoffset","decimal","float","hierarchyid","image","int","microsoft sql server","money","mssql","nchar","ntext","numeric","nvarchar","real","smalldatetime","smallint","smallmoney","sql server","sql server 2008","Sql Server 2008'de olup da Sql Server 2005'te yer almayan veri tipleri","sql_variant","table","text","time","timestamp","tinyint","uniqueidentifier","varbinary","varchar","veri tipleri","veritabanı","xml"]
---
Kod yazarken ve veritabanı oluştururken veri tiplerinin seçimi çok önemlidir. İhtiyacımızı karşılayan en uygun tipi seçmemiz hem performans hem de kullanılan alan açısından önemlidir.

Daha önce C# için kullanabileceğimiz veri tiplerini **[burada][1]** açıklamıştım. Şimdi de Sql Server 2008 de yer alan veri tiplerini ayrıntılı olarak inceleyeceğiz.

<span style="color: #0000ff;">Kesin Sayısal Veri Tipleri (Exact numerics):</span> bigint, bit, decimal, int, money, numeric, smallint, smallmoney, tinyint  
<span style="color: #0000ff;">Yaklaşık Sayısal Veri Tipleri (Approximate Numerics):</span> float, real  
<span style="color: #0000ff;">Tarih ve Zaman Veri Tipleri (Date and Time):</span> date, datetime, datetime2, datetimeoffset, smalldatetime, time  
<span style="color: #0000ff;">Karakter Veri Tipleri (Character Strings):</span> char, varchar, text  
<span style="color: #0000ff;">Unicode Karakter Veri Tipleri (Unicode Character Strings):</span> nchar, nvarchar, ntext  
<span style="color: #0000ff;">Binary Veri Tipleri (Binary Strings):</span> binary, varbinary, image  
<span style="color: #0000ff;">Diğer Veri Tipleri (Other Data Types):</span> cursor, hierarchyid, sql_variant, table, timestamp, uniqueidentifier, xml

<!--more-->

##### <span style="color: #800000;"><strong>1. Kesin Sayısal Veri Tipleri (Exact numerics)</strong></span>

<span style="text-decoration: underline; color: #800080;"><strong>bit:</strong></span> 1 bayt yer kaplar. 1 ve 0 değerlerini alır. C#&#8217;ta bool&#8217;a karşılık gelir. true/false değerlerini bu tipte saklayabiliriz.

<span style="text-decoration: underline; color: #800080;"><strong>tinyint:</strong></span> 1 bayt yer kaplar. 0 ile 255 arası tam sayıları tutar. C#&#8217;ta byte tipine karşılık gelir.

<span style="text-decoration: underline;"><span style="color: #800080;"><strong>smallint:</strong></span></span> 2 bayt yer kaplar. -32.768 ile 32.767 arası tam sayıları tutar. C#&#8217;ta short tipine karşılık gelir.

<span style="text-decoration: underline; color: #800080;"><strong>int:</strong></span> 4 bayt yer kaplar. -2.147.483.648 ile 2.147.483.647 arası tam sayıları tutar. C#&#8217;ta da int tipine karşılık gelir.

<span style="text-decoration: underline; color: #800080;"><strong>bigint:</strong></span> 8 bayt yer kaplar. -9.223.372.036.854.775.808 ile 9.223.372.036.854.775.807 arası tam sayıları tutar. C#&#8217;ta long tipine karşılık gelir.

<span style="text-decoration: underline; color: #800080;"><strong>smallmoney:</strong></span> 4 bayt yer kaplar. -214.748,3648 ile 214.748,3647 arası ondalık sayıları tutar. Virgülden sonra 4 basamak alır. Parasal verileri smallmoney veri tipinde saklayabiliriz. C#&#8217;ta direkt karşılığı yoktur, decimal kullanılır.

<span style="text-decoration: underline; color: #800080;"><strong>money:</strong></span> 8 bayt yer kaplar. kaplar. -922.337.203.685.477,5808 ile 922.337.203.685.477,5807 arası ondalık sayıları tutar. Virgülden sonra 4 basamak alır. Parasal verileri money veri tipinde saklayabiliriz. C#&#8217;ta direkt karşılığı yoktur, decimal kullanılır.

<span style="text-decoration: underline;"><span style="color: #800080; text-decoration: underline;"><strong>decimal ve numeric:</strong></span></span> kapladığı alan kullanılan basamak sayısına göre değişir. virgülden önce ve sonra toplam basamak sayısı 1-9 arası 5 bayt; 10-19 arası 9 bayt; 20-28 arası 13 bayt; 29-38 arası 17 bayt yer kaplar. &#8211; 10^38 +1 den 10^38 &#8211; 1 e kadar olan ondalık sayıları tutar. numeric ile decimal birebir aynı veri tipidir. C#&#8217;ta decimal tipine karşılık gelirler.

##### **<span style="color: #800000;">2. Yaklaşık Sayısal Veri Tipleri (Approximate Numerics)</span>**

<span style="text-decoration: underline; color: #800080;"><strong>float:</strong></span> kullanılmak istenen boyuta göre ortalama değer alır. **float(n)** şeklinde kullanılır. mesela virgülden sonra 20 bitlik bir alan kullanılmasını istiyoruz. o zaman float(20) olarak yazılır ve verdiğimiz bu boyuta göre kaydetmek istediğimiz sayı yuvarlanır. kesin değer değil de yaklaşık değer kaydedilmiş olur. n kısmı 1 ile 53 arasında olmalıdır. C#&#8217;ta double tipine karşılık gelir.

<span style="text-decoration: underline; color: #800080;"><strong>real:</strong></span> float(24) ile aynı özelliktedir. 4 bayt yer kaplar. &#8211; 3.40E+38 ile -1.18E-38, 0 ve 1.18E-38 ile 3.40E+38 arası ondalık sayıları tutar. C#&#8217;ta Single tipine karşılık gelir.

##### **<span style="color: #800000;">3. Tarih ve Zaman Veri Tipleri (Date and Time)</span>**

<span style="text-decoration: underline; color: #800080;"><strong>date:</strong></span> YYYY-MM-DD şeklinde tarihi tutar. 3 bayt yer kaplar. 0001-01-01 ile 9999-12-31 arası tarih değerlerini saklar.

<span style="text-decoration: underline; color: #800080;"><strong>datetime:</strong></span> YYYY-MM-DD hh:mm:ss[.mmm] şeklinde tarihi tutar (2011-01-21 12:35:29.123 gibi). 8 bayt yer kaplar. 1753-01-01 00:00:00.000 ile 9999-12-31 23:59:59.999 arası tarih değerlerini saklar.

<span style="text-decoration: underline; color: #800080;"><strong>datetime2:</strong></span> datetime göre daha hassas şekilde YYYY-MM-DD hh:mm:ss[.nnnnnnn] tarih tutar (2011-01-21 12:35:29.1234567 gibi). saniye bölümünün ondalık kısmında 7 basamağa kadar değer tutabilir. Bu değer sadece datetime2 olarak kullanıldığında varsayılan olarak 7 basamaktır. **datetime(n)** şeklinde kullanarak basamak değerini belirleyebiliriz. eğer n değeri 0 ile 2 arasında ise 6 bayt; 3 veya 4 ise 7 bayt; 5 ile 7 arasında ise 8 bayt yer kaplar.

<span style="text-decoration: underline; color: #800080;"><strong>smalldatetime:</strong></span> YYYY-MM-DD hh:mm:ss şeklinde tarih tutar. 4 bayt yer kaplar. 1900-01-01 00:00:00 ile 2079-06-06 23:59:59 arası tarih değerlerini saklar.

<span style="text-decoration: underline; color: #800080;"><strong>time:</strong></span> sadece saati hh:mm:ss[.nnnnnnn] şeklinde tutar. 00:00:00.0000000 ile 23:59:59.9999999 arası değer alır. datetime2&#8242;de olduğu gibi** time(n)** şeklinde n değerini belirleyebiliyoruz. n değeri 0 ile 2 arasında ise 3 bayt; 3 veya 4 ise 4 bayt; 5 ile 7 arasında ise 5 bayt yer kaplar. sadece time olarak kullanılırsak varsayılan n değeri 7&#8242;dir.

<span style="text-decoration: underline; color: #800080;"><strong>datetimeoffset:</strong></span> kullanımı ve tarih aralığı datetime2 ile aynıdır. Ülkelere göre değişen zaman farkını da tutmamıza olanak sağlar. YYYY-MM-DD hh:mm:ss\[. nnnnnnn\] \[{+|-}hh:mm\] şeklinde tarihi tutar (22.01.2012 02:07:23.1234567 +03:00). Saat farkı -14:00 ile +14:00 arasında değer alır. Yaptığımız uygulamada farklı ülkelerin tarih ve saat bilgilerini tutuyorsak bu veri tipini kullanabiliriz. datetimeoffset(n) şeklinde kullanılır.  n değeri 0 ile 2 arasında ise 8 bayt; 3 veya 4 ise 9 bayt; 5 ile 7 arasında ise 10 bayt yer kaplar. sadece datetimeoffset olarak kullanılırsak varsayılan n değeri 7&#8242;dir.

##### **<span style="color: #800000;">4. Karakter Veri Tipleri (Character Strings)</span>**

<span style="text-decoration: underline; color: #800080;"><strong>char:</strong></span> sabit uzunlukta karakter dizilerini tutar. **char(n)** şeklinde kullanılır. n karakter sayısıdır ve 1 ile 8000 arasında değer alır. belirlediğimiz n değerinden daha kısa uzunlukta olan veriler boşluk ile belirlediğimiz bu n değerine tamamlanır. ve bu n değerine göre (n x 1 bayt) yer kaplarlar.

<span style="text-decoration: underline; color: #800080;"><strong>varchar:</strong></span> sabit uzunlukta karakter dizilerini tutar. **varchar(n)** şeklinde kullanılır. n karakter sayısıdır ve 1 ile 8000 arasında değer alır. belirlediğimiz n değeri alabileceği maksimum karakter sayısıdır. Karakter sayısı daha kısa veri girersek char gibi boşlukla tamamlanmaz. Kaç karakter veri girilirse boyutu ona göre değişir. ((kaydedilenVerininKarakterSayisi x 1 bayt) + 2 bayt) olarak yer kaplar. **varchar(MAX)** şeklinde kullanırsak maksimum 8000 karakter değil de maksimum **2,147,483,647** karakter veri girilebilir.

<span style="text-decoration: underline; color: #800080;"><strong>text:</strong></span> varchar(max) ile aynı özelliktedir. maksimum 2,147,483,647 karakter veri girilebilir. microsoft bu veri tipini gelecek versiyonlarda kaldıracağı için kullanılması önerilmez. yerine **varchar(MAX)** kullanabilirsiniz.

**Not:** Eğer oluşturmuş olduğumuz veritabanın dil seçeneği (collation) türkçe (Turkish\_Cl\_AS gibi) ise unicode olmayan bu veri tiplerinde (char,varchar) de türkçe karakter saklayabiliriz. Fakat dil seçeneği farklıysa türkçe karakter gönderdiğimizde seçtiğimiz dil seçeneğine göre türkçe karakter kaydedilmeyebilir. (ı&#8217;lar i; ş&#8217;ler s&#8217;ye çevrilebilir). Böyle durumlarda ya veritabanı özelliklerinden dil seçeneğini (collation)&#8217;ı türkçeye çevirmeliyiz ya da unicode karakter veri tiplerini(nchar,nvarchar) kullanmalıyız.

##### <span style="color: #800000;"><strong>5. Unicode Karakter Veri Tipleri</strong></span>

<span style="text-decoration: underline; color: #800080;"><strong>nchar:</strong></span> char ile kullanımı aynıdır. char&#8217;dan farklı olarak unicode karakterleri de saklayabilir. nchar(n) şeklinde kullanılır ve n değeri 1 ile 4000 arasındadır. char&#8217;ın iki katı kadar (n x 2 bayt) yer kaplar.

<span style="text-decoration: underline; color: #800080;"><strong>nvarchar:</strong></span> varchar ile kullanımı aynıdır. varchar&#8217;dan farklı olarak unicode karakterleri de saklayabilir. nvarchar(n) şeklinde kullanılır ve n değeri 1 ile 4000 arasındadır. varchar&#8217;ın iki katı kadar ((kaydedilenVerininKarakterSayisi x 2 bayt) + 2 bayt) olarak yer kaplar.

<span style="text-decoration: underline; color: #800080;"><strong>ntext:</strong></span> nvarchar(max) ile aynı özelliktedir. maksimum 1,073,741,823 karakter veri girilebilir. microsoft bu veri tipini gelecek versiyonlarda kaldıracağı için kullanılması önerilmez. yerine **nvarchar(MAX)** kullanabilirsiniz.

**Not:** Eğer veritabanımızdaki kayıtlarda birden fazla dil kullanılacaksa veya veritabanının dil seçeneğinden (collation) farklı bir dil ile kayıt yapılacaksa unicode karakter veri tipleri kullanılmalıdır.

##### **<span style="color: #800000;">6. Binary Veri Tipleri (Binary Strings)</span>**

<span style="text-decoration: underline; color: #800080;"><strong>binary:</strong></span> dosyaları(binary data) saklamak için kulanılır. binary(n) şeklinde n değeri 1 ile 8000 arasında değer alır. n bayt kadar yer kaplar.

<span style="text-decoration: underline; color: #800080;"><strong>varbinary:</strong></span> dosyaları(binary data) saklamak için kullanılır. binary&#8217;den farklı olarak boyutu kaydedilen dosyanın boyutuna göre değişir. varbinary(n) şeklinde n değeri 1 ile 8000 arasında değer alır. varbinary(MAX) olarak kullanıldığında maksimum 2,147,483,647 bayt (2 GB) büyüklüğünde dosya kaydedilebilir.

<span style="text-decoration: underline; color: #800080;"><strong>image:</strong></span> dosyaları(binary data) saklamak için kullanılır. maksimum 2,147,483,647 bayt (2 GB) büyüklüğünde dosya saklayabilir. microsoft, sql server&#8217;ın gelecek versiyonlarında image veri tipini kaldırmayı düşündüğü için yerine varbinary(MAX) kullanabilirsiniz.

##### **<span style="color: #800000;">7. Diğer Veri Tipleri (Other Data Types)</span>**

<span style="text-decoration: underline; color: #800080;"><strong>uniqueidentifier:</strong></span> 6F9619FF-8B86-D011-B42D-00C04FC964FF gibi bir GUID tipindeki verileri tutar. C#&#8217;taki karşılığı GUid&#8217;tir. Guid, harf ve sayılardan oluşan eşsiz bir datadır. İki Guid&#8217;in birbiri ile eşit olmayacağı garantidir.

<span style="text-decoration: underline; color: #800080;"><strong>timestamp:</strong></span> girilen kaydın (satırın) versiyon numarası gibidir (0x00000000000007D3). her satırda değişir ve satır güncellendiğinde de değişir. Tabloda sadece bir alan timestamp olabilir. tarih ve saat tutmak için kullanılmaz.

<span style="text-decoration: underline; color: #800080;"><strong>xml:</strong></span> <ROOT><a>111</a></ROOT> şeklinde xml dataları saklar ve tablo ve satırlarda sorgu yapmadan, query() metoduyla, kaydettiğimiz xml&#8217;in içindeki datalara ulaşabiliriz.

<span style="text-decoration: underline; color: #800080;"><strong>sql_variant:</strong></span> farklı veri tiplerindeki değişkenleri kaydedebileceğimiz bir alan sağlar. maksimum boyutu 8016 bayt&#8217;tır. varchar(MAX), nvarchar(MAX), varbinary(MAX), text, ntext, image, timestamp, sql_variant, hierarchyid, geography, geometry ve kullanıcı tarafından oluşturulan veri tipleri haricinde diğer bütün veri tiplerini saklayabilir.

<span style="color: #c0c0c0;">.</span>

<span style="text-decoration: underline;"><strong>Sql Server 2008&#8242;de olup da Sql Server 2005&#8242;te yer almayan veri tipleri:</strong></span>  
date  
time  
datetime2  
datetimeoffset  
hierarchyid

<span style="color: #c0c0c0;">.</span>

Daha ayrıntılı bilgi için:  
[http://msdn.microsoft.com/en-us/library/ms187752(v=sql.100).aspx  
][2]<http://msdn.microsoft.com/en-us/library/ms131092.aspx>

<span style="color: #c0c0c0;">.</span>

 [1]: http://www.emrahyumuk.com/c-sharp-veri-tipleri-degisken-tanimlama/
 [2]: http://msdn.microsoft.com/en-us/library/ms187752(v=sql.100).aspx