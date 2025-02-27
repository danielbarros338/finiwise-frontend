<template>
  <q-page padding class="q-pa-md">
    <!-- Cabeçalho com título e filtro de carteira -->
    <div class="row items-center justify-between q-mb-md q-px-md" style="width: 100%">
      <q-select
        v-model="selectedWallet"
        label="Filtrar por Carteira"
        :options="walletOptions"
        style="width: 100%"
        bg-color="white"
        option-value="id"
        option-label="name"
        dense
        outlined
        clearable
      />
    </div>

    <!-- Listagem de gastos em formato de cards -->
    <q-list bordered separator padding>
      <q-item v-for="revenue in filteredRevenue" :key="revenue.revenueId" clickable>
        <q-item-section>
          <q-card class="my-card">
            <q-card-section>
              <div class="text-subtitle1">{{ revenue.name }}</div>
              <div class="text-caption">Valor: {{ revenue.value.toFixed(2) }}</div>
              <div class="text-caption">Tipo: {{ revenue.typeId }}</div>
              <div class="text-caption">Carteira: {{ getWalletName(revenue.walletId) }}</div>
              <div class="text-caption">Vencimento: {{ revenue.dueDate }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn
                flat
                round
                icon="visibility"
                color="primary"
                @click="openViewDialog(revenue)"
              />
              <q-btn flat round icon="edit" color="primary" @click="openEditDialog(revenue)" />
              <q-btn flat round icon="delete" color="negative" @click="openDeleteDialog(revenue)" />
            </q-card-actions>
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Botão flutuante para adicionar novo gasto -->
    <q-page-sticky style="bottom: 10px; right: 10px" position="bottom-right">
      <q-btn round color="orange" icon="add" @click="openAddDialog" />
    </q-page-sticky>

    <!-- Botão para voltar (caso necessário) -->
    <q-page-sticky style="bottom: 10px; left: 10px" position="bottom-left">
      <q-btn round color="red" icon="arrow_back" to="/revenues" />
    </q-page-sticky>

    <!-- Diálogo para criação/edição -->
    <q-dialog v-model="dialog">
      <q-card style="width: 95%">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Editar Gasto' : 'Adicionar Gasto' }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveRevenue">
            <!-- O campo de carteira não está aqui, pois é definido via filtro -->
            <q-select
              v-model="form.typeId"
              label="Tipo"
              :options="typeOptions"
              dense
              outlined
              required
              class="q-mb-sm"
            />
            <q-input
              v-model.number="form.value"
              label="Valor"
              type="number"
              dense
              outlined
              required
              class="q-mb-sm"
            />
            <q-input v-model="form.name" label="Nome" dense outlined required class="q-mb-sm" />
            <q-input
              v-model="form.description"
              label="Descrição"
              type="textarea"
              dense
              outlined
              class="q-mb-sm"
            />
            <q-input
              v-model="form.observations"
              label="Observações"
              type="textarea"
              dense
              outlined
              class="q-mb-sm"
            />
            <q-input
              v-model="form.dueDate"
              label="Data de Vencimento"
              type="date"
              dense
              outlined
              required
              class="q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="saveRevenue" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de visualização -->
    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes do Gasto</div>
        </q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ selectedRevenue.name }}</div>
          <div><strong>Valor:</strong> {{ selectedRevenue.value.toFixed(2) }}</div>
          <div><strong>Tipo:</strong> {{ selectedRevenue.typeId }}</div>
          <div><strong>Carteira:</strong> {{ getWalletName(selectedRevenue.walletId) }}</div>
          <div><strong>Descrição:</strong> {{ selectedRevenue.description }}</div>
          <div><strong>Observações:</strong> {{ selectedRevenue.observations }}</div>
          <div><strong>Data de Vencimento:</strong> {{ selectedRevenue.dueDate }}</div>
          <div><strong>Criado em:</strong> {{ selectedRevenue.createdAt }}</div>
          <div><strong>Atualizado em:</strong> {{ selectedRevenue.updatedAt }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de confirmação de exclusão -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmar Exclusão</div>
          <div>Tem certeza que deseja excluir este gasto?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="deleteRevenueConfirmed" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Revenue {
  revenueId: number
  userId: number
  walletId: number
  typeId: string | number
  value: number
  name: string
  description: string
  observations: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

interface WalletOption {
  id: number
  name: string
}

interface TypeOption {
  label: string
  value: string | number
}

const currentUserId = 1

const revenues = ref<Revenue[]>([
  {
    revenueId: 1,
    walletId: 1,
    typeId: '1',
    value: 500,
    name: 'Conta de Luz',
    description: 'Pagamento referente a conta de luz',
    observations: 'Vencimento no dia 10',
    dueDate: new Date().toISOString().substr(0, 10),
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    userId: currentUserId,
  },
])

// Opções de carteira
const walletOptions: WalletOption[] = [
  { id: 1, name: 'Carteira Principal' },
  { id: 2, name: 'Carteira Secundária' },
]

// Opções de tipo
const typeOptions: TypeOption[] = [
  { label: 'Boleto', value: '1' },
  { label: 'Cartão de Crédito', value: '2' },
  { label: 'Outros', value: '3' },
]

const dialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)

// Seleção de carteira independente para filtro e para novas inclusões
const selectedWallet = ref<number | null>(null)

const filteredRevenue = computed<Revenue[]>(() => {
  if (!selectedWallet.value) return revenues.value
  return revenues.value.filter((e) => e.walletId === selectedWallet.value)
})

const form = reactive({
  walletId: null as number | null,
  typeId: '' as string | number,
  value: 0,
  name: '',
  description: '',
  observations: '',
  dueDate: new Date().toISOString().substr(0, 10),
})

const selectedRevenue = reactive<Revenue>({
  revenueId: 0,
  walletId: 0,
  typeId: '',
  value: 0,
  name: '',
  description: '',
  observations: '',
  dueDate: '',
  createdAt: '',
  updatedAt: '',
  userId: currentUserId,
})

const openAddDialog = (): void => {
  // Se nenhuma carteira estiver selecionada, usa 0 (ajuste conforme a lógica de negócio)
  form.walletId = selectedWallet.value !== null ? selectedWallet.value : 0
  isEditing.value = false
  form.typeId = '' as string | number
  form.value = 0
  form.name = ''
  form.description = ''
  form.observations = ''
  form.dueDate = new Date().toISOString().substr(0, 10)
  dialog.value = true
}

const openEditDialog = (revenue: Revenue): void => {
  isEditing.value = true
  form.walletId = revenue.walletId
  form.typeId = revenue.typeId
  form.value = revenue.value
  form.name = revenue.name
  form.description = revenue.description
  form.observations = revenue.observations
  form.dueDate = revenue.dueDate
  Object.assign(selectedRevenue, revenue)
  dialog.value = true
}

const saveRevenue = (): void => {
  if (!form.walletId || !form.typeId || !form.name || !form.dueDate) return
  if (isEditing.value) {
    const index = revenues.value.findIndex((e) => e.revenueId === selectedRevenue.revenueId)
    if (index !== -1) {
      revenues.value[index] = {
        revenueId: revenues.value[index]?.revenueId as number,
        walletId: form.walletId,
        typeId: form.typeId,
        value: form.value,
        name: form.name,
        description: form.description,
        observations: form.observations,
        dueDate: form.dueDate,
        createdAt: revenues.value[index]?.createdAt as string,
        updatedAt: new Date().toLocaleString(),
        userId: revenues.value[index]?.userId as number,
      }
    }
  } else {
    const newRevenue: Revenue = {
      revenueId:
        revenues.value.length > 0 ? Math.max(...revenues.value.map((e) => e.revenueId)) + 1 : 1,
      walletId: form.walletId,
      typeId: form.typeId,
      value: form.value,
      name: form.name,
      description: form.description,
      observations: form.observations,
      dueDate: form.dueDate,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      userId: currentUserId,
    }
    revenues.value.push(newRevenue)
  }
  dialog.value = false
}

const openViewDialog = (revenue: Revenue): void => {
  Object.assign(selectedRevenue, revenue)
  viewDialog.value = true
}

const openDeleteDialog = (revenue: Revenue): void => {
  Object.assign(selectedRevenue, revenue)
  deleteDialog.value = true
}

const deleteRevenueConfirmed = (): void => {
  revenues.value = revenues.value.filter((e) => e.revenueId !== selectedRevenue.revenueId)
  deleteDialog.value = false
}

const getWalletName = (walletId: number): string => {
  const wallet = walletOptions.find((w) => w.id === walletId)
  return wallet ? wallet.name : 'N/A'
}
</script>

<style scoped>
.q-page {
  background-color: #1e1e1e;
  color: #fff;
}
/* Garante legibilidade dos textos dentro dos cards */
.my-card {
  margin-bottom: 10px;
  color: #000;
}
</style>
