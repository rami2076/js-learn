//"use strict";

//オブジェクトとは？
/*
オブジェクトは、プロパティの集合。

プロパティは、キーとバリューが対になったもの。

オブジェクトは複数のプロパティを持つことが可能。
 */

//オブジェクトの一種。
/*
配列や関数もオブジェクトの一種。
*/

//あらゆるオブジェクトの元
/*
あらゆるオブジェクトの元としてObjectが存在する。
Objectはビルトインオブジェクトの一つ。
ビルトインオブジェクトは、実行環境に組み込まれたオブジェクトのこと。
ObjectはECMAScriptの仕様で定義されているため、あらゆるJavaScriptの実行環境で利用可能。
 */

//注釈
/*
今後、このドキュメントでは、
アルファベット表記のObjectはあらゆるオブジェクトの元になったObjectを指し、
カタカナ表記のオブジェクトは、Objectを継承したオブジェクトを指す。
 */


//オブジェクトの作成
{
    //初期化1
    {
        //オブジェクトの作成には、{}オブジェクトリテラルを利用する。
        //プロパティを持たない、空のオブジェクトの初期化
        const obj = {};
        console.log(obj);
    }


    //初期化2
    {
        //プロパティを持つオブジェクト。
        //コロンでキーとバリューを区切りエントリを定義する。
        //複数プロパティを定義する際はカンマで区切る。
        const obj = {
            //key:value,
            //key2:value
            "key": "value", //キーはダブルクォートで定義可能。
            key2: "value2" //クォートは省略可能。
        };
        console.log(obj);
    }

    //プロパティの制約
    {
        const obj = {

            //my-prop: "value" ハイフンのあるキー名は使用できない。
            "my-prop": "value" //ハイフン付きのキー名を使用する場合は、文字列にする必要がある。
        }
    }

    //プロパティの値
    {
        //プロパティの値には変数が使用できる。
        //プロパティのキーはあ変数の影響を受けない。
        //例
        const name = "太郎";
        const obj = {
            name: name, //値のみ変数を参照
            age: 9
        }
        console.log(obj.name); //値の辺陬が参照できていることを確認。
        console.log(obj.age);
    }

    //Since ES2015 初期化の省略。
    {
        const name = "book";
        const obj = {
            name
        }
        console.log(obj.name);
    }


}




//{}はobjectのインスタンスオブジェクト
{
    /*
    オブジェクトリテラル{}で作成したオブジェクトはビルドインオブジェクトのObjectのインスタンスです。
    new演算子を使用して作成するObjectインスタンスと同じ意味となる。
    //以下は参照
    参考:https://teratail.com/questions/156334
     */
    const obj = new Object();
    console.log(obj);

    /*
    new 演算子を使用した場合、プロパティの初期値の指定ができない。
    new　演算子よりも{}の方がシンプル。
    単純なobjectのインスタンスを使用する場合は、new演算子を使用する利点はない。
    */

    const obj2 = {};
    console.log(obj2);

    //objとobj2は同等のデータ。

}

//プロパティへのアクセス
{

    /*
    ドット記法またはブラケット記法で参照。
    先頭が数字またはハイフンを含むキーの場合、ブラケット記法でのみアクセス可能。
    ブラケット記法の場合は、参照時に変数を使用することが可能。
    */
    //コード割愛

}

//since ES2015 オブジェクトと分割代入
{

    const lang = {
        ja: "日本語",
        en: "英語"
    }


    //分割代入をしない場合
    {
        //オブジェクト内の要素を抽出する際にほぼ同じコードが量産される。
        const ja = lang.ja;
        const en = lang.en;
        console.log(`分割代入をしない場合、ja:${ja},en:${en}`);
    }
    //分割代入する場合
    {
        //定義順に代入。
        {
            const {
                ja,
                en
            } = lang;
            console.log(`分割代入をした場合[正順]、ja:${ja},en:${en}`);
        }
        //定義順序を変更して代入
        {
            const {
                en, //オブジェクトに定義されたキーと同じ値を格納する。
                ja
            } = lang;
            console.log(`分割代入をした場合[逆順]、ja:${ja},en:${en}`);
        }
    }
}



