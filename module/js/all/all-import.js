//すべてをオブジェクトにまとめてインポート

import * as all from "./all-export.js";

console.log(all.a);
console.log(all.b);
//デフォルトエクスポートもエクスポートされる。
//defaultでアクセスできる。
console.log(
    all.default);
