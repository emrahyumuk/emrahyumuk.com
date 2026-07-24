---
title: "Properties Window “No Visual C++ Project Is Loaded” Sorunu ve Çözümü"
date: 2010-12-21T22:00:00.000Z
permalink: "no-visual-c-project-is-loaded-properties-window-sorunu"
categories: ["Programlama"]
tags: ["C#","programlama","visual c#","Visual Studio 2010"]
---
Visual Studio 2010&#8242; u açtığınızda &#8220;Properties Window&#8221; içinde herhangi bir şey görünmüyor ve &#8220;No Visual C++ Project Is Loaded&#8221; yazıyorsa Visual Studio ayarlarınıza reset atmanız gerekmektedir.

[Burada][1] da anlattığm gibi Visual Studio 2010 en üstteki menü çubuğundan **Tools>Import and Export Settings**&#8216; e tıklayın. Açılan pencerede &#8220;**Reset All Setting**&#8221; i seçin ve **Next**&#8216; e tıklayın. Sonraki pencerede tekrar **Next**&#8216;e tıklayın ve en son karşınıza geliştirme yapacağınız ortamı seçebileceğiniz bir pencere çıkacak. Mesela, eğer c# üzerinde çalışıyorsanız &#8220;**Visual C# Development Settings**&#8221; i seçip **Finish**&#8216;e tıklayın.

<!--more-->

Visual Studio, varsayılan ayarları yükleyecek ve ayarlarınız ilk haline dönecektir. Ve sorun ortadan kalkacaktır.

www.emrahyumuk.com

 [1]: http://www.emrahyumuk.com/blog/visual-studio-ilk-ayarlara-geri-donme-reset-settings/