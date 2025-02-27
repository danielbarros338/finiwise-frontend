<template>
  <q-page class="q-pa-md">
    <!-- Card com o gráfico dos últimos ganhos -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Últimos Ganhos</div>
      </q-card-section>
      <q-card-section>
        <!-- Container para o gráfico -->
        <canvas ref="chartCanvas"></canvas>
      </q-card-section>
    </q-card>

    <!-- Card para acessar os ganhos -->
    <q-card clickable class="q-pa-md" @click="goToEarningsList">
      <q-card-section class="row items-center">
        <q-icon name="trending_up" size="2em" class="q-mr-sm" />
        <div class="text-h6">Acessar Ganhos</div>
      </q-card-section>
    </q-card>

    <q-page-sticky style="bottom: 10px; left: 10px" position="bottom-left">
      <q-btn round color="red" icon="arrow_back" to="/" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'

const router = useRouter()
const chartCanvas = ref<HTMLCanvasElement | null>(null)

const goToEarningsList = async (): Promise<void> => {
  // Redireciona para a subrota de listagem de ganhos
  await router.push('/earnings/earning-list')
}

onMounted(() => {
  if (chartCanvas.value) {
    // Dados de exemplo para o gráfico
    const data = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Ganhos',
          data: [1000, 1500, 800, 1700, 1200, 1900],
          backgroundColor: 'rgba(255, 165, 0, 0.5)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
        },
      ],
    }

    const config = {
      type: 'bar' as const,
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' as const },
          title: { display: true, text: 'Últimos Ganhos' },
        },
      },
    }

    new Chart(chartCanvas.value, config)
  }
})
</script>

<style scoped>
.q-page {
  background-color: #1e1e1e;
  color: #fff;
}

/* Os cards terão fundo branco e texto preto para melhor contraste */
.q-card {
  background-color: #fff;
  color: #000;
}
</style>
