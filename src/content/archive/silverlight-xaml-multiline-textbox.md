---
title: "Silverlight XAML MultiLine TextBox"
date: 2012-05-28T21:00:00.000Z
permalink: "silverlight-xaml-multiline-textbox"
categories: ["Programlama"]
tags: ["AcceptsReturn","HorizantalScrollBarVisibility","multiline textbox","silverlight","text wrapping","TextWrapping","VerticalScrollBarVisibility","xaml"]
---
Silverlight&#8217;ta textbox&#8217;ın nasıl multiline hale getiriyoruz, AcceptsReturn ve Text Wrapping özelliği nedir, Textbox&#8217;a scrolling özelliği nasıl eklenir ve C#&#8217;ta bu multiline textbox&#8217;taki her satırı string array olarak nasıl alıyoruz, bu yazımda bunları göreceğiz.

<!--more-->

&nbsp;

İlk önce silverlight xaml sayfamıza bir textbox ekleyelim ve istediğimiz boyuta getirelim.

<code lang="html">&lt;TextBox Height="350" Width="200" HorizontalAlignment="Left" Margin="220,60,0,0" Name="textBox1" VerticalAlignment="Top" /&gt;</code>

Multiline için iki önemli özellik **AcceptsReturn** ve **TextWrapping**.

**AcceptsReturn** özelliğini **True** yaptığımızda artık textbox içinde enter&#8217;a basarak alt satıra inebiliriz ve dışardan çok satırlı bi veri kopyaladığımızda çok satırlı halde yapıştırabiliriz.

<code lang="html">&lt;TextBox Height="350" Width="200" HorizontalAlignment="Left" Margin="220,60,0,0" Name="textBox1" VerticalAlignment="Top" &lt;span style="color: #0000ff;">&lt;strong>AcceptsReturn="True"&lt;/strong>&lt;/span> /&gt;</code>

**TextWrapping** özelliğini **Wrap** yaptığımızda ise textbox&#8217;a uzun bir satır girildiğinde devamını alt satıra atar. Böylece multiline textbox içinde bütün girilenler görülmüş olur.

<code lang="html">&lt;TextBox Height="350" Width="200" HorizontalAlignment="Left" Margin="220,60,0,0" Name="textBox1" VerticalAlignment="Top" AcceptsReturn="True" &lt;span style="color: #0000ff;">&lt;strong>TextWrapping="Wrap"&lt;/strong>&lt;/span>/&gt;</code>

Oluşturmuş olduğumuz bu multiline textbox&#8217;a scroll eklemek için **HorizantalScrollBarVisibility** ve **VerticalScrollBarVisibility** özelliklerini kullanmalıyız.

Dikey olarak scroll bar eklemek istersek **VerticalScrollBarVisibility  **özelliğini **Auto** yapabiliriz. Böylece multiline textbox&#8217;ın uzunluğundan daha fazla satırda data girildiğinde sol tarafta otomatik olarak scroll bar çıkacaktır.

<code lang="html">&lt;TextBox Height="350" Width="200" HorizontalAlignment="Left" Margin="220,60,0,0" Name="textBox1" VerticalAlignment="Top" AcceptsReturn="True" &lt;span style="color: #0000ff;">&lt;strong>VerticalScrollBarVisibility="Auto"&lt;/strong>&lt;/span> /&gt;</code>

Listeleme için multiline textbox&#8217;ı kullanacağımız zaman TextWrapping özelliğini kullanmak yerine alt kısımda scroll çıkmasını isteyebiliriz. Bu durumda TextWrapping özelliğini kaldırıp **HorizantalScrollBarVisibility  **özelliğini **Auto** yapmalıyız. Böylece textbox&#8217;ın genişliğinden daha uzun bir satır girildiğinde otomatik olarak altta scroll bar çıkacaktır.

<code lang="html">&lt;TextBox Height="350" Width="200" HorizontalAlignment="Left" Margin="220,60,0,0" Name="textBox1" VerticalAlignment="Top" AcceptsReturn="True" VerticalScrollBarVisibility="Auto" &lt;span style="color: #0000ff;">&lt;strong>HorizontalScrollBarVisibility="Auto"&lt;/strong>&lt;/span> /&gt;</code>

<img class="alignnone" title="silverlight xaml multiline textbox" src="http://www.emrahyumuk.com/images/blog/xaml-multiline-textbox.png" alt="silverlight xaml multiline textbox" width="317" height="404" />

Bu şekilde girilen bir listeyi Code Behind &#8216;ta string array&#8217;e şu şekilde çeviriyoruz.

<code lang="csharp">string[] Liste = textbox1.Text.Split(Environment.NewLine.ToCharArray());</code>

&nbsp;

&nbsp;

&nbsp;