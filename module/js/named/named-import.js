import {
    foo,
    bar,
    //a
} from "./named-export.js";

console.log(foo);
bar();

//エクスポート側のファイルの変数がグローバルでない場合、例外が発生する。
//console.log(a);
