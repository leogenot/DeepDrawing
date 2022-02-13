var generator;
(async function () {
    generator = await tf.loadLayersModel("model_js/model.json");
})();


var image_size = 128
var input_dim = 100
var nb_points = 4
var latentspace2D = nj.zeros([image_size, image_size, input_dim])
var ptgenerated = nj.zeros([1, input_dim])
//var modelPath = 'model_js/model.json';

// add the mesh to the scene
var world = new ThreeWorld();
var materialConfig = { size: 1.25, vertexColors: THREE.VertexColors, };
var material = new THREE.PointsMaterial(materialConfig);
var geometry = getGeometry([]);
var mesh = new THREE.Points(geometry, material);
world.scene.add(mesh);
document.getElementById("generate-button").addEventListener("click", function () {
    class RBFInterpolation {
        constructor(pointList, pointValues) {
            this.pointListSize = 4
            //w coefficients
            var wArray = nj.zeros([1, this.pointListSize])
            this.pointList = pointList
            //distance matrix

            var rbf = nj.zeros([this.pointListSize, this.pointListSize])


            //compute the distance matrix
            for (let i = 0; i < this.pointListSize; i++) {
                for (let j = 0; j < this.pointListSize; j++) {

                    var dist = rbfDistance(pointList.get(0, i), pointList.get(1, i), pointList.get(0, j), pointList.get(1, j))
                    rbf.set(i, j, dist)
                }
            }
            for (let i = 0; i < this.pointListSize; i++) {
                wArray.set(0, i, math.usolve(rbf.tolist(), pointValues.tolist()))

            }

            this.w = wArray

            this.arr1 = this.w.get(0, 0)



        }


        interpolation(pointX, pointY) {
            var value = 0

            for (let i = 0; i < this.pointListSize; i++) {
                value += this.arr1[i][0] * rbfDistance(pointX, pointY, this.pointList.get(0, i), this.pointList.get(1, i));

            }
            return value
        }



    }





    function randn_bm() {
        var u = 0, v = 0;
        while (u === 0) u = math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = math.random();
        return math.sqrt(-2.0 * math.log(u)) * math.cos(2.0 * math.PI * v);
    }


    //generate points in latent space as input for the generator
    function generate_latent_points(latent_dim, n_samples) {    //generate points in the latent space
        var x_input = nj.array(Array.from({ length: latent_dim * n_samples }, () => randn_bm()));
        //reshape into a batch of inputs for the network
        var z_input = x_input.reshape(n_samples, latent_dim)
        return z_input
    }

    //generate 4 points in latent space
    var pt1 = generate_latent_points(input_dim, 1)
    var pt2 = generate_latent_points(input_dim, 1)
    var pt3 = generate_latent_points(input_dim, 1)
    var pt4 = generate_latent_points(input_dim, 1)

    function rbfDistance(pt1X, pt1Y, pt2X, pt2Y) {
        var VectArray = nj.zeros(2)
        VectArray.set(0, pt1X - pt2X)
        VectArray.set(1, pt1Y - pt2Y)

        var d = math.sqrt(math.pow(VectArray.get(0), 2) + math.pow(VectArray.get(1), 2))

        return math.exp(-0.00002 * d * d)

    }





    

    var pointListPos = nj.zeros([nb_points, 2])
    var pointListseed = nj.zeros([input_dim, nb_points])

    for (let i = 0; i < input_dim; i++) {

        pointListseed.set(i, 0, pt1.get(0, i))
        pointListseed.set(i, 1, pt2.get(0, i))
        pointListseed.set(i, 2, pt3.get(0, i))
        pointListseed.set(i, 3, pt4.get(0, i))
    }

    var pt = nj.zeros(2)
    var compteur = 0

    pt.set(0, 0)
    pt.set(1, 0)
    pointListPos.set(compteur, 0, pt.get(0));
    pointListPos.set(compteur, 1, pt.get(1));


    for (let i = 0; i < input_dim; i++)
        latentspace2D.set(pt.get(0), pt.get(1), i, pointListseed.get(i, compteur))

    compteur += 1


    pt.set(0, 0)
    pt.set(1, image_size - 1)
    pointListPos.set(compteur, 0, pt.get(0));
    pointListPos.set(compteur, 1, pt.get(1));
    for (let i = 0; i < input_dim; i++)
        latentspace2D.set(pt.get(0), pt.get(1), i, pointListseed.get(i, compteur))

    compteur += 1


    pt.set(0, image_size - 1)
    pt.set(1, 0)
    pointListPos.set(compteur, 0, pt.get(0));
    pointListPos.set(compteur, 1, pt.get(1));
    for (let i = 0; i < input_dim; i++)
        latentspace2D.set(pt.get(0), pt.get(1), i, pointListseed.get(i, compteur))

    compteur += 1


    pt.set(0, image_size - 1)
    pt.set(1, image_size - 1)
    pointListPos.set(compteur, 0, pt.get(0));
    pointListPos.set(compteur, 1, pt.get(1));
    for (let i = 0; i < input_dim; i++)
        latentspace2D.set(pt.get(0), pt.get(1), i, pointListseed.get(i, compteur))

    let rbf_tab = []
    for (let i = 0; i < input_dim; i++) {

        var newTab = nj.zeros([nb_points])
        for (let j = 0; j < nb_points; j++) {
            newTab.set(j, pointListseed.get(i, j))
        }
        var rbf_par = new RBFInterpolation(pointListPos, newTab)
        var new_rbf_tab = rbf_tab.push(rbf_par)

    }

    for (let i = 0; i < image_size; i++) {
        for (let j = 0; j < image_size; j++) {
            pt.set(0, i)
            pt.set(1, j)
            for (let k = 0; k < input_dim; k++) {
                latentspace2D.set(i, j, k, math.min(math.max(rbf_tab[k].interpolation(pt.get(0), pt.get(1)), -2.5), 2.5))
            }
        }
    }






    //window.decoder = generator;
    sample({ x: 0, y: 0 })
    world.render();
    new Controls2D({ onDrag: sample });



})


