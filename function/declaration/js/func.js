//関数はfunctionキーワードを使用。
function 関数名(仮引数1, 仮引数2) {
    //関数が予備日出された時雄処理
    const 関数の戻り値 = "戻り値";
    return 関数の戻り値;
}

const 引数1 = "引数1";
const 引数2 = "引数2";

const 関数の結果 = 関数名(引数1, 引数2);
console.log(関数の結果);


//関数の引数が少ない場合
/*
関数の引数が少ない場合、足り
ない引数の値はundefinedとなる。
 */


function println(arg1, arg2) {
    console.log(arg1);
    console.log(arg2);
}

println(); //=>undefined \n undefined
println("引数1"); //=>引数1　\n　undefined
println("引数1", "引数2");


//ES2015で追加されたデフォルト引数。
function echo(x = "デフォルト文字") { //仮引数=値としてデフォルト値を設定できる。
    console.log(x)
}
echo();
echo("new!");

//デフォルト引数導入以前のデフォルト文字列の扱い
function oldEcho(x) {
    //論理演算子のオペランドにはfalsyまたは、truthyな値であれば評価される。
    //この機能を利用して、下記のようにOR演算子を使用してデフォルト値を設定できる。
    //xがfalsyであればオペランド2が評価されるという具合になる。
    //評価結果はbool値でなく、評価結果がそのまま返却される。
    const str = x || "デフォルト文字列";
    console.log(str);
}
oldEcho();
oldEcho("Old?");
//論理演算子を使用したデフォルト値の使用の実装は、プログラム作成者の意図が分かりずらい点。
//意図しない、値の際にデフォルト値を設定するバグにつながるので、デフォルト引数を使用することを推奨している。


//呼び出し時の引数
/*
呼び出し時の引数の個数が多い場合は、超過した引数は無視される。
*/
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));
//超過例
console.log(add(1, 2, 3));


//可変長引数

//ES2015で導入
//Rest Parametersという機能が追加され、可変長引数の表現が可能になった。
//Rest;和訳:残り

/*
仮引数名の先頭に...(ドットを三つ)を付与することで関数に渡された値が配列として代入される。
jsでは、可変長引数のことを残余引数と呼ぶ。
*/
function fn(...args) {
    console.log(args);
    args.forEach(console.log);
    console.log(args[0]);
}

fn("2", "5", "8");

//余剰引数は普通の仮引数と併用することが可能。
function func_rest(index, ...args) {
    console.log(args[index]);
}

func_rest(1, "table", "desk", "chest");


//aruguments ES2015以前から使用されていた可変長引数の記述方法
/*
関数の中でのみ参照できる特殊な変数。
arugumentsは、配列の要素への参照機能のみを持つArray-likeなobject。
配列ではない。
*/
function arrayLike() { //引数を記述しない。
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}

arrayLike("one", "two", "three");
/*
argumentsは非推奨の記述方式
下記が理由。
・Arrow Functionが利用できない。
・Array-LikeオブジェクトなのでArrayの機能が使えない。
・関数が可変長引数を受け付けるかを仮引数をみただけで判断できない。
 */


//ES2015より導入：関数への分割代入 Destructuring assignment
function destruct({
    uid
}) { //引数にオブジェクトのプロパティ名を{}の中に記述。
    console.log(uid);
}
const user = { //オブジェクトの初期化
    uid: 1001
}
destruct(user);


//関数をオブジェクトとして扱う。
/*
関数をオブジェクトとして扱うには、()を付与せず変数に格納することで可能。
*/
function fnObj() {
    console.log("変数に格納して実行できました。！");
}
const valFn = fnObj;
valFn();
//関数をオブジェクトとして扱えることをファーストクラスファンクション(第一級関数)と呼ぶ。

//関数式　関数オブジェクトを関数から代入せず変数に直接定義する。　
const fnValDirect = function () { //function 関数名(){}の関数名を省略できる。
    //関数を呼び出したときの処理
    const 関数の戻り値 = "戻り値";
    return 関数の戻り値;
}
//名前の無い関数を変数に格納している。
//名前の無い関数は、無名関数や匿名関数と呼ぶ。

console.log(fnValDirect());

