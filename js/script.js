window.addEventListener("DOMContentLoaded", (event) => {

    $('.tabs .tab').click(function () {
        if ($(this).hasClass('generate')) {
            $('.tabs .tab').removeClass('active');
            $(this).addClass('active');
            $('.cont').hide();
            $('.generate-cont').show();
            $('.animate-cont').hide();
            $('#show-generate').show();
            $('#show-cam-cursor').hide();

        }
        if ($(this).hasClass('animate')) {
            $('.tabs .tab').removeClass('active');
            $(this).addClass('active');
            $('.cont').hide();
            $('.animate-cont').show();
            $('#show-generate').hide();
            $('#show-cam-cursor').show();
        }
    });

    var textWrapper = document.querySelector(".ml12");
    textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    var textWrapper2 = document.querySelector(".ml13");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );


    var textWrapper3 = document.querySelector(".ml14");
    textWrapper3.innerHTML = textWrapper3.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );

    anime.timeline().add({
        targets: ".ml12 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    anime.timeline().add({
        targets: ".ml13 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    anime.timeline().add({
        targets: ".ml14 .letter",
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 1200 + 60 * i,
    });

    TweenMax.from(".logo", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
    });

    TweenMax.from(".back-btn", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 0.4,
    });

    TweenMax.from(".right", 3, {
        y: "40",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 0.6,
    });

    TweenMax.from(".card-img", 2, {
        y: "60",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 1.2,
    });

    TweenMax.from(".btn", 2, {
        y: "60",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 1.4,
    });

    TweenMax.staggerFrom(
        ".price > span",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 1.6,
    },
        0.2
    );

    TweenMax.staggerFrom(
        ".nav > .nav-item",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 1.6,
    },
        0.2
    );

    TweenMax.staggerFrom(
        ".form > div",
        1, {
        y: "40",
        opacity: 0,
        ease: Power2.easeOut,
        delay: 2,
    },
        0.2
    );




    // Setup download button event listener
    document.querySelector("#save-button").addEventListener("click", () => {
        var canvas = document.querySelector("#generated-image");
        var image = canvas.
            toDataURL("image/png").
            replace("image/png", "image/octet-stream");

        var element = document.createElement("a");
        var filename = "sketch.png";
        element.setAttribute("href", image);
        element.setAttribute("download", filename);

        element.click();
    });









    var modelPath = 'model_js/model.json';


    var image_size = 128
    var input_dim = 100
    var nb_points = 5
    var latentspace2D = nj.zeros([image_size, image_size, input_dim])
    var ptgenerated = nj.zeros([1, input_dim])
    var world;
    console.log("world var create")
    var container = document.querySelector('#celeba-scene'),
        loader = container.querySelector('.loader');



    // get the point geometry
    function getGeometry(colors) {
        var geometry = new THREE.Geometry();
        for (var i = 0, y = 128; y > 0; y--) {
            for (var x = 0; x < 128; x++) {
                var color = colors && colors.length ? colors[i++] : Math.random();
                geometry.vertices.push(new THREE.Vector3(x - (128 / 2), y - (128 / 2), 0));
                geometry.colors.push(new THREE.Color(color, color, color));
            }
        }
        return geometry;
    }




    document.getElementById("webcam-load-button").addEventListener("click", function () {
        var elementExists = document.querySelector('#three_canvas');
        if(elementExists){
            elementExists.parentNode.removeChild(elementExists)
            //alert("exist")
        }
        world = new ThreeWorld({
            container: container,
        });
        var materialConfig = {
            size: 1.3,
            vertexColors: THREE.VertexColors,
        };
        var material = new THREE.PointsMaterial(materialConfig);
        var geometry = getGeometry([]);
        world.mesh = new THREE.Points(geometry, material);
        world.controls.noPan = true;
        world.controls.noRotate = true;
        world.scene.add(world.mesh);
        document.querySelector(".container_video").style.display = "block"

        class IceDefrostingEffectRenderer {
            constructor(config) {
                // Remember the config.
                this.config = config;

                // Create a scene, a renderer and a camera.
                this.scene = new THREE.Scene();

                this.renderer = new THREE.WebGLRenderer({
                    canvas: config.canvasElement,
                    antialias: true
                });
                this.renderer.setSize(config.viewportWidth, config.viewportHeight);

                this.camera = new THREE.PerspectiveCamera(
                    config.verticalFov,
                    config.viewportWidth / config.viewportHeight,
                    config.near,
                    config.far
                );

                // Create two buffer for frost layer mask accumulation.
                this.currentAccumulationMaskBuffer = new THREE.WebGLRenderTarget(
                    config.viewportWidth,
                    config.viewportHeight, {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.NearestFilter
                }
                );

                this.previousAccumulationMaskBuffer = new THREE.WebGLRenderTarget(
                    config.viewportWidth,
                    config.viewportHeight, {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.NearestFilter
                }
                );

                // Optimization: create commonly used plane geometries.
                this.viewportPlane = new THREE.PlaneBufferGeometry(
                    config.viewportWidth,
                    config.viewportHeight
                );
                this.unitSizePlane = new THREE.PlaneBufferGeometry(1, 1);


                // Define a safe upper bound for the number of layer-planes. Used to
                // calculate Z coordinates based on the plane order.
                this.numLayersUpperBound = 16;
            }

            render(cameraFrame, firstHandCircle) {
                // Ignore the hand tracking result in the beginning to allow other animated
                // elements to progress.
                this.ignoreHandsAnimationClock =
                    this.ignoreHandsAnimationClock || new THREE.Clock();
                if (
                    this.ignoreHandsAnimationClock.getElapsedTime() <
                    this.config.ignoreHandsIntroLength
                ) {
                    firstHandCircle = null;
                }


                // Render the final effect.
                this.renderFinalPass(cameraFrame, firstHandCircle);

                // Swap the current and the previous accumulation mask buffers.
                [
                    this.currentAccumulationMaskBuffer,
                    this.previousAccumulationMaskBuffer
                ] = [
                        this.previousAccumulationMaskBuffer,
                        this.currentAccumulationMaskBuffer
                    ];
            }

            renderFinalPass(cameraFrame, firstHandCircle) {
                // Create the camera frame plane.
                const cameraFramePlane = this.placeInPerspectiveFrustum(
                    this.createCameraFramePlane(cameraFrame),
                    this.calculateDepthFromOrderIdx(-1)
                );
                this.scene.add(cameraFramePlane);

            }

            createCameraFramePlane(image) {
                return new THREE.Mesh(
                    this.viewportPlane,
                    new THREE.MeshBasicMaterial({
                        map: new THREE.CanvasTexture(image)
                    })
                );
            }


            createPreviousAccumulationMaskPlane() {
                return new THREE.Mesh(
                    this.viewportPlane,
                    new THREE.MeshBasicMaterial({
                        map: this.previousAccumulationMaskBuffer.texture,
                        blending: THREE.AdditiveBlending
                    })
                );
            }

            createDeltaAccumulationMaskPlane(hasFirstHand) {
                const config = this.config.maskAccumulation;
                const animationIntroLength = config.animationIntroLength;
                const animationGainLength = config.animationGainLength;
                const skipIntroDuringFirstCycle = config.skipIntroDuringFirstCycle;

                this.maskAccumulationAnimationClock =
                    this.maskAccumulationAnimationClock || new THREE.Clock(false);
                this.maskAccumulationAnimationNumCycles =
                    this.maskAccumulationAnimationNumCycles || 0;

                if (hasFirstHand) {
                    this.maskAccumulationAnimationClock.stop();
                    return null;
                }

                if (!this.maskAccumulationAnimationClock.running) {
                    this.maskAccumulationAnimationClock.start();
                    ++this.maskAccumulationAnimationNumCycles;
                }

                const conditionedAnimationIntroLength =
                    this.maskAccumulationAnimationNumCycles == 1 &&
                        skipIntroDuringFirstCycle ?
                        0 :
                        animationIntroLength;

                const delta = this.maskAccumulationAnimationClock.getDelta();
                const elapsedTime = this.maskAccumulationAnimationClock.elapsedTime;
                if (elapsedTime < conditionedAnimationIntroLength) {
                    return null;
                }

                const maskAccumulationDelta =
                    Math.min(delta, elapsedTime - conditionedAnimationIntroLength) /
                    animationGainLength;

                return new THREE.Mesh(
                    this.viewportPlane,
                    new THREE.MeshBasicMaterial({
                        color: new THREE.Color(
                            maskAccumulationDelta,
                            maskAccumulationDelta,
                            maskAccumulationDelta
                        ),
                        blending: THREE.AdditiveBlending,
                        transparent: true
                    })
                );
            }


            calculateDepthFromOrderIdx(orderIdx) {
                if (
                    orderIdx >= this.numLayersUpperBound ||
                    orderIdx < -this.numLayersUpperBound
                ) {
                    throw new Error(
                        `orderIdx is out of range! orderIdx = ${orderIdx}, numLayersUpperBound = ${this.numLayersUpperBound}`
                    );
                }

                if (orderIdx < 0) {
                    orderIdx += this.numLayersUpperBound;
                }

                const segmentLength =
                    (this.config.far - this.config.near) / (this.numLayersUpperBound + 1);

                return this.config.near + segmentLength * (orderIdx + 1);
            }

            placeInPerspectiveFrustum(obj, depth) {
                if (!obj) {
                    return obj;
                }

                const heightAtDepth =
                    2 * depth * Math.tan((this.config.verticalFov * Math.PI) / 360);
                const scaleFactor = heightAtDepth / this.config.viewportHeight;

                obj.scale.x *= scaleFactor;
                obj.scale.y *= scaleFactor;
                obj.scale.z *= scaleFactor;

                obj.position.x *= scaleFactor;
                obj.position.y *= scaleFactor;
                obj.position.z = obj.position.z * scaleFactor - depth;

                return obj;
            }
        }
        let centerX = 0;
        let centerY = 0;
        let radius = 0;
        class HandLandmarkProcessor {
            constructor(config) {
                // Remember the config.
                this.config = config;

                // Set all state-related members to default values.
                this.filteredHandCircle = null;
                this.lastHandCircle = null;
                this.lastHandCircleLifetime = 0;
                this.lastHandCirclePresence = 0;
            }

            // Returns a hand circle data for the first tracked hand.
            process(multiHandLandmarks) {
                return this.filterHandCircleTemporally(
                    this.extractFirstHandCircle(multiHandLandmarks)
                );
            }

            extractFirstHandCircle(multiHandLandmarks) {
                if (!multiHandLandmarks || multiHandLandmarks.length < 1) {
                    return null;
                }

                const handLandmarks = multiHandLandmarks[0];
                const viewportLandmarkX = (i) => {
                    return (handLandmarks[i].x) * this.config.viewportWidth;
                };
                const viewportLandmarkY = (i) => {
                    return (handLandmarks[i].y) * this.config.viewportHeight;
                };


                for (let i = 0; i < handLandmarks.length; ++i) {
                    centerX += (viewportLandmarkX(i) - centerX) / (i + 1);
                    centerY += (viewportLandmarkY(i) - centerY) / (i + 1);
                }


                for (let i = 0; i < handLandmarks.length; ++i) {
                    const dx = viewportLandmarkX(i) - centerX;
                    const dy = viewportLandmarkY(i) - centerY;

                    radius = Math.max(radius, Math.sqrt(dx * dx + dy * dy));
                }

                return {
                    centerX,
                    centerY,
                    radius
                };
            }

            filterHandCircleTemporally(handCircle) {
                const mix = (a, b) => {
                    return (
                        (1 - this.config.lowPassAlpha) * a + this.config.lowPassAlpha * b
                    );
                };
                const mixHandCircle = (a, b) => {
                    return {
                        centerX: mix(a.centerX, b.centerX),
                        centerY: mix(a.centerY, b.centerY),
                        radius: mix(a.radius, b.radius)
                    };
                };

                if (handCircle) {
                    this.lastHandCircle = handCircle;
                    this.lastHandCircleLifetime = 0;
                    ++this.lastHandCirclePresence;
                } else {
                    ++this.lastHandCircleLifetime;
                    if (
                        this.lastHandCircleLifetime >=
                        this.config.handDetectionLifetimeThreshold
                    ) {
                        this.lastHandCircle = null;
                        this.lastHandCircleLifetime = 0;
                        this.lastHandCirclePresence = 0;
                    }
                }

                if (this.filteredHandCircle && this.lastHandCircle) {
                    this.filteredHandCircle = mixHandCircle(
                        this.filteredHandCircle,
                        this.lastHandCircle
                    );
                } else if (this.lastHandCircle) {
                    this.filteredHandCircle = this.lastHandCircle;
                } else {
                    this.filteredHandCircle = null;
                }

                if (
                    this.lastHandCirclePresence >=
                    this.config.handDetectionPresenceThreshold
                ) {
                    return this.filteredHandCircle;
                } else {
                    return null;
                }
            }
        }

        function main() {
            //document.querySelector("#ui-box").style.display = "none"
            // Our input frames will come from here.
            const videoElement = document.getElementsByClassName("input_video")[0];
            const canvasElement = document.getElementsByClassName("output_canvas")[0];

            // Optimization: Turn off animated spinner after its hiding animation is done.
            const spinner = document.querySelector(".loading");
            spinner.ontransitionend = () => {
                spinner.style.display = "none";
            };

            // Define demo config.
            const iceDefrostingEffectConfig = {
                canvasElement: canvasElement,
                viewportWidth: 127, //
                viewportHeight: 127,
                verticalFov: 45,
                near: 1,
                far: 10,
                handMaskRadiusFactor: 0.1,
                handHintRadiusFactor: 0.1,
                // Animation lengths are in seconds.
                ignoreHandsIntroLength: 2,
                maskAccumulation: {
                    animationIntroLength: 0.75,
                    animationGainLength: 3,
                    skipIntroDuringFirstCycle: true
                },
                onboardingText: {
                    opacityAnimationIntroLength: 1,
                    opacityAnimationLoopLength: 2
                }
            };

            const handLandmarkProcessorConfig = {
                viewportWidth: iceDefrostingEffectConfig.viewportWidth,
                viewportHeight: iceDefrostingEffectConfig.viewportHeight,
                lowPassAlpha: 0.8,
                handDetectionLifetimeThreshold: 3,
                handDetectionPresenceThreshold: 3
            };

            const handTrackerConfig = {
                selfieMode: true,
                maxHands: 1,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.9
            };

            // Update the camera video element to reflect the selfie mode option.
            videoElement.classList.toggle("selfie", handTrackerConfig.selfieMode);

            // Create an ice defrosting demo renderer.
            const iceDefrostingEffectRenderer = new IceDefrostingEffectRenderer(
                iceDefrostingEffectConfig
            );

            // Create a hand landmark processor.
            const handLandmarkProcessor = new HandLandmarkProcessor(
                handLandmarkProcessorConfig
            );

            // Create a hand tracker.
            const handTracker = new Hands({
                locateFile: (x) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1.1606863095/${x}`;
                }
            });
            handTracker.setOptions(handTrackerConfig);
            handTracker.onResults((results) => {

                // Hide the spinner.
                document.body.classList.add("loaded");
                //console.log(handLandmarkProcessor.process(results.multiHandLandmarks))
                // Process landmarks & render the effect.
                iceDefrostingEffectRenderer.render(
                    results.image,
                    handLandmarkProcessor.process(results.multiHandLandmarks)
                );


                sample({
                    x: 0,
                    y: 0
                })
            });

            // Instantiate a camera. We'll feed each frame we receive into the solution.
            const cameraMp = new Camera(videoElement, {
                onFrame: async () => {
                    await handTracker.send({
                        image: videoElement
                    });
                },
                width: iceDefrostingEffectConfig.viewportWidth,
                height: iceDefrostingEffectConfig.viewportHeight
            });
            cameraMp.start();
            //document.querySelector("#ui-box").style.display = "none"

        }
        latentspace2D = nj.zeros([image_size, image_size, input_dim])
        ptgenerated = nj.zeros([1, input_dim])
        class RBFInterpolation {
            constructor(pointList, pointValues) {
                this.pointListSize = nb_points
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




        // Standard Normal variate using Box-Muller transform.
        function randn_bm(min, max, skew) {
            let u = 0,
                v = 0;
            while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
            while (v === 0) v = Math.random()
            let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
            return num
        }


        //generate points in latent space as input for the generator
        function generate_latent_points(latent_dim, n_samples) { //generate points in the latent space
            var x_input = nj.array(Array.from({
                length: latent_dim * n_samples
            }, () => randn_bm(-10, 10, 1)));
            //reshape into a batch of inputs for the network
            var z_input = x_input.reshape(n_samples, latent_dim)
            return z_input
        }

        //generate 4 points in latent space
        var pt1 = generate_latent_points(input_dim, 1)
        var pt2 = generate_latent_points(input_dim, 1)
        var pt3 = generate_latent_points(input_dim, 1)
        var pt4 = generate_latent_points(input_dim, 1)
        var pt5 = generate_latent_points(input_dim, 1)

        function rbfDistance(pt1X, pt1Y, pt2X, pt2Y) {
            var VectArray = nj.zeros(2)
            VectArray.set(0, pt1X - pt2X)
            VectArray.set(1, pt1Y - pt2Y)

            var d = math.sqrt(math.pow(VectArray.get(0), 2) + math.pow(VectArray.get(1), 2))

            return math.exp(-0.0001 * d * d)

        }




        var pointListPos = nj.zeros([nb_points, 2])
        var pointListseed = nj.zeros([input_dim, nb_points])

        for (let i = 0; i < input_dim; i++) {

            pointListseed.set(i, 0, pt1.get(0, i))
            pointListseed.set(i, 1, pt2.get(0, i))
            pointListseed.set(i, 2, pt3.get(0, i))
            pointListseed.set(i, 3, pt4.get(0, i))
            pointListseed.set(i, 4, pt5.get(0, i))
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

        compteur += 1


        pt.set(0, Math.round(image_size / 2))
        pt.set(1, Math.round(image_size / 2))
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


        tf.loadLayersModel(modelPath).then(function (model) {
            window.decoder = model;
            main();

            //sample({x : 0, y : 0})
            world.render();
            if (document.body.contains(loader)) {
                loader.parentNode.removeChild(loader);
            }
            window.c2d = new Controls2D({
                onDrag: sample,
                container: container,
            });
            document.querySelector("#ui-box").style.display = "none"
            console.log("Everything is loaded")
            document.querySelector("#ui-box").style.display = "none"
        })



        // sample from the latent space at obj.x, obj.y
        function sample(obj) {


            obj.x = Number(((centerX)).toFixed());
            obj.y = Number(((centerY)).toFixed());


            //obj.x = Number(((obj.x)).toFixed());
            //obj.y = Number(((obj.y)).toFixed());

            //console.log(obj.x)

            for (let i = 0; i < input_dim; i++) {
                ptgenerated.set(0, i, latentspace2D.get(obj.x, obj.y, i))
            }


            const tensor = tf.tensor([
                [ptgenerated.get(0, 0), ptgenerated.get(0, 1), ptgenerated.get(0, 2), ptgenerated.get(0, 3), ptgenerated.get(0, 4), ptgenerated.get(0, 5), ptgenerated.get(0, 6), ptgenerated.get(0, 7), ptgenerated.get(0, 8), ptgenerated.get(0, 9), ptgenerated.get(0, 10), ptgenerated.get(0, 11), ptgenerated.get(0, 12), ptgenerated.get(0, 13), ptgenerated.get(0, 14), ptgenerated.get(0, 15), ptgenerated.get(0, 16), ptgenerated.get(0, 17), ptgenerated.get(0, 18), ptgenerated.get(0, 19), ptgenerated.get(0, 20), ptgenerated.get(0, 21), ptgenerated.get(0, 22), ptgenerated.get(0, 23), ptgenerated.get(0, 24), ptgenerated.get(0, 25), ptgenerated.get(0, 26), ptgenerated.get(0, 27), ptgenerated.get(0, 28), ptgenerated.get(0, 29), ptgenerated.get(0, 30), ptgenerated.get(0, 31), ptgenerated.get(0, 32), ptgenerated.get(0, 33), ptgenerated.get(0, 34), ptgenerated.get(0, 35), ptgenerated.get(0, 36), ptgenerated.get(0, 37), ptgenerated.get(0, 38), ptgenerated.get(0, 39), ptgenerated.get(0, 40), ptgenerated.get(0, 41), ptgenerated.get(0, 42), ptgenerated.get(0, 43), ptgenerated.get(0, 44), ptgenerated.get(0, 45), ptgenerated.get(0, 46), ptgenerated.get(0, 47), ptgenerated.get(0, 48), ptgenerated.get(0, 49), ptgenerated.get(0, 50), ptgenerated.get(0, 51), ptgenerated.get(0, 52), ptgenerated.get(0, 53), ptgenerated.get(0, 54), ptgenerated.get(0, 55), ptgenerated.get(0, 56), ptgenerated.get(0, 57), ptgenerated.get(0, 58), ptgenerated.get(0, 59), ptgenerated.get(0, 60), ptgenerated.get(0, 61), ptgenerated.get(0, 62), ptgenerated.get(0, 63), ptgenerated.get(0, 64), ptgenerated.get(0, 65), ptgenerated.get(0, 66), ptgenerated.get(0, 67), ptgenerated.get(0, 68), ptgenerated.get(0, 69), ptgenerated.get(0, 70), ptgenerated.get(0, 71), ptgenerated.get(0, 72), ptgenerated.get(0, 73), ptgenerated.get(0, 74), ptgenerated.get(0, 75), ptgenerated.get(0, 76), ptgenerated.get(0, 77), ptgenerated.get(0, 78), ptgenerated.get(0, 79), ptgenerated.get(0, 80), ptgenerated.get(0, 81), ptgenerated.get(0, 82), ptgenerated.get(0, 83), ptgenerated.get(0, 84), ptgenerated.get(0, 85), ptgenerated.get(0, 86), ptgenerated.get(0, 87), ptgenerated.get(0, 88), ptgenerated.get(0, 89), ptgenerated.get(0, 90), ptgenerated.get(0, 91), ptgenerated.get(0, 92), ptgenerated.get(0, 93), ptgenerated.get(0, 94), ptgenerated.get(0, 95), ptgenerated.get(0, 96), ptgenerated.get(0, 97), ptgenerated.get(0, 98), ptgenerated.get(0, 99)]
            ]);


            // sample from region 10, 50 in latent space
            var prediction = window.decoder.predict(tensor).dataSync();
            // log the prediction to the browser console
            world.mesh.geometry = getGeometry(prediction);
            //console.log(ptgenerated)

        }

    })




    document.getElementById("cursor-load-button").addEventListener("click", function () {
        document.querySelector(".container_video").style.display = "none"
        var elementExists = document.querySelector('#three_canvas');
        if(elementExists){
            elementExists.parentNode.removeChild(elementExists)
            //alert("exist")
        }
        world = new ThreeWorld({
            container: container,
        });

        var materialConfig = {
            size: 1.3,
            vertexColors: THREE.VertexColors,
        };
        var material = new THREE.PointsMaterial(materialConfig);
        var geometry = getGeometry([]);
        world.mesh = new THREE.Points(geometry, material);
        world.controls.noPan = true;
        world.controls.noRotate = true;
        world.scene.add(world.mesh);
        latentspace2D = nj.zeros([image_size, image_size, input_dim])
        ptgenerated = nj.zeros([1, input_dim])
        class RBFInterpolation {
            constructor(pointList, pointValues) {
                this.pointListSize = nb_points
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




        // Standard Normal variate using Box-Muller transform.
        function randn_bm(min, max, skew) {
            let u = 0,
                v = 0;
            while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
            while (v === 0) v = Math.random()
            let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
            return num
        }


        //generate points in latent space as input for the generator
        function generate_latent_points(latent_dim, n_samples) { //generate points in the latent space
            var x_input = nj.array(Array.from({
                length: latent_dim * n_samples
            }, () => randn_bm(-10, 10, 1)));
            //reshape into a batch of inputs for the network
            var z_input = x_input.reshape(n_samples, latent_dim)
            return z_input
        }

        //generate 4 points in latent space
        var pt1 = generate_latent_points(input_dim, 1)
        var pt2 = generate_latent_points(input_dim, 1)
        var pt3 = generate_latent_points(input_dim, 1)
        var pt4 = generate_latent_points(input_dim, 1)
        var pt5 = generate_latent_points(input_dim, 1)

        function rbfDistance(pt1X, pt1Y, pt2X, pt2Y) {
            var VectArray = nj.zeros(2)
            VectArray.set(0, pt1X - pt2X)
            VectArray.set(1, pt1Y - pt2Y)

            var d = math.sqrt(math.pow(VectArray.get(0), 2) + math.pow(VectArray.get(1), 2))

            return math.exp(-0.0001 * d * d)

        }




        var pointListPos = nj.zeros([nb_points, 2])
        var pointListseed = nj.zeros([input_dim, nb_points])

        for (let i = 0; i < input_dim; i++) {

            pointListseed.set(i, 0, pt1.get(0, i))
            pointListseed.set(i, 1, pt2.get(0, i))
            pointListseed.set(i, 2, pt3.get(0, i))
            pointListseed.set(i, 3, pt4.get(0, i))
            pointListseed.set(i, 4, pt5.get(0, i))
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

        compteur += 1


        pt.set(0, Math.round(image_size / 2))
        pt.set(1, Math.round(image_size / 2))
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


        tf.loadLayersModel(modelPath).then(function (model) {
            window.decoder = model;
            sample({
                x: 0,
                y: 0
            })
            world.render();
            if (document.body.contains(loader)) {
                loader.parentNode.removeChild(loader);
            }
            window.c2d === void 0
            window.c2d = new Controls2D({
                onDrag: sample,
                container: container,
                square_container: square_container,
            });
            console.log("Everything is loaded")
        })



        // sample from the latent space at obj.x, obj.y
        function sample(obj) {


            obj.x = Number(((obj.x)).toFixed());
            obj.y = Number(((obj.y)).toFixed());


            console.log(obj.x)


            for (let i = 0; i < input_dim; i++) {
                ptgenerated.set(0, i, latentspace2D.get(obj.x, obj.y, i))
            }


            const tensor = tf.tensor([
                [ptgenerated.get(0, 0), ptgenerated.get(0, 1), ptgenerated.get(0, 2), ptgenerated.get(0, 3), ptgenerated.get(0, 4), ptgenerated.get(0, 5), ptgenerated.get(0, 6), ptgenerated.get(0, 7), ptgenerated.get(0, 8), ptgenerated.get(0, 9), ptgenerated.get(0, 10), ptgenerated.get(0, 11), ptgenerated.get(0, 12), ptgenerated.get(0, 13), ptgenerated.get(0, 14), ptgenerated.get(0, 15), ptgenerated.get(0, 16), ptgenerated.get(0, 17), ptgenerated.get(0, 18), ptgenerated.get(0, 19), ptgenerated.get(0, 20), ptgenerated.get(0, 21), ptgenerated.get(0, 22), ptgenerated.get(0, 23), ptgenerated.get(0, 24), ptgenerated.get(0, 25), ptgenerated.get(0, 26), ptgenerated.get(0, 27), ptgenerated.get(0, 28), ptgenerated.get(0, 29), ptgenerated.get(0, 30), ptgenerated.get(0, 31), ptgenerated.get(0, 32), ptgenerated.get(0, 33), ptgenerated.get(0, 34), ptgenerated.get(0, 35), ptgenerated.get(0, 36), ptgenerated.get(0, 37), ptgenerated.get(0, 38), ptgenerated.get(0, 39), ptgenerated.get(0, 40), ptgenerated.get(0, 41), ptgenerated.get(0, 42), ptgenerated.get(0, 43), ptgenerated.get(0, 44), ptgenerated.get(0, 45), ptgenerated.get(0, 46), ptgenerated.get(0, 47), ptgenerated.get(0, 48), ptgenerated.get(0, 49), ptgenerated.get(0, 50), ptgenerated.get(0, 51), ptgenerated.get(0, 52), ptgenerated.get(0, 53), ptgenerated.get(0, 54), ptgenerated.get(0, 55), ptgenerated.get(0, 56), ptgenerated.get(0, 57), ptgenerated.get(0, 58), ptgenerated.get(0, 59), ptgenerated.get(0, 60), ptgenerated.get(0, 61), ptgenerated.get(0, 62), ptgenerated.get(0, 63), ptgenerated.get(0, 64), ptgenerated.get(0, 65), ptgenerated.get(0, 66), ptgenerated.get(0, 67), ptgenerated.get(0, 68), ptgenerated.get(0, 69), ptgenerated.get(0, 70), ptgenerated.get(0, 71), ptgenerated.get(0, 72), ptgenerated.get(0, 73), ptgenerated.get(0, 74), ptgenerated.get(0, 75), ptgenerated.get(0, 76), ptgenerated.get(0, 77), ptgenerated.get(0, 78), ptgenerated.get(0, 79), ptgenerated.get(0, 80), ptgenerated.get(0, 81), ptgenerated.get(0, 82), ptgenerated.get(0, 83), ptgenerated.get(0, 84), ptgenerated.get(0, 85), ptgenerated.get(0, 86), ptgenerated.get(0, 87), ptgenerated.get(0, 88), ptgenerated.get(0, 89), ptgenerated.get(0, 90), ptgenerated.get(0, 91), ptgenerated.get(0, 92), ptgenerated.get(0, 93), ptgenerated.get(0, 94), ptgenerated.get(0, 95), ptgenerated.get(0, 96), ptgenerated.get(0, 97), ptgenerated.get(0, 98), ptgenerated.get(0, 99)]
            ]);


            // sample from region 10, 50 in latent space
            var prediction = window.decoder.predict(tensor).dataSync();
            // log the prediction to the browser console
            world.mesh.geometry = getGeometry(prediction);
            //console.log(ptgenerated)

        }

    })





})


let generator;
(async function () {
    generator = await tf.loadLayersModel("model_js/model.json");
})();


document.getElementById("generate-button").addEventListener("click", async function () {
    const noise = tf.randomNormal([100]).maximum(tf.scalar(0, 'float32')).minimum(tf.scalar(1, 'float32')).expandDims(0);


    //var latent_points = generate_latent_points(100, 100)
    let generatedImage = await generator.predict(noise).squeeze([0]);


    const mycanvas = document.getElementById("generated-image");
    tf.browser.toPixels(generatedImage, mycanvas).then(() => {
        generatedImage.dispose();
    });
})