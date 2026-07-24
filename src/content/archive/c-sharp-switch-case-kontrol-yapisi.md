---
title: "C#’ ta Switch-Case Kontrol Yapısı"
date: 2011-01-17T22:00:00.000Z
permalink: "c-sharp-switch-case-kontrol-yapisi"
categories: ["Programlama"]
tags: ["C Sharp","C sharp dersleri","C#","c#.net","kontrol yapıları","programlama","switch case","Visual Studio","yazılım"]
---
if-else yapısında olduğu gibi switch-case de bir karar, kontrol yapısıdır. switch-case ile yaptıklarımızı if-else kullanarak da yapabiliriz. Fakat bazı durumlarda switch-case kullanmamız çok daha pratik olacaktır.

switch-case yapısında tanımladığımız bir değişkenin değeri kontrol edilir.

<!--more-->

<pre>switch (Degisken)
{
    case kosul1:
    //kosul1 icin yapılacaklar
    break;

    case kosul2:
    //kosul2 icin yapılacaklar
    break;
    .
    .
    .
    .
    .
    case kosuln:
    //kosuln icin yapılacaklar
    break

    default:
    //varsayılan yapılacaklar listesi
    //hiçbir koşul gerçekleşmediğinde buradakiler yapılır
    break;
}</pre>

switch-case&#8217;te kosul1, kosul2&#8230; vs. olarak belirttiğimiz yerlere if-else&#8217;te olduğu karşılaştırma operatörleri kullanılmaz. Sadece değişkenin değeri yazılır. Değişken hangi değeri aldığında ne iş yapılacağı belirlenir.

Mesela Ay isimli byte türünde bir değişkenimiz olsun eğer değişkenin değeri 1 ise mesaj kutusu ile Ocak, 2 ise Şubat, 3 ise Mart&#8230; bütün ayları bu şekilde switch-case yapısı içinde yazalım.

<pre>int Ay = 12;
            string AyAdi = "";

            switch (Ay)
            {
                case 1:
                    AyAdi="Ocak";
                    break;
                case 2:
                    AyAdi="Şubat";
                    break;
                case 3:
                    AyAdi="Mart";
                    break;
                case 4:
                    AyAdi="Nisan";
                    break;
                case 5:
                    AyAdi="Mayıs";
                    break;
                case 6:
                    AyAdi="Haziran";
                    break;
                case 7:
                    AyAdi="Temmuz";
                    break;
                case 8:
                    AyAdi="Ağustos";
                    break;
                case 9:
                    AyAdi="Eylül";
                    break;
                case 10:
                    AyAdi="Ekim";
                    break;
                case 11:
                    AyAdi="Kasım";
                    break;
                case 12:
                    AyAdi="Aralık";
                    break;
                default:
                    AyAdi = "TANIMSIZ";
                    break;
            }

            MessageBox.Show(AyAdi);
        }</pre>

Ay değişkeninin değerini 12 olarak belirlediğimiz için ekrana mesaj kutusu ile Aralık yazısı çıkacaktır.