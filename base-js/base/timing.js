/*
HTML内にJSが記述されている場合、実行のタイミングは、
<script>タグに到達した時点で実行される。

以下のように記述する。
<script type="text/javascript">
document.write("<p>スクリプトが出力</p>");
</script>

defer属性を使用するとHTMLの読み込み後に実行される。
<script src="test.js" defer></script>

async属性を使用すると非同期でscriptが実行される。
<script src="test.js" async></script>


http://var.blog.jp/archives/24980668.html
*/
