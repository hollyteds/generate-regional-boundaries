/**
 * GML境界データ出力
 * 
 * Copyright (c) 2021 Tetsuo Horiuchi
 * Released under the MIT license
 * https://opensource.org/license/mit
 * ver. 3.1
 */

/**
 * グローバル定数
 * ここの定数を変更することでフォントサイズや色、線幅を変えることができます
 */
var FONT_POINT = 6; // フォントサイズ（pt）の指定
var FONT_TYPE = "ShinGoPro-Medium"; // 指定フォント名
var STROKE_POINT = 1; // 境界線の太さ（pt）を指定
var SCALE_FACTOR = 27 / 209; //出力サイズの調整値
// 出力する色の設定
var COLOR = {
    areaStroke: setColor(100, 100, 0, 0), // blue
    areaFill: setColor(0, 0, 0, 0), // white
    font: setColor(0, 100, 100, 0), // red
    boxFill: setColor(0, 0, 0, 0), // white
    boxStroke: setColor(0, 0, 0, 100) // black
}
init();

/**
 * 引数が配列かどうかをチェックします。
 *
 * @param {*} arg - チェックする引数
 * @returns {boolean} - 引数が配列の場合はtrueを返し、それ以外の場合はfalseを返します
 */
function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}

/**
 * CMYK値を使用して色を設定します。
 * @param {number} c - シアンの値
 * @param {number} m - マゼンタの値
 * @param {number} y - イエローの値
 * @param {number} k - ブラックの値
 * @returns {CMYKColor} CMYKカラーオブジェクト
 */
function setColor(c, m, y, k) {
    var tmpColor = new CMYKColor();
    tmpColor.cyan = c;
    tmpColor.magenta = m;
    tmpColor.yellow = y;
    tmpColor.black = k;
    return tmpColor;
}

/**
 * 正規表現と指定されたエリアオブジェクトを使用してエリアパラメータを計算します。
 * @param {RegExp} reg - エリアオブジェクトにマッチさせるために使用する正規表現。
 * @param {string} areaObj - マッチさせるエリアオブジェクト。
 * @returns {string} - マッチしたエリアパラメータ、もしくはマッチが見つからない場合は空の文字列。
 */
function getRegionParameter(reg, areaObj) {
    var matchResult = areaObj.match(reg);
    return matchResult != null ? matchResult[1] : "";
}

/**
 * 指定されたEPSGコードに基づいて基準点の位置情報を取得します。
 * @param {string} code - 位置を識別するために使用されるコード。
 * @returns {Object} - 位置情報オブジェクト。
 */
