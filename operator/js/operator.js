//演算子
/*
演算子は演算する対象を持つ。
対象のことを被演算子:オペランドと呼ぶ。


演算子はオペランドの数により二つに分類できる。
オペランド二つに対して処理する演算子は二項演算子
オペランド一つに対して処理する演算子は単項演算子と呼ぶ。


*/

//二項演算子　+が演算子。
console.log(1 + 1);
//オペランド1　演算子 オペランド2の形式となっている。

//単項演算子 ++が演算子
let num = 1;
console.log(num);
console.log(num++); //処理してから足す。
console.log(++num); //足してからっ処理
//オペランドが一つの場合には単項演算子と呼びます。


//二項演算子シリーズ
console.log("二項演算子-基本シリーズ");
//

//数値　プラス演算子
console.log(1 + 1);
console.log(1 + .5);
//文字列　文字列結合演算子
console.log("One" + ",Two");
//数値　マイナス演算子
console.log(1 - 1);
//数値 乗算演算子 
console.log(2 * 3);
//数値　除算演算子
console.log(6 / 2);
console.log(6 / 0.5);
//数値 余剰演算子
console.log(8 % 2);
console.log(10 % 0.5);
console.log(10 % 4.5);
//数値　べき乗演算子 ES2016に追加
console.log(2 ** 4)
//Math.pow(2,4)のメソッドがMathにあり同等の動きをする。
//ほかの数値計算演算子は、対応するメソッドがMathに存在しない。


console.log("単項演算子-数値");
//数値　単項プラス演算子　
console.log(+1); //数値への変換を行う。
console.log(+"1"); //数字の変換ができる。
console.log(+"文字列"); //変換不可の場合NaNとなる。
//実際は、Numberのコンストラクタ関数やparseInt関数などで明治的に型変換することを推奨。


//数値　単項マイナス演算子　
console.log(-1);
console.log(-("1"));
console.log(-("1")); //単項プラス演算子と同じ機能。非推奨機能。



//数値　インクリメント演算子
//#後置きインクリメント 価結果返却後、加算
let numA = 1
console.log(numA++);
//console.log(1++);1はイミュターブルなプリミティブ型の値であるため1++と記述すると例外が発生するのかなと予測。
//例外：Uncaught SyntaxError: Invalid left-hand side expression in postfix operation
//https://qiita.com/suetake/items/425684ac278c7cf8c30c

//#前置きインクリメント 加算後、評価結果返却
//console.log(++1);//同様の例外
console.log(++numA);


//数値　デクリメント演算子
//#インクリメントと同様の機能
//console.log(1--);同様の例外
//console.log(--1);
console.log(numA--);
console.log(--numA);


console.log("二項演算子-比較演算子シリーズ");

//値　厳密等価演算子
//#同じ型∧同じ値の場合にtrue
console.log(1 === 1); //=>true
console.log(1 === "1"); //=>false

let objA = {};
let objB = {};
//#オブジェクトの参照が異なるため偽
console.log(objA === objB); //=>false
//#同じオブジェクトなので真
console.log(objA === objA); //=>true

//#参照先を変更し同じobject同士で比較したため真
objB = objA
console.log(objA === objB); //=>true



//値　厳密不等価演算子
//#異なる型||異なる値の場合にtrue
console.log(1 !== 1); //=>false
console.log(1 !== "1"); //=>true
//===の反転値を返却


//値　等価演算子
//#同じ型∧同じ値の場合にtrue
console.log(1 == 1); //=>true
console.log("str" == "str"); //=>true
console.log("JavaScript" == "ECMAScript"); //=>false
const objC = {};
const objD = {};
console.log(objC == objD); //=>false
console.log(objC == objC); //=>true

/*
#===との違い
===との違いは暗黙的な型変換をコンパイラが行う点にある。
そのため下記のような見た目から予測しにくい挙動を行う。
*/
// #文字列を数値に変換してから比較
console.log(1 == "1"); // => true
// #"01"を数値にすると`1`となる
console.log(1 == "01"); // => true
// #真偽値を数値に変換してから比較
console.log(0 == false); // => true
// #nullの比較はfalseを返す
console.log(0 == null); // => false
// #nullとundefinedの比較は常にtrueを返す
console.log(null == undefined); // => true
/*
意図しない挙動になる場合があるため、比較する際は===推奨。
undefined||nullの判定を行う際は一度の比較で完了するため==を使用する場合がある。
*/
const value = undefined; /* または null */
// === では2つの値と比較しないといけない
if (value === null || value === undefined) {
    console.log("valueがnullまたはundefinedである場合の処理");
}
// == では null と比較するだけでよい
if (value == null) {
    console.log("valueがnullまたはundefinedである場合の処理");
}


//値　不等価演算子
console.log(1 != 1);
//割愛。
//等価演算子の反転した値を返却。
//方針は等価演算子と同じ。

//数値　大なり演算子
console.log(1 > 2);
//数値　小なり演算子
console.log(1 < 2);
//数値　大なりイコール演算子
console.log(1 >= 2);
//数値　小なりイコール演算子
console.log(1 <= 2);

//ビット演算子
console.log("ビット演算子は割愛");

//　ES2015 分割代入 Destructuring assignment
console.log("分割代入");
//オブジェクト内の値の抽出が可能。

//#配列の値を抽出
const array = [1, 2];
// aには`array`の0番目の値、bには1番目の値が代入される
const [a, b] = array;
console.log(a); // => 1
console.log(b); // => 2
const [c] = array; //一部だけの代入も可能。
console.log(c); // =>1



//objectのプロパティを抽出
const obj = {
    "key1": "value1",
    "key2": "value2"
};
// プロパティ名`key`の値を、変数`key`として定義する
const {
    key1,
    key2
} = obj;
console.log(key1); // => "value"
console.log(key2); // => "value"
//複数のプロパティを同時抽出可能。


//三項演算子
console.log("三項演算子");
/*
3つの項を受け取る演算子なので三項演算子と呼ぶ。
オペランド1　?　オペランド2 : オペランド3;
条件式 ? Trueの場合の式 : Falseの場合の式;
上記の順に記述する。
*/
//#例
const valueA = true ? "A" : "B";
console.log(valueA);
const valueB = valueA === "A" ? "B" : "C";
console.log(valueB);

function addPrefix(text, prefix) {
    //`prefix`は"デフォルト:"を付与。
    const pre = typeof prefix === "string" ? prefix : "デフォルト:"
    return pre + text;
}
console.log(addPrefix("文字列"));
console.log(addPrefix("文字列", "カスタム"));
//if文を使う場合は、定数キーワードconstを使用できない。



console.log("論理演算子シリーズ")
//boolean and演算子
const x = true;
const y = false;
//x -> y の順で評価。
console.log(x && y); //=> false
//jsは短絡評価なので
//xの評価は実施しない。
console.log(y && x); //=> false

//boolean OR演算子
//短絡評価なので、yは評価されない。
console.log(x || y);
//y -> x の順で評価される。　
console.log(y || x);

//boolean　NOT演算子
console.log(!x);
