//Config
var webroot = '';

//Load các file ảnh
imgRoot = webroot + 'img/';
var img_bang = imageGenerator(imgRoot + 'bang.png');
var img_beer = imageGenerator(imgRoot + 'beer.png');
var img_beer_balloon = imageGenerator(imgRoot + 'beer_balloon.png');
var img_beer_balloon_string = imageGenerator(imgRoot + 'beer_balloon_string.png');
var img_iphone = imageGenerator(imgRoot + 'iphone.png');
var img_iphone_balloon = imageGenerator(imgRoot + 'iphone_balloon.png');
var img_iphone_balloon_string = imageGenerator(imgRoot + 'iphone_balloon_string.png');
var img_truck = imageGenerator(imgRoot + 'truck.png');
var img_truck_balloon = imageGenerator(imgRoot + 'truck_balloon.png');
var img_truck_balloon_string = imageGenerator(imgRoot + 'truck_balloon_string.png');

window.onload = main;

function main(){
	//Ẩn Topbar
	hideTopbar();
	//Tránh touch làm dừng animation
	preventTouchmove();
	
	//Khởi tạo các object S1
	truckSet = new BlankObject().startup(180, 30, 1, 1);
	truck_balloon_string = new ImageObject().startup(img_truck_balloon_string, 132, 320);
	truck_balloon = new ImageObject().startup(img_truck_balloon);
	truck = new ImageObject().startup(img_truck, 25, 92);
	truck_bang = new ImageObject().startup(img_bang, -110, -50);
	truckSet.contain(truck, truck_balloon, truck_balloon_string, truck_bang);
	
	beerSet = new BlankObject().startup(40, 150, 1, 1);
	beer_balloon_string = new ImageObject().startup(img_beer_balloon_string, 102, 265);
	beer_balloon = new ImageObject().startup(img_beer_balloon);
	beer = new ImageObject().startup(img_beer, 40, 92);
	beer_bang = new ImageObject().startup(img_bang, -110, -50);
	beerSet.contain(beer, beer_balloon, beer_balloon_string, beer_bang);
	
	iphoneSet = new BlankObject().startup(360, 100, 1, 1);
	iphone_balloon_string = new ImageObject().startup(img_iphone_balloon_string, 118, 291);
	iphone_balloon = new ImageObject().startup(img_iphone_balloon);
	iphone = new ImageObject().startup(img_iphone, 16, 76);
	iphone_bang = new ImageObject().startup(img_bang, -110, -50);
	iphoneSet.contain(iphone, iphone_balloon, iphone_balloon_string, iphone_bang);
	 
	text = new BlankObject().startup(40, 60, 100, 100);
	
	start();
		
//	makeDraggable();
}

/* =============== FRAMEWORK AREA ============== */
var currentScene = 1;
var containerId = 'animation-holder';

//đặt số hiệu scene hiện tại 
function setScene(sceneId){
	currentScene = sceneId;
}

//Khởi chạy game
function start(sceneId){
	if (sceneId == null){
		setScene(1);
	}else {
		setScene(sceneId);
	}
		
	//Chuyển scene
	switch (currentScene){
		case 1:
			scene1();
			break;
		case 2:
			scene2();
			break;
	}
}

//Thực hiện scene 1
function scene1(){
	//Hiển thị các object S1
	beerSet.draw();
	beer_balloon_string.draw();
	beer_balloon.draw();
	beer.draw();
	beer_bang.draw('hide');
	
	beerSet.addClass('set');
	beer_balloon_string.addClass('string');
	beer_balloon.addClass('balloon');
	beer.addClass('inside');
	
	truckSet.draw();
	truck_balloon_string.draw();
	truck_balloon.draw();
	truck.draw();
	truck_bang.draw('hide');
	
	truckSet.addClass('set');
	truck_balloon_string.addClass('string');
	truck_balloon.addClass('balloon');
	truck.addClass('inside');
	
	iphoneSet.draw();
	iphone_balloon_string.draw();
	iphone_balloon.draw();
	iphone.draw();
	iphone_bang.draw('hide');
	
	iphoneSet.addClass('set');
	iphone_balloon_string.addClass('string');
	iphone_balloon.addClass('balloon');
	iphone.addClass('inside');
	
	addEventHandling(beer_balloon);
	addEventHandling(beer);
}

//Thực hiện scene 2
function scene2(){
	log('S2');
	text.draw();
	text.addClass('');
	text.addText('GOOD WORK !');
}

//thao tác trong scene
function gameAction(event){
	switch (currentScene){
		case 1:
			interactionOfScene1(event);
			break;
		case 2:
			interactionOfScene2(event);
			break;
	}
}

//thao tác trong scene1
function interactionOfScene1(e){
	log('BOOM !');
	log(e.target);
	removeEventHandling(beer_balloon);
	removeEventHandling(beer);
	
	beer_bang.show();
	beer_bang.addClass('bang');

	beer.removeClass();
	window.setTimeout(function(){beer.addClass('fall');}, 0);
	
	beer_bang.tag.addEventListener('webkitAnimationEnd', function(event){
		if (event.animationName == 'bang'){
			beer_bang.hide();
			beer_balloon.hide();
			beer_balloon_string.hide();
			beerSet.removeClass();
		}
	}, false);
	
	beer.tag.addEventListener('webkitAnimationEnd', function(event){
		if (event.animationName == 'fall'){
			beer.hide();
			endScene();
		}
	}, false);
}

//thao tác trong scene2
function interactionOfScene2(){
	
}

//Kết thúc một scene
function endScene(){
	switch (currentScene){
		case 1:
			endOfScene1();
			break;
		case 2:
			endOfScene2();
			break;
	}
}

//Kết thúc scene1
function endOfScene1(){
	start(2);
}

//Kết thúc scene2 
function endOfScene2(){

}

//Xóa tất cả các div (object)
function clearDivs(){
	$('#' + containerId + ' div').remove();
}

//Gán sự kiện lên một thành phần nào đó
function addEventHandling(obj){
	if (obj == null){
		document.onclick = gameAction;//Test trên PC 
		document.ontouchstart = gameAction;
	} else{
		obj.tag.onclick = gameAction;//Test trên PC 
		obj.tag.ontouchstart = gameAction;
	}
}

//Hủy xử lý sự kiện
function removeEventHandling(obj){
	if (obj == null){
		//Xử lý sự kiện touch ở mỗi scene
		document.onclick = false; 
		document.ontouchstart = function(event){event.preventDefault();};
	} else{
		//Xử lý sự kiện touch ở mỗi scene
		obj.tag.onclick = false; 
		obj.tag.ontouchstart = function(event){event.preventDefault();};
	}
};

/* =============== end of FRAMEWORK AREA ============== */

/* =============== COMMON ================= */
//Get query string
function getVar(ji, value) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		} else return value;
	}
}