/*
 * A N I M A T I O N  J A V A S C R I P T  L I B R A R Y
 * Phiên bản cải tiến 0.3
 * 
 * 29/03/2012
 * - update hàm makeDraggable: click vào element sẽ hiện tọa độ lên ngay
 * 
 * 03/04/2012
 * - Xóa SpriteObject và các phần Gamcontrol trước đó không dùng nữa
 * - id cho các Object mặc định là ani_id_xxx
 * 
 * 04/04/2012
 * - Thêm method Chứa các div con được chỉ định : this.contain();
 */

//C O N F I G----------------------------------------------------------\\

var containerId = 'animation-holder';//Div chúa toàn bộ nội dung animation

//End of C O N F I G---------------------------------------------------//

/*
 * Object cơ bản
 */
function ImageObject(){
	_this = this;
	this.elementId = null;//id của element chứa object
	this.image = null;//ảnh nền dùng cho object
	this.left = 0;//vị trí tương đối của object so với mainDiv
	this.top = 0;//vị trí tương đối của object so với mainDiv
	this.width = 0;//kích thước
	this.height = 0;//kích thước
	this.zOrder = 1;//Thứ tự lớp vẽ
	this.bgPositionLeft = 0;//vị trí background - dùng cho Sprite
	this.bgPositionTop = 0;//vị trí background - dùng cho Sprite
	this.tag = null;//DOM element chứa object
	this.translateX = 0;
	this.translateY = 0;
	this.originX = '50%';
	this.originY = '50%';
	this.bgWidth = 0;
	this.bgHeight = 0;
	this.containerId = containerId;//div chứa các object (dùng khi muốn gom nhóm)

	//Hàm khởi tạo Object
	this.startup = function(image, left, top, width, height, bgPositionLeft, bgPositionTop){
		this.image = image;
		this.left = (left != null) ? left : 0;
		this.top = (top != null) ? top: 0;
		this.width = (width != null) ? width : image.width;
		this.height = (height != null) ? height : image.height;
		this.bgPositionLeft = (bgPositionLeft != null) ? bgPositionLeft : 0;
		this.bgPositionTop = (bgPositionTop != null) ? bgPositionTop : 0;
		
		this.elementId = getNextId();//mặc định tự tăng Id
		this.zOrder = getNextIndex();//mặc định tự tăng Index
		this.tag = document.createElement('div');
		
		return this;
	};
	
	//Vẽ object
	this.draw = function(hide){
		//Nếu hidden thì ban đầu sau khi vẽ, đối tượng sẽ bị ẩn đi
		if (hide == 'hide'){
			this.hide();
		}
		this.tag.id = this.elementId;
		this.tag.style.left = this.left + 'px';
		this.tag.style.top = this.top + 'px';
		this.tag.style.width = this.width + 'px';
		this.tag.style.height = this.height + 'px';
		this.tag.style.zIndex = this.zOrder;
		if (this.originX !== '50%' && this.originY !== '50%') {
			this.tag.style.webkitTransformOrigin = this.originX + ' ' + this.originY;
		}
		this.tag.style.background = 'url(' + this.image.src + ') no-repeat ' + this.bgPositionLeft + 'px ' + this.bgPositionTop + 'px';
		
		//background-size
		if (this.bgWidth > 0 && this.bgHeight > 0){
			this.tag.style.backgroundSize = this.bgWidth + 'px ' + this.bgHeight + 'px';
		}
		
		var mainDiv = getContainer(this.containerId);
		mainDiv.appendChild(this.tag);
		return this;
	};
	
	//hàm set thuộc tính
	this.setStyle = function(property, value){
		this.tag.style[property] = value;
	};
	
	//Hàm chọn lại tâm quay
	this.setOrigin = function(x, y){
		this.originX = x;
		this.originY = y;
	};
	
	//Hàm set Id
	this.setId = function(customId){
		this.elementId = customId;
		this.tag.id = customId;
	};
	
	//Hàm set Index
	this.setIndex = function(customIndex){
		this.zOrder = customIndex;
		this.tag.style.zIndex = customIndex;
	};
	
	//Hàm set background-size
	this.setBgSize = function(width, height){
		this.bgWidth = width;
		this.bgHeight = height;
		this.tag.style.backgroundSize = width + 'px ' + height + 'px';
	};
	
	//hàm set div làm holder thực sự (dùng để gom nhóm các object)
	this.setHolder = function(holderId){
		this.containerId = holderId;
	};
	
	//Cho hiện object
	this.show = function(){
		this.tag.style.display = 'block';
	};
	
	//Ẩn object
	this.hide = function(){
		this.tag.style.display = 'none';
	};
	
	//Cho hiện object với opacity
	this.visible = function(){
		this.tag.style.opacity = 1;
	};
	
	this.notVisible = function(){
		this.tag.style.opacity = 0;
	};
	
	//Đưa object lên lớp trên
	this.bring_front = function(){
		this.tag.style.zIndex = getNextIndex();
	};
	
	//Đưa object xuống lớp dưới
	this.bring_back = function(){
		this.tag.style.zIndex = getPreviousIndex();
	};

	//Xóa khỏi cây DOM
	this.remove = function(){
		getContainer(this.containerId).removeChild(this.tag);
	};
	
	//Gắn thêm class
	this.addClass = function(nameOfClass){
		this.tag.className = nameOfClass;
	};
	
	//Gắn lại class để kích hoạt lại animation
	this.reAddClass = function(nameOfClass){
		this.removeClass();
		window.setTimeout(function(){_this.addClass(nameOfClass);}, 0);
	};
	
	//Xóa class
	this.removeClass = function(nameOfClass){
		if (nameOfClass == null){
			this.tag.className = '';
		}
	};
	
	//add Animation
	this.addAnimation = function(animationName){
		if (animationName == null) animationName = this.elementId;
			this.tag.style.webkitAnimationName = animationName;
	};
	
	//Thêm text
	this.addText = function(text){
		this.tag.innerHTML = text;
	};
	
	//Chứa các div con được chỉ định
	this.contain = function(){
		var args = Array.prototype.slice.call(arguments);//args là mảng chứa tất cả các tham số truyền vào
		for (i in args){
			args[i].setHolder(this.elementId);
		}
	};
}

