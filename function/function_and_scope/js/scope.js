/*
基本はES2015のスコープを元に学習
*/


//関数スコープ
{
    function fn(args) {
        //この関数ブロック{}内の変数は、この変数内でのみ参照できるスコープを持つ。
        //これを関数スコープという。
        //仮引数も関数スコープの特性を持つ。
    }

}

//
{
    //このブロック{}の中で定義された変数は、このブロックの中でのみ参照できるスコープを持つ。
    //これをブロックスコープと呼ぶ。
    //ifやwhileなどもブロックスコープを持つ。
}

//スコープチェーン
{
    //outerブロックスコープ
    {
        //Innnerブロックスコープ

        /*
        関数やブロックはネストして書けることと同様に、スコープもネストする。
        Outerブロックスコープで定義された変数は、Innerブロックスコープで参照可能。
        関数の場合も同じ。
        これをスコープチェーンと呼ぶ。
        */


        const scopeTest = "nested scope";

        function fn() {
            //変数のスコープはネスト可能。
            console.log(scopeTest);
        }

        fn(); //=>nested scope

    }

}

//グローバルスコープ
const globalScope = "global!";
/*
グローバルスコープはプログラム直下に記述した変数となる。
・グローバルスコープに定義した変数はグローバル変数と呼ばれ、あらゆるスコープから参照できる変数となる。

ビルトインオブジェクトのスコープもグローバルスコープ。
*/
console.log(isNaN);
console.log(Array);

/*
ビルトインオブジェクトと自分で定義したグローバル変数の場合、グローバル変数が優先して参照される。
このように内側のスコープで外側のスコープと同じ変数を定義することで外側の変数を参照できなくなることを
変数の隠ぺい(shadowing)と呼ぶ。
*/
{
    const B = "B"; {
        const B = "C";
        //辺数の隠蔽
        console.log(B) //=>C

    }
    console.log(B); //=>B
}


//varによる変数宣言時の挙動。　変動するスコープ
{
    /*
    参考
    https://analogic.jp/hoisting/
    */
    {
        var myname = "global";

        function func() {
            console.log(myname); //=>undefined
            var myname = "local";
            console.log(myname); //=>local
        }

        func();
        /*
        解説
        JavaScriptでは、関数内で宣言されたローカル変数は、すべてその関数の先頭で宣言されたものとみなされる。
        このような振る舞いを「変数の巻き上げ(hoisting)」と呼ぶ。
        */

        /*
        補足
        関数に関しても同じように巻き上げが起こるが、関数の場合、正常に呼び出しできるので問題にならない。
        */

        /*
        対策
        varで宣言せず、letキーワードを使用して宣言する。
        letキーワードで宣言した場合、宣言前に使用した変数があるため例外が発生し、早期発見ができる。
        https://jsprimer.net/basic/function-scope/
        */
    }
}



//即時実行関数
{
    /*
    即時実行関数(IIFE,Immediately-Invoked Function Expression)
    */

    /*
    グローバルスコープ汚染を避けるために生まれたイディオム
    慣習的な記述の一つ。
    ・匿名関数を即時呼び出しすることで、任意の処理を関数の中に閉じることができる。
    ・()はグループ化の()
    ・グローバルスコープに余計な関数がの残らないことが特徴
    */
    // 匿名関数を宣言 + 実行を同時に行っている
    {
        (function () { //匿名関数を()で囲むことで関数式として認識させている。
            // 関数のスコープ内でfoo変数を宣言している
            var foo = "foo";
            console.log(foo); // => "foo"
        })();

        // foo変数のスコープ外
        console.log(typeof foo === "undefined"); // => true
    }

    //引数の記述位置1
    {
        (function (bar) {
            // 関数のスコープ内でfoo変数を宣言している
            const foo = "foo";
            console.log(bar + " " + foo); // =>anoymouse foo
        })("anoymouse"); //引数を渡せる。
    }

    //引数の記述位置2
    {
        (function (bar) {
            // 関数のスコープ内でfoo変数を宣言している
            const foo = "foo";
            console.log(bar + " " + foo); // =>anoymouse2 foo
        }("anoymouse2")); //引数は内部に持たせることが可能
    }

    /*
    ECMAScript5まで変数を宣言する方法はvarしか存在しなかったため、即時実行関数は変数のスコープを制限し、グローバルスコープ汚染を防ぐために必要だった。
    ECMAScript2015で導入されたletキーワードとconstキーワードで宣言された変数に対して、
    ブロックスープ内の変数のスコープを正弦できるようになったため、グローバルスコープ汚染を防ぐための即時実行関数は不要となった。
    */


}


//クロージャ
{
    /*
    関数が状態を保持できる仕組みをクロージャと呼ぶ。
     */


    //外側のスコープにある変数を使用できる一番簡易なクロージャ
    {
        let count = 0;


        function countUp() {
            count++;
        }

        console.log("easy:" + count);
        countUp();
        console.log("easy:" + count);
        /*
        閉じたスコープでの変数の利用でないため、
        クロージャの悪い利用法。
        */
    }



    //内部関数に匿名関数を用いたクロージャ例
    {
        function fn() {
            let count = 0;
            return function () { //Or functin increment(){} Or; return () => {count++; return count;}
                count++;
                return count;
            }
        }

        const countUp = fn();
        console.log("関数を使用したクロージャ:" + countUp());
        console.log("関数を使用したクロージャ:" + +countUp());

        const newCount = fn();
        console.log("関数を使用したクロージャ:" + newCount());
        console.log("関数を使用したクロージャ:" + newCount());


        console.log("外からのアクセス" + countUp.count);
        //count変数は関数オブジェクト内のスコープにに存在するため、閉じたスコープにあるため安全に利用が可能。

    }



    //関数に状態を保持できるクロージャを関数式として表現。変数として宣言すると重複を防ぐことが可能。
    {
        const createCounter = () => {
            let count = 0;
            return function increment() {
                // 変数`count`を参照し続けている
                count = count + 1;
                return count;
            };
        };
        // countUpとnewCountUpはそれぞれ別のincrement関数(内側にあるのも別のcount変数)
        const countUp = createCounter();
        const newCountUp = createCounter();
        // 参照してる関数(オブジェクト)は別であるため===は一致しない
        console.log(countUp === newCountUp); // false
        // それぞれの状態も別となる
        console.log(countUp()); // => 1
        console.log(countUp()); // => 2 
        //変数に格納した関数はオブジェクトであるため、オブジェクト毎に状態を管理できる。
        console.log(newCountUp()); // => 1

        //console.log(count);外側からはアクセスできない。

    }

    //関数にプロパティを追加することでクロージャを生成できるが、簡易なクロージャと同じく、
    //外側のスコープから容易にプロパティの変更が可能でスコープが外部に漏れているため悪い例となる。
    //シングルトンなインスタンスと同じ働きをする変数がプロパティの仕組みにようだ。
    {
        function countUp() {
            // countプロパティを参照して変更する
            countUp.count = countUp.count + 1;
            return countUp.count;
        }

        //関数オブジェクトにプロパティを追加。
        countUp.count = 0;
        // 呼び出すごとにcountが更新される
        console.log(countUp()); // => 1
        // プロパティを変更。
        countUp.count = 10;
        console.log(countUp()); // => 11
    }



    /*
    クロージャはスコープを考えて正しく作成することが求められる。
    簡単に作成することができるが、挙動に詳しくないと外部から使用できないため、クロージャを考慮した関数のスコープは局所的であるべきと考える。
    
    */

}
