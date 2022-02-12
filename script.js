let generator;
(async function(){
    generator = await tf.loadLayersModel("model_js/model.json");
})();


document.getElementById("generate-button").addEventListener("click", function(){
  const noise = tf.randomNormal([100]).maximum(tf.scalar(0, 'float32')).minimum(tf.scalar(1, 'float32')).expandDims(0);


  //var latent_points = generate_latent_points(100, 100)
  let generatedImage = generator.predict(noise).squeeze([0]);


  const mycanvas = document.getElementById("generated-image");
    tf.browser.toPixels(generatedImage,mycanvas).then(()=>{
        generatedImage.dispose();
    });
})
