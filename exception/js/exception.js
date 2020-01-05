"use strict";

/*
try...catch構文が使用可能。
 */


//try節で例外が発生した場合、catchにジャンプする。
//finally節がある場合、try...catch以降に必ず実行される。
{
    try {
        console.log("try節:この行は実行されます");
        // 未定義の関数を呼び出してReferenceError例外が発生する
        undefinedFunction();
        // 例外が発生したため、この行は実行されません
    } catch (error) {
        // 例外が発生したあとはこのブロックが実行される
        console.log("catch節:この行は実行されます");
        console.log(error instanceof ReferenceError); // => true
        console.log(error.message); // => "undefinedFunction is not defined"
    } finally {
        // このブロックは例外の発生に関係なく必ず実行される
        console.log("finally節:この行は実行されます");
    }
}

//try..catch 2
{
    // catch節のみ
    try {
        undefinedFunction();
    } catch (error) {
        console.error(error);
    }
    // finally節のみ
    try {
        //undefinedFunction();
    } finally {
        console.log("この行は実行されます");
    }
    // 例外が発生した時点で終了するため、例外時は、
    //finally節のみでは例外がキャッチされないため、この行は実行されません
}


//throw 1
{
    try {
        // 例外を投げる
        throw new Error("例外が投げられました");
    } catch (error) {
        // catch節のスコープでerrorにアクセスできる。
        console.log(error.message); // => "例外が投げられました"
    }
}

//Errorオブジェクトについて 1
{
    // 渡された数値が0以上ではない場合に例外を投げる関数
    function assertPositiveNumber(num) {
        if (num < 0) {
            throw new Error(`${num} is not positive.`);
        }
    }

    try {
        // 0未満の値を渡しているので、関数が例外を投げる
        assertPositiveNumber(-1);
    } catch (error) {
        console.log(error instanceof Error); // => true
        console.log(error.message); // => "-1 is not positive."



        //Errorオブジェクトのコンストラクタの第一引数には文字列を渡せる。
        //messageに格納される。
    }
}


//なんでも投げられるthrow文
{
    // 文字列を例外として投げるアンチパターンの例
    try {
        throw "例外が投げられました";
    } catch (error) {
        // catch節の例外識別子は、投げられた値を参照する
        console.log(error); // => "例外が投げられました"
    }

    //スタックトレースを内包していないので、Errorオブジェクトを投げることが推奨される。
}


//
{
    //エラーを出力する際は、console.error();が推奨。
}
