<template>
  <table role="table">
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
        <th colspan="100%" style="padding: 0">
          <div role="table-header">
            <div class="flex" style="gap: 0 2rem; margin-bottom: 2.8rem">
              <button ref="target" role="button" class="setting" @click="popover.showModal($event.currentTarget, { title: 'Table settings' })">
                <i role="icon" class="dt3_data-table"></i>
              </button>
              <div class="input-group">
                <wc-dropdown trigger="click">
                  <button role="button" class="flex align-items-center" style="gap: 0 0.8rem"><i role="icon" class="block dt3_filter"></i>All<i role="icon" class="block dt3_down"></i></button>
                  <div slot="overlay">
                    <wc-menu>
                      <wc-menu-item>Project name</wc-menu-item>
                      <wc-menu sub label="Project manager">
                        <wc-menu-item>
                          <label><input role="checkbox" type="checkbox" />All</label>
                        </wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Leo Gouse</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Roger Vaccaro</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Tatiana Dias</wc-menu-item>
                      </wc-menu>
                      <wc-menu-item>Last update</wc-menu-item>
                      <wc-menu sub label="Resources">
                        <wc-menu-item><input role="checkbox" type="checkbox" />All</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />UX/UI Design</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Frontend</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Backend</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Full Stack</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Graphic Designer</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />Web Designer</wc-menu-item>
                        <wc-menu-item><input role="checkbox" type="checkbox" />QA</wc-menu-item>
                      </wc-menu>
                      <wc-menu-item>Estimation</wc-menu-item>
                    </wc-menu>
                  </div>
                </wc-dropdown>
                <label role="input">
                  <input type="search" placeholder="Search" />
                </label>
              </div>
              <button role="button icon" class="color-primary f7_plus" style="margin-left: auto" @click="modal.showModal()">New project</button>
            </div>
            <div>
              <div role="tabs">
                <input type="radio" name="tab" label="All" badge="27" checked />
                <input type="radio" name="tab" label="Risk" badge="4" />
                <input type="radio" name="tab" label="On hold" badge="4" />
                <input type="radio" name="tab" label="Potential risk" badge="7" />
                <input type="radio" name="tab" label="On track" badge="12" />
                <span class="sep"></span>
                <input type="radio" name="tab" label="Archived" badge="9" />
              </div>
            </div>
          </div>
        </th>
      </tr>
      <tr role="col-header">
        <th>
          <input role="checkbox" type="checkbox" />
        </th>
        <th></th>
        <th sort>#</th>
        <th sort="asc">Project Name</th>
        <th>PM</th>
        <th>
          <div class="flex c-center" style="gap: 0.6rem">
            Status <wc-tooltip content="This is just a tooltip example." placement="bottom"><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </th>
        <th sort="desc">Last update</th>
        <th>Resources</th>
        <th>
          <div class="flex c-center" style="gap: 0.6rem">
            Project timeline <wc-tooltip content="This is just a tooltip example." placement="bottom"><i role="icon" class="block dt3_info"></i></wc-tooltip>
          </div>
        </th>
        <th>Estimation</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td><input role="checkbox" type="checkbox" /></td>
        <td><i role="icon" class="block dt3_right-circle"></i></td>
        <td>{{ item.rank }}</td>
        <td>
          <span role="link">{{ item.name }}</span>
        </td>
        <td>
          <wc-tooltip :content="item.pm.name" placement="bottom">
            <span class="pm">
              <img v-if="item.pm.avatar" :src="item.pm.avatar" alt="avatar" draggable="false" />
              <template v-else>
                {{
                  item.pm.name
                    .split(' ')
                    .map((word) => word.charAt(0))
                    .join('')
                }}
              </template>
            </span>
          </wc-tooltip>
        </td>
        <td>
          <span role="tag" :class="`color-${item.status.type}`" @click="statusChange.togglePopover">{{ item.status.text }}</span>
        </td>
        <td>
          <time role="datetime icon" :datetime="item.update_time" class="dt3_notes">{{ item.update_time }}</time>
        </td>
        <td>
          <span class="res">{{ item.resources }}</span>
        </td>
        <td>
          <time role="datetime" class="block" :datetime="item.start_time">{{ item.start_time }}</time>
          <time role="datetime" class="block" :datetime="item.end_time">{{ item.end_time }}</time>
        </td>
        <td>{{ item.estimation }}</td>
        <td>
          <wc-popup placement="top-right">
            <div slot="reference">
              <option v-for="act in actions" :key="act.value" :value="act.value" :style="{ color: act.color }">{{ act.name }}</option>
            </div>
          </wc-popup>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="100" style="padding: 0">
          <div class="flex space-between" style="padding: 1.3rem 2rem">
            <div style="margin-right: auto">1-20 of 27</div>
            <div role="table-size">Rows per page: 20</div>
            <div role="table-page"><button role="button"></button> 1<span>/2</span> <button role="button"></button></div>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
  <!--    <div style="height: calc(100vh - var(&#45;&#45;safe-area-inset-top, 0px)); overflow: scroll; overscroll-behavior: contain">-->
  <dialog ref="popover" role="popover" show-arrow title="Table settings" duration="300" placement="bottom-left">
    <header>Table settings</header>
    <main class="flex col align-items-start" style="gap: 3.2rem 0">
      <label role="label" for="">
        <span>Table column</span>
        <span class="flex flex-wrap" style="gap: 1rem">
          <button v-for="col in tableColumn" :key="col" role="button" size="mini" :class="tableOrder.includes(col) ? 'color-primary' : ''" style="user-select: none" @click="tableOrder.includes(col) ? tableOrder.splice(tableOrder.indexOf(col), 1) : tableOrder.push(col)">
            {{ col }}
          </button>
        </span>
      </label>
      <label role="label" for="">
        <span>Table column</span>
        <span class="flex draggable-group flex-wrap" style="gap: 0.4rem; background-color: var(--info-200); padding: 0.4rem; border-radius: var(--radius); width: fit-content">
          <button v-for="col in tableOrder" :key="col" :data-value="col" role="button draggable" size="mini" draggable="true" tabindex="-1">{{ col }}</button>
        </span>
      </label>
      <label role="label" for="">
        <span>Amount</span>
        <span role="segmented" style="width: 12.9rem">
          <input type="radio" name="amount" label="10.5k" value="10500" />
          <input type="radio" name="amount" label="10,500" value="10,500" />
        </span>
      </label>
      <label role="label" for="">
        <span>Date formate</span>
        <span role="segmented" style="width: 36.5rem">
          <input type="radio" name="amount" label="DD/MM/YYYY" value="DD/MM/YYYY" />
          <input type="radio" name="amount" label="MM/DD/YYYY" value="MM/DD/YYYY" />
          <input type="radio" name="amount" label="DD/MMM/YYYY" value="DD/MMM/YYYY" />
        </span>
      </label>
      <label for="">
        <input role="checkbox" type="checkbox" />
        <span>Sticky header</span>
      </label>
    </main>
    <footer>
      <button role="button" @click="popover.close()">Reset</button>
      <button role="button" class="color-primary" @click="popover.close()">Apply</button>
    </footer>
  </dialog>
  <!--  添加项目窗口-->
  <dialog ref="modal" role="dialog" with-header="false" style="width: 44rem; margin-top: auto; border-radius: var(--radius-700)">
    <div role="card">
      <header>Add new project</header>
      <main>
        <label>
          <span>Project name</span>
          <input role="input" type="text" required />
        </label>
        <label>
          <span>Project manager (PM)</span>
          <span role="segmented" style="width: 32.6rem">
            <input type="radio" value="Roger Vaccaro" name="pm" checked label="Roger Vaccaro" />
            <input type="radio" value="Tatiana Dias" name="pm" label="Tatiana Dias" />
            <input type="radio" value="Leo Gouse" name="pm" label="Leo Gouse" />
          </span>
        </label>
        <label for="">
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
        <label for="">
          <span>Project timeline</span>
          <span>
            <select role="select" name="pick" style="width: 100%">
              <option v-for="i in ['15 days', '1 month', '1-2 months', '3 months', '4-6 months', '1 year']" :key="i" :value="i">{{ i }}</option>
              <option value="Custom" selected>Custom</option>
            </select>
            <span role="indent">
              <wc-picker mode="date" style="width: 17rem"></wc-picker>
              <i role="icon" class="block dt3_right" style="margin: 0 auto"></i>
              <wc-picker mode="date" style="width: 17rem"></wc-picker>
            </span>
          </span>
        </label>
        <label>
          <span>Estimation</span>
          <label role="input">
            <span>US$</span>
            <input type="text" placeholder="00.00" />
          </label>
        </label>
      </main>
      <footer><button role="button" @click="modal.close()">Cancel</button> <button role="button" class="color-primary" @click="modal.close()">Add project</button></footer>
    </div>
  </dialog>
  <!--修改项目状态-->
  <div ref="statusChange" role="popover" popover>
    <main>
      <div class="title">Change status</div>
      <div class="tag-group" style="margin-top: 0.6rem">
        <label> <span role="tag" class="color-success">On track</span><input type="radio" name="tag" value="success" checked /> </label>
        <label> <span role="tag" class="color-warning">Potential risk </span><input type="radio" name="tag" value="warning" /> </label>
        <label> <span role="tag" class="color-info">On hold</span> <input type="radio" name="tag" value="info" /> </label>
        <label> <span role="tag" class="color-error">At risk</span> <input type="radio" name="tag" value="error" /> </label>
      </div>
    </main>
    <main>
      <div class="title">Notes</div>
      <textarea role="textarea" cols="30" rows="10" placeholder="Write here..." style="margin-top: 0.8rem; resize: none"></textarea>
    </main>
    <footer>
      <button role="button" class="is-text" size="mini" @click="statusChange.hidePopover()">Cancel</button>
      <button role="button" class="is-text" size="mini" style="--color: var(--primary-300)" @click="statusChange.hidePopover()">Apply</button>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { getProjects } from '@src/api'
