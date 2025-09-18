<template>
  <main>
    <p>基础用法</p>
    <div class="flex center">
      <div class="components-a-tooltip-demo-placement">
        <div class="top flex m-center space-between">
          <wc-tooltip content="Top Left prompts info" placement="top-start" show-arrow>
            <button role="button">top-start</button>
          </wc-tooltip>
          <wc-tooltip content="Top Center prompts info" placement="top" show-arrow>
            <button role="button">top</button>
          </wc-tooltip>
          <wc-tooltip content="Top Right prompts info" placement="top-end" show-arrow>
            <button role="button">top-end</button>
          </wc-tooltip>
        </div>
        <div class="left flex col space-between">
          <wc-tooltip placement="left-start" content="Left Top prompts info" show-arrow>
            <button role="button">left-start</button>
          </wc-tooltip>
          <wc-tooltip placement="left" content="Left Center prompts info" show-arrow>
            <button role="button">left</button>
          </wc-tooltip>
          <wc-tooltip placement="left-end" content="Left Bottom prompts info" show-arrow>
            <button role="button">left-end</button>
          </wc-tooltip>
        </div>
        <div class="right flex col space-between">
          <wc-tooltip placement="right-start" content="Right Top prompts info" show-arrow>
            <button role="button">right-start</button>
          </wc-tooltip>
          <wc-tooltip placement="right" content="Right Center prompts info" show-arrow>
            <button role="button">right</button>
          </wc-tooltip>
          <wc-tooltip placement="right-end" content="Right Bottom prompts info" show-arrow>
            <button role="button">right-end</button>
          </wc-tooltip>
        </div>
        <div class="bottom flex m-center space-between">
          <wc-tooltip placement="bottom-start" content="Bottom Left prompts info" show-arrow>
            <button role="button">bottom-start</button>
          </wc-tooltip>
          <wc-tooltip placement="bottom" content="Bottom Center prompts info" show-arrow>
            <button role="button">bottom</button>
          </wc-tooltip>
          <wc-tooltip placement="bottom-end" content="Bottom Right prompts info" show-arrow>
            <button role="button">bottom-end</button>
          </wc-tooltip>
        </div>
      </div>
    </div>
    <p>主题</p>
    <div class="flex" style="gap: 1.2rem">
      <wc-tooltip content="Top center" placement="top" show-arrow>
        <button role="button">Dark</button>
      </wc-tooltip>
      <wc-tooltip content="Bottom center" placement="bottom" effect="light" show-arrow>
        <button role="button">Light</button>
      </wc-tooltip>
      <wc-tooltip content="Bottom center" effect="customized" show-arrow>
        <button role="button">Customized theme</button>
      </wc-tooltip>
    </div>
    <p>更多内容的文字提示</p>
    <wc-tooltip placement="top" trigger="click" show-arrow>
      <div slot="content">multiple lines<br />second line</div>
      <button role="button">Top center</button>
    </wc-tooltip>
    <p>触发方式</p>
    <div class="flex" style="gap: 1.2rem">
      <wc-tooltip v-for="trigger in ['hover', 'click', 'focus', 'contextmenu']" :key="trigger" content="Top Left prompts info" placement="top" show-arrow :trigger="trigger">
        <button role="button">{{ trigger }}</button>
      </wc-tooltip>
    </div>
    <p>显示 HTML 内容</p>
    <wc-tooltip content="<span>The content can be <strong>HTML</strong></span>" raw-content show-arrow>
      <button role="button">hover me</button>
    </wc-tooltip>
    <p>单例模式</p>
    <div class="flex flex-wrap">
      <label v-for="i in placements" :key="i" style="flex: 30%">
        <input role="radio" type="radio" name="placement" :checked="placement === i" @change="placement = i" />
        {{ i }}
      </label>
    </div>
    <!--    <div class="flex" style="gap: 1.2rem; margin: 1.6rem 0">-->
    <!--      <button v-for="i in 3" :key="i" role="button" @mouseover="tooltip.showPopover">Click to open tooltip</button>-->
    <!--      <div ref="tooltip" role="tooltip" popover="hint" show-arrow :placement="placement">-->
    <!--        <span> Some content </span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="flex custom-tooltip-anchor" style="gap: 1.2rem; margin: 1.6rem 0" :style="{ '--anchor-name': '--' + useId() }">
      <button v-for="i in 3" :key="i" role="button" @click="visable = !visable">Click to open tooltip</button>
      <div v-if="visable" role="tooltip" show-arrow :placement="placement">
        <span> Some content </span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, useId } from 'vue'

const tooltip = ref(),
  placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
  placement = ref('bottom'),
  visable = ref(false)
</script>

<style scoped lang="scss">
.components-a-tooltip-demo-placement {
  display: inline-grid;
  grid-template-columns: 100px 32rem 100px;
  grid-template-rows: 1fr 12rem 1fr;
  grid-template-areas:
    'tl top tr'
    'left center right'
    'bl bottom br';
  & > .top {
    grid-area: top;
  }
  & > .left {
    grid-area: left;
  }
  & > .right {
    grid-area: right;
  }
  & > .bottom {
    grid-area: bottom;
  }
  & > div {
    gap: 1.2rem;
  }
  wc-tooltip {
    flex: 1;
    & > button {
      width: 100%;
    }
  }
  .left,
  .right {
    wc-tooltip {
      flex: 0;
    }
  }
}
wc-tooltip[effect='customized']::part(popover) {
  color: var(--gray-700);
  border-radius: var(--radius-400);
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
  &::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
  }
}
.custom-tooltip-anchor {
  [role='tooltip'] {
    transform: scale(0);
    position: fixed;
    position-anchor: var(--anchor-name);
  }
  & > *:not([role='tooltip']):hover {
    anchor-name: var(--anchor-name);
    & ~ [role='tooltip'] {
      transform: scale(1);
    }
  }
}
</style>