function getPosition(code) {
    switch (code) {
        case "2443":
            return {
                positionNumber: 1,
                xoffset: -3040,
                yoffset: 876,
                lat: "33.00.00.0000",
                lon: "129.30.00.0000"
            };
        case "2444":
            return {
                positionNumber: 2,
                xoffset: 6080,
                yoffset: -4350,
                lat: "33.00.00.0000",
                lon: "131.00.00.0000"
            };
        case "2445":
            return {
                positionNumber: 3,
                xoffset: 0,
                yoffset: 30686,
                lat: "36.00.00.0000",
                lon: "132.10.00.0000"
            };
        case "2446":
            return {
                positionNumber: 4,
                xoffset: 0,
                yoffset: 0,
                lat: "33.00.00.0000",
                lon: "133.30.00.0000"
            };
        case "2447":
            return {
                positionNumber: 5,
                xoffset: 0,
                yoffset: 0,
                lat: "36.00.00.0000",
                lon: "134.20.00.0000"
            };
        case "2448":
            return {
                positionNumber: 6,
                xoffset: 4050,
                yoffset: 24549,
                lat: "36.00.00.0000",
                lon: "136.00.00.0000"
            };
        case "2449":
            return {
                positionNumber: 7,
                xoffset: 3381,
                yoffset: 13151,
                lat: "36.00.00.0000",
                lon: "137.10.00.0000"
            };
        case "2450":
            return {
                positionNumber: 8,
                xoffset: 0,
                yoffset: 0,
                lat: "36.00.00.0000",
                lon: "138.30.00.0000"
            };
        case "2451":
            return {
                positionNumber: 9,
                xoffset: 1640,
                yoffset: 5534,
                lat: "36.00.00.0000",
                lon: "139.50.00.0000"
            };
        case "2452":
            return {
                positionNumber: 10,
                xoffset: 0,
                yoffset: 0,
                lat: "40.00.00.0000",
                lon: "140.50.00.0000"
            };
        case "2453":
            return {
                positionNumber: 11,
                xoffset: 0,
                yoffset: 0,
                lat: "44.00.00.0000",
                lon: "140.15.00.0000"
            };
        case "2454":
            return {
                positionNumber: 12,
                xoffset: 7637,
                yoffset: 13505,
                lat: "44.00.00.0000",
                lon: "142.15.00.0000"
            };
        case "2455":
            return {
                positionNumber: 13,
                xoffset: 0,
                yoffset: 0,
                lat: "44.00.00.0000",
                lon: "144.15.00.0000"
            };
        case "2456":
            return {
                positionNumber: 14,
                xoffset: 0,
                yoffset: 0,
                lat: "26.00.00.0000",
                lon: "142.00.00.0000"
            };
        case "2457":
            return {
                positionNumber: 15,
                xoffset: -6086,
                yoffset: -5260,
                lat: "26.00.00.0000",
                lon: "127.30.00.0000"
            };
        case "2458":
            return {
                positionNumber: 16,
                xoffset: 0,
                yoffset: 26468,
                lat: "26.00.00.0000",
                lon: "124.00.00.0000"
            };
        case "2459":
            return {
                positionNumber: 17,
                xoffset: 0,
                yoffset: 0,
                lat: "26.00.00.0000",
                lon: "131.00.00.0000"
            };
        case "2460":
            return {
                positionNumber: 18,
                xoffset: 0,
                yoffset: 0,
                lat: "20.00.00.0000",
                lon: "136.00.00.0000"
            };
        case "2461":
            return {
                positionNumber: 19,
                xoffset: 0,
                yoffset: 0,
                lat: "26.00.00.0000",
                lon: "154.00.00.0000"
            };
        default:
            return {
                positionNumber: 9,
                xoffset: 1640,
                yoffset: 5534,
                lat: "36.00.00.0000",
                lon: "139.50.00.0000"
            };
    }
}

/**
 * @function init
 * @returns {void}
 */
function init() {
    if (app.documents.length == 0) {
        alert("ドキュメントを開いて実行してください。");
        return
    }
    var fileObj = File.openDialog("gmlファイルを選択してください（複数選択可）", '*gml', true);
    
    if (!fileObj) return;
    
    if(isArray(fileObj)){
        for( i = 0; i < fileObj.length; i++){
            generateMapData(fileObj[i]);   
        }
    } else {
        generateMapData(fileObj);
    }
    alert("終了しました");
}


/**
 * 指定されたファイルオブジェクトに基づいてマップデータを生成します。
 * 
 * @param {File} fileObj - データを読み取るためのファイルオブジェクト。
 */
function generateMapData(fileObj) {
    var fileOpened = fileObj.open("r");
    if (fileOpened === true) {
        while (!fileObj.eof) {
            var gmlCodeStrings = fileObj.read();
        }
        fileObj.close();
        try {
            var borderLayers = app.activeDocument.layers["境界"];
            borderLayers.locked = false;
            borderLayers.visible = true;
        } catch (e) {
            var borderLayers = app.activeDocument.layers.add();
            borderLayers.blendingMode = BlendModes.MULTIPLY;
            borderLayers.name = "境界";
        }
        try {
            var townLayers = app.activeDocument.layers["町名"];
            townLayers.locked = false;
            townLayers.visible = true;
        } catch (e) {
            var townLayers = app.activeDocument.layers.add();
            townLayers.name = "町名";
        }
        var EPSGCode = gmlCodeStrings.match(/EPSG:([0-9]*)/);
        if (EPSGCode !== null) {
            var originPosition = getPosition(EPSGCode[1]);
            var areaData = gmlCodeStrings.split("<gml:featureMember");
            for (var i = 1; i < areaData.length; i++) {
                var areaObj = areaData[i];
                var layerName = getLayerName(areaObj);
                makeShape( getEntirePath(areaObj, originPosition), layerName );
                setRegionTag(areaObj, layerName, originPosition);
            }
        }
    }
}

/**
 * エリアオブジェクト、レイヤー名、基準点に基づいて完全なパスを作成します。
 * @param {Object} areaObj - エリアオブジェクト
 * @param {Object} originPosition - 基準点の位置情報オブジェクト
 */
