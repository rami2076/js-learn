/*
タグ関数は、テンプレートリテラルを使用して一部の文字列を加工する関数を記述する際の書き方。
呼び出し方が特殊。
since ES2015 タグつきテンプレート関数とも。 　Tag function

https://jsprimer.net/basic/string/
https://qiita.com/natecotus/items/be28e1c7111270d9207d#_reference-862555f31b4ac193a55c
https://system.blog.uuum.jp/entry/2018/12/08/110000
https://kde.hateblo.jp/entry/2018/10/09/010704
*/

//タグ付きでない通常の関数呼び出し。
{
    function tag(str) {
        console.log(str);
    }

    tag(`template ${0} literal ${1}`); //=>template 0 literal 1
}

//タグ付きテンプレート関数
{
    function tag(strings, ...values) {
        //${}で区切られた配列
        console.log(strings); //=>["template ", " literal ", ""]
        //${}内の要素配列
        console.log(values); //=>[0, 1]
    }
    tag `template${0}literal${1}`;
}


//タグ付きテンプレート関数の引数の文字列をすべて結合する
{
    //タグ付きテンプレート関数の失敗版
    {
        function tag(strings, ...values) {
            return strings.reduce((concatString, currentStr, index) => {
                console.log(concatString, currentStr, values[index - 1]);
                return concatString + values[index - 1] + currentStr; //undefinedと文字列を結合すると文字列のみが残る。
            }, "syokiti"); //初期値を渡すとundefinedが無視されない。
        }
        console.log(tag `template ${"000"} literal ${"111"}`);



        console.log(undefined + "文字");
        console.log(undefined + undefined + "moji"); //=>syokitiundefinedtemplate 000 literal 111
    }



    //タグ付きテンプレート関数の成功版
    {
        function tag(strings, ...values) {
            return strings.reduce((concatString, currentStr, index) => {
                console.log(concatString, currentStr, values[index - 1]);
                return concatString + values[index - 1] + currentStr; //undefinedと文字列を結合すると文字列のみが残る。
            }); //初期値を渡さない場合、正常に動く。
        }
        console.log(tag `template ${"000"} literal ${"111"}`); //=>template   literal  000
    }

    //タグ付きテンプレート関数を使う。
    {
        function tag(strings, ...values) {
            return strings.reduce((concatString, currentStr, index) => {
                console.log(concatString, currentStr, values[index - 1]);
                return concatString + "<strong>" + values[index - 1] + "</strong>" + currentStr; //undefinedと文字列を結合すると文字列のみが残る。
            }); //初期値を渡さない場合、正常に動く。
        }
        console.log(tag `template ${"000"} literal ${"111"}`); //=>template <strong>000</strong> literal <strong>111</strong>
    }
}



/*
https://qiita.com/ConquestArrow/items/66bd3ab9fe89c9aa4e94

第一引数はrawというプロパティを持った特別な配列
TypeScriptではTemplateStringsArray
それ自体、およびrawプロパティは文字列の配列
キャッシュされる
第二引数以降は、${}で括った変数の値がそのまま入る
文字列に限らない
*/

/*
https://qiita.com/kura07/items/c9fa858870ad56dfec12
タグ付きテンプレートリテラル（func`～`）で渡される第一引数には、以下の変わった性質があります。
1. プロパティの追加・変更・削除が不可能
2. rawの文字列の配列の要素がすべて一致する場合、何度実行しても同じ配列オブジェクトを参照する
*/
