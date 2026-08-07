<script setup lang="ts">
import { ref } from 'vue'
import {
  Button as AButton,
  Card as ACard,
  Col as ACol,
  Descriptions as ADescriptions,
  DescriptionsItem as ADescriptionsItem,
  Row as ARow,
  Statistic as AStatistic,
  Step as AStep,
  Steps as ASteps,
  message,
} from 'ant-design-vue'
import { ApiOutlined, AppstoreOutlined, CodeOutlined, RocketOutlined } from '@ant-design/icons-vue'
import PageHeader from '@/components/common/PageHeader.vue'

const loading = ref(false)

async function simulateRefresh() {
  loading.value = true
  await new Promise((resolve) => window.setTimeout(resolve, 600))
  loading.value = false
  message.success('示例数据已刷新')
}

const stats = [
  { title: '示例页面', value: 5, icon: AppstoreOutlined, color: '#2563eb' },
  { title: '通用组件', value: 3, icon: CodeOutlined, color: '#7c3aed' },
  { title: '请求模块', value: 1, icon: ApiOutlined, color: '#0891b2' },
  { title: '启动耗时', value: '快速', icon: RocketOutlined, color: '#16a34a' },
]
</script>

<template>
  <main class="page-container">
    <PageHeader title="工作台" description="这是一个不含具体业务逻辑的中后台项目起点。">
      <template #extra>
        <a-button type="primary" :loading="loading" @click="simulateRefresh">刷新数据</a-button>
      </template>
    </PageHeader>

    <section class="card-grid">
      <a-card v-for="item in stats" :key="item.title" :bordered="false">
        <a-statistic :title="item.title" :value="item.value">
          <template #prefix><component :is="item.icon" :style="{ color: item.color }" /></template>
        </a-statistic>
      </a-card>
    </section>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :lg="15">
        <a-card title="开始开发" :bordered="false">
          <a-steps direction="vertical" size="small" :current="1">
            <a-step title="配置环境" description="复制并调整 .env.development 与 .env.production。" />
            <a-step title="创建领域模块" description="在 views、common/apis、stores 中按业务领域新增文件。" />
            <a-step title="注册路由" description="在 router/index.ts 添加页面路由和菜单信息。" />
            <a-step title="构建验证" description="提交前执行 npm run build。" />
          </a-steps>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="9">
        <a-card title="技术栈" :bordered="false">
          <a-descriptions :column="1" size="small">
            <a-descriptions-item label="视图">Vue 3 + Composition API</a-descriptions-item>
            <a-descriptions-item label="语言">TypeScript 严格模式</a-descriptions-item>
            <a-descriptions-item label="组件库">Ant Design Vue</a-descriptions-item>
            <a-descriptions-item label="状态">Pinia</a-descriptions-item>
            <a-descriptions-item label="构建">Vite</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
  </main>
</template>
