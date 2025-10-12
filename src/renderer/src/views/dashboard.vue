<template>
  <wc-table>
    <wc-colgroup>
      <wc-col style="width: 4.6rem" />
      <wc-col style="width: 3.6rem" />
      <wc-col style="width: 4.8rem" />
      <wc-col />
      <wc-col style="width: 4.4rem" />
      <wc-col style="width: 15rem" />
      <wc-col style="width: 20rem" />
      <wc-col style="width: 10rem" />
      <wc-col style="width: 26rem" />
      <wc-col style="width: 14rem" />
      <wc-col style="width: 4.6rem" />
    </wc-colgroup>
    <wc-thead>
      <wc-tr>
        <wc-th>
          <input role="checkbox" type="checkbox" />
        </wc-th>
        <wc-th></wc-th>
        <wc-th sort>#</wc-th>
        <wc-th sort="asc">Project Name</wc-th>
        <wc-th>PM</wc-th>
        <wc-th>
          <div class="flex c-center" style="gap: 0.6rem">
            Status <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </wc-th>
        <wc-th sort="desc">Last update</wc-th>
        <wc-th>Resources</wc-th>
        <wc-th>
          <div class="flex c-center" style="gap: 0.6rem">
            Project timeline <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </wc-th>
        <wc-th>Estimation</wc-th>
        <wc-th></wc-th>
      </wc-tr>
    </wc-thead>
  </wc-table>
  <table>
    <colgroup>
      <col style="width: 4.6rem" />
      <col style="width: 3.6rem" />
      <col style="width: 4.8rem" />
      <col />
      <col style="width: 4.4rem" />
      <col style="width: 15rem" />
      <col style="width: 20rem" />
      <col style="width: 10rem" />
      <col style="width: 26rem" />
      <col style="width: 14rem" />
      <col style="width: 4.6rem" />
    </colgroup>
    <thead>
      <tr>
        <th>
          <input role="checkbox" type="checkbox" />
        </th>
        <th></th>
        <th sort>#</th>
        <th sort="asc">Project Name</th>
        <th>PM</th>
        <th>
          <div class="flex c-center" style="gap: 0.6rem">
            Status <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </th>
        <th sort="desc">Last update</th>
        <th>Resources</th>
        <th>
          <div class="flex c-center" style="gap: 0.6rem">
            Project timeline <wc-tooltip content="This is just a tooltip example." placement="bottom" show-arrow><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </th>
        <th>Estimation</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
      </tr>
      <details style="display: contents">
        <summary style="display: contents">
          <tr>
            <td><input role="checkbox" type="checkbox" /></td>
          </tr>
        </summary>
        <tr>
          <td>3</td>
        </tr>
      </details>
    </tbody>
  </table>
  <!--  <div class="flex col align-items-center">-->
  <!--    <wc-chat-panel mode="mobile" tab="chat" style="width: 390px; height: 844px">-->
  <!--      <div slot="sidebar">个人信息</div>-->
  <!--    </wc-chat-panel>-->
  <!--    <wc-chat-panel tab="chat" style="width: 1160px">-->
  <!--      <div slot="sidebar">个人信息</div>-->
  <!--    </wc-chat-panel>-->
  <!--  </div>-->
</template>

<script setup>
import { reactive } from 'vue'
import { getProjects } from '@src/api'
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
