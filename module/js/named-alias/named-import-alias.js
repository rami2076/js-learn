//fooとしてエクスポートされた変数をmyFooとしてインポートする。
import {
    foo as myFoo
} from "./named-export-alias.js";

console.log(myFoo);
