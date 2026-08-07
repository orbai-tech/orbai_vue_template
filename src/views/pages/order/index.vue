<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button as AButton,
  Card as ACard,
  Form as AForm,
  FormItem as AFormItem,
  Select as ASelect,
  SelectOption as ASelectOption,
  Table as ATable,
  message,
  type TableColumnsType,
} from 'ant-design-vue'
import PageHeader from '@/components/common/PageHeader.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

interface OrderRow {
  id: string
  customer: string
  amount: number
  status: 'enabled' | 'disabled' | 'pending'
  createdAt: string
}

/**
 * 订单页面仅用于演示 pages/<页面包>/index.vue 的组织形式。
 * 数据均为本地示例，不包含实际下单、支付或履约业务逻辑。
 */
const statusFilter = ref<string>()
const rows = ref<OrderRow[]>([
  { id: 'DEMO-001', customer: '示例客户 A', amount: 199, status: 'pending', createdAt: '2026-08-01 10:20' },
  { id: 'DEMO-002', customer: '示例客户 B', amount: 328, status: 'enabled', createdAt: '2026-08-02 14:35' },
  { id: 'DEMO-003', customer: '示例客户 C', amount: 88, status: 'disabled', createdAt: '2026-08-03 09:10' },
])

const columns: TableColumnsType<OrderRow> = [
  { title: '示例单号', dataIndex: 'id', key: 'id' },
  { title: '客户', dataIndex: 'customer', key: 'customer' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '操作', key: 'action', width: 100 },
]

const filteredRows = computed(() => {
  if (!statusFilter.value) return rows.value
  return rows.value.filter((item) => item.status === statusFilter.value)
})

function viewOrder(record: Record<string, unknown>) {
  message.info(`当前查看：${String(record.id)}`)
}
</script>

<template>
  <main class="page-container">
    <PageHeader title="订单页面示例" description="展示 pages/order/index.vue 页面包、筛选器与表格的组合方式。">
      <template #extra>
        <a-button type="primary" @click="message.success('这是新增操作示例')">新增示例</a-button>
      </template>
    </PageHeader>

    <a-card :bordered="false">
      <a-form layout="inline" class="filter-form">
        <a-form-item label="状态">
          <a-select v-model:value="statusFilter" allow-clear placeholder="全部状态" style="width: 180px">
            <a-select-option value="pending">处理中</a-select-option>
            <a-select-option value="enabled">已启用</a-select-option>
            <a-select-option value="disabled">已停用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>

      <a-table :columns="columns" :data-source="filteredRows" row-key="id" :scroll="{ x: 760 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'amount'">¥{{ record.amount.toFixed(2) }}</template>
          <StatusBadge v-else-if="column.key === 'status'" :status="record.status" />
          <a-button v-else-if="column.key === 'action'" type="link" @click="viewOrder(record)">查看</a-button>
        </template>
      </a-table>
    </a-card>
  </main>
</template>

<style scoped>
.filter-form { margin-bottom: 16px; }
</style>
