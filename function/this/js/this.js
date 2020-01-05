"use strict"
/*
    strictモードである。かつthisがundefinedである。thisはundefinedを参照したまま。
    strictモードで無い。かつthisがundefinedである。thisはグローバルオブジェクトを参照するように変換される。
    strictモードで無い場合、予期せぬ変換があるためstrictモードを使用すること。
    メソッド以外の関数の場合はthisは常にundefinedを指すため関数でthisを使う必要はない。
 */



/*

thisの参照先は複数ある。

以下4つに分かれる。
・実行コンテキストにおけるthis
・コンストラクタにおけるthis
・関数とメソッドにおけるthis
・Arrow-Functionにおけるthis
*/



//まず、実行コンテキストについて
/*
html側で呼び出す際、[type="text/javascript"]または、[無記名]の場合、は実行コンテキストが"Script"となる。
html側で呼び出す際、[type="module"]の場合、実行コンテキストが"Module"となる。

*/


//コンストラクタにおけるthisはクラスにて学習するため、割愛。


{
    /*
    実行コンテキストが"Script"の場合、thisはwindowとなる。
    実行コンテキストが"Module"の場合、thisはundefinedとなる。
    */
    console.log(this);

    /*
    "Script"の場合、グローバルオブジェクトがwindowに所属することを意味している。
    一方、"Module"の場合は、undefinedとなる。
    このように実行コンテキストの違いにより、thisが参照する先が異なる場合があるので、単にwindowオブジェクトを参照したい場合は、直接参照したほうが良い。
    */

    /*
    また、Node.jsの場合は、globalというオブジェクトがトップレベルのオブジェクトとなる。
    */
}


{
    /*
    次に関数とメソッドにおけるthisがある。
    参照先を決めるルールによる違いで分類すると
    ArrowFunctionとそれ以外の関数定義で分けられる。
    */
}

{
    /*
    関数提議の種類を確認して網羅的に確認していく。
    */

    /*関数の提議の種類*/

    {
        //関数の種類
        {
            //function キーワードで宣言す関数宣言
            function fn1() {}
            //functionを式として扱う関数式
            const fn2 = function () {};
            //ArrowFunctionを使った関数式
            const fn3 = () => {};
        }

        //メソッドの種類
        {
            const obj = {
                //functionキーワードを使用したメソッド
                method1: function () {},
                //Arrow function　を使用したメソッド
                method2: () => {},
                //省略記法
                method3() {}
            };
        }

    }



    //ArrowFunction以外のthis
    {
        /*
        関数におけるthisは暗黙的に渡されるベースオブジェクトを参照する。
        
        ベースオブジェクトとは、
        メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子の一つ左にあるオブジェクトのこと。
       */


        //ベースオブジェクトがある場合。
        {
            const obj = {
                method() {}
            }
            obj.method();
            //^^これがベースオブジェクト。
        }
        //ベースオブジェクトがない場合。
        {
            function nobaseFunction() {};
            nobaseFunction();
            //^ベースオブジェクトが存在しない場合は、undefinedとなる。
        }
    }




    //関数宣言におけるthis 1
    {
        function fn1() {
            return this;
        }
        const fn2 = function () {
            return this;
        }
        console.log(fn1()); //=>undefined
        console.log(fn2()); //=>undefined

    }

    //関数宣言におけるthis 2
    {
        function outer() {
            console.log(this); //=>undefined

            function inner() {
                console.log(this); //=>undefined
            }
            //ベースオブジェクトなし
            inner(); //
        }
        //ベースオブジェクトなし
        outer();
    }

    /*
    ・"use strict"かつ関数の場合、thisはundefined
    ・not "use strict"　かつ　関数の場合は、グローバルオブジェクト
    */





    //メソッドにおけるthis 1
    {
        const obj = {
            // 関数式をプロパティの値にしたメソッド
            method1: function () {
                return this;
            },
            // 短縮記法で定義したメソッド
            method2() {
                return this;
            }
        };
        // メソッド呼び出しの場合、それぞれの`this`はベースオブジェクト(`obj`)を参照する
        // メソッド呼び出しの`.`の左にあるオブジェクトがベースオブジェクト
        console.log(obj.method1()); // => obj
        console.log(obj.method2()); // => obj
    }

    //メソッドにおけるthis2
    {
        const person = {
            fullName: "Brendan Eich",
            sayName: function () {
                // `person.fullName`と書いているのと同じ
                return this.fullName;
            }
        };
        // `person.fullName`を出力する
        console.log(person.sayName()); // => "Brendan Eich"


        //所属しているインスタンス自身をthisが指す。
    }

    //ネステしたオブジェクトとthis
    {
        const obj1 = {
            obj2: {
                obj3: {
                    method() {
                        return this;
                    }
                }
            }
        };
        // `obj1.obj2.obj3.method`メソッドの`this`は`obj3`を参照
        console.log(obj1.obj2.obj3.method() === obj1.obj2.obj3); // => true
    }

}

