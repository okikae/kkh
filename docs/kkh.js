// Author: nakinor
// Created: 2014-04-06
// Revised: 2024-12-01
//2025-07-30 kkh-Ver.2.0.0拗促音を小書きにする設定の追加。読み仮名変換、IVS削除変換の機能追加。

function gsub(str, key, val) {
  return str.split(key).join(val);
}

// for pc page
function del() {
    document.kkh.bef.value = "";
}

function toBeforeTextArea() {
    var str = document.kkh.aft.value;
    document.kkh.bef.value = str;
    document.kkh.aft.value = "";
}

function deleteIVS(str) {
    var vs_re = /%F3%A0%84%8[0-9|A-F]/;
    var enc_str = encodeURIComponent(str);
    var novs_str = gsub(enc_str, vs_re, "");
    var dec_str = decodeURIComponent(novs_str);
    return dec_str;
}

function deleteIVS2(){
    var str = document.kkh.bef.value;
    processedStr = deleteIVS(str);
    document.kkh.aft.value = processedStr;
}

function executeBasedOnCheckbox2(jisyo1, jisyo2, jisyo3, flag) {
    var small_kana = document.forms.kkh.small_kana_yes.checked;
    if (small_kana === true) {//捨假名がオンのとき
        if (flag === 0) {//新から舊
            return replaceStrings3(jisyo1, jisyo2, jisyo3, flag);
        } else if (flag === 1) {//舊から新
            return replaceStrings3(jisyo1, jisyo2, jisyo3, flag);
        }
    } else {//捨假名がオフのとき
        if (flag === 0) {//新から舊
            return replaceStrings2(jisyo2, jisyo3, flag);
        } else if (flag === 1) {//舊から新
            return replaceStrings2(jisyo1, jisyo2, flag);
        }
    }
}

function executeBasedOnCheckbox(jisyo1, jisyo2, flag) {
    var small_kana = document.forms.kkh.small_kana_yes.checked;
    if (small_kana === true) {//捨假名がオンのとき
        if (flag === 0) {//新から舊
            return replaceStrings2(jisyo1, jisyo2, flag);
        } else if (flag === 1) {//舊から新
            return replaceStrings2(jisyo1, jisyo2, flag);
        }
    } else {//捨假名がオフのとき
        if (flag === 0) {//新から舊
            return replaceStrings(jisyo2, flag);
        } else if (flag === 1) {//舊から新
            return replaceStrings(jisyo1, flag);
        }
    }
}

function replaceStrings3(jisyo1, jisyo2, jisyo3, flag) {
    var str = document.kkh.bef.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {//新から舊
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][0], jisyo2[i][1]);
        }
        for (var i = 0; i < jisyo3.length; i++) {
            str = gsub(str, jisyo3[i][0], jisyo3[i][1]);
        }
    } else if (flag == 1) {//舊から新
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][1], jisyo2[i][0]);
        }
        for (var i = 0; i < jisyo3.length; i++) {
            str = gsub(str, jisyo3[i][1], jisyo3[i][0]);
        }
    } 
    document.kkh.aft.value = str;
}

function replaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.bef.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {//新から舊
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {//舊から新
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function replaceStrings(jisyo, flag) {
    var str = document.kkh.bef.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {//新から舊
        for (var i = 0; i < jisyo.length; i++) {
            str = gsub(str, jisyo[i][0], jisyo[i][1]);
        }
    } else if (flag == 1) {//舊から新
        for (var i = 0; i < jisyo.length; i++) {
            str = gsub(str, jisyo[i][1], jisyo[i][0]);
        }
    }
    document.kkh.aft.value = str;
}

function dictElements() {
    var total = kanaArray.length + smallArray.length + kanjiArray.length + jionArray.length;
    var kana_length = kanaArray.length + smallArray.length;
    document.write("<p>現時点での辞書の要素数は " + total +
                   "（仮名変換用:" + kana_length + 
                   " 漢字変換用:" + kanjiArray.length + 
                   " 読み仮名変換用:" + jionArray.length + "）</p>");//要素数表示に読み仮名も追加
}

function readFileInLocal() {
    document.getElementById('ifile')
        .addEventListener('change',
                          function(evt) {
                              var file = evt.target.files[0];
                              var reader = new FileReader();
                              reader.readAsText(file, 'UTF-8');
                              reader.onload = function(e) {
                                  document.kkh.bef.value = reader.result;
                              }},
                          false);
}

// for mobile page
function mDel() {
    document.kkh.tArea.value = "";
}

function mReplaceStrings2(jisyo1, jisyo2, flag) {
    var str = document.kkh.tArea.value;
    var del_ivs = document.forms.kkh.del_IVS_yes.checked
    if (del_ivs == true) {
        str = deleteIVS(str);
    }
    if (flag == 0) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][0], jisyo1[i][1]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][0], jisyo2[i][1]);
        }
    } else if (flag == 1) {
        for (var i = 0; i < jisyo1.length; i++) {
            str = gsub(str, jisyo1[i][1], jisyo1[i][0]);
        }
        for (var i = 0; i < jisyo2.length; i++) {
            str = gsub(str, jisyo2[i][1], jisyo2[i][0]);
        }
    }
    document.kkh.tArea.value = str;
}

function aozoraToRuby(text) {
    if (!text) return "";

    let processedText = text.trim();

    // 1. 漢字（BMP/拡張）または サロゲートペア（補助漢字）
    const kanji = '(?:[\\u4E00-\\u9FFF\\u3400-\\u4DBF\\uF900-\\uFAFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])';
    // 2. 異体字セレクタ（IVS） ※任意なので末尾に ? を付与
    const ivs   = '(?:\\uDB40[\\uDD00-\\uDDEF])?';
    
    // 【重要】ここで全体を括弧 ( ) で囲むことで、+ が「漢字+IVS」のセットにかかるようにします
    const char1 = '(?:' + kanji + ivs + ')';

    // 1. ｜ルビ
    processedText = processedText.replace(/[｜|]([^《\n]+)《([^》\n]+)》/g, '<ruby>$1<rt>$2</rt></ruby>');

    // 2. 漢字（IVS対応）《ルビ》
    // char1 全体を繰り返すように修正
    processedText = processedText.replace(
        new RegExp('(' + char1 + '+)《([^》\\n]+)》', 'g'),
        '<ruby>$1<rt>$2</rt></ruby>'
    );

    // 3. 直前の1文字（IVS対応）
    processedText = processedText.replace(
        new RegExp('(' + char1 + '|[^｜|》\\n])《([^》\\n]+)》', 'g'),
        '<ruby>$1<rt>$2</rt></ruby>'
    );

    return processedText;
}



function syncPreviewHeight() {
    const ta = document.querySelector('textarea[name="aft"]');
    const preview = document.getElementById('aft_html_tab');
    
    // textareaがまだ表示されているうちに高さを取得して保存
    if (ta.offsetHeight > 0) {
        preview.style.height = ta.offsetHeight + "px";
    }
}

function updateHtmlPreview() {
    const text = document.kkh.aft.value;
    const html = aozoraToRuby(text);
    const content = document.getElementById("aft_html_content");
    if (content) {
        content.innerHTML = html;
    }
    // 表示されている時だけ同期
    if (document.getElementById("aft_html_tab").style.display !== "none") {
        syncPreviewHeight();
    }
}

function showAftTab(mode) {
    const textTab = document.getElementById("aft_text_tab"); // textarea本体
    const htmlTab = document.getElementById("aft_html_tab");
    const content = document.getElementById("aft_html_content");

    if (mode === "text") {
        htmlTab.style.display = "none";
        textTab.style.display = "inline-block"; // blockではなくinline-block
    } else {
        // 1. 内容更新
        content.innerHTML = aozoraToRuby(textTab.value);

        // 2. まだ表示されていない時だけ切り替え
        if (htmlTab.style.display !== "inline-block") {
            // 現在の正確な高さを取得
            const targetHeight = textTab.offsetHeight;
            
            // 切り替え
            textTab.style.display = "none";
            htmlTab.style.display = "inline-block";

            // 高さだけを同期（幅はCSSに任せる）
            htmlTab.style.height = targetHeight + "px";
        }
    }
}



