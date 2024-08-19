<template>
  <div class="grid-container">
    <div
      ref="gridRef"
      class="grid"
      :class="{
        'grid-if': type === typeListRef[3],
        'grid-compare': type === typeListRef[4]
      }"
    >
      <template v-if="typeListRef.slice(0, 3).includes(type)">
        <template v-for="col in arr?.length" :key="col">
          <template v-for="row in arr?.length" :key="row">
            <div
              class="item"
              :class="{
                'item-empty': col === 1 && row === 1,
                'col-first': row === 1,
                'row-first': col === 1,
                'is-loose-equal':
                  type === typeListRef[2] && arr?.[col - 1]?.[row - 1]?.looseEqual === '-',
                'is-equal': arr?.[col - 1]?.[row - 1]?.result === '-',
                'show-tooltip': row > 1 && col > 1,
                'text-color': type === typeListRef[2]
              }"
              @mouseenter="handlePopover('enter', $event, arr?.[col - 1]?.[row - 1]?.tip || '')"
              @mouseleave="handlePopover('leave', $event, '')"
            >
              <template v-if="typeListRef[2] === type">
                {{
                  arr?.[col - 1]?.[row - 1]?.text !== undefined
                    ? arr?.[col - 1]?.[row - 1]?.text
                    : arr?.[col - 1]?.[row - 1]
                }}
              </template>
              <template v-else>
                {{
                  arr?.[col - 1]?.[row - 1]?.result !== undefined ? '' : arr?.[col - 1]?.[row - 1]
                }}
              </template>
            </div>
          </template>
        </template>
      </template>
      <template v-else-if="type === typeListRef[3]">
        <template v-for="row in arr?.[0]?.length" :key="row">
          <template v-for="col in arr?.length" :key="col">
            <div
              class="item"
              :class="{
                'col-first': col === 1,
                'col-last': col === 3,
                'is-true': col !== 1 && col !== 3 && arr?.[1]?.[row - 1] === true,
                'show-tooltip': col === 2
              }"
              @mouseenter="handlePopover('enter', $event, arr?.[2]?.[row - 1])"
              @mouseleave="handlePopover('leave', $event, '')"
            >
              {{ col !== 2 ? arr?.[col - 1]?.[row - 1] : '&nbsp;' }}
            </div>
          </template>
        </template>
      </template>
      <template v-else-if="type === typeListRef[4]">
        <template v-for="row in arr?.[0]?.length" :key="row">
          <template v-for="col in arr?.length" :key="col">
            <div
              class="item"
              :class="{
                'row-first': row === 1,
                'is-true': arr?.[col - 1]?.[row - 1] === true
                // 'show-tooltip': col === 2
              }"
              @mouseenter="handlePopover('enter', $event, arr?.[2]?.[row - 1])"
              @mouseleave="handlePopover('leave', $event, '')"
            >
              {{ arr?.[col - 1]?.[row - 1] }}
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
  <div class="download-container">
    <div @click="handleDownload">download</div>
  </div>

  <div ref="popRef" popover="manual" :style="popStyle" class="popover-container">
    <div>{{ popTxt }}</div>
  </div>
</template>

<script setup lang="ts">
import { getArr, equalCompare, strictEqualCompare } from '../utils'
import type { TypeItem } from '../const'
import { typeList, valuesLength } from '../const'
import { domToPng } from 'modern-screenshot'

const props = defineProps<{
  type: TypeItem
}>()

const arr = computed(() =>
  getArr(type.value, type.value === typeList[0] ? equalCompare : strictEqualCompare)
)
const typeListRef = ref(typeList)
const columns = computed(() => {
  return type.value === typeList[3] || type.value === typeList[4] ? arr.value?.length : valuesLength
})
const rows = computed(() => {
  return type.value === typeList[3] || type.value === typeList[4]
    ? arr.value?.[0]?.length
    : valuesLength
})

const gridRef = ref()

const type = computed(() => props.type)
const popStyle = ref({})
const popTxt = ref('')

