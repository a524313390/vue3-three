precision lowp float;
varying vec2 vUv;
uniform float uTime;
void main(){
    
    // gl_FragColor=vec4(vUv,.0,1.);
    //通过顶点对应的ui坐标，决定每一个像素在uv中的位置。通过这个x,y位置决定颜色
    // gl_FragColor=vec4(vUv,.0,1.);
    
    //从左到右渐变
    // float color=vUv.x;
    // gl_FragColor=vec4(color,color,color,1.);
    
    //余数 反复
    // float color=mod(vUv.y*10.,1.);
    // gl_FragColor=vec4(color,color,color,1.);
    
    //step  小于x返回0  大于返回1
    // float color1=mod(vUv.y*10.,1.);
    // float color=step(color1,.5);
    // gl_FragColor=vec4(color,color,color,1.);
    
    //利用时间做动画mod取值在0-1,
    float color1=mod((vUv.y+uTime*.5)*5.,1.);
    float color=step(color1,.5);
    gl_FragColor=vec4(vUv,1.,color);
    
    //绝对值
    // float x=abs(vUv.x-.5);
    // gl_FragColor=vec4(x,x,x,1.);
}