let container;
let scene;
let camera;
let renderer;
let model;

function init(){
    //container
    container = document.querySelector('.scene');
    //scene
    scene = new THREE.Scene();
    
    //camera
    const fov = 40;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,0,20);
    //light
    alight = new THREE.AmbientLight(0x404040,1);
    scene.add(alight);
    //dlight1
    dLight = new THREE.DirectionalLight(0x87ceeb,5);
    dLight.position.set(100,1,-10);
    dLight.castShadow = false;
    scene.add(dLight);
    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(window.innerWidth,window.innerHeight);
    container.appendChild(renderer.domElement);
    //loader
    let loader = new THREE.GLTFLoader();
    loader.load("scene.gltf", function(gltf){
        model = gltf.scene.children[0];
        model.scale.set(0.5,0.5,.5);
        scene.add(gltf.scene);
        animate();
    });
}
//animation
function animate(){
    requestAnimationFrame(animate);
    model.rotation.z += .001;
    renderer.render(scene,camera);
}
//initializes
init();
//window resizers
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//initialize window resizer
window.addEventListener('resize', onWindowResize);