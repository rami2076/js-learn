//プロトタイプオブジェクトについて
/*
ほぼすべてのオブジェクトは、Object.prototypeプロパティに定義されたprototypeオブジェクトを継承している。
prototypeオブジェクトは、オブジェクト作成時に自動的に追加される特殊なオブジェクト。
Object#prototypeはすべてのオブジェクトから利用できるメソッドなどを提供するベースオブジェクト。




https://maeharin.hatenablog.com/entry/20130215/javascript_prototype_chain
https://rei19.hatenablog.com/entry/2013/05/21/005713
https://qiita.com/takeharu/items/809114f943208aaf55b3
https://qiita.com/howdy39/items/35729490b024ca295d6c
https://anatoo.hatenablog.com/entry/2015/05/05/163225
[イデア論に関する考察が興味深い](https://teratail.com/questions/77753)
[イデア論web魚拓](https://megalodon.jp/2019-1231-0912-18/https://teratail.com:443/questions/77753)
https://sumim.hatenablog.com/entry/20040525/p1
*/


//Object#prototypeにtoStringが存在する。
console.log(Object.prototype.toString);

/*
以下のように短縮記述とする。
Object.prototype.toString = Object#toString
*/

//Object.prototype.toString と Object.toString　が同じデータを参照していることを確認
{
    const obj = {
        "key": "value"
    };
    // `obj`インスタンスは`Object.prototype`に定義されたものを継承する
    // `obj.toString`は継承した`Object.prototype.toString`を参照している
    console.log(obj.toString === Object.prototype.toString); // => true
    // インスタンスからプロトタイプメソッドを呼び出せる
    console.log(obj.toString()); // => "[object Object]"
}


//優先順位
{
    //オブジェクトのインスタンスにtoStringを再定義した場合、
    //インスタンスメソッドが優先される。
    const customObject = {
        toString() {
            return "custom value";
        }
    };
    console.log(customObject.toString()); // => "custom value"
}

//in演算子とObject#hasOwnPropertyの違い。
{
    //探索範囲が異なる。
    /*
    in演算子は検査対象のオブジェクトの継承元のprototypeオブジェクトのプロパティまで探索する。
    Object#hasOwnPropertyは検査対象のオブジェクト自身のプロパティのみ探索する。
     */
    const obj = {};
    console.log("toString" in obj); //=>true
    console.log(Object.hasOwnProperty("toString")); //=>false
}


//オブジェクトの継承元を明示するObject#create
{

    //Object#create(第一引数にprototypeとなるオブジェクトを指定)

    // const obj = {} と同じ意味
    const obj = Object.create(Object.prototype); //例では、Object#prototypeを指定している。
    // `obj`は`Object.prototype`を継承している
    console.log(obj.hasOwnProperty === Object.prototype.hasOwnProperty); // => true

}


//プロトタイプチェーン
{
    //すべてのオブジェクトはprototypeプロパティを持っており、プロトタイプは親のオブジェクトを指している。
    //親のオブジェクトを辿ると必ずObject#prototypeに行きつく。
    //親オブジェクトのプロパティを子が参照できる。
    //これは、prototypeプロパティにより実現できる。
    //この仕組みをプロトタイプチェーンと呼ぶ。

    // このコードはイメージです！
    // `Array`コンストラクタ自身は関数でもある
    const Array = function () {};
    // `Array.prototype`は`Object.prototype`を継承している
    Array.prototype = Object.create(Object.prototype);
    // `Array`のインスタンスは、`Array.prototype`を継承している
    const array = Object.create(Array.prototype);
    // `array`は`Object.prototype`を継承している
    console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // => true
}



//Object#prototypeを継承しないオブジェクト
{
    /*
    慣習的な記述としてObject.create(null)とすると
    Object#prototypeを継承しないオブジェクトを作成できる。
    これにより、プロパティやメソッドを全く持たない本当に空のオブジェクトを作れます。
    */
    // 親がnull、つまり親がいないオブジェクトを作る
    const obj = Object.create(null);
    // Object.prototypeを継承しないため、hasOwnPropertyが存在しない
    console.log(obj.hasOwnProperty); // => undefined
    console.log("toString" in obj); // =>  false


}


//Object#createについて
{
    /*
    Object#create　 since ES5
    Object.create(null)は、一部ライブラリなどでMapオブジェクトの代わりとして利用されてきた。
    ただのオブジェクトには、Object#prototypeに存在する不要なプロパティとメソッドが存在するため、純粋なMapを表現する際に邪魔であったため慣習として使われていた。
    */
}

//本物のMap
{
    /*
    Map object since ES2015
    Object.create(null)で代用されてきたMapでしたが、ES2015で本物Mapが利用できるようになり、Object.create(null)を利用する必要がなくなった。
    */

    const map = new Map();
    // toStringキーは存在しない
    console.log(map.has("toString")); // => false

}


