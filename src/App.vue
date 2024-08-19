<script setup lang="ts">
import EqualComp from './components/EqualComp.vue'
import StrictEqualComp from './components/StrictEqualComp.vue'
import AllInOneComp from './components/AllInOneComp.vue'
import IfComp from './components/IfComp.vue'
import CompareComp from './components/CompareComp.vue'
import { typeList, typeObj } from './const'
import type { TypeItem } from './const'
import type { Component } from 'vue'
const type = ref<TypeItem>(typeList[4])
const typeArr = ref(typeList)
const typeOptions = ref(typeObj)

const getComp = (val: TypeItem): Component => {
  let temp
  switch (val) {
    case typeList[0]:
      temp = EqualComp
      break
    case typeList[1]:
      temp = StrictEqualComp
      break
    case typeList[2]:
      temp = AllInOneComp
      break
    case typeList[3]:
      temp = IfComp
      break
    case typeList[4]:
      temp = CompareComp
      break
  }
  return temp
}
const handleChangeType = (val: TypeItem) => {
  type.value = val
  activeComp.value = getComp(val)
}
const activeComp = shallowRef<Component>(getComp(type.value))
</script>

<template>
  <div class="type-container">
    <div
      v-for="item in typeArr"
      :key="item"
      class="type-item"
      :class="{
        'type-active': item === type
      }"
      @click="handleChangeType(item)"
    >
      {{ typeOptions[item] }}
    </div>
  </div>
  <KeepAlive>
    <Component :is="activeComp" />
  </KeepAlive>
</template>

<style scoped>
.type-container {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.type-item {
  flex: 1;
  line-height: 40px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: var(--primary-color);
  transition: all 0.3s ease;
}

.type-active {
  background-color: #e37318;
}
</style>
