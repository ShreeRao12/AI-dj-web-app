song = "";
leftWristX = 0;
RightWristX = 0;
leftWristY = 0;
RightWristY = 0;
function preload()
{
 song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 500, 600);
}

function play()
{
   song.play();
   song.rate(1);
   song.setVolume(0.5);
}

function modelLoaded()
{
    console.log("Model loaded!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+RightWristX+" RightWristY = "+RightWristY);
    }
}