document.write('<h3>整数値</h3>');
var numString = "21";
var num1 = 21;
//数値の計値リテラルはそのまま記述する。
var num2 = 22;
//数値の計算
var sum = num1 + num2;
//式内の値に文字列が含まれる場合、文字列として結合される。
var sum2 = numString + num2;
document.write('<p>合計は' + sum + 'です</p>');
document.write('<p>合計は' + sum2 + 'です</p>');


document.write('<h3>浮動小数</h3>');
var floatNum1 = 32.45;
var floatNum2 = 0.0038;
//pリオぴを使用して表現
document.write('<p>' + floatNum1 + '</p>');
document.write('<p>' + floatNum2 + '</p>');
//桁数が大きく、可読性が落ちる場合、基数10の指数で数値を表現できる。eは大文字のEでも識別できる。
document.write('<p>' + 3.2e2 + '</p>');
//HTMLに出力する際は指数表現が除外された状態で出力される。
document.write('<p>' + 2.4e-3 + '</p>');
//大文字のEを使用した場合。
document.write('<p>' + 2.4E-3 + '</p>');


document.write('<h3>数値定数</h3>');
//Numberクラスのコンストラクタ関数のプロパティとして代表的な値として5つ定義されている。
document.write('<p>Not a Number;数値で無い特殊な値:Number.NaN=' + Number.NaN + '</p>');
document.write('<p>表現可能な最大の値を超過した際に使われる正の無限大:Number.POSITIVE_INFINITY=' + Number.POSITIVE_INFINITY + '</p>');
document.write('<p>負の値の絶対値が表現可能な最大値を超過した際に使われる負の無限大:Number.NEGATIVE_INFINITY=' + Number.NEGATIVE_INFINITY + '</p>');
document.write('<p>表現可能な最大の数値:Number.MAX_VALUE=' + Number.MAX_VALUE + '</p>');
document.write('<p>表現可能な最小の数値:Number.MIN_VALUE' + Number.MIN_VALUE + '</p>');
//以下定数が出る際の式
document.write("<p>" + (1 / 0) + "</p>");
document.write("<p>" + (-1 / 0) + "</p>");
document.write("<p>" + (0 / 0) + "</p>");


document.write('<p>' + (typeof floatNum1) + '</p>');


//以下表示はすべて10進数となる。
// 10進数
console.log(1);
console.log(10);
console.log(255);
// 2進数
console.log(0b1111);
console.log(0b10000000000);
// 8進数
console.log(0o644);
console.log(0o777);

// 非推奨な8進数の書き方
// strict modeは例外が発生
console.log(0644);
console.log(0777);

// 16進数表記
console.log(0xFF);
// 小文字で書いても意味は同じ
console.log(0xff);
console.log(0x30A2);

//0.123の0から始まる浮動小数は0を省略可能。
console.log(.123)

//ES2015

