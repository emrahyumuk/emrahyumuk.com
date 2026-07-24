---
title: "C# ile MD5 Şifreleme"
date: 2012-01-04T22:00:00.000Z
permalink: "c-sharp-md5-sifreleme"
categories: ["Programlama"]
tags: ["BitConverter","C Sharp","C#","ComputeHash","Encoding","GetBytes","md5","md5 şifreleme","MD5CryptoServiceProvider"]
---
**MD5CryptoServiceProvider** sınıfını kullanarak **C#**&#8216;ta kolay bir şekilde **MD5 şifreleme** yapabiliriz. String tipindeki bir değeri MD5 şifreleme ile 32 karakterlik bir alfanumerik string haline getiririz. MD5 şifreleme tek taraflı bir şifreleme yöntemidir. Mesela kullanıcı şifreleri veritabanına kaydedilirken MD5 şifrelenir. Kullanıcı şifresini yazıp giriş yaptığında yazdığı şifre de MD5 olarak şifrelenip veritabanındaki  kayıtlı şifre ile karşılaştırılır. Eğer veritabanındaki ile aynı ise kullanıcı girişi gerçekleşir.

<!--more-->

**MD5CryptoServiceProvider** sınıfını kullanabilmemiz için öncelikle kodumuza using olarak **System.Security.Cryptography** namespace&#8217;ini eklemeliyiz.

<pre>using System.Security.Cryptography;
using System.Text;
using System.Diagnostics;

public static string ToMD5(string value)
{
	MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();

	byte[] ba= Encoding.UTF8.GetBytes(value);
	ba= md5.ComputeHash(byteArray); 

	string md5Password = BitConverter.ToString(ba).Replace("-","");

	return md5Password;
}</pre>