//プロパティの追加
{



    //ドット記法
    {
        const obj = {};
        //`key`プロパティを追加
        obj.key = "value";
        console.log(obj.key);
    }

    //ブラケット記法
    {
        const obj = {};
        obj["key"] = "value2";
        console.log(obj.key);
    }

    //ブラケット記法のメリット
    {
        /*
        キー定義に変数を使用できる
        変数の識別子で扱えない文字を扱える
        Symbol
        */




        //プロパティのキー名に関する補足。
        {
            /*
            //Since ES2015 [Computed property names]
            オブジェクトを定義する際のキー名に変数を使用できないと以前記述したが、
            ブラケット記法を使用することでキー名にも変数を利用できる。
            */

            //ブラケット記法を用いたオブジェクトのキー設定
            const myKey = "key3";
            const obj3 = {
                [myKey]: "value3"
            };
            console.log(obj3[myKey]);
            console.log(obj3.key3)
        }
    }

    //注意

    //問題
    /*
    JavaScriptのオブジェクトはミュータブルの特性を持つのでプロパティの追加がいつでもどこでも行うことができる。
    開発者が設計者の意図やオブジェクトの意図を無視して追加することができることが問題。
    */

    //対応
    /*
    プロパティは初期化時以外では追加しないようにすること。
    オブジェクトが持つプロパティが分かりにくくなり、保守コストが上がるため。
    */

    //悪い例
    function changeProperty(bad_obj) {
        bad_obj.key = "bad value";
        //様々な処理...
    }
    const bad_obj = {};
    changeProperty(bad_obj);
    console.log(bad_obj.key);


}




//プロパティの削除
{
    /*
    削除にはdelete演算子を利用する。
    */
    const obj = {
        key1: "V1",
        key2: "V2"
    }
    delete obj.key1;
    console.log(obj); //削除されたことを確認。

    //注意
    /*
    追加と同様、濫用は避けること。
    */

}


//プロパティの値の変更
{

    /*
    定数キーワードのconstを使用した際、オブジェクトが持つ値の変更は当然可能。
    */

    const obj = { //定数キーワードのconstを利用。
        name: "Taro"
    }
    //プロパティの値の変更
    obj.name = "Yuji";
    console.log(obj.name); //変更を確認


}


//オブジェクトの変更
{
    /*
    オブジェクト自体を変更することは構文エラーとなる。
    */
    const obj = {
        name: "Taro"
    }
    //obj = {};=>NGコード

    //let キーワードの場合は当然変更可能。(非推奨)
    let o = {
        name: "instance"
    }
    //オブジェクトの上書き。
    o = {
        num: 100
    }
    console.log(o.num);
}


//オブジェクトのプロパティの凍結
{
    "use strict"; //必ず先頭に記述しないと意味がない。


    //objectの内容も凍結したい場合はObjectのfreezeメソッドを使用する。
    //freezeを使用することで、プロパティが読み取り専用になる。

    const object = Object.freeze({
        key: "value"
    });
    object.key = "val"; //"use strict"をファイルの先頭行に記述することで、厳格モードに移行し、例外が発生する。
    //Uncaught TypeError: Cannot assign to read only property 'key' of object '#<Object>'
    //freezeメソッドを使用する場合は、厳格モードにしないと片手落ちとなる。
    //厳格モードでない場合は、変更処理が無視されるだけなので、バグの温床となるため、厳格モードにすること。


}


//存在しないプロパティに対する挙動
{

    /*
    厳格モードであっても、厳格モードでなくても、存在しないプロパティにアクセスした場合、
    `undefined`が返却され、例外は発生しない。undefinedはnullと同様、オブジェクトでないためアクセスすると例外が発生する。
     */
    const obj = {};
    console.log(obj.key);



    //存在しないプロパティにアクセスした場合に困る例。
    //   {
    //       const widget = {
    //           window: {
    //               title: "ウィジェットのタイトル"
    //            }
    //        };
    // `window`を`windw`と間違えているが、例外は発生しない
    //        console.log(widget.windw); // => undefined
    // さらにネストした場合に、例外が発生する
    // `undefined.title`と書いたのと同じ意味となるため
    //        console.log(widget.windw.title); // => TypeError: widget.windw is undefined
    // 例外が発生した文以降は実行されません
    //    }
}



