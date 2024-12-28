#define MAX_BOXES 30 // Maximum number of boxes

varying vec3 v_normal;
varying vec2 v_uv;

uniform vec2 boxPositions[MAX_BOXES];
uniform int boxPositionsLength;
uniform vec3 paintColor;

void main() { 

  float scale = 8.0;

  // Calculate the checker pattern
  float checker = mod(
    floor(v_uv.x * scale) + floor(v_uv.y * scale)
  , 2.0);

  // Choose color based on the checker value
  vec3 color = checker == 0.0 ? vec3(0.0) : vec3(1.0);

  float mask = 0.;

  for (int i = 0; i < boxPositionsLength; i++){
    vec2 box = boxPositions[i];

    float ytest2 = step(1. - ((box.y - 1.) / scale), v_uv.y);
    float ytest = step(1. - (box.y / scale), v_uv.y) - ytest2;

    float xtest2 = 1.0 - step((box.x - 1.) / scale, v_uv.x);  
    float xtest = 1.0 - step(box.x / scale, v_uv.x) - xtest2;

    mask += clamp((xtest + ytest) - 1., 0., 1.);
  }

  gl_FragColor = vec4(mix(color,paintColor, mask), 1.0);
}