//thisが問題となるメソッドと関数の仕様
{
    //メソッドを関数に代入して使用する場合
    /*
    メソッドを関数オブジェクトとして変数に格納した場合、使用する際にthisが変更される。
    仮に関数オブジェクトがグローバルスコープ内の変数に格納された場合、thisはundefinedとなる。
    undefinedの状態でthisの先が呼ばれると例外が発生する。
    */
    const person = {
        fullName: "Brendan Eich",
        sayName: function () {
            // `this`は呼び出し元によってことなる
            return this.fullName;
        }
    };
    // `sayName`メソッドは`person`オブジェクトに所属する
    // `this`は`person`オブジェクトとなる
    console.log(person.sayName()); // => "Brendan Eich"
    // `person.sayName`を`say`変数に代入する
    const say = person.sayName;
    // 代入したメソッドを関数として呼ぶ
    // この`say`関数はどのオブジェクトにも所属していない
    // `this`はundefinedとなるため例外を投げる
    //say(); // => TypeError: Cannot read property 'fullName' of undefined

}

//対応
{
    //1 メソッドの中身を関数オブジェクトとして使用しない。　　1に関しては、考え方なので以上で終わり。
    //2　thisを指定して関数を呼ぶメソッドで関数を実行する。　2に関しては、以下で詳細を記述する。
    /*
    関数オブジェクトFunctionには、
    ・call
    ・apply
    ・bind
    といった明示的にthisを指定して関数を実行するメソッドが用意されている。
    暗黙的に渡されるthisの値を明示的に渡せるメソッドとなっている。
    
    関数.call(thisの値,...関数の引数);
     */
}

//対応コード例
{
    //適合コード1 call
    {

        /*
        第二引数が残余引数となっている。
        関数.call(thisの値,...関数の引数);
        */

        function say(message) {
            return `${message} ${this.fullName}！`;
        }
        const person = {
            fullName: "Brendan Eich"
        };
        // `this`を`person`にして`say`関数を呼びだす
        console.log(say.call(person, "こんにちは")); // => "こんにちは Brendan Eich！"
        // `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
        //say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined
    }

    //適合コード1 apply
    {
        /*
        第二引数が配列となっている。
        関数.apply(thisの値,[関数の引数1,関数の引数2]);
        */
        function say(message) {
            return `${message} ${this.fullName}！`;
        }
        const person = {
            fullName: "Brendan Eich"
        };
        // `this`を`person`にして`say`関数を呼びだす
        // callとは異なり引数を配列として渡す
        console.log(say.apply(person, ["こんにちは"])); // => "こんにちは Brendan Eich！"
    }

    //callとapplyの補足　・thisが不要な場合
    {
        //thisが不要な場合
        /*
        慣習的にnullとする。
        上の慣習は、callの場合もapplyの場合も同様。
        */

        function add(x, y) {
            return x + y;
        }
        // `this`が不要な場合は、nullを渡す
        console.log(add.call(null, 1, 2)); // => 3
        console.log(add.apply(null, [1, 2])); // => 3
    }



    //適合コード3　bind
    {
        /*
        bindはthisの値を束縛した新しい関数を作成する関数。
        
        関数.bind(thisの値,...関数の引数);//=>thisや引数がbindされた関数
        */

        function say(message) {
            return `${message} ${this.fullName}！`;
        }
        const person = {
            fullName: "Brendan Eich"
        };
        // `this`を`person`に束縛した`say`関数をラップした関数を作る
        const sayPerson = say.bind(person, "こんにちは");
        console.log(sayPerson()); // => "こんにちは Brendan Eich！"


    }

    /*
        注釈
        thisやcall、bindは関数呼び出しのたびに状態を設定する必要があるため、手間が必要になる。
        基本的には、メソッドとして定義されている関数はメソッドとして呼ぶことが推奨。
        
        どうしても明示的にthisを固定したい場合にはcall,apply,bindを使用すること。
        
        */
}


