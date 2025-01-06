varying vec3 v_normal;
varying vec2 v_uv;

void main() { 
  v_uv = uv;
  v_normal = normalize( normalMatrix * normal );

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}