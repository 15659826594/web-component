<template>
  <main>
    <div class="example-showcase">
      <wc-row>
        <wc-col :span="24">
          <div class="grid-content ep-bg-purple-dark" />
        </wc-col>
      </wc-row>
      <wc-row>
        <wc-col :span="12">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="12">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
      </wc-row>
      <wc-row>
        <wc-col :span="8">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="8">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
        <wc-col :span="8">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
      </wc-row>
      <wc-row>
        <wc-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
        <wc-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
      </wc-row>
      <wc-row>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
      </wc-row>
    </div>
    <div class="example-showcase">
      <wc-row gutter="2rem">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
    </div>
    <div class="example-showcase">
      <wc-row gutter="2rem">
        <wc-col :span="16"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="8"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row gutter="2rem">
        <wc-col :span="8"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="8"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="4"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="4"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row gutter="2rem">
        <wc-col :span="4"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="16"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="4"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
    </div>
    <div class="example-showcase">
      <wc-row gutter="2rem">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
      </wc-row>
      <wc-row gutter="2rem">
        <wc-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
      </wc-row>
      <wc-row gutter="2rem">
        <wc-col :span="12" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
      </wc-row>
    </div>
    <div class="example-showcase">
      <wc-row class="row-bg">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row class="row-bg" justify="center">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row class="row-bg" justify="end">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row class="row-bg" justify="space-between">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row class="row-bg" justify="space-around">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
      <wc-row class="row-bg" justify="space-evenly">
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple-light" /></wc-col>
        <wc-col :span="6"><div class="grid-content ep-bg-purple" /></wc-col>
      </wc-row>
    </div>
    <div class="example-showcase">
      <wc-row :gutter="10">
        <wc-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
        <wc-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple" />
        </wc-col>
        <wc-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple-light" />
        </wc-col>
      </wc-row>
    </div>
    <wc-match-media min-width="375" max-width="800"><div>wc-match-media 当页面最小宽度 375px， 页面宽度最大 800px 时显示</div></wc-match-media>
  </main>
</template>
<script setup></script>
<style scoped lang="scss">
.example-showcase {
  overflow: auto;
  padding: 1.6rem;
  background-color: var(--info-0);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  & + .example-showcase {
    margin-top: 1.5rem;
  }
}
.row-bg {
  padding: 1rem 0;
  background-color: var(--ep-c-bg-row);
}
wc-row,
[role~='row'] {
  margin-bottom: 2rem;
}
wc-row:last-child,
[role~='row']:last-child {
  margin-bottom: 0;
}
wc-col,
[role~='col'] {
  border-radius: var(--radius);
}
.grid-content {
  border-radius: var(--radius);
  min-height: 3.6rem;
}
</style>
