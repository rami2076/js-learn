/*

時刻ライブラリ


便利な外部ライブラリ
https://momentjs.com/
*/




// moment.jsで現在時刻のmomentオブジェクトを作る
const now = moment();
// addメソッドで10分進める
const future = now.add(10, "minutes");
// formatメソッドで任意の書式の文字列に変換する
console.log(future.format("YYYY/MM/DD"));



//現在の時刻をインスタンス化する。
{
    //インスタンスの取得。
    const now = new Date();
    //現在の時刻値(数値)だけ知りたい場合
    console.log(Date.now());

    //インスタンスから時刻値を取得
    console.log(now.getTime());
    //インスタンスからISO 8601形式の文字列で表示する。
    console.log(now.toISOString());

    console.log(now.toLocaleDateString());
}


//任意の時刻をインスタンス化する。1
{
    // 時刻のミリ秒値を直接指定する形式
    // 1136214245999はUTCにおける"2006年1月2日15時04分05秒999"を表す
    const date = new Date(1136214245999);
    // 末尾の'Z'はUTCであることを表す
    console.log(date.toISOString()); // => "2006-01-02T15:04:05.999Z" 


    //わかりづらい
}

//任意の時刻をインスタンス化する。2
{
    // UTCにおける"2006年1月2日15時04分05秒999"を表すISO 8601形式の文字列
    const inUTC = new Date("2006-01-02T15:04:05.999Z");
    console.log(inUTC.toISOString()); // => "2006-01-02T15:04:05.999Z"

    // 上記の例とは異なり、UTCであることを表す'Z'がついていないことに注意
    // Asia/Tokyo(+09:00)で実行すると、UTCにおける表記は9時間前の06時04分05秒になる
    const inLocal = new Date("2006-01-02T15:04:05.999");
    console.log(inLocal.toISOString()); // "2006-01-02T06:04:05.999Z" (Asia/Tokyoの場合)
}


//任意の時刻をインスタンス化する。3
{
    //デフォルト値:day=1。その他=0。
    //new Date(year, month, day, hour, minutes, seconds, milliseconds);
    //month initial = 0(一月) last 11(12月)
    //タイムゾーン指定はできない。
    //コンストラクタに二つ以上の引数を渡すとオーバーロードされる。
    //結果がOSに依存するのでDate.UTCで初期化する方法が推奨。

    // 実行環境における"2006年1月2日15時04分05秒999"を表す
    // タイムゾーンを指定することはできない
    const date1 = new Date(2006, 0, 2, 15, 4, 5, 999);
    console.log(date1.toISOString()); // "2006-01-02T06:04:05.999Z" (Asia/Tokyoの場合)

    // Date.UTCメソッドを使うとUTCに固定できる
    const ms = Date.UTC(2006, 0, 2, 15, 4, 5, 999); //数値型で返却される。
    // 時刻値を渡すコンストラクタと併用する
    const date2 = new Date(ms);
    console.log(date2.toISOString()); // => "2006-01-02T15:04:05.999Z"
}

//不正な値の場合NaN
{

    /*
    時刻としてパースできない
    型が異なる場合に発生。
    */

    // 不正なDateインスタンスを作成する
    const invalid = new Date("");
    console.log(invalid.getTime()); // => NaN
    console.log(invalid.toString()); // => "Invalid Date"
}


//Dateインスタンスのメソッドを使った表示形式のフォーマット
{
    // YYYY/MM/DD形式の文字列に変換する関数
    function formatDate(date) {
        const yyyy = String(date.getFullYear());
        // String#padStartメソッド（ES2017）で2桁になるように0埋めする
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}/${mm}/${dd}`;
    }

    const date = new Date("2006-01-02T15:04:05.999");
    console.log(formatDate(date)); // => "2006/01/02"
}


//UTCからのオフセット時間を取得できる。
{
    // getTimezoneOffsetはインスタンスメソッドなので、インスタンスが必要
    const now = new Date();
    // 時間単位にしたタイムゾーンオフセット
    const timezoneOffsetInHours = now.getTimezoneOffset() / 60;
    // UTCの現在の時間を計算できる
    console.log(`Hours in UTC: ${now.getHours() + timezoneOffsetInHours}`);
}


/*
現実的には、実践的なメソッドが少ないため、最初に記述した外部ライブラリを使うことが一般的。
時刻に関するライブラリは最初に挙げた、moment.js以外にもjs-joda、date-fnsなどがある。。
*/