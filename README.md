Web制作スターターテンプレート v2
======================
Web制作するときに使っているスターターテンプレート バージョン2  
このテンプレートは実際に僕が制作の現場で使用しているものです。

デモ
------
http://dev.creatorish.com/demo/web-template2/demo.html

特徴
------

Web制作開始時に最低限必要なCSSやJS、ソーシャルボタンの設定等があらかじめ用意されているHTML5テンプレートです。  
OGP設定やスマートデバイス用metaなど忘れがちな記述が既にされています。  
ロールオーバーでの画像切り替えやスムーススクロール、SNSボタンの設置用JSライブラリが同梱されています。
使いやすいようにカスタマイズしてご利用ください。

含まれるライブラリ
------

### CSS ###
+    [reset.css](http://html5doctor.com/html-5-reset-stylesheet/)
+    [normalize.css](http://necolas.github.com/normalize.css/)
+    [gridish.css](http://dev.creatorish.com/demo/gridish/)(オリジナル)

### JS ###

+    [jQuery 1.8](http://jquery.com/)
+    [jQuery Easing Plugin 1.3](http://gsgd.co.uk/sandbox/jquery/easing/)
+    [html5shiv.js](http://code.google.com/p/html5shiv/)
+    [IE9.js](http://code.google.com/p/ie7-js/)
+    [IE7-squish.js](http://code.google.com/p/ie7-js/)
+    snipet.js(オリジナル)
+    social-button.js(オリジナル)

使い方
------

### ロールオーバー ###

画像名を「○○_off.jpg」や「××_off.png」のように_offをファイル名の最後に付けます。  
ロールーオーバー時に表示したい画像を「○○_on.jpg」「××_on.png」というファイル名で用意します。  
これで自動的に_offの画像にマウスが乗ると、_onの画像に切り替わります。

### スムーススクロール ###

[smoothScroll]:http://creatorish.com/lab/5393
js/common.jsに以下のようにあらかじめ記述されています。

    jQuery("a[href^='#']").smoothScroll({
        easing: "swing",
        duration: 300
    });

上記の記述はaタグにhref="#○○"の記述がある要素をクリックするとスムーススクロールを実行するものです。  
easingでスクロールのイージングを、durationでスクロール時間を設定します。  
このプラグインの詳しい説明は[smoothScroll]をご覧ください。

### ソーシャルボタン ###

js/common.jsに以下のようにあらかじめ記述されています。

    $(document.body).socialButton({
        //FacebookいいねボタンAppID
        appId: null,
        //使用するSNS
        social: {
            facebook: true,
            twitter: true,
            hatena: true,
            pinterest: true,
            google: true
        }
    });

Facebookのいいねボタンを使用する場合はAppIDを記述してください。  
デフォルトではソーシャルサービス全てtrue(使用する)になっています。  
不要なサービスはfalse(使用しない)に変更してください。
ソーシャルボタンをすべて使用しない場合はこの記述を削除してください。  

※ソーシャルボタンはローカル環境では正常に動作しません。

### グリッドシステム ###

[Gridish]: http://creatorish.com/lab/1267
グリッドCSSはIE6から対応の自作グリッドCSSシステムの[Gridish]を使用しています。  
グリッドの幅や間隔をリンク先のジェネレーターで変更可能です。

ライセンス
--------
[MIT]: http://www.opensource.org/licenses/mit-license.php
[GPL2]: http://www.gnu.org/licenses/gpl-2.0.html
[MIT]/[GPL2] Licensed.

Template/snipet.js/social-button.js/gridish.css: Copyright &copy; 2012 creatorish.com  
normalize.css: Copyright (c) Nicolas Gallagher and Jonathan Neal  
reset.css: Copyright (c) html5doctor.com  
jQuery: Copyright (c) jquery.com | jquery.org  
jQuery Easing Plugin: Copyright (c) George McGinley Smith  
html5shiv: Copyright (c) Alexander Farkas, Jonathan Neal, and Paul Irish, John-David Dalton.  
IE9.js/IE7-squish.js: Copyright (c) Dean Edwards  

作者
--------
creatorish yuu  
Weblog: <http://creatorish.com>  
Facebook: <http://facebook.com/creatorish>  
Twitter: <http://twitter.jp/creatorish>