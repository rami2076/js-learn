/*
Mathは数を扱うためのメソッドが多数準備されている。
*/

//三角関数
{
    const rad90 = Math.PI * 90 / 180;
    const sin90 = Math.sin(rad90);
    console.log(sin90); // => 1
}
//乱数
{
    for (let i = 0; i < 5; i++) {
        // 毎回ランダムな浮動小数点数を返す
        console.log(Math.random());
    }
}


//範囲のある乱数
{
    // minからmaxまでの乱数を返す関数
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    // 1以上5未満の浮動小数点数を返す
    console.log(getRandom(1, 5));
}


//数値の大小
{
    console.log(Math.max(1, 10)); // => 10
    console.log(Math.min(1, 10)); // => 1
}

//数値の最大・最小
{
    const numbers = [1, 2, 3, 4, 5];
    console.log(Math.max(...numbers)); // => 5
    console.log(Math.min(...numbers)); // => 1
}


//数値のフォーマット・有効桁数の設定
{
    // 底関数
    console.log(Math.floor(1.3)); // => 1
    console.log(Math.floor(-1.3)); // => -2
    // 天井関数
    console.log(Math.ceil(1.3)); // => 2
    console.log(Math.ceil(-1.3)); // => -1
    // 四捨五入
    console.log(Math.round(1.3)); // => 1
    console.log(Math.round(1.6)); // => 2
    console.log(Math.round(-1.3)); // => -1
}


//since ES2015 Math.trac
{
    // 単純に小数部分を切り落とす
    console.log(Math.trunc(1.3)); // => 1
    console.log(Math.trunc(-1.3)); // => -1
}


//ほかにもあるが、とりあえず終了。また必要な時や暇なときに眺めること。
