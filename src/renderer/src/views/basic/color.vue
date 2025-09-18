<template>
  <main style="padding: 2rem">
    <wc-row gutter="12">
      <wc-col span="12">
        <div class="demo-color-box" style="--bg: hsl(243, 56%, 60%)">
          Primary Color
          <div class="value">#409EFF</div>
          <div class="bg-color-sub" :style="{ backgroundColor: `hsl(${colors.indigo[10].hue},${colors.indigo[10].saturation}%, ${colors.indigo[10].lightness}% )` }">
            <div
              v-for="color in colors.indigo"
              :key="color.weight"
              :title="color.weight"
              class="bg-blue-sub-item"
              :style="{ '--hue': color.hue, '--saturation': color.saturation, '--lightness': color.lightness }"
            ></div>
          </div>
        </div>
      </wc-col>
    </wc-row>

    <wc-row gutter="12">
      <wc-col v-for="(list, key) in colors" :key="key" span="6" xs="12">
        <div
          class="demo-color-box"
          :style="{
            '--bg': `hsl(${list[parseInt(list.length / 2) - 1].hue}, ${list[parseInt(list.length / 2) - 1].saturation}%, ${list[parseInt(list.length / 2) - 1].lightness}%)`
          }"
        >
          {{ key }} Color
          <div class="value">#409EFF</div>
          <div class="bg-color-sub" :style="{ backgroundColor: `hsl(${list[list.length - 1].hue}, ${list[list.length - 1].saturation}%, ${list[list.length - 1].lightness}%)` }">
            <div
              v-for="color in list"
              :key="color.weight"
              :title="color.weight"
              class="bg-blue-sub-item"
              :style="{ '--hue': color.hue, '--saturation': color.saturation, '--lightness': color.lightness }"
            ></div>
          </div>
        </div>
      </wc-col>
    </wc-row>
  </main>
</template>

<script setup>
let colors = {
  indigo: [
    { weight: 900, hex: '#151357', hue: 242, saturation: 64, lightness: 21 },
    { weight: 800, hex: '#2a278f', hue: 242, saturation: 57, lightness: 36 },
    { weight: 700, hex: '#3734a3', hue: 242, saturation: 52, lightness: 42 },
    { weight: 600, hex: '#4945c4', hue: 242, saturation: 52, lightness: 52 },
    { weight: 500, hex: '#5e5adb', hue: 242, saturation: 64, lightness: 61 },
    { weight: 400, hex: '#807cea', hue: 242, saturation: 72, lightness: 70 },
    { weight: 300, hex: '#9e9bf5', hue: 242, saturation: 82, lightness: 78 },
    { weight: 200, hex: '#b9b6fa', hue: 243, saturation: 87, lightness: 85 },
    { weight: 100, hex: '#d0cffc', hue: 241, saturation: 88, lightness: 90 },
    { weight: 50, hex: '#dfdefc', hue: 242, saturation: 83, lightness: 93 },
    { weight: 0, hex: '#ededfc', hue: 240, saturation: 71, lightness: 96 }
  ],
  blue: [
    { weight: 500, hex: '#2264e5', hue: 220, saturation: 79, lightness: 52 },
    { weight: 400, hex: '#4b85fa', hue: 220, saturation: 95, lightness: 64 },
    { weight: 100, hex: '#ccddff', hue: 220, saturation: 100, lightness: 90 },
    { weight: 0, hex: '#ebf0fa', hue: 220, saturation: 60, lightness: 95 }
  ],
  green: [
    { weight: 900, hex: '#032c18', hue: 151, saturation: 87, lightness: 9 },
    { weight: 800, hex: '#004322', hue: 150, saturation: 100, lightness: 13 },
    { weight: 500, hex: '#14804a', hue: 150, saturation: 73, lightness: 29 },
    { weight: 400, hex: '#38a06c', hue: 150, saturation: 48, lightness: 42 },
    { weight: 100, hex: '#a9ebca', hue: 150, saturation: 62, lightness: 79 }, //? 不确定是否是100
    { weight: 0, hex: '#e1fcef', hue: 151, saturation: 82, lightness: 94 }
  ],
  yellow: [
    { weight: 500, hex: '#aa5b00', hue: 32, saturation: 100, lightness: 33 },
    { weight: 400, hex: '#c97a20', hue: 32, saturation: 73, lightness: 46 },
    { weight: 0, hex: '#fcf2e6', hue: 33, saturation: 79, lightness: 95 }
  ],
  red: [
    { weight: 600, hex: '#ba1b2e', hue: 353, saturation: 75, lightness: 42 },
    { weight: 500, hex: '#d1293d', hue: 353, saturation: 67, lightness: 49 },
    { weight: 400, hex: '#ef5466', hue: 353, saturation: 83, lightness: 63 },
    { weight: 300, hex: '#f76f7f', hue: 353, saturation: 89, lightness: 70 },
    { weight: 0, hex: '#ffedef', hue: 353, saturation: 100, lightness: 96 } //还有可能是FCC5CB
  ],
  gray: [
    { weight: 900, hex: '#171c26', hue: 220, saturation: 25, lightness: 12 },
    { weight: 800, hex: '#333b4a', hue: 219, saturation: 18, lightness: 25 },
    { weight: 700, hex: '#464f60', hue: 219, saturation: 16, lightness: 33 },
    { weight: 600, hex: '#5a6376', hue: 221, saturation: 13, lightness: 41 },
    { weight: 500, hex: '#687182', hue: 219, saturation: 11, lightness: 46 },
    { weight: 400, hex: '#868fa0', hue: 219, saturation: 12, lightness: 58 },
    { weight: 300, hex: '#a1a9b8', hue: 219, saturation: 14, lightness: 68 },
    { weight: 200, hex: '#bcc2ce', hue: 220, saturation: 16, lightness: 77 },
    { weight: 100, hex: '#d5dbe5', hue: 218, saturation: 24, lightness: 87 },
    { weight: 50, hex: '#e9edf5', hue: 220, saturation: 38, lightness: 94 },
    { weight: 0, hex: '#f7f9fc', hue: 216, saturation: 45, lightness: 98 }
  ]
}
Object.defineProperty(colors, 'indigo', {
  enumerable: false
})
</script>

<style scoped lang="scss">
.demo-color-box {
  color: var(--white);
  background-color: var(--bg);
  position: relative;
  height: 11.2rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  border-radius: var(--radius);
  padding: 2rem 2rem 4rem 2rem;
  margin: 0.8rem 0;
  overflow: hidden;
  &:first-letter {
    text-transform: uppercase;
  }
  .bg-color-sub {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4rem;
    display: flex;
    & > div {
      flex: 1;
      background-color: hsl(var(--hue) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%));
    }
  }
}
</style>
