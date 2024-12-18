#!/bin/sh
# vim:ts=4:
# Author: 奈幾乃(uakms)
# Created: 2024-12-13
# Revised: 2024-12-17

## 踊り字 (々) 同の字点 (U+3005)
## (縦書き)踊り字 (〻) 二の字点 (U+303B)
## かな踊り字 (ゝゞ) 一の字点 (U+309D と U+309E)
## カナ踊り字 (ヽヾ) 一の字点 (U+30FD と U+30FE)
## 縦書き踊り字 (〱〲〳〴〵) くの字点 (U+3031 から U+3035)
##
## sed へのキーワード
## 誤変換
## 順方向(新->旧)での単語書き出しをしない: 「新旧誤変換」「新旧変換で不要」
## 逆方向(旧->新)での単語書き出しをしない: 「旧新誤変換」「旧新変換で不要」
##
## 専用(拡張)変換
## 「踊り字」「外来語」「合略仮名」「ヤ行エ」
##
## 辞書の種類
## 標準変換用辞書：「踊り字」「外来語」「合略仮名」「ヤ行エ」を除いたもの
##                  かな辞書・漢字辞書共に「新から旧」「旧から新」用で出力
##                  - 「かな新」 tomodernkanajisyo.ts
##                      「旧新誤変換」「旧新変換で不要」の語句を除いたもの
##                  - 「かな旧」 totradkanajisyo.ts
##                      「新旧誤変換」「新旧変換で不要」の語句を除いたもの
##                  - 「漢字新」 tonewkanjijisyo
##                      「旧新誤変換」「旧新変換で不要」の語句を除いたもの
##                  - 「漢字旧」 tooldkanjijisyo.ts
##                      「新旧誤変換」「新旧変換で不要」の語句を除いたもの
##                  の 4 つ
##
## 拡張変換用辞書：各種別ごとに辞書へ書き出して拡張版として利用する
##                 新旧・旧新誤変換は考えない
##                 辞書は今まで通りの [要素1 要素2] の順番になっている JSON
##                 だが、flag で切り替えて逆方向への変換もできる
##                  - 「踊り字」   odorienhancejisyo.ts
##                      踊り字を含む旧かな文章を新かな文章に変換、もしくはその逆
##                      に対しては有効だが、踊り字を使っている新かな文章に対して
##                      は機能しないこともある。次の語句が登録されていないから
##                        ["そう〳〵", "さう〳〵"] 新かな<->旧仮名
##                        ["そうそう", "そう〳〵"] 新かな<->新かな
##                        ["さうさう", "さう〳〵"] 旧仮名<->旧仮名
##                      踊り字はそのままで旧かな新かなを変換したい
##                      新かなのままで踊り字を使いたい
##                      旧かなのままで踊り字を使いたい
##                      等の個人的な要望に対応しきれないので、それは各人で辞書を
##                      好みに修正するのだッ！となる
##                  - 「外来語」   gairaienhancejisyo.ts
##                     これはほぼ一対なので、このままでもある程度は機能しそう
##                  - 「合略仮名」 gouryakuenhancejisyo.ts
##                     合略仮名が使われてるものを現代文に変更する用途しかできない
##                     「より」や「コト」を「ゟ」「ヿ」へ変換するとなると、
##                     テキスト中に対象文字列があり過ぎて機能不全になる
##                  - 「ヤ行エ」   yeenhancejisyo.ts
##                     これもヤ行エが使われているものを現代文に変更する用途のみ
##                     問題点も合略仮名と同じ
##                     フォントが無いからわからん
##                  の 4 つ
##
## IVS は手をつけない。

# このディレクトリ内で `sh ./convert.sh` を実行するのだ
TOOL=$PWD/../jisyotool/jisyotool

## HTML で使う JSON 形式 (拡張子 ".js")
#
# 新かな->旧かな  "normal"  「踊り字」「外来語」「合略仮名」「ヤ行エ」なし
# "var toTradKanaArray", "dic-to-trad-kana.js"
echo "export to docs/dic-to-trad-kana.js"
sed -e '/新旧誤変換\|新旧変換で不要\|踊り字\|外来語\|合略仮名\|ヤ行エ/s/^/;/g' kana-jisyo > tmp
$TOOL -jn tmp | sed -e '1ivar toTradKanaArray =' > docs/dic-to-trad-kana.js

# 旧かな->新かな  "reverse"  「踊り字」「外来語」「合略仮名」「ヤ行エ」なし
# "var toModernKanaArray", "dic-to-modern-kana.js"
echo "export to docs/dic-to-modern-kana.js"
sed -e '/旧新誤変換\|旧新変換で不要\|踊り字\|外来語\|合略仮名\|ヤ行エ/s/^/;/g' kana-jisyo > tmp
$TOOL -jr tmp | sed -e '1ivar toModernKanaArray =' > docs/dic-to-modern-kana.js

# 新字体->旧字体  "normal"  二の字点、同の字点なし
# "var toOldKanjiArray", "dic-to-old-kanji.js"
echo "export to docs/dic-to-old-kanji.js"
sed -e '/新旧誤変換\|新旧変換で不要\|字点/s/^/;/g' kanji-jisyo > tmp
$TOOL -jn tmp | sed -e '1ivar toOldKanjiArray =' > docs/dic-to-old-kanji.js

# 旧字体->新字体  "reverse"  二の字点、同の字点なし
# "var toNewKanjiArray", "dic-to-new-kanji.js"
echo "export to docs/dic-to-new-kanji.js"
sed -e '/旧新誤変換\|旧新変換で不要\|字点/s/^/;/g' kanji-jisyo > tmp
$TOOL -jr tmp | sed -e '1ivar toNewKanjiArray =' > docs/dic-to-new-kanji.js

### Enhance dictionary
# 新かな->旧かな  "normal" 「踊り字」「字点」のみ
# "var odoriEnhanceArray", "dic-odori-enhance.js"
echo "export to docs/dic-odori-enhance.js"
sed -e '/踊り字/!s/^/;/g' kana-jisyo > tmp
sed -e '/字点/!s/^/;/g' kanji-jisyo >> tmp
$TOOL -jn tmp | sed -e '1ivar odoriEnhanceArray =' > docs/dic-odori-enhance.js

# 新かな->旧かな  "normal" 「外来語」のみ
# "var gairaiEnhanceArray", "dic-gairai-enhance.js"
echo "export to docs/dic-gairai-enhance.js"
sed -e '/外来語/!s/^/;/g' kana-jisyo > tmp
$TOOL -jn tmp | sed -e '1ivar gairaiEnhanceArray =' > docs/dic-gairai-enhance.js

# 新かな->旧かな  "normal" 「合略仮名」のみ
# "var gouryakuEnhanceArray", "dic-gouryaku-enhance.js"
echo "export to docs/dic-gouryaku-enhance.js"
sed -e '/合略仮名/!s/^/;/g' kana-jisyo > tmp
$TOOL -jn tmp | sed -e '1ivar gouryakuEnhanceArray =' > docs/dic-gouryaku-enhance.js

# 新かな->旧かな  "normal" 「ヤ行エ」のみ
# "var yeEnhanceArray", "dic-ye-enhance.js"
echo "export to docs/dic-ye-enhance.js"
sed -e '/ヤ行エ/!s/^/;/g' kana-jisyo > tmp
$TOOL -jn tmp | sed -e '1ivar yeEnhanceArray =' > docs/dic-ye-enhance.js

# お掃除
rm tmp
