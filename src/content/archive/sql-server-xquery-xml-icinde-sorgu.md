---
title: "Sql Server XQuery – XML İçinde Sorgu"
date: 2012-09-20T21:00:00.000Z
permalink: "sql-server-xquery-xml-icinde-sorgu"
categories: ["Programlama"]
tags: ["sql server","sql server xml","xml","xquery"]
---
Sql server&#8217;da tablo kolonunda xml saklayabiliyoruz. Bu xml tipindeki kolonlarda verileri xquery ile sorgulayabiliyoruz.

<!--more-->

<img class="alignnone" src="http://www.emrahyumuk.com/images/blog/xmlTempTable.jpg" alt="xml xquery table" width="343" height="83" />

Mesela sql server&#8217;da **TempTable** isimli tablomuzun içinde **XmlFile** kolonunda aşağıdaki xml verisi tutuluyor olsun.

<pre>&lt;Kategori&gt;
      &lt;KategoriID&gt;1&lt;/KategoriID&gt;
      &lt;KategoriAdi&gt;Bilgisayar&lt;/KategoriAdi&gt;
   &lt;/Kategori&gt;</pre>

&nbsp;

her satırdaki xmlde o satıra ait kategori bilgileri tutuluyor. Şimdi her satır için kategori adını getiren sorguyu yazalım

<pre> 
SELECT XmlFile.query('Kategori/KategoriAdi').value('(/KategoriAdi)[1]','varchar(200)')  FROM TempTable</pre>

**(/KategoriAdi)[1]** ile xmldeki ilk kategoriAdı bilgisini getirmesini sağlıyoruz. 2 tane KategoriAdi olsa ikincisini getirmek için **(/KategoriAdi)[2]** olarak kullanmamız gerekecekti.

Aynı sorguyu şu şekilde de yazabiliriz

<pre> 
SELECT XmlFile.query('Kategori/KategoriAdi').value('.','varchar(200)')  FROM TempTable</pre>

Fakat xml&#8217;de birden fazla KategoriAdi verisi olsaydı, bu şekilde yazsaydık o satıra ait bütün kategori adlarını yan yana yazarak sonuç dönecekti. BilgisayarTelefonElektronik gibi. Şu an tek kategori adı olduğu için sonuç yukarıdaki sorgu ile aynı olacaktır.