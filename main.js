
Webcam.set({
width:350,
height:300,
image_format: "png",
png_quality:100
});

webcamera = document.getElementById("webcamera");

Webcam.attach("webcamera");

function takePhoto()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("imageshow").innerHTML = '<img id = "imagecaptured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7EH3mmcJh/model.json",modelLoaded);

function modelLoaded()
{
    console.log("Model Is Loaded");
}



function check()
{
    img = document.getElementById("imagecaptured");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
if (error)
{
    console.error(error);
} else {
    console.log(results);
    document.getElementById("objectname").innerHTML = results[0].label;
    predict = results[0].label;
    toSpeak=""
    if(predict == "Amazing")
    {
        toSpeak="This is Looking Amazing";
        document.getElementById("emojiEmotion").innerHTML = "&#128076;"
    }
    if(predict == "Victory")
    {
        toSpeak="This is Marvelous Victory";
        document.getElementById("emojiEmotion").innerHTML = "&#128077;"
    }
    if(predict == "Best")
    {
        toSpeak="This is best";
        document.getElementById("emojiEmotion").innerHTML = "&#9996;"
    }
    speak();
}
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}