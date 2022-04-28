song = "";
leftWristX = 0;
RightWristX = 0;
leftWristY = 0;
RightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
function preload()
{
 song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_leftWrist > 0.2)
    {
        circle(leftWristX-70, leftWristY, 20);
    
        InNumberleftwristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftwristY);
        Volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume - "+Volume;
        song.setVolume(Volume);
    
    }
      if(score_rightWrist > 0.2)
      {
         fill("red");
            stroke("red");
            circle(RightWristX, RightWristY, 20);

            if(RightWristY > 0 && RightWristY <= 100)
            {
            document.getElementById("speed").innerHTML = "Speed - 0.5x";
            song.rate(0.5);
            }
            else if(RightWristY > 100 && RightWristY <= 200)
            {
            document.getElementById("speed").innerHTML = "Speed - 1x";
            song.rate(1);
            }
            else if(RightWristY > 200 && RightWristY <= 300)
            {
            document.getElementById("speed").innerHTML = "Speed - 1.5x";
            song.rate(1.5);
            }
            else if(RightWristY > 300 && RightWristY <= 400)
            {
            document.getElementById("speed").innerHTML = "Speed - 2x";
            song.rate(2);
            }
            else if(RightWristY > 400 && RightWristY <= 500)
            {
            document.getElementById("speed").innerHTML = "Speed - 2.5x";
            song.rate(2.5);
            }
        }
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

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("score_leftWrist: "+ score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("score_rightWrist: "+ score_rightWrist);

    }
}