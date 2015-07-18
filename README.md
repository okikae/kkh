mto - mojiretsu wo tanjun ni okikae masu.
=========================================

JSON 形式の辞書を参照して文字列を単純に置き換えていきます。複雑なアルゴリズムはなく、テキストエリアに入力されている文字列に対して、辞書の要素すべてを順番に検索＆置換していくだけです。

かつて旧字旧仮名を練習していた時に、それが間違っていないかどうかを Emacs 上で確認するために作成したものが原型になっています。いつの間にか登録している単語が多くなってきて「これは確認だけでなく、文章の変換目的に使えるのではないか？」と思い至り、Emacs Lisp ではじめて実装されました。

Ruby, Python, Perl, Lua, Scheme, Common Lisp, Vimscript, Golang, C#, Objective-C と実装してきました。ファイルオープン、パス、正規表現、配列、ハッシュ、引数の処理など、基本的なものしか触れていませんが、自分にとっては Hello, World! 的な課題になっています。

Visual Studio Express で GUI アプリを作ることができましたが XP 終了のため使えなくなりました。また、Sinatra で Web アプリを作ることもできましたが heroku が(無課金ユーザーに対して)先行き不明な感じになってきています。時間がかかりましたが Cocoa 版と iOS 版も作れました。

今まで JavaScript は敬遠していましたが、GitHub で動かしてみようか実装してみました。この JavaScript で実装したものは、ファイルをダウンロードしてウェブブラウザで開けばローカルで動きますし、どこかのホームページにアップロードしても(たぶん)動きます。クロスドメインなことはしてませんし。

とりあえず [ここ](http://nakinor.github.io/mto) に移動して触ってみてください。
