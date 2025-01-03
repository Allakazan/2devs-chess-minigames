#define MAX_BOXES 30 // Maximum number of boxes

varying vec3 v_normal;
varying vec2 v_uv;

struct PaintBox {
  vec2 pos;
  int colorIndex;
  bool enabled;
};

const int boxLength = 30;
const int colorsLength = 3;

uniform PaintBox boxes[boxLength];
uniform vec3 colors[colorsLength];

float masks[colorsLength];

void main() { 

  float scale = 8.0;

  // Calculate the checker pattern
  float checker = mod(
    floor(v_uv.x * scale) + floor(v_uv.y * scale)
  , 2.0);

  // Choose color based on the checker value
  vec3 color = checker == 0.0 ? vec3(0.0) : vec3(1.0);

  for (int i = 0; i < boxLength; i++) {
    PaintBox box = boxes[i];

    vec2 pos = box.pos;
    int colorIndex = box.colorIndex;
    bool enabled = box.enabled;

    if (!enabled) {
      continue;
    }

    float ytest2 = step(1. - ((pos.y - 1.) / scale), v_uv.y);
    float ytest = step(1. - (pos.y / scale), v_uv.y) - ytest2;

    float xtest2 = 1.0 - step((pos.x - 1.) / scale, v_uv.x);  
    float xtest = 1.0 - step(pos.x / scale, v_uv.x) - xtest2;

    float mask = clamp((xtest + ytest) - 1., 0., 1.);

    if (colorIndex == 0) {
      masks[0] = masks[0] + mask;
    } else if (colorIndex == 1) {
      masks[1] = masks[1] + mask;
    } else if (colorIndex == 2) {
      masks[2] = masks[2] + mask;
    }
  }

  vec3 finalColor = color;

  for (int i = 0; i < colorsLength; i++) {
    finalColor = mix(finalColor,colors[i], masks[i]);
  }

  gl_FragColor = vec4(finalColor, 1.0);
}