const popRef = ref()
const handlePopover = (type: 'enter' | 'leave', e: Event, txt: string) => {
  if (!e.target || !(e.target as Element)?.classList?.contains('show-tooltip')) return

  const { top, left, width } = useElementBounding(e.target as HTMLElement)
  popStyle.value = {
    top: top.value - 30 + 'px',
    left: left.value + width.value / 2 + 'px',
    transform: 'translate(-50%)'
  }
  if (type === 'enter') {
    popRef.value?.showPopover()
    popTxt.value = txt
  } else {
    popRef.value?.hidePopover()
  }
}
let isLoading = false
const handleDownload = () => {
  if (isLoading) return
  isLoading = true
  if (gridRef.value) {
    const divWrap = document.createElement('div')
    divWrap.setAttribute('style', 'position: fixed; z-index:999; top:0;left: -9999px;')
    const div = document.createElement('div')
    const computedStyle = window.getComputedStyle(gridRef.value)
    div.setAttribute(
      'style',
      'width:auto;overflow:visible;max-width:none;background:var(--bg-color)'
    )
    div.style['gridTemplateColumns'] = computedStyle['gridTemplateColumns']
    div.style['gridTemplateRows'] = computedStyle['gridTemplateRows']
    const { dataset, className } = gridRef.value
    div.className = className
    for (let item in dataset) {
      div.setAttribute('data-' + item, dataset[item])
    }
    div.innerHTML = gridRef.value.innerHTML
    divWrap.append(div)
    document.querySelector('#app')?.append(divWrap)

    nextTick(() => {
      domToPng(div, {
        scale: 2
      })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `javascript-equality-${type.value}.png`
          link.href = dataUrl
          link.click()
        })
        .finally(() => {
          divWrap.remove()
          isLoading = false
        })
    })
  }
}
</script>

<style scoped>
.grid-container {
  display: flex;
  justify-content: safe center;
}

.grid {
  --repeat-columns: v-bind(columns);
  --repeat-rows: v-bind(rows);

  box-sizing: border-box;
  display: inline-grid;
  grid-template-rows: 110px repeat(var(--repeat-columns), 30px);
  grid-template-columns: 110px repeat(var(--repeat-rows), 30px);
  gap: 4px;
  justify-content: safe center;
  max-width: 100vw;
  padding: 20px;
  margin: auto;
  overflow-x: auto;
}

.item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #e8e8e8;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.text-color {
  color: var(--gray-3);
}

.item-empty {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  background-color: transparent;
  border: 0 none;
}

.row-first {
  padding-bottom: 10px;
  color: var(--front-gray-1);
  text-align: right;
  background-color: transparent;
  border: 0 none;
  writing-mode: tb;
}

.row-first::before {
  display: block;
  margin-top: auto;
  content: '';
}

.col-first {
  padding-right: 10px;
  color: var(--front-gray-1);
  text-align: right;
  background-color: transparent;
  border: 0 none;
}

.col-first::before {
  display: block;
  margin-left: auto;
  content: '';
}

.is-loose-equal {
  background-color: var(--green-3);
}

.is-true,
.is-equal {
  background-color: var(--success-color);
  border-color: var(--green-6);
}

.is-empty,
.col-first,
.row-first {
  cursor: default;
}

/* grid-if */
.grid-if {
  display: grid;
  grid-template-rows: repeat(var(--repeat-rows), 30px);
  grid-template-columns: 110px 30px auto;
  row-gap: 10px;
}

.grid-if .col-last {
  flex-direction: row-reverse;
  padding-left: 10px;
  font-size: 12px;
  color: var(--front-gray-2);
  text-align: left;
  white-space: nowrap;
  cursor: default;
  background-color: transparent;
  border: 0 none;
}

.grid-if .col-last::before {
  display: block;
  margin-right: auto;
  content: '';
}

/* compare */
.grid-compare {
  display: grid;
  grid-template-rows: repeat(var(--repeat-rows), auto);
  grid-template-columns: repeat(var(--repeat-columns), 1fr);
  gap: 4px;
}

.grid-compare .item {
  padding: 8px 10px;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  cursor: default;
}

.grid-compare .row-first {
  font-size: 16px;
  font-weight: bolder;
  writing-mode: horizontal-tb;
}

.grid-compare .is-true {
  color: #fff;
}

/* popover */
.popover-container {
  position: fixed;
  z-index: 999;
  padding: 0;
  overflow: visible;
  background: transparent;
  border: 0 none;
}

.popover-container > div {
  position: relative;
  padding: 4px 10px;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  background-color: #000;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.popover-container::after {
  position: absolute;
  bottom: -2px;
  left: 50%;
  z-index: -1;
  content: '';
  border: 10px solid #000;
  border-radius: 4px;
  transform: translateX(-50%) rotate(45deg);
}

/* download */
.download-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.download-container > div {
  padding: 10px 12px;
  color: #fff;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: opacity 0.3s ease;
}

.download-container > div:hover {
  opacity: 0.8;
}
</style>
