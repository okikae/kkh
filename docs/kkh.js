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
