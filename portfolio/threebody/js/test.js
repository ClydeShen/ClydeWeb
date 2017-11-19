var DENSITY = 1.38E15; // This value determined qualitatively by observing how large the spheres look onscreen (i.e., their radii).

document.getElementById('submitButton').addEventListener('click', handleSubmitButton, false);
document.getElementById('reloadButton').addEventListener('click', handleReloadButton, false);
document.getElementById('infoButton').addEventListener('click', handleInfoButton, false);

var simulation = Simulation(); // Call the Simulation constructor to create a new simulation object.

function Simulation() { // A constructor.
    var that = {}; // The object returned by this constructor.
    var worker = null; // Will contain a reference to a fast number-chrunching worker thread that runs outside of this UR/animation thread.
    var requestAnimationFrameID = null; // Used to cancel a prior requestAnimationFrame request.
    var gl = {}; // Will contain WebGL related items.

    gl.viewportWidth = 800; // The width of the Three.js viewport.
    gl.viewportHeight = 600; // The height of the Three.js viewport.

    gl.cameraSpecs = {
        aspectRatio: gl.viewportWidth / gl.viewportHeight, // Camera frustum aspect ratio.
        viewAngle: 50 // Camera frustum vertical field of view, in degrees.
    };

    gl.clippingPlane = {
        near: 0.1, // The distance of the near clipping plane (which always coincides with the monitor).
        far: 1000 // The distance of the far clipping plane (note that you get a negative far clipping plane for free, which occurs at the negative of this value).
    };

    gl.quads = 32; // Represents both the number of vertical segments and the number of horizontal rings for each mass's sphere wireframe.

    gl.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({alpha: true}) : new THREE.CanvasRenderer({alpha: true}); // If WebGL isn't supported, fallback to using the canvas-based renderer (which most browsers support). Note that passing in "{ antialias: true }" is unnecessary in that this is the default behavior. However, we pass in "{ alpha: true }" in order to let the background PNG image shine through.
    gl.renderer.setClearColor(0x000000, 0); // Make the background completely transparent (the actual color, black in this case, does not matter) so that the PNG background image can shine through.
    gl.renderer.setSize(gl.viewportWidth, gl.viewportHeight); // Set the size of the renderer.

    gl.scene = new THREE.Scene(); // Create a Three.js scene.

    gl.camera = new THREE.PerspectiveCamera(gl.cameraSpecs.viewAngle, gl.cameraSpecs.aspectRatio, gl.clippingPlane.near, gl.clippingPlane.far); // Set up the viewer's eye position.
    gl.camera.position.set(0, 95, 450); // The camera starts at the origin, so move it to a good position.
    gl.camera.lookAt(gl.scene.position); // Make the camera look at the origin of the xyz-coordinate system.

    gl.controls = new THREE.OrbitControls(gl.camera, gl.renderer.domElement); // Allows for orbiting, panning, and zooming via OrbitsControls.js by http://threejs.org. For an example, see http://threejs.org/examples/misc_controls_orbit.html.

    gl.pointLight = new THREE.PointLight(0xFFFFFF); // Set the color of the light source (white).
    gl.pointLight.position.set(0, 250, 250); // Position the light source at (x, y, z).
    gl.scene.add(gl.pointLight); // Add the light source to the scene.

    gl.spheres = []; // Will contain WebGL sphere mesh objects representing the point masses.

    var init = function (initialConditions) { // Public method, resets everything when called.
        if (requestAnimationFrameID) {
            cancelAnimationFrame(requestAnimationFrameID); // Cancel the previous requestAnimationFrame request.
        }

        if (worker) {
            worker.terminate(); // Terminate the previously running worker thread to ensure a responsive UI.
        }
        worker = new Worker('js/3BodyWorker.js'); // Spawn a fast number-chrunching thread that runs outside of this UR/animation thread.

        document.getElementById('WebGLCanvasElementContainer').style.backgroundImage = "url('images/starField.png')"; // Switch back to the non-opaque PNG background image.
//        document.getElementsByTagName('article')[0].style.display = "none"; // Remove from page-flow the one (and only) article element (along with all of its content).
        document.getElementById('WebGLCanvasElementContainer').appendChild(gl.renderer.domElement); // Append renderer element to DOM.

        while (gl.spheres.length) { // Remove any prior spheres from the scene and empty the gl.spheres array:
            gl.scene.remove(gl.spheres.pop());
        } // while

        for (var i = 0; i < initialConditions.length; i++) { // Set the sphere objects in gl.spheres to initial conditions.
            initializeMesh(initialConditions[i]); // This call sets the gl.spheres array.
        } // for

        worker.postMessage({
            cmd: 'init', // Pass the initialization command to the web worker.
            initialConditions: initialConditions // Send a copy of the initial conditions to the web worker, so it can initialize its persistent global variables.
        }); // worker.postMessage

        worker.onmessage = function (evt) { // Process the results of the "crunch" command sent to the web worker (via this UI thread).
            for (var i = 0; i < evt.data.length; i++) {
                gl.spheres[i].position.x = evt.data[i].p.x;
                gl.spheres[i].position.z = evt.data[i].p.y;
                gl.spheres[i].position.y = 0; // 3BodyWorker.js is 2D (i.e., the physics are constrained to a plane).
                gl.spheres[i].rotation.y += initialConditions[i].rotation; // Place worker.onmessage in the init method in order to access its initialConditions array.
            }
            gl.renderer.render(gl.scene, gl.camera); // Update the positions of the masses (sphere meshes) onscreen based on the data returned by 3BodyWorker.js.
        }; // worker.onmessage

        function initializeMesh(initialCondition) {
            var texture = THREE.ImageUtils.loadTexture(initialCondition.bitmap); // Create texture object based on the given bitmap path.
            var material = new THREE.MeshPhongMaterial({map: texture}); // Create a material (for the spherical mesh) that reflects light, potentially causing sphere surface shadows.
            var geometry = new THREE.SphereGeometry(initialCondition.radius, gl.quads, gl.quads); // Radius size, number of vertical segments, number of horizontal rings.
            var mesh = new THREE.Mesh(geometry, material); // A mesh represents the object (typically composed of many tiny triangles) to be displayed - in this case a hollow sphere with a bitmap on its surface.

            mesh.position.x = initialCondition.position.x;
            mesh.position.z = initialCondition.position.y; // Convert from 2D to "3D".
            mesh.position.y = 0; // The physics are constrained to the xz-plane (i.e., the xy-plane in 3BodyWorker.js).

            gl.scene.add(mesh); // Add the sphere to the Three.js scene.
            gl.spheres.push(mesh); // Make the Three.js mesh sphere objects accessible outside of this helper function.
        } // initializeMesh
    } // init
    that.init = init; // This is what makes the method public.

    var run = function () { // Public method.
        worker.postMessage({
            cmd: 'crunch' // This processing occurs between animation frames and, therefore, is assumed to take a relatively small amount of time (as compared to current frame rates).
        }); // worker.postMessage
        gl.controls.update(); // Allows for orbiting, panning, and zooming.
        requestAnimationFrameID = requestAnimationFrame(run); // Allow for the cancellation of this requestAnimationFrame request.
    }; // run()
    that.run = run;

    return that; // The object returned by the constructor.
} // Simulation

