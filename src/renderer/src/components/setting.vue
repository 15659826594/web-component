<template>
  <dialog ref="drawer" role="drawer" style="width: 38.3rem">
    <header role="header">
      <hgroup>
        <h2>偏好设置</h2>
        <p>自定义偏好设置 & 实时预览</p>
      </hgroup>
      <button role="close" @click="drawer.close()"></button>
    </header>
    <main class="flex col" style="gap: 3.2rem 0">
      <div role="segmented" class="tab" style="--height: 3.6rem; --padding: 0.4rem">
        <input v-for="item in tab.list" :key="item.value" type="radio" :name="tab.name" :value="item.value" :label="item.label" :checked="item.value === tab.val" @change="tab.val.value = $event.currentTarget.value" />
      </div>
      <!--外观-->
      <template v-if="tab.val.value === 'appearance'">
        {{ effectStore.root }}
        <fieldset>
          <legend>主题</legend>
          <div role="row" style="--gutter: 2.4rem">
            <div v-for="t in themes" :key="t.value" role="col" class="span-8 xs-12">
              <div class="flex col center theme">
                <label :class="{ checked: localStorageTheme === t.value }" @click="switchTheme($event, t.value)">
                  <span role="icon" :class="t.icon"></span>
                </label>
                {{ t.name }}
              </div>
            </div>
          </div>
          <div class="flex col" style="gap: 0.4rem 0; margin-top: 2.4rem">
            <label>深色侧边栏 <input role="switch" type="checkbox" :checked="darkPart.sidebar.value" @click="setSheet('sidebar')" /></label>
            <label>深色顶栏 <input role="switch" type="checkbox" :checked="darkPart.header.value" @click="setSheet('header')" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>内置主题</legend>
          <div role="row" style="--gutter: 1.2rem">
            <div v-for="(scheme, index) in schemes" :key="index" role="col" class="span-8 xs-12">
              <div class="scheme flex center" @click="switchScheme(scheme)">
                <div class="block" :style="{ backgroundColor: scheme.background }"></div>
              </div>
              <div class="name">{{ scheme.name }}</div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>其他</legend>
          <div class="flex space-between" style="gap: 0 1rem">
            <button v-for="r in [0, 0.4, 0.6, 0.8, 1]" :key="r" role="button" style="flex: 1; line-height: normal" :class="{ 'color-primary': r === radius }" @click="switchRadius(r)">
              {{ r }}
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>其他</legend>
          <div class="flex col" style="gap: 0.4rem 0">
            <label>色弱模式 <input role="switch" type="checkbox" :checked="filter.includes('invert(1)')" @change="switchFilter('invert(1)')" /></label>
            <label>灰色模式 <input role="switch" type="checkbox" :checked="filter.includes('grayscale(100%)')" @change="switchFilter('grayscale(100%)')" /></label>
          </div>
        </fieldset>
      </template>
      <!--布局-->
      <template v-else-if="tab.val.value === 'layout'">
        <fieldset>
          <legend>布局</legend>
          <div role="row" style="--gutter: 2.4rem; gap: 2rem 0">
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104"></rect>
                    <path id="svg_2" d="m-3.37838,3.61916a4.4919,4.02457 0 0 1 4.4919,-4.02457l26.35848,0l0,66.40541l-26.35848,0a4.4919,4.02457 0 0 1 -4.4919,-4.02457l0,-58.35627z" fill="var(--primary)" stroke="null"></path>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" width="17.66" x="4.906" y="23.884"></rect>
                    <rect id="svg_4" fill="#ffffff" height="9.706" rx="2" width="9.811" x="8.83" y="5.881"></rect>
                    <path id="svg_5" d="m4.906,35.833c0,-0.75801 0.63699,-1.395 1.395,-1.395l14.87,0c0.75801,0 1.395,0.63699 1.395,1.395l0,-0.001c0,0.75801 -0.63699,1.395 -1.395,1.395l-14.87,0c-0.75801,0 -1.395,-0.63699 -1.395,-1.395l0,0.001z" fill="#ffffff" opacity="undefined"></path>
                    <rect id="svg_6" fill="#ffffff" height="2.789" rx="1.395" width="17.66" x="4.906" y="44.992"></rect>
                    <rect id="svg_7" fill="#ffffff" height="2.789" rx="1.395" width="17.66" x="4.906" y="55.546"></rect>
                    <rect id="svg_8" fill="currentColor" fill-opacity="0.08" height="9.07027" rx="2" stroke="null" width="73.53879" x="28.97986" y="1.42876"></rect>
                    <rect id="svg_9" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="32.039" y="3.89903"></rect>
                    <rect id="svg_10" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="80.75054" y="3.62876"></rect>
                    <rect id="svg_11" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="87.58249" y="3.49362"></rect>
                    <rect id="svg_12" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="94.6847" y="3.62876"></rect>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="45.63141" x="56.05157" y="14.613"></rect>
                    <rect id="svg_14" fill="currentColor" fill-opacity="0.08" height="20.97838" rx="2" stroke="null" width="22.82978" x="29.38527" y="14.613"></rect>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="72.45771" x="28.97986" y="39.48203"></rect>
                  </g>
                </svg>
              </div>
              <span>垂直</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <path id="svg_2" d="m-3.37838,3.7543a1.93401,4.02457 0 0 1 1.93401,-4.02457l11.3488,0l0,66.40541l-11.3488,0a1.93401,4.02457 0 0 1 -1.93401,-4.02457l0,-58.35627z" fill="var(--primary)" stroke="null"></path>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="15.46086"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.67897" rx="2" stroke="null" width="8.18938" x="0.58676" y="1.42154"></rect>
                    <rect id="svg_8" fill="currentColor" fill-opacity="0.08" height="9.07027" rx="2" stroke="null" width="75.91967" x="25.38277" y="1.42876"></rect>
                    <rect id="svg_9" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="27.91529" y="3.69284"></rect>
                    <rect id="svg_10" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="80.75054" y="3.62876"></rect>
                    <rect id="svg_11" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="87.78868" y="3.69981"></rect>
                    <rect id="svg_12" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="94.6847" y="3.62876"></rect>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="42.9287" x="58.75427" y="14.613"></rect>
                    <rect id="svg_14" fill="currentColor" fill-opacity="0.08" height="20.97838" rx="2" stroke="null" width="28.36894" x="26.14342" y="14.613"></rect>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="75.09493" x="26.34264" y="39.68822"></rect>
                    <rect id="svg_5" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.79832" y="28.39462"></rect>
                    <rect id="svg_6" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="41.80156"></rect>
                    <rect id="svg_7" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="55.36623"></rect>
                    <rect id="svg_16" fill="currentColor" fill-opacity="0.08" height="65.72065" stroke="null" width="12.49265" x="9.85477" y="-0.02618"></rect>
                  </g>
                </svg>
              </div>
              <span>双列菜单</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <rect id="svg_8" fill="var(--primary)" height="9.07027" stroke="null" width="104.07934" x="-0.07419" y="-0.05773"></rect>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="15.58168" y="3.20832"></rect>
                    <path id="svg_12" d="m98.19822,2.872c0,-0.54338 0.45662,-1 1,-1l1.925,0c0.54338,0 1,0.45662 1,1l0,2.4c0,0.54338 -0.45662,1 -1,1l-1.925,0c-0.54338,0 -1,-0.45662 -1,-1l0,-2.4z" fill="#ffffff" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="53.60438" x="43.484" y="13.66705"></rect>
                    <path id="svg_14" d="m3.43932,15.53192c0,-1.08676 1.03344,-2 2.26323,-2l30.33036,0c1.22979,0 2.26323,0.91324 2.26323,2l0,17.24865c0,1.08676 -1.03344,2 -2.26323,2l-30.33036,0c-1.22979,0 -2.26323,-0.91324 -2.26323,-2l0,-17.24865z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="95.02528" x="3.30419" y="39.34689"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="28.14924" y="3.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="41.25735" y="3.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="54.23033" y="3.07319"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.13843" rx="2" stroke="null" width="7.78397" x="1.5327" y="0.881"></rect>
                  </g>
                </svg>
              </div>
              <span>水平</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <rect id="svg_8" fill="currentColor" fill-opacity="0.08" height="9.07027" stroke="null" width="104.07934" x="-0.07419" y="-0.05773"></rect>
                    <rect id="svg_3" fill="#b2b2b2" height="1.689" rx="1.395" stroke="null" width="6.52486" x="10.08168" y="3.50832"></rect>
                    <rect id="svg_10" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="80.75054" y="2.89362"></rect>
                    <rect id="svg_11" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="87.58249" y="2.89362"></rect>
                    <path id="svg_12" d="m98.19822,2.872c0,-0.54338 0.45662,-1 1,-1l1.925,0c0.54338,0 1,0.45662 1,1l0,2.4c0,0.54338 -0.45662,1 -1,1l-1.925,0c-0.54338,0 -1,-0.45662 -1,-1l0,-2.4z" fill="#ffffff" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="44.13071" x="53.37873" y="13.45652"></rect>
                    <path id="svg_14" d="m19.4393,15.74245c0,-1.08676 0.79001,-2 1.73013,-2l23.18605,0c0.94011,0 1.73013,0.91324 1.73013,2l0,17.24865c0,1.08676 -0.79001,2 -1.73013,2l-23.18605,0c-0.94011,0 -1.73013,-0.91324 -1.73013,-2l0,-17.24865z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="78.39372" x="19.93575" y="39.34689"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="28.14924" y="3.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="41.25735" y="3.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="54.23033" y="3.07319"></rect>
                    <rect id="svg_4" fill="#ffffff" height="5.13843" rx="2" stroke="null" width="5.78397" x="1.5327" y="1.081"></rect>
                    <rect id="svg_5" fill="var(--primary)" height="56.81191" stroke="null" width="15.44642" x="-0.06423" y="9.03113"></rect>
                    <path id="svg_2" d="m2.38669,15.38074c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="#fff" opacity="undefined" stroke="null"></path>
                    <path id="svg_6" d="m2.38669,28.43336c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="#fff" opacity="undefined" stroke="null"></path>
                    <path id="svg_7" d="m2.17616,41.27545c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="#fff" opacity="undefined" stroke="null"></path>
                    <path id="svg_9" d="m2.17616,54.32806c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="#fff" opacity="undefined" stroke="null"></path>
                  </g>
                </svg>
              </div>
              <span>侧边导航</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <rect id="svg_8" fill="var(--primary)" height="9.07027" stroke="null" width="104.07934" x="-0.07419" y="-0.05773"></rect>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="15.58168" y="3.20832"></rect>
                    <path id="svg_12" d="m98.19822,2.872c0,-0.54338 0.45662,-1 1,-1l1.925,0c0.54338,0 1,0.45662 1,1l0,2.4c0,0.54338 -0.45662,1 -1,1l-1.925,0c-0.54338,0 -1,-0.45662 -1,-1l0,-2.4z" fill="#ffffff" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="44.13071" x="53.37873" y="13.45652"></rect>
                    <path id="svg_14" d="m19.4393,15.74245c0,-1.08676 0.79001,-2 1.73013,-2l23.18605,0c0.94011,0 1.73013,0.91324 1.73013,2l0,17.24865c0,1.08676 -0.79001,2 -1.73013,2l-23.18605,0c-0.94011,0 -1.73013,-0.91324 -1.73013,-2l0,-17.24865z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="78.39372" x="19.93575" y="39.34689"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="28.14924" y="3.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="41.25735" y="3.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="54.23033" y="3.07319"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.13843" rx="2" stroke="null" width="7.78397" x="1.5327" y="0.881"></rect>
                    <rect id="svg_5" fill="currentColor" fill-opacity="0.08" height="56.81191" stroke="null" width="15.44642" x="-0.06423" y="9.03113"></rect>
                    <path id="svg_2" d="m2.38669,15.38074c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <path id="svg_6" d="m2.38669,28.43336c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <path id="svg_7" d="m2.17616,41.27545c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <path id="svg_9" d="m2.17616,54.32806c0,-0.20384 0.27195,-0.37513 0.59557,-0.37513l7.98149,0c0.32362,0 0.59557,0.17129 0.59557,0.37513l0,3.23525c0,0.20384 -0.27195,0.37513 -0.59557,0.37513l-7.98149,0c-0.32362,0 -0.59557,-0.17129 -0.59557,-0.37513l0,-3.23525z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                  </g>
                </svg>
              </div>
              <span>混合垂直</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <path id="svg_2" d="m-3.37838,3.7543a1.93401,4.02457 0 0 1 1.93401,-4.02457l11.3488,0l0,66.40541l-11.3488,0a1.93401,4.02457 0 0 1 -1.93401,-4.02457l0,-58.35627z" fill="var(--primary)" stroke="null"></path>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="15.46086"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.67897" rx="2" stroke="null" width="8.18938" x="0.58676" y="1.42154"></rect>
                    <rect id="svg_8" fill="var(--primary)" height="9.07027" rx="2" stroke="null" width="75.91967" x="25.38277" y="1.42876"></rect>
                    <rect id="svg_9" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="27.91529" y="3.69284"></rect>
                    <rect id="svg_10" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="80.75054" y="3.62876"></rect>
                    <rect id="svg_11" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="87.78868" y="3.69981"></rect>
                    <rect id="svg_12" fill="#b2b2b2" height="4.4" rx="1" stroke="null" width="3.925" x="94.6847" y="3.62876"></rect>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="42.9287" x="58.75427" y="14.613"></rect>
                    <rect id="svg_14" fill="currentColor" fill-opacity="0.08" height="20.97838" rx="2" stroke="null" width="28.36894" x="26.14342" y="14.613"></rect>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="75.09493" x="26.34264" y="39.68822"></rect>
                    <rect id="svg_5" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.79832" y="28.39462"></rect>
                    <rect id="svg_6" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="41.80156"></rect>
                    <rect id="svg_7" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="5.47439" x="1.64059" y="55.36623"></rect>
                    <rect id="svg_16" fill="currentColor" fill-opacity="0.08" height="65.72065" stroke="null" width="12.49265" x="9.85477" y="-0.02618"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="35.14924" y="4.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="47.25735" y="4.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="59.23033" y="4.07319"></rect>
                  </g>
                </svg>
              </div>
              <span>混合双列</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path id="svg_1" d="m0.13514,4.13514c0,-2.17352 1.82648,-4 4,-4l96,0c2.17352,0 4,1.82648 4,4l0,58c0,2.17352 -1.82648,4 -4,4l-96,0c-2.17352,0 -4,-1.82648 -4,-4l0,-58z" fill="currentColor" fill-opacity="0.02" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="26.57155" rx="2" stroke="null" width="53.18333" x="45.79979" y="3.77232"></rect>
                    <path id="svg_14" d="m4.28142,5.96169c0,-1.37748 1.06465,-2.53502 2.33158,-2.53502l31.2463,0c1.26693,0 2.33158,1.15754 2.33158,2.53502l0,21.86282c0,1.37748 -1.06465,2.53502 -2.33158,2.53502l-31.2463,0c-1.26693,0 -2.33158,-1.15754 -2.33158,-2.53502l0,-21.86282z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="25.02247" rx="2" stroke="null" width="94.39371" x="4.56735" y="34.92584"></rect>
                  </g>
                </svg>
              </div>
              <span>内容全屏</span>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>内容</legend>
          <div role="row" style="--gutter: 2.4rem">
            <div role="col" class="span-8 xs-12">
              <div class="layout-style flow">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <rect id="svg_8" fill="var(--primary)" height="9.07027" stroke="null" width="104.07934" x="-0.07419" y="-0.05773"></rect>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="15.58168" y="3.20832"></rect>
                    <path id="svg_12" d="m98.19822,2.872c0,-0.54338 0.45662,-1 1,-1l1.925,0c0.54338,0 1,0.45662 1,1l0,2.4c0,0.54338 -0.45662,1 -1,1l-1.925,0c-0.54338,0 -1,-0.45662 -1,-1l0,-2.4z" fill="#ffffff" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="53.60438" x="43.484" y="13.66705"></rect>
                    <path id="svg_14" d="m3.43932,15.53192c0,-1.08676 1.03344,-2 2.26323,-2l30.33036,0c1.22979,0 2.26323,0.91324 2.26323,2l0,17.24865c0,1.08676 -1.03344,2 -2.26323,2l-30.33036,0c-1.22979,0 -2.26323,-0.91324 -2.26323,-2l0,-17.24865z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="95.02528" x="3.30419" y="39.34689"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="28.14924" y="3.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="41.25735" y="3.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="54.23033" y="3.07319"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.13843" rx="2" stroke="null" width="7.78397" x="1.5327" y="0.881"></rect>
                  </g>
                </svg>
              </div>
              <span>流式</span>
            </div>
            <div role="col" class="span-8 xs-12">
              <div class="layout-style fixed-width">
                <svg class="custom-radio-image" height="66" width="104" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect id="svg_1" fill="currentColor" fill-opacity="0.02" height="66" rx="4" stroke="null" width="104" x="0.13514" y="0.13514"></rect>
                    <rect id="svg_8" fill="var(--primary)" height="9.07027" stroke="null" width="104.07934" x="-0.07419" y="-0.05773"></rect>
                    <rect id="svg_3" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="15.58168" y="3.20832"></rect>
                    <path id="svg_12" d="m98.19822,2.872c0,-0.54338 0.45662,-1 1,-1l1.925,0c0.54338,0 1,0.45662 1,1l0,2.4c0,0.54338 -0.45662,1 -1,1l-1.925,0c-0.54338,0 -1,-0.45662 -1,-1l0,-2.4z" fill="#ffffff" opacity="undefined" stroke="null"></path>
                    <rect id="svg_13" fill="currentColor" fill-opacity="0.08" height="21.51892" rx="2" stroke="null" width="41.98275" x="45.37589" y="13.53192"></rect>
                    <path id="svg_14" d="m16.4123,15.53192c0,-1.08676 0.74096,-2 1.62271,-2l21.74653,0c0.88175,0 1.62271,0.91324 1.62271,2l0,17.24865c0,1.08676 -0.74096,2 -1.62271,2l-21.74653,0c-0.88175,0 -1.62271,-0.91324 -1.62271,-2l0,-17.24865z" fill="currentColor" fill-opacity="0.08" opacity="undefined" stroke="null"></path>
                    <rect id="svg_15" fill="currentColor" fill-opacity="0.08" height="21.65405" rx="2" stroke="null" width="71.10636" x="16.54743" y="39.34689"></rect>
                    <rect id="svg_21" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="28.14924" y="3.07319"></rect>
                    <rect id="svg_22" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="41.25735" y="3.20832"></rect>
                    <rect id="svg_23" fill="#e5e5e5" height="2.789" rx="1.395" stroke="null" width="7.52486" x="54.23033" y="3.07319"></rect>
                    <rect id="svg_4" fill="#ffffff" height="7.13843" rx="2" stroke="null" width="7.78397" x="1.5327" y="0.881"></rect>
                  </g>
                </svg>
              </div>
              <span>定宽</span>
            </div>
          </div>
        </fieldset>
      </template>
      <!--快捷键-->
      <template v-else-if="tab.val.value === 'shortcutkeys'"> 快捷键 </template>
      <!--通用-->
      <template v-else-if="tab.val.value === 'general'"> 通用 </template>
    </main>
    <footer class="flex">
      <button role="button" class="color-primary" @click="drawer.close()">复制偏好设置</button>
      <button role="button" @click="drawer.close()">清空缓存 & 退出登录</button>
    </footer>
  </dialog>
