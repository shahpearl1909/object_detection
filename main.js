img="";
status="";
object=[];
function preload(){
    img=loadImage("picture.jpeg");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();

}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status: detecting object";
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function draw(){
    image(img,0,0,380,380);

    if(status != ""){
        objectDetector.detect(img, gotResult);
        r=random(255);
        g =random(255);
        b=random(255);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status : object detected";
            document.getElementById("number").innerHTML="number of objects detected : "+object.length;

            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }

    //fill("#452E52");
    //text("Dog",150,75);
    //textSize(20);
    //noFill();
    //stroke("#452E52");
    //rect(140,50,200,350);

    //fill("#6F4369");
    //text("Cat",350,75);
    //textSize(20);
    //noFill();
    //stroke("#6F4369");
    //rect(290,55,330,350);
}