function handleSubmitButton(evt) {
    var m1 = InitialCondition(document.getElementById('mass1').querySelectorAll('input')); // A constructor returning an initial condition object.
    var m2 = InitialCondition(document.getElementById('mass2').querySelectorAll('input'));
    var m3 = InitialCondition(document.getElementById('mass3').querySelectorAll('input'));

    evt.preventDefault(); // Don't refresh the page when the user clicks this form button.

    if (!window.WebGLRenderingContext) {
        displayCanvasRendererWarning();
    } // If necessary, warn the user that they're using a canvas-based Three.js renderer and that they should upgrade their browser so that a faster WebGL-based renderer can be used instead.

    simulation.init([m1, m2, m3]);
    simulation.run(); // The images have been preloaded so this works immediately.

    function InitialCondition(inputElements) {
        var mass = parseFloat(inputElements[0].value);

        return {
            mass: mass,
            radius: calculateRadius(mass),
            rotation: calculateRotation(mass),
            position: {x: parseFloat(inputElements[1].value), y: parseFloat(inputElements[2].value)},
            velocity: {x: parseFloat(inputElements[3].value), y: parseFloat(inputElements[4].value)},
            bitmap: inputElements[5].value // This is a string value (hence the non-use of parseFloat).
        };

        function calculateRadius(mass) {
            /*
             Mass equals density times volume or m = D * V = D * (4/3 * PI * r^3), and solving for r = [(3 * m)/(4 * PI * D)]^(1/3)
             */
            var radicand = (3 * mass) / (4 * Math.PI * DENSITY); // Only change the value of DENSITY to affect the value returned by this function.

            return Math.pow(radicand, 1 / 3);
        } // calculateRadius

        function calculateRotation(mass) {
            /*
             Using a power model, let the x-axis represent the radius and the y-axis the rotational rate of the sphere. 
             The power model is y = a * x^b, where a and b are constants (which were empirically derived).
             */
            var radius = calculateRadius(mass);

            return 1.7 * Math.pow(radius, -1.9); // Rotational rate as a function of the sphere's radius.
        } // calculateRotation
    } // InitialCondition
} // handleSubmitButton

function handleReloadButton(evt) {
    /*  
     Clicking a form button automatically refreshes the page, which is exactly the behavior we want (i.e., location.reload() is not necessary here).
     */
} // handleReloadButton

function handleInfoButton(evt) {
    /*
     Note that when the info page covers up the animation, the animation stops because this is how requestAnimationFrame works. In this sense, we get a free pause feature.
     */
    evt.preventDefault(); // Don't refresh the page when the user clicks this form button.
    window.open("info.html"); // Open the info.html page in another tab.
} // handleInfoButton

function displayCanvasRendererWarning() { // This assumes that the user's browser at least supports canvas.
    var articleElement = document.getElementsByTagName('article')[0];

    articleElement.innerHTML = "<h2>WebGL not supported, using canvas-based renderer, please upgrade your browser.</h2>";
    articleElement.style.display = "block";
}