function getEntirePath(areaObj, originPosition) {
    var areaData = getAreaPath(areaObj);
    var pathCount = areaData.length;
    if (pathCount > 1) {
        shapePath = new Array(pathCount / 2 - 1);
        for (var i = 0; i < pathCount - 2; i = i + 2) {
            var pointAryX = areaData[i + 1];
            var pointAryY = areaData[i];
            shapePath[i / 2] = [eval(pointAryX) * SCALE_FACTOR + originPosition.xoffset, eval(pointAryY) * SCALE_FACTOR + originPosition.yoffset]
        }
        return shapePath;
    }
}

/**
 * 指定されたレイヤーに指定された形状パスで形状を作成します。
 * レイヤーが存在しない場合は新しいレイヤーが作成されます。
 *
 * @param {PathPointInfo[]} shapePath - 形状のパスポイント
 * @param {string} layerName - レイヤーの名前
 */
function makeShape( shapePath, layerName ) {

    var targetParentLayer = app.activeDocument.layers["境界"];
    try {
        // 指定したレイヤー名があれば指定
        var targetLayer = targetParentLayer.layers[layerName];
    } catch (e) {
        // レイヤーがなかったら新規でレイヤーを生成する
        var targetLayer = targetParentLayer.layers.add();
        targetLayer.name = layerName;
    }
    try {
        var shapeObj = targetLayer.pathItems.add();
        shapeObj.setEntirePath(shapePath);
        shapeObj.filled = true;
        shapeObj.stroked = true;
        shapeObj.fillColor = COLOR.areaFill;
        shapeObj.closed = true;
        shapeObj.strokeWidth = STROKE_POINT;
        shapeObj.strokeColor = COLOR.areaStroke;
    } catch (e) {
        targetLayer.name = "" + layerName;
    }
    return;
}

/**
 * 指定されたエリアオブジェクトに対してエリア名を設定します。
 * 
 * @param {Object} areaObj - エリアオブジェクト。
 * @param {string} layerName - レイヤーの名前。
 * @param {Object} originPosition - 基準点の位置情報
 * @returns {void}
 */
function setRegionTag(areaObj, layerName, originPosition) {
    var targetParentLayer = app.activeDocument.layers["町名"];
    try {
        // 指定したレイヤー名があれば指定
        var targetLayer = targetParentLayer.layers[layerName];
    } catch (r) {
        // レイヤーがなかったら新規でレイヤーを生成する
        var targetLayer = targetParentLayer.layers.add();
        targetLayer.name = layerName;
    }
    var textGroupObj = targetLayer.groupItems.add();
    var shapePosition = getRegionTagPosition(areaObj, originPosition);
    var areaName = getRegionParameter(/<fme:MOJI>([^<]*)</,areaObj );
    textGroupObj.name = areaName;
    
    if (areaName !== " ") {
        makeShapeBox(areaName, textGroupObj, shapePosition);
        var textObj = textGroupObj.textFrames.add(textGroupObj);
        makeTextObj( areaName, textObj, shapePosition);
    }

    return;

};

/**
 * ターゲットレイヤーに地域名の下に配置するボックスを作成します。
 * @param {string} areaName - 地域名
 * @param {Layer} targetLayer - 形状ボックスを作成するターゲットレイヤー
 * @param {object} shapePosition - 形状ボックスの位置
 * @returns {void}
 */
function makeShapeBox(areaName, targetLayer, shapePosition ) {

    var boxWide = areaName.length * FONT_POINT + FONT_POINT / 4;
    var boxHeight = FONT_POINT + FONT_POINT / 3;
    var boxX = shapePosition.x - boxWide / 2;
    var boxY = shapePosition.y + FONT_POINT;
    var boxObj = targetLayer.pathItems.rectangle(boxY, boxX, boxWide, boxHeight);
    boxObj.filled = true; //　塗りあり
    boxObj.stroked = true; //　線あり
    boxObj.strokeWidth = FONT_POINT / 20;
    boxObj.fillColor = COLOR.boxFill;
    boxObj.strokeColor = COLOR.boxStroke;

    return;
}

//テキストの配置
/**
 * 地域名、テキストオブジェクト、位置情報を使用してテキストオブジェクトを作成します。
 * @param {string} areaName - 地域名
 * @param {object} textObj - 変更されるテキストオブジェクト
 * @param {object} shapePosition - 位置情報
 * @returns {void}
 */