//プロパティの存在確認
{
    /*
    プロパティの存在確認方法は以下三つ
    ・undefinedとの比較
    ・in 演算子
    ・hasOwnPropertyメソッド
    */


    const obj = {
        key: "value",
        key_d: undefined
    };



    //undefinedとの比較
    {
        if (obj.key !== undefined) {
            console.log(`obj.keyは存在する。`);

        }

        if (obj.key2 !== undefined) {
            console.log(`obj.key2は存在する。`);

        } else {
            console.log(`obj.key2は存在しない。`);
        }

        //undefinedの問題点
        /*
        プロパティが存在しないのか。
        値がundefinedなのか判断できないことが問題。
         */

        //解決法
        /*
        in演算子または、hasOwnPropertyメソッドを利用し存在を確認する。
         */
    }


    //in演算子
    {
        //キー名は文字列で指定する。
        if ("key_d" in obj) { //存在する場合=>true節へ
            console.log("key_dは、存在する");
        } else { //存在しない場合=>else節へ
            console.log("key_dは、存在しない");
        }
    }
    //hasOwnPropertyメソッド
    {
        //キー名は文字列で指定する。
        if (obj.hasOwnProperty("key_d")) { //存在する場合=>true節へ
            console.log("key_dは、存在する");
        } else { //存在しない場合=>else節へ
            console.log("key_dは、存在しない");
        }
    }

    //in演算子とhasOwnPropertyは厳密には異なる挙動。
    //プロトタイプオブジェクトについて理解している必要があるため、
    //ここでの言及は避け、プロトタイプオブジェクト学習時に再度確認する。
}


//toStringメソッドについて
{
    //オブジェクトは暗黙的にtoStringメソッドを使用できる。
    //toStringメソッドはオーバーライドできる。
    //toStringはインスタンスメソッド。
    const obj = {
        key: "value"
    };

    //オーバライド前の状態の確認
    console.log(obj.toString());
    console.log(String(obj));

    //toSringの再定義。
    obj.toString = () => "key is \"key\".\nvalue is \"" + obj.key + "\".";
    console.log(obj.toString());
    console.log(String(obj));
    //Stringコンストラクタを使用するとオブジェクトのtoStringメソッドが呼ばれている挙動が確認できる。

}

//オブジェクトはオブジェクト内のプロパティのキーに設定できない。
{
    //オブジェクトのプロパティのキーはシンボルを除き、文字列化されバリューを管理する。
    //オブジェクトをキーに設定はできる。
    //オブジェクトの文字列はtoStringした値となる。[Object Object]
    //すべてのObjectは区別されないのでキーとして不適切となる。
    const obj = {};
    const keyObject1 = {
        a: 1
    };
    const keyObject2 = {
        b: 2
    };
    obj[keyObject1] = "1";
    obj[keyObject2] = "2";
    //参照の結果
    console.log(obj[keyObject1]);
    console.log(obj[keyObject2]);
    console.log(obj);
    console.log(keyObject1.toString());
    console.log(keyObject2.toString());

}

//シンボルを使用したオブジェクトの参照。
{

    const obj = {};
    // Symbolは例外的に文字列化されず扱える
    const symbolKey1 = Symbol("シンボル1");
    const symbolKey2 = Symbol("シンボル2");
    obj[symbolKey1] = "1";
    obj[symbolKey2] = "2";
    console.log(obj[symbolKey1]); // => "1"
    console.log(obj[symbolKey2]); // => "2"

    console.log(symbolKey1.toString());
    console.log(symbolKey2.toString());
}


