song="";
on_or_off = false;
left_hand_wristX = 0;
left_hand_wristY = 0;
right_hand_wristX = 0;
right_hand_wristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
function preload(){
    song = loadSound("buscuit.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("model loaded");
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftWrist > 0.2){

        circle(left_hand_wristX, left_hand_wristY, 20);

        left_hand_wristY_int = Number(left_hand_wristY);
        remove_decimal = floor(left_hand_wristY_int * 2 );
        left_wrist_y_divide_by_1000 = remove_decimal / 1000
        document.getElementById("vol").innerHTML = "Volume: " + left_wrist_y_divide_by_1000;
        song.setVolume(left_wrist_y_divide_by_1000);
    }
}
function playing(){
    if( on_or_off == false){
        song.play();
        song.setVolume(1);
        song.rate(1);
        on_or_off = true;
        document.getElementById("play").innerHTML = "Stop";
    }
    else if( on_or_off == true){
        song.stop();
        on_or_off = false;
        document.getElementById("play").innerHTML = "Play";
    }

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        left_hand_wristX = results[0].pose.leftWrist.x;
        left_hand_wristY = results[0].pose.leftWrist.y;
        right_hand_wristX = results[0].pose.rightWrist.x;
        right_hand_wristY = results[0].pose.rightWrist.y;

        console.log("Left hand wrist x :: " + left_hand_wristX + " Left hand wrist y :: " + left_hand_wristY + " Right hand wrist x :: " + right_hand_wristX + " Right hand wrist y :: " + right_hand_wristY);


    }
}