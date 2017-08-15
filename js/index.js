//页面初始化
const $body = document.body;
const $bagbody = document.getElementsByClassName("bagbody")[0],
	  $baghead = document.getElementsByClassName("baghead")[0],
	  $down = document.getElementsByClassName("down")[0],
	  wrap = document.getElementsByClassName("wrap")[0];
if (localStorage.pagecount){
	localStorage.pagecount=Number(localStorage.pagecount) +1;
	document.getElementsByClassName("anima")[0].remove();
	wrap.setAttribute("class","wrap");
	wrap.style.height ="600px";
	wrap.style.opacity=1;
	let x = document.createElement("div");
	x.innerHTML = `
		<div class="msg">这是您第${localStorage.pagecount}次来了<br>烂动画我就跳过了</div>
	` ;
	let w = window.innerWidth,
        h = window.innerHeight;
    x.style.cssText = "width:"+w+"px;height:"+h+"px;position:fixed;top:0;left:0;z-index:998;background:rgba(0,0,0,.4)";
	document.body.appendChild(x);
	x.onclick = function(){this.remove()}
}else{
	localStorage.pagecount=1;
	$body.addEventListener("mouseover",todo);
}
function todo(){
	$body.removeEventListener("mouseover",todo);
	setTimeout(()=>{
		let x = document.createElement("div");
		x.innerHTML = `
			<div class="takebtn fadeInUp">拆开看看</div>
		` ;
		let w = window.innerWidth,
	        h = window.innerHeight;
	    x.style.cssText = "width:"+w+"px;height:"+h+"px;position:fixed;top:0;left:0;z-index:998;background:rgba(0,0,0,.4)";
		document.body.appendChild(x);
		setTimeout(()=>{
			let takebtn = x.children[0];
			takebtn.setAttribute("class","takebtn flash");
			takebtn.addEventListener("click",()=>{
				x.remove();
				$bagbody.setAttribute("class","bagbody flip bagshadow");
				setTimeout(()=>{
					$down.innerHTML = `
						<i class="circle"></i>
						<i class="line"></i>
					` ;
					$bagbody.children[1].innerHTML = `
						<i class='circle'></i>
						<i class='moveline'></i>
					` ;
				},500);
				setTimeout(()=>{
					document.getElementsByClassName("moveline")[0].setAttribute("class","moveline rotate");
				},1000);
				$baghead.setAttribute("class","baghead bagopen");
				setTimeout(()=>{
					document.getElementsByClassName("moveline")[0].remove();
					document.getElementsByClassName("line")[0].remove();
				},3000);
				setTimeout(()=>{
					let h = 0; 
					$bagbody.setAttribute("class","bagbody bagshadow");
					const x = setInterval(()=>{
						if(h<599){
							h++;
							wrap.style.height = h+"px";
							$bagbody.style.bottom = "-"+h+"px";
						}else{
							clearInterval(x);
							document.getElementsByClassName("anima")[0].remove();
							wrap.setAttribute("class","wrap");
						}
					},1);
					wrap.style.opacity=1;
				},4000);
			});
		},1000);
	},1000);
};


//nav及页面切换

const $nav = document.getElementsByTagName("nav")[0];
const $li = $nav.getElementsByTagName("li");
const p = wrap.getElementsByClassName("page");
//索引
for(let i=0;i<$li.length;i++){
	$li[i].index = i;
	p[i].index = i;
}
$nav.addEventListener("click",function(e){
	if(e.target.nodeName=="LI"){
		let x = 0;
		let i = e.target.index;
		let p = wrap.getElementsByClassName("page");
		let pi =p[i];
		if(pi.style.zIndex!=9){
			for(let i=0;i<p.length;i++){
				if(p[i].style.zIndex==9){
					x=p[i].index;
				}
				pi.style.zIndex = 8;
			}
			p[x].setAttribute("class","page"+x+" page tab");
			setTimeout(()=>{
				p[x].style.zIndex=6;
				pi.style.zIndex = 9;
			},1000)
			setTimeout(()=>{
				p[x].setAttribute("class","page"+x+" page");
			},2000)
		}
	}
})

// page2 skill
const skillbox = document.getElementsByClassName("skill")[0];
skillbox.addEventListener("mouseover",function(e){
	const target = e.target;
	if(target.nodeName=="IMG"){
		const skillbtn = skillbox.children;
		const $select = skillbtn[target.id];
		$select.children[1].setAttribute("class","bounceOut");
		for(let i=0;i<skillbtn.length;i++){
			skillbtn[i].children[2].style.display = "none";
			skillbtn[i].children[1].style.display = "inline-block";
		}
		setTimeout(()=>{
			$select.children[2].style.display = "block";
			$select.children[1].setAttribute("class","");
			$select.children[1].style.display = "none";
		},900);
	}
});

function WeChat(){
	let x = document.createElement("div");
	x.innerHTML = `
		<img class="WeChat" src="img/WeChat.png">
	` ;
	let w = window.innerWidth,
        h = window.innerHeight;
    x.style.cssText = "width:"+w+"px;height:"+h+"px;position:fixed;top:0;left:0;z-index:998;background:rgba(0,0,0,.4)";
	document.body.appendChild(x);
	x.onclick = function(){this.remove()}
}


//分享
document.getElementsByClassName("baidu")[0].onclick=function(){
	const x = document.getElementsByClassName("bdsharebuttonbox")[0];
	x.style.display == "none"?x.style.display = "block":x.style.display = "none";
	console.log(x.style.display == "none")
}