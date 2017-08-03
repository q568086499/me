//页面初始化
const $body = document.body;
const $bagbody = document.getElementsByClassName("bagbody")[0];
const $baghead = document.getElementsByClassName("baghead")[0];
const $down = document.getElementsByClassName("down")[0];
$body.addEventListener("mouseover",todo);
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
				$bagbody.setAttribute("class","bagbody flip");
				$bagbody.style.boxShadow ="-10px 10px 5px #333";
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
				setTimeout(()=>{
					document.getElementsByClassName("moveline")[0].remove();
					document.getElementsByClassName("line")[0].remove();
					$baghead.setAttribute("class","baghead bagopen");
				},3000);
				
			});
		},1000);
	},1000);
};