//オブジェクトの代表的な静的メソッド。
{
    //列挙
    {
        //以下の列挙は以下の三つが存在する。　コードはすでに記述済みなので割愛。
        /*
        ・Object#keys                    キーの配列を返却
        ・Object#values  @since ES2017   バリューの配列を返却
        ・Object#entries @since ES2017   エントリの配列を返却
        */

    }


    //マージ
    {
        //オブジェクトのマージはObject#assignを使用する。
        //const obj = Object.assign(target,...sources);assign:配属するなどが日本語訳
        //引数target Objectが返却される。
        //sourcesがマージするオブジェクト

        //新規オブジェクトを指定した場合
        {
            const objectA = {
                a: "a"
            };
            const objectB = {
                b: "b"
            };
            const merged = Object.assign({}, objectA, objectB);
            console.log(merged); // => { a: "a", b: "b" }
        }


        //既存オブジェクトを指定した場合
        {
            const objectA = {
                a: "a"
            };
            const objectB = {
                b: "b"
            };

            const objectC = {
                c: "c"
            };
            const merged = Object.assign(objectC, objectA, objectB);
            console.log(merged); //=>{c: "c", a: "a", b: "b"}
            console.log(objectC);
            console.log(objectC === merged); //=>true
        }


        //Object#assignメソッドの第一引数のtargetは空Objectにすることが典型的な方法。
        //マージのターゲットに既存objectを指定した場合、なんらかの影響が発生するため。

        //マージ対象のソースオブジェクトのプロパティ名が同じ場合は、最後のオブジェクトのプロパティに対応する値で上書きされる。



        //since ES2018 spread構文でのマージ
        {
            //object#assign同様、重複するプロパティは後方が優先される。

            const objectA = {
                a: "a"
            };
            const objectB = {
                b: "b"
            };
            const merged = {
                //新規のオブジェクトを作成する際にのみ利用できる構文なので、Object#assignより安全性が高い。
                ...objectA, //この部分がspread構文。
                ...objectB //Objectのプロパティを展開している。
            };
            console.log(merged); // => { a: "a", b: "b" }
        }


    }
    //複製
    {
        /*
        JavaScriptにはオブジェクトを複製する関数は用意されていない。
        複製する場合は、マージを行う方法を利用して複製を行う。
        */


        //浅い複製。
        {
            // 引数の`obj`を浅く複製したオブジェクトを返す
            const shallowClone = (obj) => {
                return Object.assign({}, obj);
            };
            const obj = {
                a: "a"
            };
            const cloneObj = shallowClone(obj);
            console.log(obj);
            console.log(cloneObj); // => { a: "a" }
            // オブジェクトを複製しているので、異なるオブジェクトとなる
            console.log(obj === cloneObj); // => false
        }



        //浅い複製であることの確認
        {
            const shallowClone = (obj) => {
                return Object.assign({}, obj);
            };
            const obj = {
                level: 1,
                nest: {
                    level: 2
                },
            };
            const cloneObj = shallowClone(obj);
            // `nest`オブジェクトは複製されていない
            console.log(cloneObj.nest === obj.nest); // => true
            //参照先が同じであるため、参照先の値が等価である。
            //複製ができていないことを確認できる。
        }


        //深い複製をする場合
        {
            // 引数の`obj`を浅く複製したオブジェクトを返す
            const shallowClone = (obj) => {
                return Object.assign({}, obj);
            };
            // 引数の`obj`を深く複製したオブジェクトを返す
            function deepClone(obj) {
                const newObj = shallowClone(obj);
                // プロパティがオブジェクト型であるなら、再帰的に複製する
                Object.keys(newObj)
                    .filter(k => typeof newObj[k] === "object")
                    .forEach(k => newObj[k] = deepClone(newObj[k]));
                return newObj;
            }
            const obj = {
                level: 1,
                nest: {
                    level: 2
                }
            };
            const cloneObj = deepClone(obj);
            // `nest`オブジェクトも再帰的に複製されている
            console.log(cloneObj.nest === obj.nest); // => false
        }
    }
}

/*
より複雑な機能はユーザ側で実装するという形式をとるため
JavaScriptは最低限の機能を提供しているが、複雑な機能を提供していないことが多い。
また、ユーザが作成した小さな機能をもつライブラリがnpmと呼ばれるパッケージ管理ツールで数多く公開されている。
それらを活用も検討するべし。
*/