/*
 * Dành cho đối tượng Rỗng
 */
function BlankObject(){	
	//Hàm khởi tạo Object
	this.startup = function(left, top, width, height, bgPositionLeft, bgPositionTop){
		this.image = '';
		this.left = (left != null) ? left : 0;
		this.top = (top != null) ? top: 0;
		this.width = (width != null) ? width : image.width;
		this.height = (height != null) ? height : image.height;
		this.bgPositionLeft = (bgPositionLeft != null) ? bgPositionLeft : 0;
		this.bgPositionTop = (bgPositionTop != null) ? bgPositionTop : 0;
		
		this.elementId = getNextId();//mặc định tự tăng Id
		this.zOrder = getNextIndex();//mặc định tự tăng Index
		this.tag = document.createElement('div');
		
		return this;
	};
	
	//Vẽ object
	this.draw = function(hide){
		//Nếu hidden thì ban đầu sau khi vẽ, đối tượng sẽ bị ẩn đi
		if (hide == 'hide'){
			this.hide();
		}
		this.tag.id = this.elementId;
		this.tag.style.left = this.left + 'px';
		this.tag.style.top = this.top + 'px';
		this.tag.style.width = this.width + 'px';
		this.tag.style.height = this.height + 'px';
		this.tag.style.zIndex = this.zOrder;
		if (this.originX !== '50%' && this.originY !== '50%') {
			this.tag.style.webkitTransformOrigin = this.originX + ' ' + this.originY;
		}
		
		//background-size
		if (this.bgWidth > 0 && this.bgHeight > 0){
			this.tag.style.backgroundSize = this.bgWidth + 'px ' + this.bgHeight + 'px';
		}
		
		var mainDiv = getContainer(this.containerId);
		mainDiv.appendChild(this.tag);
		return this;
	};
	
}
BlankObject.prototype = new ImageObject;

/*
 * C O M M O N  F U N C T I O N  ==========================================================\
 * Các hàm dùng chung
 */

//Lấy div element chứa object
function getContainer(container){
	return document.getElementById(container);
}

//Tạo z-index tự động
auto_zIndex = 0;
prev_zIndex = auto_zIndex;
//Lấy z-index tiếp theo (lớp trên)
function getNextIndex(){
	auto_zIndex++;
	return auto_zIndex * 1000;
}

//Tạo id tự động
auto_id = 0;
text_id = 'ani_id_';
function getNextId(){
	auto_id++;
	return text_id + auto_id;
}

//Lấy z-index của lớp trước đó
function getPreviousIndex(){
	prev_zIndex--;
	return prev_zIndex;
}

//Hàm tạo Image Object (cho gọn code) - src: source cho ảnh
function imageGenerator(src){
	var imgObj = new Image();
	imgObj.src = src;
	return imgObj;
}

