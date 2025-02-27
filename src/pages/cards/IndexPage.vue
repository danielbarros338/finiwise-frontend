<template>
  <q-page padding class="q-pa-md">
    <div class="q-pa-md">
      <!-- Card com o resumo do número de cartões -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Resumo de Cartões</div>
          <div class="text-subtitle1">Você possui {{ cards.length }} cartão(es).</div>
        </q-card-section>
      </q-card>

      <!-- Card com a listagem das bandeiras dos cartões -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Bandeiras Utilizadas</div>
          <q-list bordered separator>
            <q-item v-for="(flag, index) in uniqueFlags" :key="index">
              <q-item-section>{{ flag }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Listagem dos cartões com botão para visualizar detalhes -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Seus Cartões</div>
          <q-list bordered separator>
            <q-item v-for="card in cards" :key="card.cardId" clickable>
              <q-item-section>
                <div class="text-subtitle1">{{ card.nameInCard }}</div>
                <div class="text-caption">Últimos 4 dígitos: {{ card.lastFourNumbers }}</div>
                <div class="text-caption">Bandeira: {{ getFlagName(card.flagId) }}</div>
              </q-item-section>
              <q-item-section side>
                <q-btn flat round icon="visibility" color="primary" @click="openViewDialog(card)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Botão flutuante para adicionar novo cartão -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="orange" icon="add" @click="openAddDialog" />
    </q-page-sticky>

    <!-- Diálogo de visualização dos dados do cartão -->
    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes do Cartão</div>
        </q-card-section>
        <q-card-section>
          <div><strong>Nome no Cartão:</strong> {{ selectedCard.nameInCard }}</div>
          <div><strong>Últimos 4 Dígitos:</strong> {{ selectedCard.lastFourNumbers }}</div>
          <div><strong>Bandeira:</strong> {{ getFlagName(selectedCard.flagId) }}</div>
          <div><strong>Criado em:</strong> {{ selectedCard.createdAt }}</div>
          <div><strong>Atualizado em:</strong> {{ selectedCard.updatedAt }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para adicionar novo cartão -->
    <q-dialog v-model="addDialog">
      <q-card style="width: 95%">
        <q-card-section>
          <div class="text-h6">Adicionar Novo Cartão</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveCard">
            <q-select
              v-model="form.flagId"
              label="Bandeira"
              :options="flagOptions"
              option-value="id"
              option-label="name"
              dense
              outlined
              required
              class="q-mb-sm"
            />
            <q-input
              v-model="form.lastFourNumbers"
              label="Últimos 4 Dígitos"
              type="text"
              dense
              outlined
              maxlength="4"
              required
              class="q-mb-sm"
            />
            <q-input
              v-model="form.nameInCard"
              label="Nome no Cartão"
              type="text"
              dense
              outlined
              required
              class="q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="saveCard" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

interface Card {
  cardId: number
  flagId: number
  userId: number
  lastFourNumbers: string
  nameInCard: string
  createdAt: string
  updatedAt: string
}

interface FlagOption {
  id: number
  name: string
}

const currentUserId = 1

// Mock dos dados de cartões do usuário
const cards = ref<Card[]>([
  {
    cardId: 1,
    flagId: 1,
    userId: currentUserId,
    lastFourNumbers: '1234',
    nameInCard: 'Cartão Principal',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
  {
    cardId: 2,
    flagId: 2,
    userId: currentUserId,
    lastFourNumbers: '5678',
    nameInCard: 'Cartão Secundário',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
  {
    cardId: 3,
    flagId: 1,
    userId: currentUserId,
    lastFourNumbers: '9012',
    nameInCard: 'Outro Cartão',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
])

// Mock das opções de bandeira
const flagOptions: FlagOption[] = [
  { id: 1, name: 'Visa' },
  { id: 2, name: 'Mastercard' },
  { id: 3, name: 'Elo' },
  { id: 4, name: 'American Express' },
]

// Computed que retorna a lista única de bandeiras utilizadas nos cartões
const uniqueFlags = computed(() => {
  const flagsUsadas = cards.value.map((card) => {
    const flag = flagOptions.find((f) => f.id === card.flagId)
    return flag ? flag.name : 'N/A'
  })
  return Array.from(new Set(flagsUsadas))
})

// Diálogo de visualização
const viewDialog = ref(false)
const selectedCard = reactive<Card>({
  cardId: 0,
  flagId: 0,
  userId: currentUserId,
  lastFourNumbers: '',
  nameInCard: '',
  createdAt: '',
  updatedAt: '',
})

const openViewDialog = (card: Card): void => {
  Object.assign(selectedCard, card)
  viewDialog.value = true
}

const getFlagName = (flagId: number): string => {
  const flag = flagOptions.find((f) => f.id === flagId)
  return flag ? flag.name : 'N/A'
}

// Diálogo de adição de cartão
const addDialog = ref(false)
const form = reactive({
  flagId: null as number | null,
  lastFourNumbers: '',
  nameInCard: '',
})

const openAddDialog = (): void => {
  // Reseta o formulário para novos dados
  form.flagId = null
  form.lastFourNumbers = ''
  form.nameInCard = ''
  addDialog.value = true
}

const saveCard = (): void => {
  // Validação simples do formulário
  if (!form.flagId || !form.lastFourNumbers || !form.nameInCard) return

  const newCard: Card = {
    cardId: cards.value.length > 0 ? Math.max(...cards.value.map((c) => c.cardId)) + 1 : 1,
    flagId: form.flagId,
    userId: currentUserId,
    lastFourNumbers: form.lastFourNumbers,
    nameInCard: form.nameInCard,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  }
  cards.value.push(newCard)
  addDialog.value = false
}
</script>

<style scoped>
.q-page {
  background-color: #1e1e1e;
  color: #1e1e1e;
}

.my-card {
  margin-bottom: 16px;
  padding: 16px;
}
</style>
