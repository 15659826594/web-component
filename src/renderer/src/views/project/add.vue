<template>
  <div role="card" style="height: 100vh">
    <header>Add new project</header>
    <main>
      <label role="label">
        <span>Project name</span>
        <input role="input" type="text" required />
      </label>
      <label role="label">
        <span>Project manager (PM)</span>
        <span role="segmented" style="width: 32.6rem">
          <input type="radio" value="Roger Vaccaro" name="pm" checked label="Roger Vaccaro" />
          <input type="radio" value="Tatiana Dias" name="pm" label="Tatiana Dias" />
          <input type="radio" value="Leo Gouse" name="pm" label="Leo Gouse" />
        </span>
      </label>
      <label role="label" for="">
        <span>Resources</span>
        <span class="flex" style="flex-wrap: wrap; gap: 1rem">
          <button role="button" size="mini" class="color-primary">UX/UI Design</button>
          <button role="button" size="mini">Frontend</button>
          <button role="button" size="mini">Backend</button>
          <button role="button" size="mini">Full Stack</button>
          <button role="button" size="mini">Graphic Designer</button>
          <button role="button" size="mini">Web Designer</button>
          <button role="button" size="mini">QA</button>
        </span>
      </label>
      <label role="label" for="">
        <span>Project timeline</span>
        <span>
          <select role="select" name="pick" style="width: 100%">
            <option v-for="i in ['15 days', '1 month', '1-2 months', '3 months', '4-6 months', '1 year']" :key="i" :value="i">{{ i }}</option>
            <option value="Custom" selected>Custom</option>
          </select>
          <span role="indent">
            <wc-picker mode="date"></wc-picker>
            <span class="icon right-icon"></span>
            <wc-picker mode="date"></wc-picker>
          </span>
        </span>
      </label>
      <label role="label">
        <span>Estimation</span>
        <span>
          <label role="input" style="width: 100%">
            <i role="prefix">US$</i>
            <input type="text" placeholder="00.00" />
          </label>
        </span>
      </label>
    </main>
    <footer>
      <button role="button" @click="ipcRenderer.send('close')">Cancel</button>
      <button role="button" class="color-primary" @click="ipcRenderer.send('close')">Add project</button>
    </footer>
  </div>
</template>

<script setup>
let ipcRenderer = window.electron.ipcRenderer
</script>

<style scoped lang="scss">
</style>
