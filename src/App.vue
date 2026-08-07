<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { App as AApp, ConfigProvider as AConfigProvider } from 'ant-design-vue'

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE || 'OrbAI Vue Template')
</script>

<template>
  <!-- 主题令牌集中配置，后续换肤时只修改这一处。 -->
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#2563eb',
        borderRadius: 8,
        colorBgLayout: '#f5f7fb',
      },
    }"
  >
    <a-app>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </a-app>
  </a-config-provider>
</template>

<style>
.page-enter-active,
.page-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.page-enter-from { opacity: 0; transform: translateY(6px); }
.page-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