</template>
<script setup>
import { useEffect } from '../store'
import Sheet from '../utils/Sheet'
import { onMounted, ref, useId } from 'vue'
const effectStore = useEffect()
let sheet = new Sheet(localStorage.getItem('sheet'), ':root')
let tab = {
    name: useId('tab'),
    list: [
      { value: 'appearance', label: '外观' },
      { value: 'layout', label: '布局' },
      { value: 'shortcutkeys', label: '快捷键' },
      { value: 'general', label: '通用' }
    ],
    val: ref('appearance')
  },
  drawer = ref(null),
  media = window.matchMedia('(prefers-color-scheme: dark)'),
  localStorageTheme = ref(sheet.find('--effect', 'light')),
  theme = ref(localStorageTheme.value === 'dark' ? 'dark' : 'light'),
  themes = [
    { name: '浅色', icon: 'f7_sun_max_fill', value: 'light' },
    { name: '深色', icon: 'f7_moon_stars_fill', value: 'dark' },
    { name: '跟随系统', icon: 'f7_moon_circle', value: 'auto' }
  ]
// 初始化主题
if (localStorageTheme.value === 'dark') {
  document.documentElement.classList.add('dark')
} else if (localStorageTheme.value === 'auto') {
  media.matches && document.documentElement.classList.add('dark')
  media.onchange = osThemeChange
}
// 监听系统主题变化
function osThemeChange(e) {
  if (e.matches) {
    document.documentElement.classList.add('dark')
    theme.value = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    theme.value = 'light'
  }
}
// 主题切换 , 主题就两种 , 状态有三种
function switchTheme(event, newVal) {
  if (newVal === undefined) {
    newVal = theme.value === 'light' ? 'dark' : 'light'
  }
  effectStore.root = newVal
  if (newVal === localStorageTheme.value) return
  // 判断是否跟随系统主题
  localStorageTheme.value = newVal
  newVal !== 'light' ? sheet.add('--effect', newVal) : sheet.remove('--effect')
  sheet.persist('sheet')

  if (localStorageTheme.value === 'auto') {
    newVal = media.matches ? 'dark' : 'light'
    media.onchange = osThemeChange
  } else {
    media.onchange = null
  }

  if (newVal === theme.value) return

  theme.value = newVal

  const transition = document.startViewTransition(() => {
    if (newVal === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  transition.ready.then(() => {
    const { clientX, clientY } = event
    const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY))
    const clipPath = [`circle(0px at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]
    const isDark = document.documentElement.classList.contains('dark')
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
// 配色方案
let schemes = [
  { name: '默认', color: '#fff', background: '#5e5adb' },
  { name: '蓝色', color: '#fff', background: '#2264e5' },
  { name: 'Blue', color: '#fff', background: '#1ab7ea' },
  { name: 'Azure', color: '#fff', background: '#4299e1' },
  { name: 'Indigo', color: '#fff', background: '#4263eb' },
  { name: 'Purple', color: '#222', background: '#ae3ec9' },
  { name: 'Pink', color: '#222', background: '#d6336c' },
  { name: 'Red', color: '#fff', background: '#d63939' },
  { name: 'Orange', color: '#fff', background: '#f76707' },
  { name: 'Yellow', color: '#fff', background: '#f59f00' },
  { name: 'Lime', color: '#fff', background: '#74b816' },
  { name: 'Green', color: '#fff', background: '#2fb344' },
  { name: 'Teal', color: '#fff', background: '#0ca678' },
  { name: 'Cyan', color: '#fff', background: '#17a2b8' }
]
function switchScheme(scheme) {
  if (scheme.name === '默认') {
    sheet.removeBatch((key) => key.startsWith('--primary'))
  } else {
    /*noinspection CssUnresolvedCustomProperty*/
    sheet.insertCssText(/* language=CSS */ `
    :root {
      --primary: ${scheme.background};
      --primary-900: hsl(from var(--primary) H 64% 21%);
      --primary-800: hsl(from var(--primary) H 57% 36%);
      --primary-700: hsl(from var(--primary) H 52% 42%);
      --primary-600: hsl(from var(--primary) H 52% 52%);
      --primary-500: hsl(from var(--primary) H 52% 52%);
      --primary-400: hsl(from var(--primary) H 64% 61%);
      --primary-300: hsl(from var(--primary) H 72% 70%);
      --primary-200: hsl(from var(--primary) H 82% 78%);
      --primary-100: hsl(from var(--primary) H 87% 85%);
      --primary-50: hsl(from var(--primary) H 88% 90%);
      --primary-0: hsl(from var(--primary) H 71% 96%);
    }
  `)
  }
  sheet.persist('sheet')
}

// 设置圆角大小
let radius = ref(0.6)
let localStorageRadius = sheet.find('--radius')
if (localStorageRadius) {
  radius.value = parseFloat(localStorageRadius)
}

function switchRadius(r) {
  radius.value = r
  if (r === 0.6) {
    sheet.remove('--radius')
  } else {
    sheet.add('--radius', `${radius.value}rem`)
  }
  sheet.persist('sheet')
}

// 色弱和灰色模式(滤镜效果)
let filter = ref([])
// 初始化值
let cssRuleFilter = sheet.find('filter')
if (cssRuleFilter) {
  filter.value = cssRuleFilter.split(' ')
}

function switchFilter(val) {
  let findIndex = filter.value.findIndex((item) => item === val)
  findIndex === -1 ? filter.value.push(val) : filter.value.splice(findIndex, 1)
  filter.value.length ? sheet.add('filter', filter.value.join(' ')) : sheet.remove('filter')
  sheet.persist('sheet')
}

let darkPart = ref({
  sidebar: {
    filter: '--sidebar-effect',
    value: sheet.find('--sidebar-effect'),
    el: null
  },
  header: {
    filter: '--header-effect',
    value: sheet.find('--header-effect'),
    el: null
  }
})

onMounted(() => {
  for (const el of document.getElementById('app').children) {
    switch (el.tagName) {
      case 'NAV': {
        darkPart.value.header.el = el
        break
      }
      case 'ASIDE': {
        darkPart.value.sidebar.el = el
        break
      }
    }
  }

  if (darkPart.value.sidebar.value) {
    darkPart.value.sidebar.el && darkPart.value.sidebar.el.classList.toggle('dark')
  }
  if (darkPart.value.header.value) {
    darkPart.value.header.el && darkPart.value.header.el.classList.toggle('dark')
  }
})

function setSheet(part) {
  if (darkPart.value[part].value) {
    sheet.remove(darkPart.value[part].filter)
    darkPart.value[part].value = undefined
  } else {
    sheet.add(darkPart.value[part].filter, 'dark')
  }
  darkPart.value[part].el && darkPart.value[part].el.classList.toggle('dark')
  sheet.persist('sheet')
}

document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet.valueOf()]

function showModal() {
  drawer.value?.showModal()
}

function closeModal() {
  drawer.value?.close()
}

defineExpose({ theme, showModal, closeModal, switchTheme })
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 2. 亮色主题时的层级控制 */
::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2147483646;
}

/* 3. 暗色主题时的层级反转 */
:root.dark {
  &::view-transition-old(root) {
    z-index: 2147483646;
  }
  &::view-transition-new(root) {
    z-index: 1;
  }
}
</style>

<style scoped lang="scss">
.tab {
  border-radius: var(--radius-600);
  &::after {
    border-radius: var(--radius-400);
  }
}
fieldset {
  margin: 0;
  padding: 0;
  border: none;
  margin-inline: 0;
  legend {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    font-weight: 500;
  }
}
.theme {
  gap: 0.8rem 0;
  font-size: 1.2rem;
  label {
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 3rem;
    padding: 0.6rem 0.4rem;
    border-radius: var(--radius);
    transition: box-shadow 300ms;
    box-shadow: var(--shadow-default);
    &.checked {
      box-shadow: var(--shadow-focus);
    }
  }
}
.scheme {
  cursor: pointer;
  height: 5.4rem;
  border: 1px solid var(--info-100);
  border-radius: var(--radius);
  .block {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius);
  }
  & + .name {
    text-align: center;
    color: var(--info-600);
    font-size: 1.2rem;
    margin: 0.8rem 0;
  }
}

.layout-style {
  cursor: pointer;
  padding: 0.4rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  display: flex;
  & > svg {
    width: 100%;
  }
  & + span {
    margin-top: 0.8rem;
    display: block;
    font-size: 1.2rem;
    text-align: center;
    color: var(--info-600);
  }
}

footer {
  gap: 0 2rem;
  button {
    flex: 1;
  }
}
</style>