let modal = ref(),
  popover = ref(),
  target = ref(),
  statusChange = ref(null),
  tableColumn = ['Checkbox', '#', 'Project name', 'PM', 'Status', 'Last update', 'Resources', 'Project timeline', 'Deadline', 'Budget'],
  tableOrder = reactive(['Checkbox', '#', 'Project name', 'PM', 'Status', 'Last update', 'Resources', 'Project timeline', 'Budget'])

function updateTableOrder() {
  const list = document.querySelector('.draggable-group')
  const newOrder = [...list.querySelectorAll('button')].map((button) => button.dataset.value)
  tableOrder.sort((a, b) => {
    return newOrder.indexOf(a) - newOrder.indexOf(b)
  })
}

onMounted(() => {
  const list = document.querySelector('.draggable-group')
  let sourceNode = null
  list.ondragstart = (e) => {
    setTimeout(() => {
      e.target.classList.add('moving')
    }, 0)
    sourceNode = e.target
  }
  list.ondragover = (e) => {
    e.preventDefault()
  }
  list.ondragenter = (e) => {
    e.preventDefault()
    if (e.target === list || e.target === sourceNode) {
      return
    }
    let children = [...list.children]
    let scourceIndex = children.indexOf(sourceNode)
    let targetIndex = children.indexOf(e.target)
    if (scourceIndex > targetIndex) {
      list.insertBefore(sourceNode, e.target)
    } else {
      list.insertBefore(sourceNode, e.target.nextElementSibling)
    }
  }
  list.ondragend = (e) => {
    e.target.classList.remove('moving')
    updateTableOrder(list.children)
  }
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

<style lang="scss" scoped>
thead > tr:last-child {
  white-space: nowrap;
}
thead > tr:last-child,
tbody > tr {
  & > :nth-child(1) {
    text-align: right;
    input[type='checkbox'] {
      vertical-align: text-top;
    }
  }
  & > :nth-child(8) {
    text-align: center;
  }
  & > :nth-child(10) {
    text-align: right;
  }
}
tbody > tr {
  & > td:nth-child(1):has(input:checked) {
    background-color: var(--primary-0);
    & ~ td {
      background-color: var(--primary-0);
    }
  }
  wc-popup::part(slot) {
    opacity: 0;
  }
  &:hover {
    wc-popup::part(slot) {
      opacity: 1;
    }
  }
}
.pm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background-color: var(--primary-50);
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid rgba(210, 213, 220, 0.5);
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 1.6rem;
  color: var(--primary-500);
  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:empty {
    background-clip: border-box;
    background-color: white;
    --grid-width: 0.9rem;
    --grid-height: 0.6rem;
    --grid-color: black;
    --offset-x: 0.3rem;
    --offset-y: -0.1rem;
    //存在精度问题
    --deg: calc(atan2(var(--grid-height), var(--grid-width)) * 181 / pi);
    background-size: calc(var(--grid-width) * 2) calc(var(--grid-height) * 2);
    background-image: linear-gradient(var(--deg), var(--grid-color) 25%, transparent 25%, transparent 75%, var(--grid-color) 75%), linear-gradient(var(--deg), var(--grid-color) 25%, transparent 25%, transparent 75%, var(--grid-color) 75%);
    background-position:
      var(--offset-x) var(--offset-y),
      calc(var(--grid-width) + var(--offset-x)) calc(var(--grid-height) + var(--offset-y));
  }
}
.res {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background-color: var(--info-50);
  color: var(--info-700);
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1.4rem;
  line-height: 2rem;
  &:empty {
    border: var(--border-stroke);
    &:hover {
      box-shadow: var(--shadow-tooltip);
    }
    &::before {
      font-family: 'data-table', serif !important;
      content: '\e726';
      width: 1.4rem;
      height: 1.4rem;
      text-align: center;
      line-height: 1.4rem;
      color: var(--info-700);
    }
  }
}
</style>
