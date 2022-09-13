precision lowp float;
varying vec2 vuv;
varying float vHeight;
uniform sampler2D uTexture;
void main(){
    // float h=vHeight+.05*10.;
    // gl_FragColor=vec4(1.*h,0.,0.,1.);
    //根据ui取出对应的颜色
    float h=vHeight+.05*10.;
    vec4 color=texture2D(uTexture,vuv);
    //根据高度采样
    color.rgb*=h;
    gl_FragColor=color;
}