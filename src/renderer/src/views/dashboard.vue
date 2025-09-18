<template>
  <!--  <wc-table>-->
  <!--    <wc-colgroup>-->
  <!--      <wc-col style="width: 4.6rem" />-->
  <!--      <wc-col style="width: 3.6rem" />-->
  <!--      <wc-col style="width: 4.8rem" />-->
  <!--      <wc-col />-->
  <!--      <wc-col style="width: 4.4rem" />-->
  <!--      <wc-col style="width: 15rem" />-->
  <!--      <wc-col style="width: 20rem" />-->
  <!--      <wc-col style="width: 10rem" />-->
  <!--      <wc-col style="width: 26rem" />-->
  <!--      <wc-col style="width: 14rem" />-->
  <!--      <wc-col style="width: 4.6rem" />-->
  <!--    </wc-colgroup>-->
  <!--    <wc-thead>-->
  <!--      <wc-tr>-->
  <!--        <wc-th>-->
  <!--          <input role="checkbox" type="checkbox" />-->
  <!--        </wc-th>-->
  <!--        <wc-th></wc-th>-->
  <!--        <wc-th sort>#</wc-th>-->
  <!--        <wc-th sort="asc">Project Name</wc-th>-->
  <!--        <wc-th>PM</wc-th>-->
  <!--        <wc-th>-->
  <!--          <div class="flex c-center" style="gap: 0.6rem">-->
  <!--            Status <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>-->
  <!--          </div>-->
  <!--        </wc-th>-->
  <!--        <wc-th sort="desc">Last update</wc-th>-->
  <!--        <wc-th>Resources</wc-th>-->
  <!--        <wc-th>-->
  <!--          <div class="flex c-center" style="gap: 0.6rem">-->
  <!--            Project timeline <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>-->
  <!--          </div>-->
  <!--        </wc-th>-->
  <!--        <wc-th>Estimation</wc-th>-->
  <!--        <wc-th></wc-th>-->
  <!--      </wc-tr>-->
  <!--    </wc-thead>-->
  <!--  </wc-table>-->

  <wc-menubar ref="vertical" mode="vertical"></wc-menubar>
  <br />
  <wc-menubar ref="dark" mode="vertical" class="color-dark" trigger="click"></wc-menubar>
  <br />
  <wc-menubar ref="inline" mode="inline"></wc-menubar>
  <br />
  <wc-menubar ref="inline" mode="inline" unique></wc-menubar>
  <br />
  <wc-menubar ref="horizontal" mode="horizontal"></wc-menubar>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { getProjects } from '@src/api'
import pages from '@src/pages.json'
const { list } = pages.tabBar
let inline = ref(null),
  vertical = ref(null),
  dark = ref(null),
  horizontal = ref(null)
onMounted(() => {
  inline.value.render(list)
  vertical.value.render(list)
  dark.value.render(list)
  horizontal.value.render(list)
})
let actions = [
  {
    name: 'Edit',
    value: 'Edit'
  },
  {
    name: 'Send mail',
    value: 'Send mail'
  },
  {
    name: 'Details',
    value: 'Details'
  },
  {
    name: 'Archive',
    value: 'Archive',
    color: '#aa5b00'
  },
  {
    name: 'Delete',
    value: 'Delete',
    color: '#d1293d'
  }
]
let items = reactive(getProjects(30))
</script>

<style lang="scss" scoped></style>
