
precision lowp float;
attribute vec3 position;
attribute vec2 uv;
//以下三个是全局的变量。
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vuv;
//将uv传递到片元着色器
void main(){
    vuv=uv;
    gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);
}