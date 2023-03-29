
//  photoshop  LayerCorrection
var docObj = app.documents;
var moveTo = app.documents[0];
var   layersNum = 0;

function layerSort(revFlag){
    /*	汎用レイヤソート関数
        アクティブレイヤの含まれるレイヤコレクションをレイヤ名でソートする。
         引数にfalseを与えると、逆順ソート（アニメのセルなら逆順が望ましい）
        同名のレイヤがある場合は、警告を出して処理は続行
    */
        if(! revFlag) revFlag=false;//
    //	アクティブレイヤのトレーラーをターゲットにセットする
        var myTarget=activeDocument.activeLayer.parent.layers;
    //	並び替え対称のレイヤが1つしかない場合は、並び替え不能なのでキャンセル
        if(myTarget.length<=1){return false;}
    //	ソート用配列を作る
        var sortOrder=new Array();
        for (idx=0;idx<myTarget.length;idx++){
            if (myTarget[idx].isBackgroundLayer){
                continue;//レイヤが背景だったら無視
            }else{
                sortOrder.push(myTarget[idx].name);
            }
        }
            sortOrder.sort();//逆順並び替え
        if (revFlag){
            sortOrder.reverse();//正順並び替え
        }
    //並び替えた配列から同名レイヤのチェック
        for (idx=1;idx<sortOrder.length;idx++){
            if(sortOrder[idx-1]==sortOrder[idx]){
                alert("同名のレイヤがあります。?n二つ目以降のレイヤは並び替えの対象になりません。");
                break;
            }
        }
        for (idx=0;idx<sortOrder.length;idx++){
            myTarget.getByName(sortOrder[idx]).move(myTarget[0],ElementPlacement.PLACEBEFORE);
        }
        return sortOrder;
}

function addLayerMask()
{
    // =======================================================
var idMk = charIDToTypeID( "Mk  " );
    var desc2049 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc2049.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
        var ref1832 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref1832.putEnumerated( idChnl, idChnl, idMsk );
    desc2049.putReference( idAt, ref1832 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idRvlS = charIDToTypeID( "RvlS" );
    desc2049.putEnumerated( idUsng, idUsrM, idRvlS );
executeAction( idMk, desc2049, DialogModes.NO );


}


activeDocument = app.documents[0];
dName = activeDocument.name;
activeDocument.artLayers[0].name = dName;
chObj = activeDocument.channels[3];
activeDocument.selection.load(chObj);
layObj = activeDocument.artLayers.add();
layObj.name = "mask"+1;
addLayerMask();

for(i=1;i<app.documents.length;i++){
    activeDocument = app.documents[i];
    dName = activeDocument.name;
    activeDocument.artLayers[0].name = dName;

    chObj = activeDocument.channels[3];
    activeDocument.selection.load(chObj);
    layObj = activeDocument.artLayers.add();
    j=i+1;
    layObj.name = "mask"+j;
    addLayerMask();
    layersNum = activeDocument.artLayers.length;
    

    for(j=0;j<layersNum;j++)
    {
        activeDocument.artLayers[j].duplicate(moveTo, ElementPlacement.PLACEATBEGINNING);
    }

 }

activeDocument = app.documents[0];


//正順でコール
layerSort(true);