//thisが問題となるコールバック関数の仕様。
{
    //Prefixerオブジェクト内のprefixArrayメソッドにコールバック関数が使用されている。
    //コールバック関数は匿名関数として定義されている。
    //匿名関数はオブジェクトに所属していないため、thisがundefinedになる。
    {
        const Prefixer = {
            prefix: "pre",
            /**
             * `strings`配列の各要素にprefixをつける
             */
            prefixArray(strings) {
                return strings.map(function (str) {
                    // コールバック関数における`this`は`undefined`となる(strict mode)
                    // そのため`this.prefix`は`undefined.prefix`となり例外が発生する
                    return this.prefix + "-" + str;
                });
            }
        };
        // `prefixArray`メソッドにおける`this`は`Prefixer`
        //Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined
    }

    //  コールバック関数を変数に格納しても同様の結果となる。
    {
        const Prefixer = {
            prefix: "pre",
            prefixArray(strings) {
                // コールバック関数は`callback()`のように呼び出される
                // そのためコールバック関数における`this`は`undefined`となる(strict mode)
                const callback = function (str) {
                    return this.prefix + "-" + str;
                };
                return strings.map(callback);
            }
        };
        // `prefixArray`メソッドにおける`this`は`Prefixer`
        //Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined
    }


    //対応1　thisを別変数に格納する。
    {
        "use strict";
        const Prefixer = {
            prefix: "pre",
            prefixArray(strings) {
                // `that`は`prefixArray`メソッド呼び出しにおける`this`となる
                // つまり`that`は`Prefixer`オブジェクトを参照する
                const that = this;
                return strings.map(function (str) {
                    // `this`ではなく`that`を参照する
                    return that.prefix + "-" + str;
                });
            }
        };
        // `prefixArray`メソッドにおける`this`は`Prefixer`
        const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
        console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

    }

    //Array#mapメソッドなどは引数としてthisを渡せる仕組みとなっている。
    //引数にthisを渡した場合    
    {
        const Prefixer = {
            prefix: "pre",
            prefixArray(strings) {
                // `Array#map`メソッドは第二引数に`this`となる値を渡せる
                return strings.map(function (str) {
                    // `this`が第二引数の値と同じになる
                    // つまり`prefixArray`メソッドと同じ`this`となる
                    return this.prefix + "-" + str;
                }, this);
            }
        };
        // `prefixArray`メソッドにおける`this`は`Prefixer`
        const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
        console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

    }

    //callを使用した場合
    {
        const Prefixer = {
            prefix: "pre",
            prefixArray(strings) {

                const fn = function (str) {
                    return this.prefix + "-" + str;
                };
                //callで関数実行し、thisを明示的に決定している。
                return strings.map((str) => fn.call(this, str));
            }
        };
        // `prefixArray`メソッドにおける`this`は`Prefixer`
        const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
        console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]   
    }

    /*
　   上記の方法でthisが不定であることを防ぐことができたが、根本的には、thisが変わることが問題だった。
    ES2015で導入されたArrow Functionはthisの定義が変更されない記述として規定された。
     */
    //since ES2015 Arrow Functionを使用した記述
    {
        const Prefixer = {
            prefix: "pre",
            prefixArray(strings) {
                return strings.map((str) => {
                    // Arrow Function自体は`this`を持たない
                    // `this`は外側の`prefixArray`関数がもつ`this`を参照する
                    // そのため`this.prefix`は"pre"となる
                    return this.prefix + "-" + str;
                });
            }
        };
        // この時、`prefixArray`のベースオブジェクトは`Prefixer`となる
        // つまり、`prefixArray`メソッド内の`this`は`Prefixer`を参照する
        const prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
        console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]   
    }

    //基本的に、コールバック関数では、ArrowFunctionを使用するのが一番簡潔に記述できる。

}


//Arrow Functionとthis
{
    /*
    Arrow Function自身はthisを持っていない。
    スコープチェーンで定義しているように、
    未定義の場合は一つ上の階層のスコープを再帰的に探索し一番近い階層で見つかった変数が参照される。
    thisは予約語であるため使用できないので関数定義時に静的にthisは決定される。
    */

}

//一つ上の階層のthis
{
    //関数の場合
    {
        const fn = () => {
            return this;
        }
        console.log(this === fn()); //=>true
    }
    //関数内関数の場合
    {
        function outer() {
            return () => {
                return this;
            }
        }

        const innerArrowFunction = outer();
        console.log(innerArrowFunction());
    }

    //関数内でthisを保管した場合
    {
        function outer() {
            // `outer`関数直下の`this`
            const that = this;
            // Arrow Functionで定義した関数を返す
            return () => {
                // Arrow Function自身は`this`を持たない
                // `outer`関数に`this`を書いた場合と同じ
                return that;
            };
        }
        // `outer()`と呼び出した時の`this`は`undefined`(strict mode)
        const innerArrowFunction = outer();
        console.log(innerArrowFunction()); // => undefined

    }
    //基本的に関数でのthisの使用はundefinedになるため意味がない、
    //ArrowAunctionを使用した場合も使用いない場合も挙動は同じ。

    //メソッド
    {
        const obj = {
            method() {
                const arrowFunction = () => {
                    return this;
                };
                return arrowFunction();
            }
        };
        // 通常の`this`は`obj.method`の`this`と同じ
        console.log(obj.method()); // => obj
        // `obj.method`の`this`を変更すれば、Arrow Functionの`this`も変更される
        console.log(obj.method.call("THAT")); // => "THAT"

    }
}


//thisはArrow Functionを実行する場合に使用すること。
//関数では用いないことを推奨。
//メソッドでの使用は良いが注意が必要。
//メソッドの場合でも、callメソッドなどでベースオブジェクトは変更できることを機を付ける。
