<template>
  <main>
    <table v-if="tableData.length">
      <thead>
        <tr>
          <th><input role="checkbox" type="checkbox" /></th>
          <th></th>
          <th v-for="rowName in Object.keys(tableData[0])" :key="rowName">{{ rowName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input role="checkbox" type="checkbox" /></td>
          <td></td>
          <td>2016-05-03</td>
          <td>Tom普通的tr</td>
          <td>No. 189, Grove St, Los Angeles</td>
        </tr>
        <tr v-for="(item, index) in tableData" :key="index" offset="1">
          <td><input role="checkbox" type="checkbox" /></td>
          <td><input role="open" type="checkbox" /></td>
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
        </tr>
      </tbody>
    </table>
    <wc-table v-if="tableData.length" role="table">
      <wc-thead>
        <wc-tr>
          <wc-th><input role="checkbox" type="checkbox" /></wc-th>
          <wc-th></wc-th>
          <wc-th v-for="rowName in Object.keys(tableData[0])" :key="rowName">{{ rowName }}</wc-th>
        </wc-tr>
      </wc-thead>
      <wc-tbody>
        <wc-tr>
          <wc-td><input role="checkbox" type="checkbox" /></wc-td>
          <wc-td></wc-td>
          <wc-td>2016-05-03</wc-td>
          <wc-td>Tom普通的tr</wc-td>
          <wc-td>No. 189, Grove St, Los Angeles</wc-td>
        </wc-tr>
        <wc-tr v-for="(item, index) in tableData" :key="index" offset="1">
          <wc-td><input role="checkbox" type="checkbox" /></wc-td>
          <wc-td><input role="open" type="checkbox" /></wc-td>
          <wc-td>{{ item.date }}</wc-td>
          <wc-td>{{ item.name }}</wc-td>
          <wc-td>{{ item.address }}</wc-td>
          <div slot="reference">
            <ul class="timeline-group">
              <li role="timeline">
                <div role="timeline_icon" class="color-indigo"><i role="icon" class="dt3_edit"></i></div>
                Roger Vaccaro updated <span style="color: var(--primary-500)">estimation</span> from US$ 15k to US$ 10.5k <span style="color: var(--info-500)">on 18 May 2021 @ 4:14 PM.</span>
              </li>
              <li role="timeline">
                <div role="timeline_icon" class="color-blue"><i role="icon" class="dt3_data"></i></div>
                <span style="color: var(--info-900)">Roger Vaccaro</span> changed <span style="color: var(--primary-500)">status</span> from <span role="tag" class="color-inactive">On hold</span> to <span role="tag" class="color-success">On track</span> <span style="color: var(--info-500)">on 16 May 2021 @ 11:37 AM.</span><br />
                <span role="indent" style="padding-top: 0.8rem"><i role="icon" class="dt3_notes" style="margin-right: 0.8rem"></i> This is a note, user fills in while changing the status, which explains the current project status.</span>
              </li>
              <li role="timeline">
                <div role="timeline_icon"><i role="icon" class="dt3_add"></i></div>
                <span style="color: var(--info-900)">Nolan Donin</span> created <span style="color: var(--primary-500)">project</span> <span style="color: var(--info-500)">on 11 May 2021 @ 2:57 PM.</span>
              </li>
            </ul>
          </div>
        </wc-tr>
      </wc-tbody>
    </wc-table>
  </main>
</template>
<script setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
<style scoped lang="scss"></style>
