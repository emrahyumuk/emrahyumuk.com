---
title: "C# Kod Çalışma (İşlem) Süresi"
date: 2012-01-04T22:00:00.000Z
permalink: "c-sharp-kod-calisma-islem-suresi"
categories: ["Programlama"]
tags: ["C Sharp","kod çalışma süresi","kod işlem süresi","Stopwatch","System.Diagnostics"]
---
Yazmış olduğumuz kod bloğunun çalışma süresini **Stopwatch** sınıfı ile öğrenebiliriz. Mesela bir **for** döngümüz var ve bunun ne kadar zamanda işlem yaptığını öğrenmek istiyoruz.

<!--more-->

<div style="clear:both;">
</div>

<pre>using System.Diagnostics;

public string CalculateTheRunningTime()
{
    Stopwatch sw = new Stopwatch();
    sw.Start();

    int toplam = 0;
    for (int i = 0; i &gt; 100000; i++)
    {
        toplam += i;
    }

    sw.Stop();

    string runningTime = sw.Elapsed.ToString();

    return runningTime;
}</pre>

Bu şekilde **Stopwatch **sınıfını kullanarak aynı işlemi yapan kod bloklarının performanslarını karşılaştırabilirsiniz.