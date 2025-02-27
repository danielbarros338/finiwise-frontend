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

    <!-- Listagem de ganhos em formato de cards -->
    <q-list bordered separator padding>
      <q-item v-for="earning in filteredEarnings" :key="earning.earningId" clickable>
        <q-item-section>
          <q-card class="my-card">
            <q-card-section>
              <div class="text-subtitle1">{{ earning.name }}</div>
              <div class="text-caption">Valor: {{ earning.value.toFixed(2) }}</div>
              <div class="text-caption">Tipo: {{ earning.typeId }}</div>
              <div class="text-caption">Carteira: {{ getWalletName(earning.walletId) }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn
                flat
                round
                icon="visibility"
                color="primary"
                @click="openViewDialog(earning)"
              />
              <q-btn flat round icon="edit" color="primary" @click="openEditDialog(earning)" />
              <q-btn flat round icon="delete" color="negative" @click="openDeleteDialog(earning)" />
            </q-card-actions>
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Botão flutuante para adicionar novo ganho -->
    <q-page-sticky style="bottom: 10px; right: 10px" position="bottom-right">
      <q-btn round color="orange" icon="add" @click="openAddDialog" />
    </q-page-sticky>

    <q-page-sticky style="bottom: 10px; left: 10px" position="bottom-left">
      <q-btn round color="red" icon="arrow_back" to="/earning" />
    </q-page-sticky>

    <!-- Diálogo para criação/edição (o filtro de carteira não faz parte do formulário) -->
    <q-dialog v-model="dialog">
      <q-card style="width: 95%">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? 'Editar Ganho' : 'Adicionar Ganho' }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveEarning">
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
              v-model="form.observation"
              label="Observação"
              type="textarea"
              dense
              outlined
              class="q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="saveEarning" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de visualização -->
    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes do Ganho</div>
        </q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ selectedEarning.name }}</div>
          <div><strong>Valor:</strong> {{ selectedEarning.value.toFixed(2) }}</div>
          <div><strong>Tipo:</strong> {{ selectedEarning.typeId }}</div>
          <div><strong>Carteira:</strong> {{ getWalletName(selectedEarning.walletId) }}</div>
          <div><strong>Descrição:</strong> {{ selectedEarning.description }}</div>
          <div><strong>Observação:</strong> {{ selectedEarning.observation }}</div>
          <div><strong>Criado em:</strong> {{ selectedEarning.createdAt }}</div>
          <div><strong>Atualizado em:</strong> {{ selectedEarning.updatedAt }}</div>
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
          <div>Tem certeza que deseja excluir este ganho?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="deleteEarningConfirmed" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Earning {
  earningId: number
  walletId: number
  typeId: string | number
  value: number
  name: string
  description: string
  observation: string
  createdAt: string
  updatedAt: string
  userId: number
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

const earnings = ref<Earning[]>([
  {
    earningId: 1,
    walletId: 1,
    typeId: '1',
    value: 1000,
    name: 'Salário',
    description: 'Salário mensal',
    observation: 'Pago via depósito',
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
  { label: 'Depósito', value: '1' },
  { label: 'Transferência', value: '2' },
  { label: 'Outros', value: '3' },
]

const dialog = ref(false)
const viewDialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)

// Seleção de carteira independente para filtro e para novas inclusões
const selectedWallet = ref<number | null>(null)

const filteredEarnings = computed<Earning[]>(() => {
  if (!selectedWallet.value) return earnings.value
  return earnings.value.filter((e) => e.walletId === selectedWallet.value)
})

const form = reactive({
  walletId: null as number | null,
  typeId: '' as string | number,
  value: 0,
  name: '',
  description: '',
  observation: '',
})

const selectedEarning = reactive<Earning>({
  earningId: 0,
  walletId: 0,
  typeId: '',
  value: 0,
  name: '',
  description: '',
  observation: '',
  createdAt: '',
  updatedAt: '',
  userId: currentUserId,
})

const openAddDialog = (): void => {
  // Se nenhuma carteira estiver selecionada, usa 0 (pode ser ajustado conforme a lógica de negócio)
  form.walletId = selectedWallet.value !== null ? selectedWallet.value : 0
  isEditing.value = false
  form.typeId = '' as string | number
  form.value = 0
  form.name = ''
  form.description = ''
  form.observation = ''
  dialog.value = true
}

const openEditDialog = (earning: Earning): void => {
  isEditing.value = true
  form.walletId = earning.walletId
  form.typeId = earning.typeId
  form.value = earning.value
  form.name = earning.name
  form.description = earning.description
  form.observation = earning.observation
  Object.assign(selectedEarning, earning)
  dialog.value = true
}

const saveEarning = (): void => {
  if (!form.walletId || !form.typeId || !form.name) return
  if (isEditing.value) {
    const index = earnings.value.findIndex((e) => e.earningId === selectedEarning.earningId)
    if (index !== -1) {
      earnings.value[index] = {
        earningId: earnings.value[index]?.earningId as number,
        walletId: form.walletId,
        typeId: form.typeId,
        value: form.value,
        name: form.name,
        description: form.description,
        observation: form.observation,
        createdAt: earnings.value[index]?.createdAt as string,
        updatedAt: new Date().toLocaleString(),
        userId: earnings.value[index]?.userId as number,
      }
    }
  } else {
    const newEarning: Earning = {
      earningId:
        earnings.value.length > 0 ? Math.max(...earnings.value.map((e) => e.earningId)) + 1 : 1,
      walletId: form.walletId,
      typeId: form.typeId,
      value: form.value,
      name: form.name,
      description: form.description,
      observation: form.observation,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      userId: currentUserId,
    }
    earnings.value.push(newEarning)
  }
  dialog.value = false
}

const openViewDialog = (earning: Earning): void => {
  Object.assign(selectedEarning, earning)
  viewDialog.value = true
}

const openDeleteDialog = (earning: Earning): void => {
  Object.assign(selectedEarning, earning)
  deleteDialog.value = true
}

const deleteEarningConfirmed = (): void => {
  earnings.value = earnings.value.filter((e) => e.earningId !== selectedEarning.earningId)
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
/* Força a cor do texto dentro dos cards para garantir legibilidade */
.my-card {
  margin-bottom: 10px;
  color: #000;
}
</style>
