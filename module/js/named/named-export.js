//名前付きエクスポート

//波括弧で囲み変数または関数を外部にエクスポートする。
const foo = "FOO";

export {
    foo
};

//メンバー宣言と同時にエクスポートする場合
export function bar() {
    console.log(foo);
};


{
    //グローバルスコープの変数でない場合は例外が発生する。
    const a = "A";
    //export {a};

    //構文エラーとなる。
}
