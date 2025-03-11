<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <!-- Seletor de período -->
      <q-select
        v-model="selectedPeriod"
        :options="periodOptions"
        label="Selecione o período de análise"
        dense
        outlined
        class="q-mb-md"
      />

      <!-- Gráfico de linhas -->
      <div style="position: relative; height: 400px; width: 100%">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { Chart } from 'chart.js/auto'

/* Interfaces para os dados */
interface Expense {
  revenueId: number
  walletId: number
  cardId: number | undefined // agora aceita number ou undefined
  value: number
  createdAt: string
}

interface Earning {
  earningId: number
  walletId: number
  value: number
  name: string
  createdAt: string
}

/* Opções de período para análise */
const periodOptions = [
  { label: '1 Dia', value: '1d' },
  { label: '1 Semana', value: '1w' },
  { label: '1 Mês', value: '1m' },
  { label: '1 Ano', value: '1y' },
]
const selectedPeriod = ref('1d')

/* Função para gerar dados mock para 1 ano (últimos 365 dias) */
const generateMockDataForYear = () => {
  const expensesData: Expense[] = []
  const earningsData: Earning[] = []
  let revenueId = 1
  let earningId = 1
  const now = new Date()
  // Data inicial: 365 dias atrás
  const startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
  // Para cada dia entre a data inicial e hoje
  for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d) // clone a data atual do loop
    // Gera 0 a 2 gastos para o dia
    const numExpenses = Math.floor(Math.random() * 3)
    for (let i = 0; i < numExpenses; i++) {
      expensesData.push({
        revenueId: revenueId++,
        // Sorteia entre 2 carteiras (1 ou 2)
        walletId: Math.random() > 0.5 ? 1 : 2,
        // Sorteia um cartão (1 ou 2) com 50% de chance de existir
        cardId: Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : 2) : undefined,
        value: parseFloat((Math.random() * 500).toFixed(2)), // valor até 500
        createdAt: currentDate.toISOString(),
      })
    }
    // Gera 0 ou 1 ganho para o dia (30% de chance de ter um ganho)
    if (Math.random() < 0.3) {
      earningsData.push({
        earningId: earningId++,
        walletId: Math.random() > 0.5 ? 1 : 2,
        value: parseFloat((Math.random() * 1000).toFixed(2)), // valor até 1000
        name: Math.random() > 0.5 ? 'Salário' : 'Freelance',
        createdAt: currentDate.toISOString(),
      })
    }
  }
  return { expensesData, earningsData }
}

// Gera os dados mock para 1 ano
const { expensesData, earningsData } = generateMockDataForYear()
const expenses = ref<Expense[]>(expensesData)
const earnings = ref<Earning[]>(earningsData)

/* Função utilitária para obter a data limite com base no período selecionado */
const getThresholdDate = (period: string): Date => {
  const now = new Date()
  switch (period) {
    case '1d':
      return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    case '1w':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case '1m':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case '1y':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    default:
      return now
  }
}

/* Gera um array de datas (formato YYYY-MM-DD) entre a data limite e hoje */
const generateDateLabels = (start: Date, end: Date): string[] => {
  const labels: string[] = []
  const current = new Date(start)
  while (current <= end) {
    labels.push(current.toISOString().slice(0, 10))
    current.setDate(current.getDate() + 1)
  }
  return labels
}

/* Agrega os valores diários para ganhos e gastos */
const aggregatedData = computed(() => {
  const now = new Date()
  const threshold = getThresholdDate(selectedPeriod.value)
  const labels = generateDateLabels(threshold, now)
  const earningsPerDay = labels.map((label) => {
    return earnings.value
      .filter((earn) => earn.createdAt.slice(0, 10) === label)
      .reduce((sum, earn) => sum + earn.value, 0)
  })
  const expensesPerDay = labels.map((label) => {
    return expenses.value
      .filter((exp) => exp.createdAt.slice(0, 10) === label)
      .reduce((sum, exp) => sum + exp.value, 0)
  })
  return { labels, earningsPerDay, expensesPerDay }
})

/* Chart.js */
const chartRef = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

const renderChart = () => {
  if (chartRef.value) {
    if (myChart) {
      myChart.destroy()
    }
    const { labels, earningsPerDay, expensesPerDay } = aggregatedData.value
    myChart = new Chart(chartRef.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ganhos (R$)',
            data: earningsPerDay,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
          },
          {
            label: 'Gastos (R$)',
            data: expensesPerDay,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    })
  }
}

onMounted(() => {
  renderChart()
})

// Atualiza o gráfico sempre que o período selecionado mudar
watch(selectedPeriod, async () => {
  await nextTick()
  renderChart()
})
</script>

<style scoped>
.q-page {
  background-color: #1e1e1e;
  color: #fff;
}
.q-pa-md {
  padding: 16px;
}
</style>
