/**
 * This js-file contains just some fun stuff that I've created during the years
 * @author vegaasen
 * @version 1.0
 * @since 0.1d
 */

function addXmasMoodToMySite() {
	var snowmax=20;

	var snowcolor=new Array("#fff","#999","#ccc","#f3f3f3","#c0c0c0"); // what color should be presented?

	var snowtype=new Array("Verdana"); // "Georgia", "Times New Roman" etc etc

	var snowletter="*";

	var sinkspeed=0.6;

	var snowmaxsize=22;

	var snowminsize=8;

	var snow=new Array();
	var marginbottom, marginright, timer;
	var i_snow=0;
	var x_mv=new Array();
	var crds=new Array();
	var lftrght=new Array();
	var browserinfos=navigator.userAgent;

	function randommaker(range) {		
		rand=Math.floor(range*Math.random());
		return rand;
	}

	function initsnow() {
		marginbottom = window.innerHeight;
		marginright = window.innerWidth;
		var snowsizerange=snowmaxsize-snowminsize;
		
		for (i=0;i<=snowmax;i++) {
			crds[i] = 0;                      
			lftrght[i] = Math.random()*15;         
			x_mv[i] = 0.03 + Math.random()/10;
			snow[i]=document.getElementById("s"+i);
			snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)];
			snow[i].size=randommaker(snowsizerange)+snowminsize;
			snow[i].style.fontSize=snow[i].size;
			snow[i].style.color=snowcolor[randommaker(snowcolor.length)];
			snow[i].sink=sinkspeed*snow[i].size/5;
			snow[i].posx=randommaker(marginright-snow[i].size);
			snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size);
			snow[i].style.left=snow[i].posx;
			snow[i].style.top=snow[i].posy;
		}
		movesnow();
	}

	function movesnow() {
		for (i=0;i<=snowmax;i++) {
			crds[i] += x_mv[i];
			snow[i].posy+=snow[i].sink;
			snow[i].style.left=snow[i].posx+lftrght[i]*Math.cos(crds[i]);
			snow[i].style.top=snow[i].posy;

			if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])) {
				snow[i].posx=randommaker(marginright-snow[i].size);
				snow[i].posy=0;
			}
		}
		var timer=setTimeout("movesnow()",50);
	}

	for (i=0;i<=snowmax;i++) {
		jQuery("body").html(function() {
			return "<span id='s"+i+"' class='snowball' style='position:absolute;top:-"+snowmaxsize+"'>"+snowletter+"</span>";
		});
	}
}