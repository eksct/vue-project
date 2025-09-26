<script setup lang="ts">
import { useRoute } from "vue-router"
// 扫描所有 md 文件
import {type DefineComponent, nextTick, onMounted, ref, shallowRef, watch} from "vue";
const route = useRoute()
const postModules = import.meta.glob('@/postDir/*/*/*.md')

const doc = shallowRef<DefineComponent | null>(null)
const toc = ref()
const activeId = ref("")
const mdContainer = ref()
const headers = ref()
const loadPost = async () => {
  const filePath = `/src/postDir/${route.params.topDir}/${route.params.dir}/${route.params.id}.md`

  if (postModules[filePath]) {
    const mod = await postModules[filePath]!()
    doc.value = (mod as { default: DefineComponent }).default
    await getElements()
  } else {
    doc.value = null
  }
}
const getElements = async () => {
  await nextTick()
  headers.value = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
  toc.value = [...headers.value].map((el:any) => {
    return {
      text: el.innerText,
      id:el.id,
      level: parseInt(el.tagName.slice(1)),
    }
  })
}

loadPost()
onMounted(() => {
  mdContainer.value.addEventListener("scroll", () => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {

              activeId.value = entry.target.id
            }
          })
        },
        {
          root: mdContainer.value,
          rootMargin: "-10px 0px -80% 0px", // 上下偏移，可调节
          threshold: 0
        }
    )
    headers.value.forEach((h:any) => observer.observe(h))
  })

})
watch(
    () => [route.params.dir, route.params.id],
    () => {loadPost()},
    { immediate: false }
)

</script>

<template>
  <div class="container">
    <div ref = "mdContainer" class="left-content" >
      <div class = "mdContainer">
        <component :is="doc" v-if="doc"/>
        <div v-else>文章不存在</div>
        <div style = "height: 650px">
        </div>
      </div>

    </div>

    <div class = "rightToc"  >
      <div style = "padding-left: 5px;font-size: 20px;text-align: center">目录</div>
      <div class = "tocList" >
        <div v-for = "t in toc" :class = "{active:t.id === activeId}" :style="{ paddingLeft: (t.level - 1) * 7 + 'px' }">
          <span :href="`#${t.id}`">{{ t.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.left-content{
  border: solid 1px;
  overflow-y: auto;
  height: 100vh;
  padding-right: 16px;
}
.mdContainer{
  height: 100%;
  >div{
    padding: 10px;
  }

}
.active{
  color: dodgerblue;
}
.rightToc{
  border: solid 1px;
  position: sticky;
  top: 0;
  width: 50%;
  display: inline-block;  /* 根据内容撑宽 */
  span{
    cursor: pointer;
    &:hover{
      color: orange;
    }
  }
}
</style>