//関数式で定義する無名関数に名前を関数名を付与することも可能。
//関数式のリテラルで定義した関数名は定義した関数内でしか呼び出すことができない。
// factorialは関数の外から呼び出せる名前
// innerFactは関数の外から呼び出せない名前
const factorial = function innerFact(n) {
    if (n === 0) {
        return 1;
    }
    // innerFactを再帰的に呼び出している
    return n * innerFact(n - 1);
};
console.log(factorial(3)); // => 6
//上記のように再帰呼び出しで使用される。



//ES2015 Arrow Function
/*
関数式でみた匿名関数をより文字数を少なく記述できる。
 */

const arrowFunc = () => {
    //関数を呼び出したときの処理
    //...
    const 関数の返す値 = "戻り値。";
    return 関数の返す値;
}

// 仮引数の数と定義 
//　arrow functionは下記のように省略記法が使用できる。



const fnA = () => {
    /* 仮引数がないとき */
};
const fnB = (x) => {
    /* 仮引数が1つのみのとき */
};
const fnC = x => {
    /* 仮引数が1つのみのときは()を省略可能 */
};
const fnD = (x, y) => {
    /* 仮引数が複数のとき */
};
// 値の返し方
// 次の２つの定義は同じ意味となる
const mulA = x => {
    return x * x;
}; // ブロックの中でreturn
const mulB = x => x * x; // 1行のみの場合はreturnとブロックを省略できる

//また下記の制約がある。
/*
名前をつけることができない（常に匿名関数）
thisが静的に決定できる
functionキーワードに比べて短く書くことができる
newできない（コンストラクタ関数ではない）
arguments変数を参照できない
*/


//アロー関数を使用した場合と匿名関数を使用した場合の例

const array = [1, 2, 3];
//匿名関数
const processedArray匿名 = array.map(function (value) {
    return value * 2;
});
//アロー関数
const processedArrayArrow = array.map(value => value * 2);
console.log(processedArray匿名);
console.log(processedArrayArrow);

//アロー関数で記述した方がコードがsimpleになっていることが分かる。



//同じ名前の関数宣言は上書きされる。
//オーバロードの機能はない。
function fnOverRoad(x) {
    return `最初の関数 x:${x}`;
}

function fnOverRoad(x, y) {
    return `最期の関数 x:${x},y:${y}`;
}

console.log(fnOverRoad(2, 10)); //=>最期の関数 x:2,y:10
console.log(fnOverRoad(2)); //=>最期の関数 x:2,y:undefined

//オーバロードの機能が関数名には無いので、異なる関数名をつけること。


//コールバック関数
/*
コールバック関数とは、関数の引数に渡す関数のことをコールバック関数と呼ぶ。
一方、コールバック関数を引数に取る関数のことを高階関数と呼ぶ。
*/

//下記のように記述する。
function 高階関数(コールバック関数) {
    コールバック関数();
}

//コールバック関数の使用例。
const numbers = [1, 2, 3];
const output = value => console.log(value); //コールバック関数用のアロー関数の定義
numbers.forEach(output); //高階関数内でコールバック関数として使用

//コールバック関数の使用例2(匿名関数を使用したコールバック関数の記述)
numbers.forEach(value => console.log(value * 2));
//関数を定義せずobjectとして活用することでsimpleな記述になった。

//メソッド
/*
オブジェクトのプロパティである関数をメソッドと呼ぶ。
*/
const obj_m = {
    // `function`キーワードでのメソッド
    method1: function () {
        console.log("method1です");
    },
    // Arrow Functionでのメソッド
    method2: () => {
        console.log("method2だよ！");
    },
    //メソッド名は任意。
    custumMethod: function () {
        console.log("custumMethodだよ。");
    }

}
//各メソッドの呼び出し。
obj_m.custumMethod();
obj_m.method1();
obj_m.method2();

//オブジェクトの定義後にメソッドを追加することができる。
obj_m.newMethod = function () {
    console.log("newMethodです。");
}
//追加したメソッドの呼び出し。
obj_m.newMethod();

//ES2015　メソッドの短縮記法
const obj_short = {
    myMethod1() {
        console.log("短縮記法によるメソッド名の記述");
    },
    myMethod2() {
        console.log("複数のプロパティを記述する際の確認");
    }
}

//メソッドの短縮記法はクラスのメソッドと共通の記法なのでオブジェクトを定義する際は、この記法が推奨。


obj_short.myMethod1();
obj_short.myMethod2();
