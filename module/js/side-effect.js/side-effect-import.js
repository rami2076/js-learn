import "./side-effect-export.js";

//import先のファイルの内グローバルなコードを実行させたいだけの場合は上記のように記述する。

//グローバル変数には影響するがなにもインポートしていない。
console.log(window.foo);
