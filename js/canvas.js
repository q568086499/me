var canvas = document.getElementById("cas"), ctx = canvas.getContext("2d");
	var x1, y1;
	var canvasBox = document.getElementById("bb");
	canvas.width = canvasBox.clientWidth;
	canvas.height = canvasBox.clientHeight;
	var img = new Image();
	img.src = "../git/img/26.png";
	img.onload = function () {
		var w = canvas.height*img.width/img.height;
		ctx.drawImage(img, (canvas.width-w)/2, 0, w, canvas.height);
		tapClip()
	};
	function getClipArea(e){
		var x = e.clientX;
		var y = e.clientY;
		var ndom = canvas;
		while(ndom.tagName!=="BODY"){
			x -= ndom.offsetLeft;
			y -= ndom.offsetTop;
			ndom = ndom.parentNode;
		}
		return {
			x: x,
			y: y
		}
	}
	//通过修改globalCompositeOperation来达到擦除的效果
	function tapClip() {
		var area;
		var x2,y2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = 20;
		ctx.globalCompositeOperation = "destination-out";
		window.addEventListener("mousedown", function (e) {
			e.preventDefault();
			area = getClipArea(e);
			x1 = area.x;
			y1 = area.y;
			drawLine(x1, y1);
			this.addEventListener("mousemove", mousemoveHandler);
			this.addEventListener("mouseup", function () {
				this.removeEventListener("mousemove", mousemoveHandler);
			});
			function mousemoveHandler(e) {
				e.preventDefault();
				area = getClipArea(e);
				x2 = area.x;
				y2 = area.y;
				drawLine(x1, y1, x2, y2);
				x1 = x2;
				y1 = y2;
			}
		})
	}
	function drawLine(x1, y1, x2, y2){
		ctx.save();
		ctx.beginPath();
		if(arguments.length==2){
			ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
			ctx.fill();
		}else {
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}
		ctx.restore();
	}