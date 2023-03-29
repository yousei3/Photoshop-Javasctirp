//Turn off unneeded channels

chNum = activeDocument.channels.length;
//alert("チャンネル数は"+chNum+"です");
 chNum=chNum-1;
  colMode = activeDocument.mode;
  
//alert(colMode);  
 if(colMode ==  "DocumentMode.RGB")   //RGB
 {
	for(i=1;2<chNum;chNum--)
	{
		aName = activeDocument.channels[chNum].name;
	
		activeDocument.channels[chNum].remove();
	}
}
 if(colMode ==  "DocumentMode.CMYK")  //CMYKK
 {
	for(i=1;3<chNum;chNum--)
	{
		aName = activeDocument.channels[chNum].name;
	
		activeDocument.channels[chNum].remove();
	}
}
