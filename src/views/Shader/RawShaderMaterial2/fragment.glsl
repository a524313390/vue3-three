precision lowp float;
varying vec2 vuv;

uniform sampler2D uTexture;
void main(){
    
    vec4 color=texture2D(uTexture,vuv);
    
    gl_FragColor=color;
}