// get the point geometry
function getGeometry(colors) {
    var geometry = new THREE.Geometry();
    for (var i=0, y=128; y>0; y--) {
      for (var  x=0; x<128; x++) {
        var color = colors && colors.length ? colors[i++] : Math.random();
        geometry.vertices.push(new THREE.Vector3(x-(182/2), y-(218/2), 0));
        geometry.colors.push(new THREE.Color(color, color, color));
      }
    }
    return geometry;
  }
// sample from the latent space at obj.x, obj.y
function sample(obj) {

    obj.x = Number(((obj.x + 1) / 2).toFixed(1));
    obj.y = Number(((obj.y + 1) / 2).toFixed(1));



    
    for (let i = 0; i < input_dim; i++) {
        ptgenerated.set(0, i, latentspace2D.get(obj.x, obj.y, i))
    }

    for (let i = 0; i < 100; i++) {
        X = (ptgenerated.get(0, i) + 1) / 2.0
        ptgenerated.set(0, i, X)
    }


    const tensor = tf.tensor([[ptgenerated.get(0, 0), ptgenerated.get(0, 1), ptgenerated.get(0, 2), ptgenerated.get(0, 3), ptgenerated.get(0, 4), ptgenerated.get(0, 5), ptgenerated.get(0, 6), ptgenerated.get(0, 7), ptgenerated.get(0, 8), ptgenerated.get(0, 9), ptgenerated.get(0, 10), ptgenerated.get(0, 11), ptgenerated.get(0, 12), ptgenerated.get(0, 13), ptgenerated.get(0, 14), ptgenerated.get(0, 15), ptgenerated.get(0, 16), ptgenerated.get(0, 17), ptgenerated.get(0, 18), ptgenerated.get(0, 19), ptgenerated.get(0, 20), ptgenerated.get(0, 21), ptgenerated.get(0, 22), ptgenerated.get(0, 23), ptgenerated.get(0, 24), ptgenerated.get(0, 25), ptgenerated.get(0, 26), ptgenerated.get(0, 27), ptgenerated.get(0, 28), ptgenerated.get(0, 29), ptgenerated.get(0, 30), ptgenerated.get(0, 31), ptgenerated.get(0, 32), ptgenerated.get(0, 33), ptgenerated.get(0, 34), ptgenerated.get(0, 35), ptgenerated.get(0, 36), ptgenerated.get(0, 37), ptgenerated.get(0, 38), ptgenerated.get(0, 39), ptgenerated.get(0, 40), ptgenerated.get(0, 41), ptgenerated.get(0, 42), ptgenerated.get(0, 43), ptgenerated.get(0, 44), ptgenerated.get(0, 45), ptgenerated.get(0, 46), ptgenerated.get(0, 47), ptgenerated.get(0, 48), ptgenerated.get(0, 49), ptgenerated.get(0, 50), ptgenerated.get(0, 51), ptgenerated.get(0, 52), ptgenerated.get(0, 53), ptgenerated.get(0, 54), ptgenerated.get(0, 55), ptgenerated.get(0, 56), ptgenerated.get(0, 57), ptgenerated.get(0, 58), ptgenerated.get(0, 59), ptgenerated.get(0, 60), ptgenerated.get(0, 61), ptgenerated.get(0, 62), ptgenerated.get(0, 63), ptgenerated.get(0, 64), ptgenerated.get(0, 65), ptgenerated.get(0, 66), ptgenerated.get(0, 67), ptgenerated.get(0, 68), ptgenerated.get(0, 69), ptgenerated.get(0, 70), ptgenerated.get(0, 71), ptgenerated.get(0, 72), ptgenerated.get(0, 73), ptgenerated.get(0, 74), ptgenerated.get(0, 75), ptgenerated.get(0, 76), ptgenerated.get(0, 77), ptgenerated.get(0, 78), ptgenerated.get(0, 79), ptgenerated.get(0, 80), ptgenerated.get(0, 81), ptgenerated.get(0, 82), ptgenerated.get(0, 83), ptgenerated.get(0, 84), ptgenerated.get(0, 85), ptgenerated.get(0, 86), ptgenerated.get(0, 87), ptgenerated.get(0, 88), ptgenerated.get(0, 89), ptgenerated.get(0, 90), ptgenerated.get(0, 91), ptgenerated.get(0, 92), ptgenerated.get(0, 93), ptgenerated.get(0, 94), ptgenerated.get(0, 95), ptgenerated.get(0, 96), ptgenerated.get(0, 97), ptgenerated.get(0, 98), ptgenerated.get(0, 99)]]);


    // sample from region 10, 50 in latent space
    var prediction = generator.predict(tensor).dataSync();
    // log the prediction to the browser console
    mesh.geometry = getGeometry(prediction);
    //console.log(ptgenerated)

}

