
$("#button1").change(function(){
let reader = new FileReader();
reader.onload= function(){
    let dataURL = reader.result;
    $("#selected-image").attr("src",dataURL);
    $("#prediction-list").empty();
}
let file =$("#button1").prop('files')[0];
reader.readAsDataURL(file);
});

let model;
(async function(){
    model = await tf.loadmodel('dataset\vgg16.json');
    $('.progress-bar').hide();
})();

$("#button2").click(async function(){
let image=  $('#selected-image').get(0);
let tensor = tf.fromPixels(image)
    .resizeNearestNeighbour([224,224])
    .toFloat()
    .expandDims();

    let predictions = await model.predict(tensor).data();
    let top3=Array.from(predictions)
       .map(function(p,i){
        return {
            probability: p,
            className: IMAGE_CLASS[i]
        };
     }).sort(function(a,b){
         return b.probability - a.probability;
     }).slice(0,5);

     $("#prediction-list").empty();
     top3.forEach(function(p){
        $("#prediction-list").append(`<li>${p.className}: ${p.probability.tofixed(6)*100}</li>`);
     });


});