
precision lowp float;
attribute vec3 position;
attribute vec2 uv;
//以下三个是全局的变量。
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
//将uv传递到片元着色器
varying vec2 vuv;
varying float vHeight;
uniform float uTime;
void main(){
    vuv=uv;
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    //z轴动画
    modelPosition.z=sin((modelPosition.x+uTime)*10.)*.1;
    // modelPosition.z+=sin((modelPosition.y)+uTime*10.)*.1;
    vHeight=modelPosition.z;
    gl_Position=projectionMatrix*viewMatrix*modelPosition;
}