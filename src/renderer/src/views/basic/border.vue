<template>
  <main>
    <div role="row" style="--gutter: 1.6rem">
      <div role="col" class="span-6 xs-12">
        <div class="title">No Radius</div>
        <div class="value"><code> border-radius: "0px"</code></div>
        <div class="radius" style="border-radius: var(--radius-0)"></div>
      </div>
      <div role="col" class="span-6 xs-12">
        <div class="title">Large Radius</div>
        <div class="value"><code> border-radius: "0.6rem"</code></div>
        <div class="radius" style="border-radius: var(--radius)"></div>
      </div>
      <div role="col" class="span-6 xs-12">
        <div class="title">Round Radius</div>
        <div class="value"><code> border-radius: "1000px"</code></div>
        <div class="radius" style="border-radius: var(--radius-1000)"></div>
      </div>
    </div>
    <div role="row" style="--gutter: 1.6rem; margin-top: 1.6rem">
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow)"></div>
        <div class="title">basic Shadow</div>
        <div class="value"><code> --shadow </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-s)"></div>
        <div class="title">small Shadow</div>
        <div class="value"><code> --shadow-s </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-m)"></div>
        <div class="title">medium Shadow</div>
        <div class="value"><code> --shadow-m </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-l)"></div>
        <div class="title">large Shadow</div>
        <div class="value"><code> --shadow-l </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-tooltip)"></div>
        <div class="title">tooltip Shadow</div>
        <div class="value"><code> --shadow-tooltip </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-tooltip-light)"></div>
        <div class="title">tooltip light Shadow</div>
        <div class="value"><code> --shadow-tooltip-light </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-popup)"></div>
        <div class="title">popup Shadow</div>
        <div class="value"><code> --shadow-popup </code></div>
      </div>
      <div role="col" class="span-6 xs-12 flex col center">
        <div class="box-shadow" style="box-shadow: var(--shadow-column); backdrop-filter: blur(4px)"></div>
        <div class="title">column Shadow</div>
        <div class="value"><code> --shadow-column </code></div>
      </div>
    </div>
  </main>
</template>
<script setup></script>

<style scoped lang="scss">
.radius {
  height: 4rem;
  margin-top: 2rem;
  border: 1px solid var(--info-100);
}
.box-shadow {
  width: 12rem;
  height: 12rem;
}
</style>
