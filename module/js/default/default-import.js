//デフォルトインポート
/*
デフォルトインポートはモジュール単位で一つだけ設定できる。



*/


import a from "./default-export.js";
console.log(a);


//エクスポートと同様にインポートも名前付きエイリアスエクスポートでdefaultという名前を同じようにimportできる
import {
    default as b
} from "./default-export2.js";
console.log(b.fine);

//何回もimportできる。


//default-import-with-named
//defaultと名前付き公開変数は同時にimportできる。
import c, {
    nick
} from "./default-export2.js";

console.log(c.no);
console.log(nick);