function makeTextObj( areaName, textObj, shapePosition) {
    textObj.contents = areaName;
    textObj.paragraphs[0].fillColor = COLOR.font;
    textObj.paragraphs[0].size = FONT_POINT;
    textObj.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;

    try {
        textObj.paragraphs[0].textFont = app.textFonts.getByName(FONT_TYPE);
    } catch (e) {
        
    }
    textObj.translate(shapePosition.x, shapePosition.y);

    return;
}

/**
 * 指定されたエリアオブジェクトからエリアパスを取得します。
 * @param {string} areaObj - エリアオブジェクト
 * @returns {string[]} - パスの座標の配列
 */
function getAreaPath(areaObj) {
    areaPath = areaObj.match(/<gml:posList>([^<]*)</);
    return areaPath != null ? areaPath[1].split(" ") : ""
}

/**
 * 指定されたエリアオブジェクトに基づいてレイヤー名を返します。
 * @param {Object} areaObj - エリアオブジェクト。
 * @returns {string} レイヤー名。
 */
function getLayerName(areaObj) {
    var layerName = "【";
    layerName += getRegionParameter(/<fme:KEN_NAME>([^<]*)</,areaObj );
    layerName += getRegionParameter(/<fme:GST_NAME>([^<]*)</,areaObj );
    layerName += getRegionParameter(/<fme:CSS_NAME>([^<]*)</,areaObj );
    layerName += "】";
    return layerName;
}

/**
 * 提供されたエリアオブジェクトと基準点の位置情報に基づいて、地域タグの位置を計算します。
 * @param {Object} areaObj - 地域パラメータを含むエリアオブジェクト。
 * @param {Object} originPosition - 地域の基準点の位置。
 * @returns {Object} - 地域タグの平面直角座標に変換されたx座標とy座標。
 */
function getRegionTagPosition(areaObj, originPosition) {
    var xCode = getRegionParameter(/<fme:X_CODE>([^<]*)</,areaObj );
    var yCode = getRegionParameter(/<fme:Y_CODE>([^<]*)</,areaObj );

    var xyConvert = getRectCoordinate(yCode, xCode, originPosition);
    return {
        "x": xyConvert.x * SCALE_FACTOR + originPosition.xoffset,
        "y": xyConvert.y * SCALE_FACTOR + originPosition.yoffset
    };
}

/**
 * 指定された緯度、経度、および基準点の位置情報に基づいて、平面直角座標系でのXY座標を計算します。
 *
 * @param {string} lat - 緯度。
 * @param {string} lon - 経度。
 * @param {number} originPosition - 基準点の位置を表す数値（1-19）。
 * @returns {{x: number, y: number}} - 計算されたXY座標。
 */
