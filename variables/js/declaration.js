var num;
var pref1, pref2;

num = 10;
pref1 = "東京都";
pref2 = "千代田区";
document.write("<h2>遅延初期化と複数変数の同時宣言</h2>");
document.write("<p>" + pref1 + pref2 + num + "</p>");

//https://jsprimer.net/basic/variables/
//varには問題があるということでECMAScript2015からは、constとletが追加された。
//constは定数
//letは再代入可能な値に使用する。
//varは、同じ名前の変数を再定義することができるため、意図せず、二重定義するミスが発生する。
//letは二重定義した場合、構文エラーとなるため安全にコードを記述できる。


//必ず、宣言と代入を同時に行う。
const str = "str-const",
    str2 = "str-const2";
document.write("<p>" + str + "</p>");



let str3 = "let-str3",
    str4 = "let-str4"
str3 = str4
document.write("<p>" + str3 + "</p>");


//変数名のルール
//OKルール
var $; // OK: $が利用できる
var _title; // OK: _が利用できる
var jquery; // OK: 小文字のアルファベットが利用できる
var TITLE; // OK: 大文字のアルファベットが利用できる
var es2015; // OK: 数字は先頭以外なら利用できる
var 日本語の変数名; // OK: 一部の漢字や日本語も利用できる

/*
NGルール
var 1st; // NG: 数字から始まっている
var 123; // NG: 数字のみで構成されている
var var; // NG: `var`は変数宣言のために予約されているので利用できない
var if; // NG: `if`はif文のために予約されているので利用できない
*/

/*
constで定義した場合でも、objetctに内包された値は変更可能
*/
