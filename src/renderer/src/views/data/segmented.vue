<template>
  <main>
    <div role="segmented" style="width: fit-content">
      <input type="radio" name="tab" value="Tab" label="Tab" checked />
      <input type="radio" name="tab" value="Tab" label="Tab" />
      <input type="radio" name="tab" value="Tab" label="Tab" />
      <input type="radio" name="tab" value="Tab" label="Tab" />
      <input type="radio" name="tab" value="Tab" label="Tab" />
      <input type="radio" name="tab" value="Tab" label="Tab" />
    </div>
    <br />
    <div class="segmented">
      <input type="radio" name="tab2" label="First" checked value="Tab" />
      <span class="divider"></span>
      <input type="radio" name="tab2" label="Second" value="Tab" />
      <span class="divider"></span>
      <input type="radio" name="tab2" label="Third" value="Tab" />
      <span class="divider"></span>
      <input type="radio" name="tab2" label="Fourth" value="Tab" />
    </div>
  </main>
</template>
<script setup></script>

<style scoped lang="scss">
.seg,
.seg::picker(select) {
  appearance: base-select;
}
[role='segmented'] {
  font-family: 'Framework7 Icons', sans-serif;
}
.segmented {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 2.8rem;
  padding: 0.2rem;
  border-radius: 0.6rem;
  background-color: #e9edf5;
  user-select: none;
  font-size: 1.4rem;
  input {
    position: relative;
    margin: 0;
    display: block;
    width: fit-content;
    appearance: none;
    padding: 0.4rem 1rem;
    line-height: 2rem;
    cursor: pointer;
    &::before {
      content: attr(label);
    }
    &::after {
      padding: inherit;
      content: attr(label);
      color: #5e5adb;
      position: absolute;
      inset: 0;
      z-index: 2;
      opacity: 0;
      transition: opacity 200ms;
    }
  }
  input:checked {
    anchor-name: --segmented-el;
    &::after {
      opacity: 1;
    }
  }
  &::after {
    content: '';
    padding: 0.4rem 1rem;
    line-height: 2rem;
    text-align: center;
    box-sizing: border-box;
    transition-property: left, width, box-shadow;
    transition-duration: 200ms;
    border-radius: 0.4rem;
    background: white;
    position: absolute;
    z-index: 1;
    position-anchor: --segmented-el;
    left: anchor(left);
    right: anchor(right);
    top: anchor(top);
    bottom: anchor(bottom);
    width: anchor-size(width);
    height: anchor-size(height);
  }
  &:hover::after {
    box-shadow:
      0 0 0 0.05rem rgba(0, 0, 0, 0.08),
      0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.25);
  }
  .divider {
    width: 1px;
    height: 1.7rem;
    border-radius: 2px;
    background-color: #d5dbe5;
    transition: background-color 200ms;
  }
  .divider:has(+ input:checked),
  input:checked + .divider {
    background-color: transparent;
  }
}
</style>