function getRectCoordinate(lat, lon, originPosition) { //経度を緯度と座標系番号を与えると平面直角座標XYを返す
    //引数サンプル
    //lat="36.50.25.0000";//緯度60進
    //lon="138.35.45.2500";//経度60進
    //originPosition=1～19の数値（デフォルトは9）

    phi0 = Ghenkan(originPosition.lat); //原点の緯度
    phi0RAD = deg2rad(phi0); //ラジアンにした原点の緯度
    rmd0 = Ghenkan(originPosition.lon); //原点の経度
    rmd0RAD = deg2rad(rmd0); //ラジアンにした原点の経度

    //ターゲット
    //phi=lat;//変換した緯度
    phiRAD = deg2rad(lat); //ラジアンにした緯度
    //rmd=lon;//変換した緯度
    rmdRAD = deg2rad(lon); //ラジアンにした緯度

    //パラメータ（世界測地系）
    a = 6378137; //長半径
    f = 1 / 298.257222101; //扁平率
    F = 298.257222101; //逆扁平率

    //パラメータ（日本測地系）（改正前）
    /*
    a=6377397.155; //長半径
    f=1/299.152813;//扁平率
    F=299.152813;//逆扁平率
    */


    b = a * (1 - f); //短半径
    c = Math.pow(a, 2) / b; //極での曲率半径
    /*検算(デバッグ用：b=b1,c=c1)
    	b1=(a*(F-1))/F;
    	c1=(a*F)/(F-1);
    検算おわり*/

    //座標系
    m0 = 0.9999; //座標系の原点における縮尺係数

    //第一離心率を求める
    e = Math.sqrt((Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2)); //第一離心率
    //第二離心率を求める
    et = Math.sqrt((Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2)); //第二離心率

    /*検算(デバッグ用：e=e1=e2,et=et1=et2)
    	e1=Math.sqrt(2*f-Math.pow(f,2));
    	et1=Math.sqrt(2*F-1)/(F-1);
    	e2=Math.sqrt(Math.pow(et,2)/(1+Math.pow(et,2)));
    	et2=Math.sqrt(Math.pow(e,2)/(1-Math.pow(e,2)));
    検算おわり*/

    //楕円形の公式
    //パラメータ
    W = Math.sqrt(1 - (Math.pow(e, 2) * Math.pow(Math.sin(phiRAD), 2)));
    V = Math.sqrt(1 + (Math.pow(et, 2) * Math.pow(Math.cos(phiRAD), 2)));

    //卯酉線曲率半径の計算
    N = a / W;
    N1 = c / V;

    //子午線曲率半径
    M = (a * (1 - Math.pow(e, 2))) / Math.pow(W, 3);

    R = Math.sqrt(M * N);

    /*検算(デバッグ用：M=M1=M2,R=R1=R2)
    	M1=c/Math.pow(V,3);
    	R1=b/Math.pow(W,2);
    	R2=c/Math.pow(V,2);
    検算おわり*/

    //緯度を与えて赤道からの子午線弧長を求める計算
    //パラメータ演算
    A = 1 + 3 / 4 * Math.pow(e, 2) + 45 / 64 * Math.pow(e, 4) + 11025 / 16384 * Math.pow(e, 8) + 43659 / 65536 * Math.pow(e, 10) + 693693 / 1048576 * Math.pow(e, 12) + 19324305 / 29360128 * Math.pow(e, 14) + 4927697775 / 7516192768 * Math.pow(e, 16);
    B = 3 / 4 * Math.pow(e, 2) + 15 / 16 * Math.pow(e, 4) + 525 / 512 * Math.pow(e, 6) + 2205 / 2048 * Math.pow(e, 8) + 72765 / 65536 * Math.pow(e, 10) + 297297 / 262144 * Math.pow(e, 12) + 135270135 / 117440512 * Math.pow(e, 14) + 547521975 / 469762048 * Math.pow(e, 16);
    C = 15 / 64 * Math.pow(e, 4) + 105 / 256 * Math.pow(e, 6) + 2205 / 4096 * Math.pow(e, 8) + 10395 / 16384 * Math.pow(e, 10) + 1486485 / 2097152 * Math.pow(e, 12) + 45090045 / 58720256 * Math.pow(e, 14) + 766530765 / 939524096 * Math.pow(e, 16);
    D = 35 / 512 * Math.pow(e, 6) + 315 / 2048 * Math.pow(e, 8) + 31185 / 131072 * Math.pow(e, 10) + 165165 / 524288 * Math.pow(e, 12) + 45090045 / 117440512 * Math.pow(e, 14) + 209053845 / 469762048 * Math.pow(e, 16);
    E = 315 / 16384 * Math.pow(e, 8) + 3465 / 65536 * Math.pow(e, 10) + 99099 / 1048576 * Math.pow(e, 12) + 4099095 / 29360128 * Math.pow(e, 14) + 348423075 / 1879048192 * Math.pow(e, 16);
    F = 693 / 131072 * Math.pow(e, 10) + 9009 / 524288 * Math.pow(e, 12) + 4099095 / 117440512 * Math.pow(e, 14) + 26801775 / 469762048 * Math.pow(e, 16);
    G = 3003 / 2097152 * Math.pow(e, 12) + 315315 / 58720256 * Math.pow(e, 14) + 11486475 / 939524096 * Math.pow(e, 16);
    H = 45045 / 117440512 * Math.pow(e, 14) + 765765 / 469762048 * Math.pow(e, 16);
    I = 765765 / 7516192768 * Math.pow(e, 16);

    B1 = a * (1 - Math.pow(e, 2)) * A;
    B2 = a * (1 - Math.pow(e, 2)) * (-B / 2);
    B3 = a * (1 - Math.pow(e, 2)) * (C / 4);
    B4 = a * (1 - Math.pow(e, 2)) * (-D / 6);
    B5 = a * (1 - Math.pow(e, 2)) * (E / 8);
    B6 = a * (1 - Math.pow(e, 2)) * (-F / 10);
    B7 = a * (1 - Math.pow(e, 2)) * (G / 12);
    B8 = a * (1 - Math.pow(e, 2)) * (-H / 14);
    B9 = a * (1 - Math.pow(e, 2)) * (I / 16);

    S = (B1 * phiRAD) + B2 * Math.sin(2 * phiRAD) + B3 * Math.sin(4 * phiRAD) + B4 * Math.sin(6 * phiRAD) + B5 * Math.sin(8 * phiRAD) + B6 * Math.sin(10 * phiRAD) + B7 * Math.sin(12 * phiRAD) + B8 * Math.sin(14 * phiRAD) + B9 * Math.sin(16 * phiRAD); //子午線弧長

    //赤道から座標系の原点の緯度phi0までの子午線弧長
    S0 = (B1 * phi0RAD) + B2 * Math.sin(2 * phi0RAD) + B3 * Math.sin(4 * phi0RAD) + B4 * Math.sin(6 * phi0RAD) + B5 * Math.sin(8 * phi0RAD) + B6 * Math.sin(10 * phi0RAD) + B7 * Math.sin(12 * phi0RAD) + B8 * Math.sin(14 * phi0RAD) + B9 * Math.sin(16 * phi0RAD); //原点の子午線弧長

    //縮尺係数の計算
    drmd = rmdRAD - rmd0RAD;
    nyu2 = Math.pow(et, 2) * Math.pow(Math.cos(phiRAD), 2);
    t = Math.tan(phiRAD);

    //子午線収差角の計算
    gma = Math.cos(phiRAD) * t * drmd + 1 / 3 * Math.pow(Math.cos(phiRAD), 3) * t * (1 + 3 * nyu2 + 2 * Math.pow(nyu2, 2)) * Math.pow(drmd, 3) + 1 / 15 * Math.pow(Math.cos(phiRAD), 5) * t * (2 - Math.pow(t, 2)) * Math.pow(drmd, 5);

    //x座標の計算
    //パラメータ
    x0 = N * Math.cos(phiRAD) * drmd;
    x1 = -1 / 6 * N * Math.pow(Math.cos(phiRAD), 3) * (-1 + Math.pow(t, 2) - nyu2) * (Math.pow(drmd, 3));
    x2 = -1 / 120 * N * Math.pow(Math.cos(phiRAD), 5) * (-5 + 18 * Math.pow(t, 2) - Math.pow(t, 4) - 14 * nyu2 + 58 * Math.pow(t, 2) * nyu2) * (Math.pow(drmd, 5));
    x3 = -1 / 5040 * N * Math.pow(Math.cos(phiRAD), 7) * (-61 + 479 * Math.pow(t, 2) - 179 * Math.pow(t, 4) * Math.pow(t, 6)) * (Math.pow(drmd, 7));
    //
    x = (x0 + x1 + x2 + x3) * m0;

    //y座標の計算
    //パラメータ
    y0 = (S - S0) + 1 / 2 * N * Math.pow(Math.cos(phiRAD), 2) * t * Math.pow(drmd, 2);
    y1 = 1 / 24 * N * Math.pow(Math.cos(phiRAD), 4) * t * (5 - Math.pow(t, 2) + 9 * nyu2 + 4 * Math.pow(nyu2, 4)) * Math.pow(drmd, 4);
    y2 = -1 / 720 * N * Math.pow(Math.cos(phiRAD), 5) * t * (-61 + 58 * Math.pow(t, 2) - Math.pow(t, 4) - 270 * nyu2 + 330 * Math.pow(t, 2) * nyu2) * (Math.pow(drmd, 6));
    y3 = -1 / 40320 * N * Math.pow(Math.cos(phiRAD), 8) * t * (-1385 + 3111 * Math.pow(t, 2) - 543 * Math.pow(t, 4) + Math.pow(t, 6)) * (Math.pow(drmd, 8));
    //
    y = (y0 + y1 + y2 + y3) * m0;

    return {"x": x, "y": y};
}

//度からラジアンに変換する
function deg2rad(deg) {
    rad = deg * 3.14159265 / 180;
    return rad;
}

//ラジアンから度に変換する
function rad2deg(rad) {
    deg = rad * 180 / 3.14159265;
    return deg;
}

//経度緯度を60進から10進にへんかんする（ドットで区切った度に対応）
//引数サンプル
//lat="36.50.25.0000";//緯度60進
//lon="138.35.45.2500";//経度60進
function Ghenkan(param) {
    splitparam = param.split(".");
    hparam = Number(splitparam[0]) + (Number(splitparam[1]) * 60 + (Number(splitparam[2] + "." + splitparam[3]))) / 3600;
    return hparam;
}