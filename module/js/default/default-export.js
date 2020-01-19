//デフォルトエクスポート
/*
    デフォルトエクスポートはモジュールごとに一つしかエクスポートできない特殊なエクスポート。
*/

const defaultFoo = "default foo.";

//foo変数の値をデフォルトエクスポートする。
export default defaultFoo;

/*
デフォルトエクスポートは、内部的にエイリアス名をdefaultにして公開しているため一つだけエクスポートできる。

そのため、以下のコードと同義となる。
export defaultFoo as default;
*/
