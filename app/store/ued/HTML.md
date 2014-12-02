#HTML编码规范
##目录

##通用代码风格
* 每次缩进四个空格，不要使用tab键进行缩进，也不要把tab键以及空格混合起来进行缩进。单纯的使用空格进行缩进就好了.
```html 

<ul>
    <li>Fantastic</li>
    <li>Great</li>
</ul>

```
* 只使用小写，包括标签名、属性名、属性值（一些可以自定义的字符串属性值除外）.
```html
<!-- 不推荐 -->
<A HREF="/">Home</A>

<!-- 推荐 -->
<img src="google.png" alt="Google">

```

##通用Meta规则
* 确保你的IDE使用的是UTF-8编码来保存文件的，在定义页面的编码时使用&lt;meta charset="utf-8"&gt; 就好了。在样式表文件里不用去声明UTF-8编码什么的。

* 在需要地地方进行注释。

* 用 TODO 来标志代码中需要完善的地方
```html

<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>

```

##HTML书写规则

* 文档类型。HTML5的文档类型对所有的html文档都适用：&lt;!doctype html&gt;。另外，最好使用html,而不是xhtml.

* 使用规范化的html，并使用W3C HTML validator之类的工具来进行检测。
```html
<!-- 不规范 -->
<title>Test</title>
<article>This is only a test.

<!-- 规范 -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>

```
* 使用语义化的html标签，根据用途来选择标签。
```html

<!-- 不推荐 -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- 推荐 -->
<a href="recommendations/">All recommendations</a>

```
* 把多媒体元素可知化。像图片、视频、动画等多媒体元素，要有相关的文字来体现其内容，比如<img> 可以使用alt属性来说明图片内容。
```html
<!-- 不推荐 -->
<img src="spreadsheet.png">

<!-- 推荐 -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">

```
* 确保页面的 结构、样式、行为三者相分离。确保文档或模板中只包含html，把用到的样式都写到样式表文件中，把脚本都写到js文件中。这在多人协作时非常重要。
```html
<!-- Not recommended -->
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure:
  <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!</center>
</p>

<!-- Recommended -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
  <br/>It’s awesome!
</p>

```
* 优化标签。有些标签是不需要用到的，能少就少。可以参考下方链接来知道哪些标签是必须的，哪些又是多余的。
http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission
* 省略&lt;style&gt;和&lt;script&gt;的type属性

##HTML代码的格式化

* 为每个块级元素或表格元素标签新起一行，并且对每个子元素进行缩进

```html

<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>
<ul>
  <li>Moe</li>
  <li>Larry</li>
  <li>Curly</li>
</ul>
<table>
  <thead>
    <tr>
      <th scope="col">Income</th>
      <th scope="col">Taxes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>$ 5.00</td>
      <td>$ 4.50</td>
    </tr>
  </tbody>
</table>

```