function makeSprite(params){
	//nhận các tham số
	//..tham số bắt buộc
	var keyframeName = params.keyframeName;
	var nbOfFrame = params.nbOfFrame;
	var widthStep = params.widthStep;
	var duration = params.duration;//d/vi thoi gian: (s)
	
	//..tùy chọn
	if (params.delay) {delay = params.delay} else {delay = 0}
	if (params.iteration) {iteration = params.iteration} else {iteration = 1}
	if (params.classIncl) {classIncl = params.classIncl} else {classIncl = false}
	
	//Bước nhảy về thời gian
	timeStep = Math.floor(10000/nbOfFrame) / 100;
	
	//tạo style element gắn vào DOM
	var cssAnimation = document.createElement('style');
	cssAnimation.type = 'text/css';
	content = '';

	//tạo kèm cả class
	if (classIncl){
		content +=
		'.' + keyframeName +'{\n\t' + 
		'-webkit-animation-name: ' + keyframeName + ';\n\t' +
		'-webkit-animation-duration: ' + duration + 's;\n\t' +
		'-webkit-animation-iteration-count: ' + iteration + ';\n\t' +
		'-webkit-animation-delay: ' + delay + 's;\n\t' +
		'-webkit-animation-direction: normal;\n\t' +
		'-webkit-animation-fill-mode: forwards;\n' +
		'}\n';
	}
	
	content += '@-webkit-keyframes ' + keyframeName + ' \n{\n\t';
	
	for (var i = 1; i <= (parseInt(nbOfFrame, 10) + 1); i++){
		if (i == 1){
			tmp = '0% { background-position: 0 0;}\n\t';
		} else if (i == (parseInt(nbOfFrame, 10) + 1)){
			
			tmp = 
				//'99.99% { background-position: -' + (widthStep * (nbOfFrame - 2)) + 'px 0;}' +
				'100% { background-position: -' + (widthStep * (nbOfFrame - 1)) + 'px 0;}\n\t';
		} else {
			tmp = 
				Math.ceil(((i - 1) * timeStep - 0.01)*100) / 100 + '% { background-position: -' + ((i - 2) * widthStep) + 'px 0;}\n\t' +
				((i - 1) * timeStep) + '% { background-position: -' + ((i - 1) * widthStep) + 'px 0;}\n\t';
		}
		content += tmp;
	}
	content += '\n}';
	var rules = document.createTextNode(content);
	cssAnimation.appendChild(rules);
	document.getElementsByTagName('head')[0].appendChild(cssAnimation);
}

function demoMakeSprite(){
	makeSprite({
		'keyframeName': 'text',
		'nbOfFrame': '4',
		'widthStep': 320,
		'duration': 1,
		'delay': 1,
		'classIncl': true
	});
}

//Debug porpose
function debug(text){
	if (text == null) text = 'Hey';
	alert(text);
}

//Debug = log vao console
function log(text){
	if (text == null) text = 'Hey';
	console.log(text);
}

//Debug Object
function debugObject(text){
	if (text == null) text = 'Hey';
	
	var output = '';
	for (property in text) {
		if (output.length > 1000) {
			alert(output);
			output = '';
		}
	  output += property + ': ' + text[property]+'\n ';
	}
	if (output.length > 0){
		alert(output);
	}
}

function hideTopbar(){
	window.setTimeout(function(){window.scrollTo(0, 1);}, 0);
}

function preventTouchmove(){
	document.getElementById('animation-holder').ontouchmove = function(e){
		e.preventDefault();
		scrollTo(0, 1);
	};
}

function makePauseWhenHover(){
	var cssAdding = document.createElement('style');
	cssAdding.type = 'text/css';
	content = '#animation-holder:hover div{-webkit-animation-play-state: paused}';
	var rules = document.createTextNode(content);
	cssAdding.appendChild(rules);
	document.getElementsByTagName('head')[0].appendChild(cssAdding);
}

//Cho phép kéo thả các object, hỗ trợ việc căn chỉnh vị trí - phải có Jquery ======================
function makeDraggable(){
	container = document.getElementById('animation-holder');
	container.onclick = false;//tắt return web
	
	appendJqueryUI();
	//Div hiển thị tọa độ
	$('#animation-holder').append('<div style="z-index: 999999; background-color: rgba(0, 0, 0, 0.5); border: none !important" id="drag-info">DRAGGABLE MODE</div>');
	
	window.setTimeout(
		function(){
			$('#animation-holder div').live('click',function(){
				
				//Hiện info ngay khi click
				left = Math.ceil($(this).css('left').replace('px', '')) + 2;
				top = Math.ceil($(this).css('top').replace('px', '')) + 2;
				$('#drag-info').text(left + ', ' + top + ' - #' + $(this).attr('id') + ' - .' + $(this).attr('class') + ' - z' + $(this).css('z-index'));
				
				$(this).css('border', '2px dashed gray');
				$(this).siblings().css('border', 'none');
				$(this).draggable({
					drag: function(event, ui) {
						left = Math.ceil($(this).css('left').replace('px', '')) + 2;
						top = Math.ceil($(this).css('top').replace('px', '')) + 2;
						$('#drag-info').text(left + ', ' + top + ' - #' + $(this).attr('id') + ' - .' + $(this).attr('class') + ' - z' + $(this).css('z-index'));
					}
				});
			})
		}, 0);
}

//Append Jquery UI
function appendJqueryUI(){
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js";
	document.getElementsByTagName('head')[0].appendChild(script);
}
//==============================================================================================