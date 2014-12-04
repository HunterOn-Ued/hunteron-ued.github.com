#HTML编码规范
##目录

##通用代码风格

* 每次缩进四个空格，不要使用tab键进行缩进，也不要把tab键以及空格混合起来进行缩进。单纯的使用空格进行缩进就好了.

```html 
&lt;ul>
    &lt;li>Fantastic&lt;/li>
    &lt;li>Great&lt;/li>
&lt;/ul>
```

* 只使用小写，包括标签名、属性名、属性值（一些可以自定义的字符串属性值除外）.

```html
&lt;!-- 不推荐 -->
&lt;A HREF="/">Home&lt;/A>

&lt;!-- 推荐 -->
&lt;img src="google.png" alt="Google">
```

##通用Meta规则

* 确保你的IDE使用的是UTF-8编码来保存文件的，在定义页面的编码时使用&lt;meta charset="utf-8"&lt; 就好了。在样式表文件里不用去声明UTF-8编码什么的。

* 在需要地地方进行注释。

* 用 TODO 来标志代码中需要完善的地方

```html
&lt;!-- TODO: remove optional tags -->
&lt;ul>
  &lt;li>Apples&lt;/li>
  &lt;li>Oranges&lt;/li>
&lt;/ul>
```

##HTML书写规则

* 文档类型。HTML5的文档类型对所有的html文档都适用：&lt;!doctype html&lt;。另外，最好使用html,而不是xhtml.

* 使用规范化的html，并使用W3C HTML validator之类的工具来进行检测。

```html
&lt;!-- 不规范 -->
&lt;title>Test&lt;/title>
&lt;article>This is only a test.

&lt;!-- 规范 -->
&lt;!DOCTYPE html>
&lt;meta charset="utf-8">
&lt;title>Test&lt;/title>
&lt;article>This is only a test.&lt;/article>

```

* 使用语义化的html标签，根据用途来选择标签。

```html

&lt;!-- 不推荐 -->
&lt;div onclick="goToRecommendations();">All recommendations&lt;/div>

&lt;!-- 推荐 -->
&lt;a href="recommendations/">All recommendations&lt;/a>

```

* 把多媒体元素可知化。像图片、视频、动画等多媒体元素，要有相关的文字来体现其内容，比如&lt;img> 可以使用alt属性来说明图片内容。

```html
&lt;!-- 不推荐 -->
&lt;img src="spreadsheet.png">

&lt;!-- 推荐 -->
&lt;img src="spreadsheet.png" alt="Spreadsheet screenshot.">

```

* 确保页面的 结构、样式、行为三者相分离。确保文档或模板中只包含html，把用到的样式都写到样式表文件中，把脚本都写到js文件中。这在多人协作时非常重要。

```html
&lt;!-- Not recommended -->
&lt;!DOCTYPE html>
&lt;title>HTML sucks&lt;/title>
&lt;link rel="stylesheet" href="base.css" media="screen">
&lt;link rel="stylesheet" href="grid.css" media="screen">
&lt;link rel="stylesheet" href="print.css" media="print">
&lt;h1 style="font-size: 1em;">HTML sucks&lt;/h1>
&lt;p>I’ve read about this on a few sites but now I’m sure:
  &lt;u>HTML is stupid!!1&lt;/u>
&lt;center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!&lt;/center>
&lt;/p>

&lt;!-- Recommended -->
&lt;!DOCTYPE html>
&lt;title>My first CSS-only redesign&lt;/title>
&lt;link rel="stylesheet" href="default.css">
&lt;h1>My first CSS-only redesign&lt;/h1>
&lt;p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
  &lt;br/>It’s awesome!
&lt;/p>

```

* 优化标签。有些标签是不需要用到的，能少就少。可以参考下方链接来知道哪些标签是必须的，哪些又是多余的。
http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission

* 省略&lt;style&lt;和&lt;script&lt;的type属性

##HTML代码的格式化

* 为每个块级元素或表格元素标签新起一行，并且对每个子元素进行缩进

```html

&lt;blockquote>
  &lt;p>&lt;em>Space&lt;/em>, the final frontier.&lt;/p>
&lt;/blockquote>
&lt;ul>
  &lt;li>Moe&lt;/li>
  &lt;li>Larry&lt;/li>
  &lt;li>Curly&lt;/li>
&lt;/ul>
&lt;table>
  &lt;thead>
    &lt;tr>
      &lt;th scope="col">Income&lt;/th>
      &lt;th scope="col">Taxes&lt;/th>
    &lt;/tr>
  &lt;/thead>
  &lt;tbody>
    &lt;tr>
      &lt;td>$ 5.00&lt;/td>
      &lt;td>$ 4.50&lt;/td>
    &lt;/tr>
  &lt;/tbody>
&lt;/table>

```







